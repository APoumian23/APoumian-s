import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CON_CAPTURA } from "@/lib/contenido";

/* Una página por sistema.
 *
 * La galería de /casos enseña que existe producto; esto deja al prospecto
 * mirarlo con calma. Un cliente que evalúa no compara descripciones: busca
 * si alguien resolvió algo parecido a lo suyo, y para eso necesita ver la
 * pantalla, no leer un párrafo.
 *
 * Se genera solo para los sistemas que ya tienen captura. Una página de
 * detalle sin imagen no añade nada a lo que la ficha ya dice. */
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

  const pantallas = [
    { src: s.captura, alt: s.capturaAlt },
    ...(s.captura2 ? [{ src: s.captura2, alt: s.captura2Alt ?? s.capturaAlt }] : []),
  ];

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
          <p className="lede" style={{ maxWidth: "56ch" }}>{s.que}</p>
        </div>
      </section>

      <section className="band band--tight rule-top">
        <div className="wrap">
          <div className="galeria">
            {pantallas.map((p) => (
              <figure className="galeria__i" key={p.src}>
                <img className="muestra__img" src={p.src} alt={p.alt} width={1400} height={875} decoding="async" />
              </figure>
            ))}
          </div>
          <p className="galeria__nota">
            Datos de demostración. El nombre del cliente se borra antes de tomar la foto:
            enseñar la pantalla de un cliente real sería un problema para él, no una prueba
            para nosotros.
          </p>

          <p className="hero__actions">
            <Link className="btn" href="/contacto">¿Necesitas algo así? Hablemos</Link>
            <Link className="link" href="/casos/#sis-t">Ver los demás sistemas →</Link>
          </p>
        </div>
      </section>
    </>
  );
}
