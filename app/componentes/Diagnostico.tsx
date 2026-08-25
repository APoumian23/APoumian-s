"use client";

import { useState } from "react";
import { DISCIPLINAS } from "@/lib/contenido";

type Estado = "inactivo" | "enviando" | "ok" | "error";

const PRESUPUESTOS = [
  "Aún no lo sé",
  "Menos de $20,000 MXN",
  "$20,000 – $60,000 MXN",
  "$60,000 – $150,000 MXN",
  "Más de $150,000 MXN",
];

export default function Diagnostico({ whatsapp }: { whatsapp: string }) {
  const [estado, setEstado] = useState<Estado>("inactivo");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState<Record<string, string>>({});

  const enviando = estado === "enviando";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const datos = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    const fallos: Record<string, string> = {};
    if (!datos.nombre?.trim()) fallos.nombre = "Falta tu nombre. Lo usamos para saber con quién hablamos.";
    if (!datos.negocio?.trim()) fallos.negocio = "Falta el nombre de tu negocio.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(datos.correo ?? ""))
      fallos.correo = "Ese correo no tiene forma de correo. Revísalo y vuelve a intentar.";
    if (!datos.mensaje?.trim() || datos.mensaje.trim().length < 12)
      fallos.mensaje = "Cuéntanos al menos una línea de qué necesitas.";

    setErrores(fallos);
    if (Object.keys(fallos).length > 0) {
      setEstado("error");
      setMensaje("Revisa los campos marcados y vuelve a enviar.");
      return;
    }

    setEstado("enviando");
    setMensaje("");

    try {
      const res = await fetch("/contacto.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (!res.ok) throw new Error(String(res.status));
      setEstado("ok");
      setMensaje("Recibido. Te respondemos el mismo día hábil.");
      form.reset();
    } catch {
      setEstado("error");
      setMensaje("No se pudo enviar la solicitud. Escríbenos por WhatsApp y lo resolvemos ahí mismo.");
    }
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__pair">
        <div className="field field--valida">
          <label className="field__label" htmlFor="nombre">Tu nombre</label>
          <input
            className="field__input"
            id="nombre"
            name="nombre"
            autoComplete="name"
            disabled={enviando}
            aria-invalid={Boolean(errores.nombre)}
            aria-describedby={errores.nombre ? "err-nombre" : undefined}
          />
          <p className="field__error" id="err-nombre">{errores.nombre ?? ""}</p>
        </div>
        <div className="field field--valida">
          <label className="field__label" htmlFor="negocio">Tu negocio</label>
          <input
            className="field__input"
            id="negocio"
            name="negocio"
            autoComplete="organization"
            disabled={enviando}
            aria-invalid={Boolean(errores.negocio)}
            aria-describedby={errores.negocio ? "err-negocio" : undefined}
          />
          <p className="field__error" id="err-negocio">{errores.negocio ?? ""}</p>
        </div>
      </div>

      <div className="form__pair">
        <div className="field field--valida">
          <label className="field__label" htmlFor="correo">Correo</label>
          <input
            className="field__input"
            id="correo"
            name="correo"
            type="email"
            inputMode="email"
            autoComplete="email"
            disabled={enviando}
            aria-invalid={Boolean(errores.correo)}
            aria-describedby={errores.correo ? "err-correo" : undefined}
          />
          <p className="field__error" id="err-correo">{errores.correo ?? ""}</p>
        </div>
        <div className="field">
          <label className="field__label" htmlFor="telefono">Teléfono (opcional)</label>
          <input
            className="field__input"
            id="telefono"
            name="telefono"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            disabled={enviando}
          />
        </div>
      </div>

      <div className="form__pair">
        <div className="field field--select">
          <label className="field__label" htmlFor="servicio">Qué te interesa</label>
          <select className="field__select" id="servicio" name="servicio" defaultValue="" disabled={enviando}>
            <option value="">Todavía no lo tengo claro</option>
            {DISCIPLINAS.map((d) =>
              d.servicios.map((s) => (
                <option key={`${d.id}-${s.nombre}`} value={`${d.nombre} · ${s.nombre}`}>
                  {s.nombre}
                </option>
              )),
            )}
          </select>
        </div>
        <div className="field field--select">
          <label className="field__label" htmlFor="presupuesto">Presupuesto estimado</label>
          <select className="field__select" id="presupuesto" name="presupuesto" defaultValue={PRESUPUESTOS[0]} disabled={enviando}>
            {PRESUPUESTOS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field field--valida">
        <label className="field__label" htmlFor="mensaje">Qué necesitas resolver</label>
        <textarea
          className="field__area"
          id="mensaje"
          name="mensaje"
          rows={4}
          placeholder="Ej. Vendemos por WhatsApp y llevamos el inventario en Excel; se nos empalman los pedidos."
          disabled={enviando}
          aria-invalid={Boolean(errores.mensaje)}
          aria-describedby={errores.mensaje ? "err-mensaje" : undefined}
        />
        <p className="field__error" id="err-mensaje">{errores.mensaje ?? ""}</p>
      </div>

      <div className="form__foot">
        <button className="btn" type="submit" disabled={enviando}>
          {enviando ? "Enviando…" : "Pedir diagnóstico"}
          {!enviando && <span className="chip__arrow" aria-hidden="true">→</span>}
        </button>
        <p className="form__note">
          Sin costo y sin compromiso. Respondemos el mismo día hábil. Al enviar aceptas nuestro{" "}
          <a className="link" href="/privacidad">aviso de privacidad</a>.
        </p>
      </div>

      <p className="form__status" role="status" aria-live="polite" data-tone={estado === "ok" ? "ok" : estado === "error" ? "bad" : undefined}>
        {mensaje}
        {estado === "error" && (
          <>
            {" "}
            <a className="link" href={whatsapp} target="_blank" rel="noopener noreferrer">
              Ir a WhatsApp →
            </a>
          </>
        )}
      </p>
    </form>
  );
}
