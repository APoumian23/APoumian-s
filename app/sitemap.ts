import type { MetadataRoute } from "next";
import { CASOS, CON_CAPTURA, DISCIPLINAS, SITE } from "@/lib/contenido";

export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  const rutas = [
    { p: "", pr: 1 },
    { p: "/servicios", pr: 0.9 },
    ...DISCIPLINAS.map((d) => ({ p: `/servicios/${d.slug}`, pr: 0.8 })),
    { p: "/auditorias", pr: 0.9 },
    { p: "/tapreviews", pr: 0.9 },
    { p: "/casos", pr: 0.9 },
    ...CASOS.map((c) => ({ p: `/casos/${c.slug}`, pr: 0.7 })),
    /* Una página por sistema con captura. Se derivan de la misma lista que las
       pinta, así que una captura nueva entra sola al sitemap. */
    ...CON_CAPTURA.map((s) => ({ p: `/casos/sistemas/${s.id}`, pr: 0.6 })),
    { p: "/estudio", pr: 0.6 },
    { p: "/contacto", pr: 0.8 },
    { p: "/privacidad", pr: 0.3 },
  ];
  return rutas.map(({ p, pr }) => ({
    url: `${SITE.dominio}${p}`,
    lastModified: ahora,
    changeFrequency: "monthly" as const,
    priority: pr,
  }));
}

/* En un sitio exportado no hay servidor que genere esto al vuelo: Next exige
 * declararlo estático para escribirlo como archivo durante el build. */
export const dynamic = "force-static";
