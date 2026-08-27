import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DISCIPLINAS, PASOS } from "@/lib/contenido";
import { wa } from "@/lib/enlaces";
import EnVista from "../../componentes/EnVista";
import Ilustracion from "../../componentes/ilustraciones";

export function generateStaticParams() {
  return DISCIPLINAS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = DISCIPLINAS.find((x) => x.slug === slug);
  if (!d) return {};
  return {
    title: d.nombre,
    description: d.cuerpo,
    alternates: { canonical: `/servicios/${d.slug}` },
  };
}

export default async function Disciplina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = DISCIPLINAS.find((x) => x.slug === slug);
  if (!d) notFound();

  const otras = DISCIPLINAS.filter((x) => x.slug !== d.slug);

  return (
    <>
      <section className="band band--close grid-bg">
        <div className="wrap hero__grid">
          <div>
          <p className="label" style={{ marginBottom: "var(--space-md)" }}>
            <Link className="foot__link" href="/servicios">Servicios</Link> · {d.numero}
          </p>
          <h1 className="display" style={{ maxWidth: "15ch", marginBottom: "var(--space-lg)" }}>{d.titulo}</h1>
          <p className="lede" style={{ marginBottom: "var(--space-xl)" }}>{d.cuerpo}</p>
          <div className="hero__actions">
            <Link className="btn" href="/contacto">Pedir un diagnóstico</Link>
            {/* El nombre va tal cual, sin `toLowerCase`: lo convertía en
                "ia y automatización" y así le llegaba el mensaje a WhatsApp. */}
            <a
              className="link"
              href={wa(`Hola, me interesa ${d.nombre} para mi negocio.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar de {d.alias} →
            </a>
          </div>
          </div>
          <EnVista><Ilustracion slug={d.slug} /></EnVista>
        </div>
      </section>

      <section className="band rule-top" aria-labelledby="svc-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="svc-t">Qué incluye.</h2>
            <p className="head__note">{d.nota}</p>
          </header>
          <ul>
            {d.servicios.map((s) => (
              <li className="svc" key={s.nombre}>
                <div className="svc__row">
                  <h3 className="svc__name">{s.nombre}</h3>
                  <p className="svc__what">{s.entrega}</p>
                  <p className="svc__area">{s.area}</p>
                </div>
              </li>
            ))}
          </ul>
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

      <section className="band rule-top" aria-labelledby="otras-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="otras-t">Las otras tres disciplinas.</h2>
          </header>
        </div>
        <div className="wrap">
          <div className="disc-grid">
            {otras.map((o) => (
              <article className="disc-card" key={o.slug}>
                <span className="disc-card__n">{o.numero}</span>
                <h3 className="disc-card__t">{o.nombre}</h3>
                <p className="disc-card__l">{o.servicios.map((s) => s.nombre).join(" · ")}</p>
                <p className="disc-card__go">
                  <Link className="link" href={`/servicios/${o.slug}`}>Ver {o.alias} →</Link>
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
