import type { Metadata } from "next";
import Link from "next/link";
import { AUDITORIAS } from "@/lib/contenido";
import { MOTOR, MOTOR_ACCESO, MOTOR_REGISTRO } from "@/lib/enlaces";
import Escaner from "../componentes/Escaner";
import Rejilla from "../componentes/Rejilla";
import BuscadorAuditoria from "../componentes/BuscadorAuditoria";
import Datos from "@/app/componentes/Datos";
import { migas } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Auditorías SEO",
  description: "Auditoría SEO y técnica de tu sitio con hallazgos priorizados, historial y comparativo. El plan con IA añade recomendaciones, evaluación e informe en PDF.",
  alternates: { canonical: "/auditorias" },
};

export default function Auditorias() {
  return (
    <>
      {/* El buscador de esta página llama al motor en cuanto alguien escribe
          una dirección. Abrir la conexión desde ya —DNS, TLS— le ahorra al
          primer clic el saludo completo con otro dominio. Solo aquí: en el
          resto del sitio ese dominio es un enlace que quizá nadie toque. */}
      <link rel="preconnect" href={MOTOR} crossOrigin="use-credentials" />
      <link rel="dns-prefetch" href={MOTOR} />
      <Datos nodos={[migas([{ nombre: "Auditorías SEO", url: "/auditorias/" }])]} />
      <section className="band band--close band--deep deep grid-bg">
        <div className="wrap hero__grid">
          <div>
          <span className="label label--accent label--dash">Producto propio · Suscripción</span>
          <h1 className="display" style={{ margin: "var(--space-md) 0 var(--space-lg)", maxWidth: "13ch" }}>
            Audita tu sitio y sabe <span className="swatch">qué arreglar</span>.
          </h1>
          <p className="lede" style={{ marginBottom: "var(--space-xl)" }}>{AUDITORIAS.que}</p>

          <BuscadorAuditoria />

          <p style={{ marginTop: "var(--space-lg)" }}>
            <a className="link" href={MOTOR_ACCESO}>
              Ya tengo cuenta, entrar ↗
            </a>
          </p>
          </div>
          <div className="ilus"><Escaner /></div>
        </div>
      </section>

      <section className="band band--cream rule-top" aria-labelledby="lim-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="lim-t">Qué ves sin registrarte.</h2>
            <p className="head__note">
              La auditoría se corre completa aunque no tengas cuenta, y el resultado se te guarda.
              Lo que cambia es cuánto de ese resultado puedes leer.
            </p>
          </header>

          <div className="spec-envoltorio">
            <table className="spec">
              <caption className="sr-only">Qué incluye cada nivel de acceso a las auditorías.</caption>
              <thead>
                <tr>
                  <th scope="col">Qué obtienes</th>
                  <th scope="col">Sin cuenta</th>
                  <th scope="col">Básico</th>
                  <th scope="col">Con IA</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Correr la auditoría, incluso con IA", "Sí", "Sí", "Sí"],
                  ["Tu calificación y los conteos por categoría", "Sí", "Sí", "Sí"],
                  ["Qué está mal y en qué página", "No", "Sí", "Sí"],
                  ["Cómo arreglar cada hallazgo", "No", "No", "Sí"],
                  ["Veredictos y soluciones con IA", "No", "No", "Sí"],
                  ["Historial y comparativo entre corridas", "No", "Sí", "Sí"],
                  ["Informe en PDF", "No", "No", "Sí"],
                ].map(([q, a, b, c]) => (
                  <tr key={q}>
                    <th scope="row">{q}</th>
                    <td className={a === "Sí" ? "yes" : "no"}>{a}</td>
                    <td className={b === "Sí" ? "yes" : "no"}>{b}</td>
                    <td className={c === "Sí" ? "yes" : "no"}>{c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="prose" style={{ marginTop: "var(--space-lg)" }}>
            Si corres una auditoría sin cuenta y después te registras, la encuentras ahí
            esperándote: no se pierde.
          </p>
        </div>
      </section>

      <section className="band band--tight rule-top" aria-labelledby="planes-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="planes-t">Dos planes.</h2>
            <p className="head__note">En pesos, por mes, más IVA. Cancelas cuando quieras.</p>
          </header>
        </div>
      </section>

      <section className="band band--tight">
        <div className="wrap">
          <Rejilla
            columnas={2}
            fichas={AUDITORIAS.planes.map((p, i) => ({
              id: p.id,
              numero: String(i + 1).padStart(2, "0"),
              titulo: p.nombre,
              lema: p.nombre === "Con IA" ? "Todo lo del plan Básico, más el análisis." : "Para saber qué está mal en tu sitio.",
              lista: [...p.incluye],
              listaNo: [...p.excluye],
              cifra: `$${p.precio}`,
              cifraPie: "MXN / mes",
              destacada: "destacado" in p && p.destacado,
              accion: { texto: `Empezar con ${p.nombre}`, href: MOTOR_REGISTRO, externo: true },
            }))}
          />
        </div>
      </section>

      <section className="band band--cream rule-top" aria-labelledby="cuenta-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="cuenta-t">Tu cuenta y tus datos.</h2>
          </header>
          <ul>
            {[
              ["Entras con correo y contraseña, o con Google", "Tu contraseña nunca se guarda: en la base solo queda su huella criptográfica."],
              ["Confirmas tu correo antes de operar", "Y si lo cambias, el nuevo no reemplaza al viejo hasta que abres el enlace que te llega."],
              ["Un panel por sitio", "Agregas los sitios que quieras auditar y ves el historial de cada uno por separado."],
              ["Puedes irte cuando quieras", "Cancelas la suscripción desde tu cuenta; el historial sigue siendo tuyo."],
            ].map(([t, b]) => (
              <li className="svc" key={t}>
                <div className="svc__row">
                  <h3 className="svc__name">{t}</h3>
                  <p className="svc__what">{b}</p>
                  <p className="svc__area" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band band--cream rule-top" aria-labelledby="garan-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="garan-t">Cuatro cosas que puedes dar por hechas.</h2>
            <p className="head__note">
              Sin letra chica y sin tecnicismos.
            </p>
          </header>

          <ul>
            {[
              ["Tu contraseña no la tenemos ni nosotros",
               "Se guarda transformada, de forma que ni con acceso a la base de datos se puede recuperar."],
              ["Nadie de nuestro equipo puede darse permisos",
               "Los permisos de administrador se otorgan desde el servidor, no desde la aplicación. Así, aunque alguien robara una sesión, no puede escalar."],
              ["Si cambias tu correo, el viejo sigue sirviendo hasta que confirmes",
               "El correo nuevo no reemplaza al anterior hasta que abres el enlace que te llega. Nadie puede dejarte fuera de tu propia cuenta."],
              ["Cancelas cuando quieras y tu historial sigue siendo tuyo",
               "No hay permanencia ni penalización."],
            ].map(([t, d]) => (
              <li className="svc" key={t}>
                <div className="svc__row">
                  <h3 className="svc__name">{t}</h3>
                  <p className="svc__what">{d}</p>
                  <p className="svc__area" />
                </div>
              </li>
            ))}
          </ul>

          <p style={{ marginTop: "var(--space-xl)" }}>
            <Link className="link" href="/casos">
              ¿Prefieres verlo en el código? Está publicado →
            </Link>
          </p>
        </div>
      </section>

      <section className="band band--deep deep rule-top">
        <div className="wrap">
          <h2 className="display display--s" style={{ maxWidth: "17ch", marginBottom: "var(--space-lg)" }}>
            ¿Prefieres que la auditoría te la hagamos nosotros?
          </h2>
          <p className="lede" style={{ marginBottom: "var(--space-xl)" }}>
            También la corremos por ti y te explicamos los hallazgos en una llamada, sin que tengas
            que leer un informe técnico.
          </p>
          <Link className="btn" href="/contacto">Pedirla como servicio</Link>
        </div>
      </section>
    </>
  );
}
