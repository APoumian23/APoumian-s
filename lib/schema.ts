/**
 * Datos estructurados (JSON-LD) del sitio.
 *
 * Esto no es adorno de SEO: es la única forma de decirle a un buscador —y a un
 * asistente de IA, que hoy pesa igual— qué es este negocio, dónde está y qué
 * vende. Sin esto nos lee como texto suelto y adivina.
 *
 * Vive en un solo archivo a propósito. Antes el marcado se escribía suelto en
 * cada página, y basta con que dos digan una dirección distinta para que
 * Google descarte las dos.
 */
import { SITE, DISCIPLINAS } from "./contenido";
import { TEL, CORREO } from "./enlaces";

/** Identificadores estables. Google los usa para unir los nodos entre páginas. */
const ID_NEGOCIO = `${SITE.dominio}/#negocio`;
const ID_SITIO = `${SITE.dominio}/#sitio`;

/** El teléfono se guarda para wa.me (sin +). E.164 lo necesita con +. */
const TEL_E164 = `+${TEL}`;

/**
 * El negocio. Es ProfessionalService y no Organization a secas: así entra en
 * los resultados locales de Celaya, que es donde nos buscan.
 */
export const negocio = {
  "@type": "ProfessionalService",
  "@id": ID_NEGOCIO,
  name: SITE.nombre,
  url: SITE.dominio,
  description:
    "Agencia de tecnología e inteligencia artificial en Celaya, Guanajuato. Sitios web, tiendas en línea, aplicaciones y sistemas a la medida, campañas en Google y Meta, asistentes de IA y automatización.",
  slogan: SITE.eslogan,
  email: CORREO,
  telephone: TEL_E164,
  image: `${SITE.dominio}/og.png`,
  logo: `${SITE.dominio}/marca/isotipo-marino.svg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Celaya",
    addressRegion: "Guanajuato",
    addressCountry: "MX",
  },
  areaServed: [
    { "@type": "City", name: "Celaya" },
    { "@type": "State", name: "Guanajuato" },
    { "@type": "Country", name: "México" },
  ],
  availableLanguage: { "@type": "Language", name: "Spanish", alternateName: "es" },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: TEL_E164,
    email: CORREO,
    areaServed: "MX",
    availableLanguage: ["es"],
  },
  /* Un catálogo, no cuatro servicios sueltos: deja claro que las disciplinas
     son parte de una misma oferta y no cuatro negocios distintos. */
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de APoumian Studio",
    itemListElement: DISCIPLINAS.map((d) => ({
      "@type": "OfferCatalog",
      name: d.nombre,
      url: `${SITE.dominio}/servicios/${d.slug}/`,
      itemListElement: d.servicios.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.nombre, description: s.entrega },
      })),
    })),
  },
};

/** El sitio como tal. Separado del negocio porque son cosas distintas. */
export const sitio = {
  "@type": "WebSite",
  "@id": ID_SITIO,
  url: SITE.dominio,
  name: SITE.nombre,
  inLanguage: "es-MX",
  publisher: { "@id": ID_NEGOCIO },
};

/**
 * La ruta de migas. Google la pinta en lugar de la URL cruda en los
 * resultados, así que una página interna se ve como "APoumian › Servicios"
 * en vez de un enlace largo y feo.
 *
 * `ruta` no lleva el inicio: se agrega aquí para que ninguna página lo olvide.
 */
export function migas(ruta: { nombre: string; url: string }[]) {
  const completa = [{ nombre: "Inicio", url: "/" }, ...ruta];
  return {
    "@type": "BreadcrumbList",
    itemListElement: completa.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.nombre,
      item: `${SITE.dominio}${p.url}`,
    })),
  };
}

/** Preguntas frecuentes. Solo donde de verdad hay preguntas en la página. */
export function preguntas(lista: { p: string; r: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: lista.map((x) => ({
      "@type": "Question",
      name: x.p,
      acceptedAnswer: { "@type": "Answer", text: x.r },
    })),
  };
}

/**
 * Envuelve los nodos en un solo grafo.
 *
 * Un `@graph` y no varios <script> sueltos: los nodos se referencian entre sí
 * por `@id`, y separados en bloques distintos Google los trata como islas sin
 * relación.
 */
export function grafo(...nodos: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodos });
}
