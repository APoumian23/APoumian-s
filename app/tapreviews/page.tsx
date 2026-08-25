import type { Metadata } from "next";
import Link from "next/link";
import { TAPREVIEWS } from "@/lib/contenido";
import { wa } from "@/lib/enlaces";
import Nfc from "../componentes/Nfc";
import Rejilla from "../componentes/Rejilla";

export const metadata: Metadata = {
  title: "TapReviews · Tarjetas NFC para reseñas de Google",
  description:
    "Tarjetas NFC que llevan a tus clientes directo a dejarte una reseña de Google. Suscripción mensual con el equipo incluido: panel con tus taps, reporte mensual y respuesta a tus reseñas.",
  alternates: { canonical: "/tapreviews" },
};

const WA_TAP = wa("Hola, me interesa TapReviews para mi negocio. ¿Me pasan detalles?");

/* Solo se declaran los planes con precio real. El de entrada está pendiente y
 * anunciar un precio inventado en datos estructurados es peor que en la página:
 * Google lo indexa y lo muestra en resultados. */
const conPrecio = TAPREVIEWS.planes.filter((p) => p.precio !== null);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "TapReviews",
  description: TAPREVIEWS.que,
  provider: { "@type": "Organization", name: "APoumian Studio" },
  offers: conPrecio.map((p) => ({
    "@type": "Offer",
    name: p.nombre,
    priceCurrency: "MXN",
    price: String(p.precio),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(p.precio),
      priceCurrency: "MXN",
      billingDuration: 1,
      billingIncrement: 1,
      unitCode: "MON",
    },
  })),
};

export default function TapReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="band band--close grid-bg">
        <div className="wrap hero__grid">
          <div>
            <span className="label label--accent label--dash">Producto propio · NFC</span>
            <h1 className="display" style={{ margin: "var(--space-md) 0 var(--space-lg)", maxWidth: "14ch" }}>
              <span className="mask"><span style={{ "--i": 0 } as React.CSSProperties}>Deja de <span className="swatch">pedir</span></span></span>
              <span className="mask"><span style={{ "--i": 1 } as React.CSSProperties}>reseñas.</span></span>
            </h1>
            <p className="lede" style={{ marginBottom: "var(--space-xl)" }}>{TAPREVIEWS.que}</p>
            <div className="hero__actions">
              <a className="btn" href={WA_TAP} target="_blank" rel="noopener noreferrer">Pedir la mía por WhatsApp</a>
              <Link className="link" href="/contacto">O cuéntanos de tu negocio →</Link>
            </div>
          </div>
          <div className="ilus"><Nfc /></div>
        </div>
      </section>

      <section className="band band--cream rule-top" aria-labelledby="tap-como">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="tap-como">Cómo funciona.</h2>
            <p className="head__note">Sin app, ni para ti ni para tu cliente. La tarjeta solo guarda una dirección.</p>
          </header>
          <ol className="steps">
            {TAPREVIEWS.comoFunciona.map((p) => (
              <li className="step" key={p.n}>
                <span className="step__n">{p.n}</span>
                <h3 className="step__t">{p.t}</h3>
                <p className="step__b">{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band rule-top" aria-labelledby="tap-inc">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="tap-inc">El equipo va incluido.</h2>
            <p className="head__note">{TAPREVIEWS.porQueMensual}</p>
          </header>
          <ul className="incl">
            {TAPREVIEWS.incluidoSiempre.map((i) => <li className="incl__i" key={i}>{i}</li>)}
          </ul>
        </div>
      </section>

      <section className="band band--tight rule-top" aria-labelledby="tap-planes">
        <div className="wrap">
          <header className="head">
            <h2 className="head__title" id="tap-planes">Planes mensuales.</h2>
            <p className="head__note">
              En pesos, por mes, más IVA. Sin costo inicial y sin permanencia.
            </p>
          </header>
        </div>
      </section>

      <section className="band band--tight">
        <div className="wrap">
          <Rejilla
            columnas={4}
            fichas={TAPREVIEWS.planes.map((p, i) => ({
              id: p.id,
              numero: String(i + 1).padStart(2, "0"),
              titulo: p.nombre,
              lema: p.nota,
              lista: [...p.incluye],
              listaNo: [...p.excluye],
              cifra: p.precio === null ? undefined : `$${p.precio.toLocaleString("es-MX")}`,
              cifraPie: p.precio === null ? undefined : `MXN ${p.unidad}`,
              cifraPendiente: p.precio === null ? "Precio por definir" : undefined,
              destacada: "destacado" in p && p.destacado,
              accion: { texto: `Contratar ${p.nombre}`, href: WA_TAP, externo: true },
            }))}
          />
        </div>
      </section>

      <section className="band rule-top" aria-labelledby="tap-faq">
        <div className="wrap wrap--narrow">
          <header className="head">
            <h2 className="head__title" id="tap-faq">Preguntas que siempre nos hacen.</h2>
          </header>
          <dl className="faq">
            {TAPREVIEWS.faq.map((f) => (
              <div className="faq__item" key={f.q}>
                <dt className="faq__q">{f.q}</dt>
                <dd className="faq__a">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
