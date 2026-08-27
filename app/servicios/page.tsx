import type { Metadata } from "next";
import Link from "next/link";
import Rejilla from "../componentes/Rejilla";
import Ilustracion from "../componentes/ilustraciones";
import { DISCIPLINAS } from "@/lib/contenido";
import Datos from "@/app/componentes/Datos";
import { migas } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Servicios de tecnología, ads e IA",
  description: "Los 20 servicios de APoumian Studio, agrupados en cuatro disciplinas: producto digital, crecimiento, IA y automatización, y respaldo legal y contable.",
  alternates: { canonical: "/servicios" },
};

export default function Servicios() {
  return (
    <>
      <Datos nodos={[migas([{ nombre: "Servicios", url: "/servicios/" }])]} />
      <section className="band band--close grid-bg">
        <div className="wrap">
          <span className="label label--accent label--dash">Catálogo</span>
          <h1 className="display" style={{ margin: "var(--space-md) 0 var(--space-lg)", maxWidth: "14ch" }}>
            Todo lo que hacemos.
          </h1>
          <p className="lede">
            Veinte servicios en cuatro disciplinas. Cada uno dice qué recibes y qué área del equipo
            lo responde — para que sepas con quién estás hablando.
          </p>
        </div>
      </section>

      <section className="band rule-top">
        <div className="wrap">
          <Rejilla
            columnas={4}
            fichas={DISCIPLINAS.map((d) => ({
              id: d.slug,
              numero: d.numero,
              titulo: d.nombre,
              lema: d.titulo,
              detalle: d.servicios.map((x) => x.nombre).join(" · "),
              href: `/servicios/${d.slug}`,
              hrefTexto: `Ver ${d.alias}`,
              cara: <Ilustracion slug={d.slug} />,
            }))}
          />
        </div>
      </section>

      <section className="band band--deep deep rule-top">
        <div className="wrap">
          <h2 className="display display--s" style={{ maxWidth: "16ch", marginBottom: "var(--space-lg)" }}>
            ¿No sabes cuál necesitas?
          </h2>
          <p className="lede" style={{ marginBottom: "var(--space-xl)" }}>
            Es la pregunta normal. Cuéntanos cómo trabajas hoy y nosotros te decimos qué falta.
          </p>
          <Link className="btn" href="/contacto">Pedir un diagnóstico</Link>
        </div>
      </section>
    </>
  );
}
