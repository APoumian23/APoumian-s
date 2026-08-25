import type { MetadataRoute } from "next";
import { SITE } from "@/lib/contenido";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.dominio}/sitemap.xml`,
  };
}
