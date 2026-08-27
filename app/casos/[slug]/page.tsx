import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CASOS } from "@/lib/contenido";
import { resumen, titulo } from "@/lib/meta";

export function generateStaticParams() {
  return CASOS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CASOS.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: titulo(c.cliente, "caso de cliente"),
    description: resumen(c.reto, `Caso de ${c.cliente}, cliente de APoumian Studio.`),
    alternates: { canonical: `/casos/${c.slug}` },
  };
}

export default async function Caso({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CASOS.find((x) => x.slug === slug);
  if (!c) notFound();

  return (
    <>
      <section className="band band--close grid-bg">
        <div className="wrap caso">
          <div className="caso__txt">
            <p className="label">
              <Link className="foot__link" href="/casos">Casos</Link> · {c.sector}
            </p>
            <h1 className="display display--s" style={{ maxWidth: "12ch" }}>{c.cliente}</h1>
            <p className="caso__q">{c.quien}</p>

            <div className="caso__bloque">
              <h2 className="caso__h">El reto</h2>
              <p className="prose">{c.reto}</p>
            </div>

            <div className="caso__bloque">
              <h2 className="caso__h">Qué construimos</h2>
              <ul className="caso__l">{c.construimos.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>

            <div className="caso__bloque">
              <h2 className="caso__h">Qué puede hacer ahora</h2>
              <p className="caso__ahora">{c.ahora}</p>
            </div>

            <p>
              <a className="link" href={`https://${c.sitio}`} target="_blank" rel="noopener noreferrer">
                {c.sitio} ↗
              </a>
            </p>
          </div>

          <figure className="caso__shot tilt">
            <Image src={c.shot} alt={`Sitio de ${c.cliente}`} width={1200} height={700} priority />
          </figure>
        </div>
      </section>

      <section className="band band--deep deep rule-top">
        <div className="wrap">
          <h2 className="display display--s" style={{ maxWidth: "16ch", marginBottom: "var(--space-lg)" }}>
            ¿El tuyo es el siguiente?
          </h2>
          <Link className="btn" href="/contacto">Pedir un diagnóstico</Link>
        </div>
      </section>
    </>
  );
}
