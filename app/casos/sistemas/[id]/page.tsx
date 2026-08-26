import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CON_CAPTURA } from "@/lib/contenido";

/* Una página por sistema.
 *
 * La galería de /casos demuestra que existe producto; esto deja al prospecto
 * evaluarlo. Y evaluar no es leer un párrafo: es reconocer su propio problema
 * en la lista de lo que el sistema hace, y ver la pantalla donde se hace.
 *
 * Por eso la lista va ANTES de las capturas. Una imagen sin contexto se mira y
 * se pasa; leída después de "cobra por metro cuadrado según la plaga", la misma
 * imagen dice algo.
 *
 * Solo se generan las que tienen captura: una página de detalle sin imagen no
 * añade nada a lo que la ficha ya dice. */
export function generateStaticParams() {
  return CON_CAPTURA.map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const s = CON_CAPTURA.find((x) => x.id === id);
  if (!s) return {};
  return {
    title: s.titulo,
    description: s.que,
    alternates: { canonical: `/casos/sistemas/${s.id}` },
  };
}

export default async function Sistema({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const s = CON_CAPTURA.find((x) => x.id === id);
  if (!s) notFound();

  const pantallas = s.pantallas;

  return (
    <>
      <section className="band band--tight">
        <div className="wrap">
          <p className="label" style={{ color: "var(--color-accent-deep)" }}>
            {s.sector} · {s.estado}
          </p>
          <h1 className="display display--s" style={{ margin: "var(--space-md) 0 var(--space-lg)", maxWidth: "18ch" }}>
            {s.titulo}.
          </h1>
          <p className="lede" style={{ maxWidth: "58ch" }}>{s.que}</p>
        </div>
      </section>

      {s.hace.length > 0 && (
        <section className="band band--tight rule-top" aria-labelledby="hace-t">
          <div className="wrap">
            <header className="head">
              <h2 className="head__title" id="hace-t">Qué hace.</h2>
            </header>
            <ul className="incl">
              {s.hace.map((h) => <li className="incl__i" key={h}>{h}</li>)}
            </ul>
          </div>
        </section>
      )}

      <section className="band band--tight rule-top" aria-labelledby="pant-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="pant-t">
              {pantallas.length > 1 ? "Las pantallas." : "La pantalla."}
            </h2>
            <p className="head__note">
              Con datos de demostración. El nombre del cliente se borra antes de tomar la foto:
              enseñar la pantalla de un cliente real sería un problema para él, no una prueba
              para nosotros.
            </p>
          </header>
          <div className="galeria galeria--una">
            {pantallas.map((p) => (
              <figure className="galeria__i" key={p.src}>
                <img className="muestra__img" src={p.src} alt={p.alt} width={1400} height={875} decoding="async" />
                <figcaption className="muestra__cap label"><span>{p.alt.split(":")[0]}</span></figcaption>
              </figure>
            ))}
          </div>

          <p className="hero__actions" style={{ marginTop: "var(--space-2xl)" }}>
            <Link className="btn" href="/contacto">¿Necesitas algo así? Hablemos</Link>
            <Link className="link" href="/casos/#sis-t">Ver los demás sistemas →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
