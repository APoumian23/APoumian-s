import type { MetadataRoute } from "next";
import { SITE } from "@/lib/contenido";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.dominio}/sitemap.xml`,
  };
}

/* En un sitio exportado no hay servidor que genere esto al vuelo: Next exige
 * declararlo estático para escribirlo como archivo durante el build. */
export const dynamic = "force-static";
