import Link from "next/link";
import Image from "next/image";
import { ALCANCE, AUDITORIAS, CIFRAS, DISCIPLINAS, SITE, TAPREVIEWS, TRABAJO } from "@/lib/contenido";
import { CORREO, TEL, WA_GENERAL } from "@/lib/enlaces";
import Marquesina from "./componentes/Marquesina";
import Revela from "./componentes/Revela";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.nombre,
  url: SITE.dominio,
  description: "Agencia de tecnología e inteligencia artificial para pymes.",
  slogan: SITE.eslogan,
  areaServed: SITE.pais,
  address: { "@type": "PostalAddress", addressLocality: "Celaya", addressRegion: "Guanajuato", addressCountry: "MX" },
  email: CORREO,
  telephone: `+${TEL}`,
};

const GRUPOS = [...new Set(ALCANCE.map((x) => x.grupo))];

export default function Inicio() {
  const enLinea = TRABAJO.filter((t) => t.sitio);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="hero grid-bg">
        <div className="wrap">
          <div className="hero__grid">
            <div>
              <span className="label label--accent label--dash hero__label rise" style={{ "--i": 0 } as React.CSSProperties}>
                Tecnología · Publicidad · IA
              </span>

              <h1 className="display hero__display">
                <span className="mask"><span style={{ "--i": 0 } as React.CSSProperties}>Toda tu presencia</span></span>
                <span className="mask"><span style={{ "--i": 1 } as React.CSSProperties}>digital, con</span></span>
                <span className="mask"><span style={{ "--i": 2 } as React.CSSProperties}><span className="swatch">un solo equipo</span>.</span></span>
              </h1>

              <p className="lede hero__lede rise" style={{ "--i": 1 } as React.CSSProperties}>
                Desde {SITE.ciudad}: construimos el sitio, la tienda y el sistema con el que trabajas,
                operamos la publicidad que los llena de gente y automatizamos con IA lo que hoy se te
                va en trabajo repetitivo.
              </p>

              <div className="hero__actions rise" style={{ "--i": 2 } as React.CSSProperties}>
                <Link className="btn" href="/contacto">Pedir un diagnóstico</Link>
                <a className="link" href={WA_GENERAL} target="_blank" rel="noopener noreferrer">
                  O escríbenos por WhatsApp →
                </a>
              </div>
            </div>

            <div className="proof rise" style={{ "--i": 3 } as React.CSSProperties}>
              {/* Prueba que cualquiera entiende de un vistazo: los sitios que
                  hicimos, y están en línea. Aquí vivía un fragmento de código;
                  se quitó porque a quien contrata una agencia no le dice nada
                  y lo primero que ve no puede ser algo que no entiende. */}
              <figure className="proof__main tilt">
                <Image src={enLinea[0].shot!} alt={`Sitio de ${enLinea[0].nombre}`} width={1200} height={672} priority />
              </figure>
              <div className="proof__row">
                {enLinea.slice(1, 3).map((t) => (
                  <figure className="proof__thumb tilt" key={t.nombre}>
                    <Image src={t.shot!} alt={`Sitio de ${t.nombre}`} width={1200} height={700} />
                  </figure>
                ))}
              </div>
              <p className="proof__cap label">
                <span>Sitios que hicimos, en línea</span>
                <Link className="link" href="/casos">Ver los casos →</Link>
              </p>
            </div>
          </div>

          <p className="vivo vivo--hero">
            {enLinea.map((t) => (
              <a className="link" key={t.nombre} href={`https://${t.sitio}`} target="_blank" rel="noopener noreferrer">
                {t.sitio} ↗
              </a>
            ))}
          </p>

          <dl className="stats">
            {CIFRAS.map((c) => (
              <div key={c.q}>
                <dd className="stat__n">
                    {/* Las dos cifras comprobables llevan a donde se comprueban:
                        decir "doce sistemas" y dejar al visitante buscándolos es
                        pedirle que confíe; enlazarlos es enseñárselos. */}
                    {c.href ? <Link className="stat__l" href={c.href}>{c.n}</Link> : c.n}
                  </dd>
                <dt className="stat__q">{c.q}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Marquesina />

      {/* Va primero, antes de las disciplinas, y es deliberado.
          Quien llega no quiere saber cómo estamos organizados por dentro: quiere
          ver si hemos hecho algo parecido a lo suyo. Los nombres —"ERP escolar",
          "ventas y vendedores en calle"— hacen que reconozca su propio problema
          en la lista antes de que le contemos nada de nosotros. */}
      <section className="band band--tight" aria-labelledby="sis-h">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="sis-h">
              {ALCANCE.length} sistemas que ningún enlace te puede enseñar.
            </h2>
            <p className="head__note">
              Punto de venta, inventario, nómina, expedientes. Viven detrás de un acceso, con
              datos de clientes reales dentro, así que no hay dirección pública que enseñar —
              pero sí se puede decir qué resuelve cada uno.
            </p>
          </header>
        </div>
        <div className="wrap">
          {/* Una imagen del software corriendo. Doce nombres prueban que existe
              trabajo; una captura prueba que existe producto. Va con datos de
              demostración —organización y clientes inventados— porque enseñar
              la pantalla de un cliente real sería un problema para él, no una
              prueba para nosotros. */}
          <figure className="muestra">
            {/* Dos recortes, no uno escalado. El tablero completo a 375px queda a
                escala 0.21: el texto de 13px se vuelve de 2.7px y la captura pasa
                de ser prueba a ser una mancha gris que igual pesa 74 KB. En
                pantalla angosta se sirve el detalle de los indicadores, que sí se
                lee y pesa 11 KB.

                Va con <picture> y no con <Image> porque esto es dirección de arte
                —imagen distinta, no la misma más chica— y porque el sitio se
                exporta estático: el optimizador de Next no corre. */}
            <picture>
              <source
                media="(min-width: 40rem)"
                srcSet="/sistemas/autolavados-tablero.webp"
                width={1600}
                height={1000}
              />
              <img
                className="muestra__img"
                src="/sistemas/autolavados-detalle.webp"
                alt="Tablero del sistema de gestión para autolavados: ingresos del día, órdenes, reservas próximas con vehículo y placa, y membresías por vencer."
                width={900}
                height={305}
                loading="lazy"
                decoding="async"
              />
            </picture>
            <figcaption className="muestra__cap label">
              <span>Gestión para autolavados · datos de demostración</span>
              <Link className="link" href="/casos/#sis-t">Ver los {ALCANCE.length} →</Link>
            </figcaption>
          </figure>
        </div>

        <div className="wrap">
          <Revela className="disc-grid">
            {GRUPOS.map((g, i) => (
              <article className="disc-card" key={g}>
                <span className="disc-card__n">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="disc-card__t">{g}</h3>
                <p className="disc-card__l">
                  {ALCANCE.filter((x) => x.grupo === g).map((x) => x.titulo).join(" · ")}
                </p>
                <p className="disc-card__go">
                  <Link className="link" href="/casos/#sis-t">Ver qué hace cada uno →</Link>
                </p>
              </article>
            ))}
          </Revela>
        </div>
      </section>

      <section className="band band--tight rule-top" aria-labelledby="disc-t">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="disc-t">Cuatro disciplinas, un solo interlocutor.</h2>
            <p className="head__note">
              No subcontratamos lo que no sabemos hacer. Cada disciplina tiene dentro de casa al
              especialista que la responde.
            </p>
          </header>
        </div>
        <div className="wrap">
          <Revela className="disc-grid">
            {DISCIPLINAS.map((d) => (
              <article className="disc-card" key={d.slug}>
                <span className="disc-card__n">{d.numero}</span>
                <h3 className="disc-card__t">{d.nombre}</h3>
                <p className="disc-card__l">{d.servicios.map((s) => s.nombre).join(" · ")}</p>
                <p className="disc-card__go">
                  <Link className="link" href={`/servicios/${d.slug}`}>Ver {d.alias} →</Link>
                </p>
              </article>
            ))}
          </Revela>
        </div>
      </section>

      <section className="band band--deep deep grid-bg" aria-labelledby="prod-t">
        <div className="wrap">
          <span className="label label--accent label--dash">Productos propios</span>
          <h2 className="display display--s" style={{ margin: "var(--space-md) 0 var(--space-xl)", maxWidth: "18ch" }} id="prod-t">
            Dos cosas que construimos para vender, no para un cliente.
          </h2>

          <Revela className="prods" paso={140}>
            <article className="prod">
              <h3 className="prod__t">Auditorías SEO</h3>
              <p className="prod__d">{AUDITORIAS.que}</p>
              <p className="prod__p">Desde ${AUDITORIAS.planes[0].precio} MXN al mes</p>
              <p><Link className="link" href="/auditorias">Ver los planes →</Link></p>
            </article>

            <article className="prod">
              <h3 className="prod__t">{TAPREVIEWS.nombre}</h3>
              <p className="prod__d">{TAPREVIEWS.que}</p>
              <p className="prod__p">Suscripción mensual · equipo incluido</p>
              <p><Link className="link" href="/tapreviews">Ver TapReviews →</Link></p>
            </article>
          </Revela>
        </div>
      </section>

      <Marquesina sentido="der" />

      <section className="band" aria-labelledby="cta-t">
        <div className="wrap">
          <h2 className="display display--s" id="cta-t" style={{ maxWidth: "18ch", marginBottom: "var(--space-lg)" }}>
            Cuéntanos qué te está costando tiempo o dinero.
          </h2>
          <p className="lede" style={{ marginBottom: "var(--space-xl)" }}>
            Te decimos qué haríamos, en qué orden y cuánto cuesta — aunque la respuesta sea que
            todavía no necesitas contratarnos.
          </p>
          <Link className="btn" href="/contacto">Pedir un diagnóstico sin costo</Link>
        </div>
      </section>
    </>
  );
}
