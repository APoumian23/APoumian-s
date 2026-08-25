"use client";

import { useEffect, useRef, useState } from "react";
import { MOTOR } from "@/lib/enlaces";

/* La auditoría la corre el motor, pero la llamada sale del NAVEGADOR del
 * visitante —no de este servidor— y el resultado se pinta aquí sin sacarlo
 * del sitio.
 *
 * Que salga del navegador no es un detalle: el motor lleva el límite de
 * peticiones por IP y reconoce al visitante anónimo con una cookie de su
 * dominio. Si la llamada saliera de este servidor, todos los visitantes
 * compartirían una IP y una cookie: una sola persona agotaría la cuota de
 * todas, y nadie podría reclamar su auditoría al registrarse. */


type Estado = "quieto" | "encolando" | "corriendo" | "listo" | "error";

type Tally = { pass: number; warn: number; fail: number; na: number; skipped: number };

type Respuesta = {
  audit: {
    id: string;
    status: string;
    url: string;
    progressPct: number | null;
    progressStage: string | null;
    scoreGlobal: number | null;
    scoresByCategory: Record<string, number> | null;
    tally: Tally | null;
    /* OJO: es la LISTA de URLs recorridas (`String[]` en el schema), no un
       conteo. Un arreglo vacío es truthy en JS y se convierte en cadena vacía,
       así que tratarlo como número imprime " ·  páginas" sin número. */
    pagesCrawled: string[] | null;
  };
  categoryLabels: Record<string, string>;
  retenido: { hallazgos: number; ia: number; corridaConIa: boolean };
  totalChecks: number;
};

/** Estados posibles de un punto revisado, en el orden en que se pintan. */
const ESTADOS = [
  { k: "fail", clase: "es-mal" },
  { k: "warn", clase: "es-aviso" },
  { k: "pass", clase: "es-bien" },
  { k: "na", clase: "es-na" },
  { k: "skipped", clase: "es-na" },
] as const;

/** Una casilla por verificación ejecutada.
 *
 *  OJO con la cardinalidad: el motor guarda una fila por check Y POR PÁGINA
 *  (`@@unique([auditId, checkKey, pageUrl])` en CheckResult). Con 325 puntos de
 *  catálogo y diez páginas recorridas salen más de mil verificaciones. Por eso
 *  aquí NO hay denominador fijo: el total no se sabe hasta que termina, y
 *  ponerle el tamaño del catálogo daba "1227 de 325", que no es congruente.
 *
 *  Mientras corre se encienden en orden; al terminar se recolorean por
 *  resultado. Lo que pasa se pinta apagado a propósito: el ojo debe irse a lo
 *  que falla, que es de lo que trata una auditoría. */
function Casillas({ hechas, tally, paginas, catalogo }:
  { hechas: number; tally: Tally | null; paginas: number; catalogo: number }) {
  if (!hechas && !tally) return null;

  const total = tally ? ESTADOS.reduce((n, e) => n + (tally[e.k] ?? 0), 0) : hechas;
  if (!total) return null;

  let clases: string[];
  if (tally) {
    clases = [];
    for (const { k, clase } of ESTADOS) {
      for (let i = 0; i < (tally[k] ?? 0); i++) clases.push(clase);
    }
  } else {
    clases = Array.from({ length: total }, () => "es-hecho");
  }

  return (
    <div className="casillas">
      <p className="casillas__cab">
        <span className="label">Verificaciones ejecutadas</span>
        <span className="label">
          {total.toLocaleString("es-MX")}
          {paginas > 0 ? ` · ${paginas} ${paginas === 1 ? "página" : "páginas"}` : ""}
        </span>
      </p>
      <div className="casillas__rejilla" role="img"
           aria-label={`${total} verificaciones ejecutadas${paginas ? ` en ${paginas} páginas` : ""}`}>
        {clases.map((c, i) => <span className={`casilla ${c}`} key={i} style={{ "--i": i % 60 } as React.CSSProperties} />)}
      </div>
      {tally ? (
        <p className="casillas__leyenda">
          <span className="leyenda"><span className="casilla es-mal" /> {tally.fail} fallan</span>
          <span className="leyenda"><span className="casilla es-aviso" /> {tally.warn} con aviso</span>
          <span className="leyenda"><span className="casilla es-bien" /> {tally.pass} pasan</span>
          {tally.na + tally.skipped > 0 && (
            <span className="leyenda"><span className="casilla es-na" /> {tally.na + tally.skipped} no aplican</span>
          )}
        </p>
      ) : (
        <p className="casillas__leyenda">
          <span className="leyenda">{catalogo} puntos de catálogo, revisados en cada página</span>
        </p>
      )}
    </div>
  );
}

/** Acepta lo que la gente escribe: "ejemplo.com", "www.ejemplo.com/algo",
 *  "https://ejemplo.com". Devuelve el host limpio o null. */
function normaliza(entrada: string): string | null {
  const t = entrada.trim().replace(/\s+/g, "");
  if (!t) return null;
  let u: URL;
  try {
    u = new URL(/^https?:\/\//i.test(t) ? t : `https://${t}`);
  } catch {
    return null;
  }
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(u.hostname)) return null;
  return u.hostname.replace(/^www\./i, "") + (u.pathname !== "/" ? u.pathname : "");
}

const notaPorDefecto =
  "Sin cuenta ves tu calificación y cuántos hallazgos hay por categoría. Para saber cuáles son, te registras — es gratis.";

export default function BuscadorAuditoria() {
  const [url, setUrl] = useState("");
  const [modo, setModo] = useState<"rapida" | "ia">("rapida");
  const [estado, setEstado] = useState<Estado>("quieto");
  const [error, setError] = useState("");
  const [datos, setDatos] = useState<Respuesta | null>(null);
  const sondeo = useRef<number | null>(null);

  useEffect(() => () => { if (sondeo.current) window.clearInterval(sondeo.current); }, []);

  const ocupado = estado === "encolando" || estado === "corriendo";

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    const limpia = normaliza(url);
    if (!limpia) {
      setError("Eso no parece una dirección de sitio. Prueba con algo como ejemplo.com");
      return;
    }
    setError("");
    setDatos(null);
    setEstado("encolando");

    let auditId: string;
    try {
      const res = await fetch(`${MOTOR}/api/audits`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: limpia, useAi: modo === "ia" }),
      });
      const cuerpo = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(cuerpo.error ?? "No se pudo iniciar la auditoría.");
        setEstado("error");
        return;
      }
      auditId = cuerpo.auditId;
    } catch {
      setError("No se pudo conectar con el motor de auditorías. Intenta de nuevo en un momento.");
      setEstado("error");
      return;
    }

    setEstado("corriendo");
    sondeo.current = window.setInterval(async () => {
      try {
        const r = await fetch(`${MOTOR}/api/audits/${auditId}`, { credentials: "include", cache: "no-store" });
        if (!r.ok) return;
        const d: Respuesta = await r.json();
        setDatos(d);
        if (d.audit.status === "done" || d.audit.status === "error") {
          if (sondeo.current) window.clearInterval(sondeo.current);
          if (d.audit.status === "error") {
            setError("El motor no pudo terminar esta auditoría. Puede que el sitio bloquee el acceso.");
            setEstado("error");
          } else {
            setEstado("listo");
          }
        }
      } catch { /* un sondeo fallido no rompe nada: el siguiente lo reintenta */ }
    }, 1500);
  }

  const pct = datos?.audit.progressPct ?? 0;
  /* "Hallazgo" en el vocabulario del motor es `fail + warn`, no toda fila
     guardada: la mayoría de las verificaciones pasan. Anunciar el total como
     hallazgos le diría al visitante que tiene mil problemas cuando no los tiene. */
  const t = datos?.audit.tally;
  const problemas = t ? t.fail + t.warn : 0;
  const cats = datos?.audit.scoresByCategory
    ? Object.entries(datos.audit.scoresByCategory).sort((a, b) => a[1] - b[1])
    : [];

  return (
    <div className="busca-caja">
      <form className="busca" onSubmit={enviar} noValidate>
        <p className="busca__gancho">Pruébalo ahora · sin cuenta y sin tarjeta</p>

        <div className="busca__fila">
          <label className="sr-only" htmlFor="url-auditar">Dirección del sitio que quieres auditar</label>
          <input
            className="busca__input"
            id="url-auditar"
            name="url"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="ejemplo.com"
            value={url}
            onChange={(e) => { setUrl(e.target.value); if (error) setError(""); }}
            aria-invalid={Boolean(error)}
            aria-describedby="nota-url"
            disabled={ocupado}
          />
          <button className="btn busca__btn" type="submit" disabled={ocupado}>
            {estado === "encolando" ? "Encolando…" : estado === "corriendo" ? "Auditando…" : "Auditar sitio"}
            {!ocupado && <span aria-hidden="true">→</span>}
          </button>
        </div>

        <fieldset className="busca__modos" disabled={ocupado}>
          <legend className="sr-only">Tipo de auditoría</legend>
          {([
            ["rapida", "Rápida", "10 a 40 segundos"],
            ["ia", "Con IA", "1 a 4 minutos"],
          ] as const).map(([v, n, t]) => (
            <label className={`busca__modo${modo === v ? " is-on" : ""}`} key={v}>
              <input type="radio" name="modo" value={v} checked={modo === v} onChange={() => setModo(v)} />
              <span className="busca__modo-n">{n}</span>
              <span className="busca__modo-t">{t}</span>
            </label>
          ))}
        </fieldset>

        <p className="busca__nota" id="nota-url" data-error={error ? "" : undefined} role={error ? "alert" : undefined}>
          {error || notaPorDefecto}
        </p>
      </form>

      {(estado === "corriendo" || estado === "listo") && datos && (
        <section className="res" aria-live="polite" aria-busy={estado === "corriendo"}>
          <header className="res__cab">
            <span className="label">{datos.audit.url}</span>
            {estado === "corriendo" && (
              <span className="label label--accent">
                {datos.audit.progressStage ?? "Recorriendo el sitio"} · {pct}%
              </span>
            )}
          </header>

          {estado === "corriendo" && (
            <div className="res__barra" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${pct}%` }} />
            </div>
          )}

          <Casillas
            hechas={datos.retenido.hallazgos}
            tally={estado === "listo" ? datos.audit.tally : null}
            paginas={datos.audit.pagesCrawled?.length ?? 0}
            catalogo={datos.totalChecks ?? 0}
          />

          {datos.audit.scoreGlobal !== null && (
            <div className="res__marco">
              <p className="res__n">{datos.audit.scoreGlobal}<span className="res__de"> / 100</span></p>
              <p className="label">Calificación general</p>
            </div>
          )}

          {cats.length > 0 && (
            <ul className="res__cats">
              {cats.map(([k, v]) => (
                <li className="res__cat" key={k}>
                  <span className="res__cat-n">{datos.categoryLabels[k] ?? k}</span>
                  <span className="res__cat-b">
                    <span
                      style={{ width: `${v}%` }}
                      data-nivel={v < 60 ? "bajo" : v < 85 ? "medio" : "alto"}
                    />
                  </span>
                  <span className="res__cat-v">{v}</span>
                </li>
              ))}
            </ul>
          )}

          {estado === "listo" && (
            <div className="res__muro">
              <p className="res__muro-t">
                {problemas > 0
                  ? `Hay ${problemas} ${problemas === 1 ? "hallazgo" : "hallazgos"} esperándote.`
                  : "Tu sitio salió limpio en esta corrida."}
              </p>
              <p className="prose">
                {problemas > 0
                  ? "La auditoría ya corrió completa y quedó guardada. Crea tu cuenta y la encuentras ahí: qué está mal exactamente y en qué página."
                  : "Nada que arreglar en los puntos que fallan o avisan. Crea tu cuenta para ver el detalle y comparar contra la próxima corrida."}
              </p>
              <p className="res__muro-a">
                <a className="btn" href={`${MOTOR}/registro`} target="_blank" rel="noopener noreferrer">
                  Ver qué está mal ↗
                </a>
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
