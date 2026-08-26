import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ALCANCE, CON_CAPTURA, AUDITORIAS, CASOS, CODIGO, PRODUCTOS_TRABAJO, TAPREVIEWS } from "@/lib/contenido";
import Rejilla from "../componentes/Rejilla";

export const metadata: Metadata = {
  title: "Casos",
  description:
    "Proyectos entregados, productos propios y el código con el que se construyeron. Los sitios de clientes están en línea y puedes abrirlos.",
  alternates: { canonical: "/casos" },
};

const GRUPOS = [...new Set(ALCANCE.map((x) => x.grupo))];

export default function Casos() {
  return (
    <>
      <section className="band band--close grid-bg">
        <div className="wrap">
          <span className="label label--accent label--dash">Casos</span>
          <h1 className="display" style={{ margin: "var(--space-md) 0 var(--space-lg)", maxWidth: "15ch" }}>
            Trabajo <span className="swatch">que se puede revisar</span>.
          </h1>
          <p className="lede">
            Tres clientes en línea, dos productos propios, doce sistemas que operan puertas
            adentro, y el código con el que se construyeron. Casi nadie te enseña esto antes de
            que lo contrates.
          </p>
        </div>
      </section>

      <section className="band rule-top" aria-labelledby="cli-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="cli-t">Para clientes.</h2>
            <p className="head__note">Los tres están en línea. Ábrelos.</p>
          </header>

          <Rejilla
            columnas={3}
            fichas={CASOS.map((c, i) => ({
              id: c.slug,
              numero: String(i + 1).padStart(2, "0"),
              titulo: c.cliente,
              lema: c.ahora,
              detalle: c.sitio,
              href: `/casos/${c.slug}`,
              hrefTexto: `Ver ${c.cliente}`,
              cara: (
                <Image
                  src={c.shot}
                  alt={`Sitio de ${c.cliente}`}
                  width={1200}
                  height={700}
                  sizes="(min-width: 68rem) 22rem, (min-width: 44rem) 45vw, 88vw"
                  priority={i === 0}
                />
              ),
            }))}
          />
        </div>
      </section>

      <section className="band band--cream rule-top" aria-labelledby="prop-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="prop-t">Productos propios.</h2>
            <p className="head__note">Construidos para venderlos como servicio, no para un cliente.</p>
          </header>

          <Rejilla
            columnas={2}
            fichas={[
              {
                id: "auditorias",
                numero: "01",
                titulo: "Auditorías SEO",
                lema: PRODUCTOS_TRABAJO[0].que,
                detalle: `8 modelos de datos · desde $${AUDITORIAS.planes[0].precio} MXN al mes`,
                href: "/auditorias",
                hrefTexto: "Ver Auditorías",
              },
              {
                id: "tapreviews",
                numero: "02",
                titulo: TAPREVIEWS.nombre,
                lema: PRODUCTOS_TRABAJO[1].que,
                detalle: "13 modelos de datos · suscripción con equipo incluido",
                href: "/tapreviews",
                hrefTexto: "Ver TapReviews",
              },
            ]}
          />
        </div>
      </section>

      <section className="band rule-top" aria-labelledby="sis-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="sis-t">Y lo que no se puede enlazar.</h2>
            <p className="head__note">
              Software que corre puertas adentro de un negocio: punto de venta, inventario,
              nómina, expedientes. No tiene dirección pública porque vive detrás de un acceso,
              con datos de clientes reales dentro. Lo que sí se puede enseñar es qué resuelve
              cada uno. Los clientes van sin nombre: ponerlo es decisión suya, no nuestra.
            </p>
          </header>

          {/* Las capturas van juntas y antes de las fichas, no una dentro de cada
              tarjeta: solo cinco de los doce sistemas tienen imagen, y una
              rejilla con siete huecos se lee peor que ninguna imagen.

              Todas llevan datos de demostración y el nombre del cliente borrado
              antes de disparar la foto. */}
          <div className="galeria">
            {CON_CAPTURA.map((x) => (
              <figure className="galeria__i" key={x.id}>
                <img
                  className="muestra__img"
                  src={x.captura}
                  alt={x.capturaAlt}
                  width={1400}
                  height={875}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption className="muestra__cap label">
                  <span>{x.titulo}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="galeria__nota">
            {CON_CAPTURA.length} de los {ALCANCE.length}, con datos inventados. Los nombres de los clientes se borran
            antes de tomar la foto: enseñar la pantalla de un cliente real sería un problema
            para él, no una prueba para nosotros.
          </p>

          {GRUPOS.map((grupo) => (
            <div key={grupo} className="grupo">
              <h3 className="grupo__t">{grupo}</h3>
              <Rejilla
                columnas={3}
                fichas={ALCANCE.filter((x) => x.grupo === grupo).map((x, i) => ({
                  id: x.id,
                  numero: String(i + 1).padStart(2, "0"),
                  titulo: x.titulo,
                  lema: x.que,
                  detalle: `${x.sector} · ${x.estado}`,
                }))}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="band rule-top" aria-labelledby="cod-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="cod-t">Y el código, tal cual está escrito.</h2>
            <p className="head__note">
              Esta parte es para quien sepa leerla — si no es tu caso, sáltala sin problema.
              Elegimos estos fragmentos porque el comentario explica una decisión, no porque el
              código se vea bonito.
            </p>
          </header>
        </div>

        {CODIGO.map((c, i) => (
          <div className="wrap codigo codigo--apilado" key={c.titulo}>
            <div className="codigo__say">
              <h3 className="cod__t">{c.titulo}</h3>
              <p className="prose">{c.porque}</p>
            </div>
            <figure className="cod">
              <figcaption className="cod__cab">
                <span className="label">{c.archivo}</span>
                <span className="label cod__lang">{c.lenguaje}</span>
              </figcaption>
              <pre className="cod__pre"><code>{c.codigo}</code></pre>
            </figure>
          </div>
        ))}
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
