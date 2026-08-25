import type { Metadata } from "next";
import Link from "next/link";
import { AREAS, INCLUIDO, PASOS, SITE } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Estudio",
  description: "Quiénes somos, cómo trabajamos y qué va incluido en cualquier proyecto de APoumian Studio.",
  alternates: { canonical: "/estudio" },
};

export default function Estudio() {
  return (
    <>
      <section className="band band--close grid-bg">
        <div className="wrap">
          <span className="label label--accent label--dash">El estudio</span>
          <h1 className="display" style={{ margin: "var(--space-md) 0 var(--space-lg)", maxWidth: "14ch" }}>
            Un equipo, no una lista de proveedores.
          </h1>
          <p className="lede">
            Somos una agencia de tecnología e inteligencia artificial en {SITE.ciudad}. Trabajamos con
            empresas y pymes que quieren digitalizarse sin tener que coordinar a cinco despachos
            distintos que se echan la culpa entre ellos.
          </p>
        </div>
      </section>

      <section className="band rule-top" aria-labelledby="areas-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="areas-t">Diez áreas de especialidad.</h2>
            <p className="head__note">
              Cada proyecto pasa por las que le tocan. El respaldo legal y contable es propio, no de
              un tercero — por eso podemos responder por el cumplimiento de lo que construimos.
            </p>
          </header>
          <div className="disc-grid">
            {AREAS.map((a, i) => (
              <div className="disc-card" key={a}>
                <span className="disc-card__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="disc-card__t">{a}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--cream rule-top" aria-labelledby="pasos-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="pasos-t">Cómo trabajamos.</h2>
            <p className="head__note">Cuatro etapas, en este orden, siempre.</p>
          </header>
          <ol className="steps">
            {PASOS.map((p, i) => (
              <li className="step" key={p.titulo}>
                <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="step__t">{p.titulo}</h3>
                <p className="step__b">{p.cuerpo}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band rule-top" aria-labelledby="inc-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="inc-t">Lo que siempre va incluido.</h2>
            <p className="head__note">
              Sin importar el tamaño del proyecto. Si algo no aparece aquí, pregúntalo antes de
              firmar — con nosotros o con quien sea.
            </p>
          </header>
          <table className="spec">
            <caption className="sr-only">Condiciones base de cualquier proyecto de APoumian Studio.</caption>
            <thead>
              <tr>
                <th scope="col">Concepto</th>
                <th scope="col">Incluido</th>
                <th scope="col">Nota</th>
              </tr>
            </thead>
            <tbody>
              {INCLUIDO.map((f) => (
                <tr key={f.concepto}>
                  <th scope="row">{f.concepto}</th>
                  <td className="yes">{f.incluido}</td>
                  <td>{f.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="band band--deep deep rule-top">
        <div className="wrap">
          <h2 className="display display--s" style={{ maxWidth: "18ch", marginBottom: "var(--space-lg)" }}>
            Empecemos por entender tu negocio.
          </h2>
          <Link className="btn" href="/contacto">Pedir un diagnóstico</Link>
        </div>
      </section>
    </>
  );
}
