import type { Metadata } from "next";
import Link from "next/link";
import { NAV } from "@/lib/contenido";

export const metadata: Metadata = {
  title: "Página no encontrada",
  /* Propia y no la heredada de la portada: dos páginas con la misma
     descripción es señal de contenido duplicado, aunque esta no se indexe. */
  description:
    "Esa dirección no existe o cambió de lugar. Desde aquí puedes volver al inicio o ir directo a servicios, casos o contacto.",
  robots: { index: false, follow: true },
};

export default function NoEncontrada() {
  return (
    <section className="band band--tall grid-bg">
      <div className="wrap">
        <span className="label label--accent label--dash">Error 404</span>
        <h1 className="display" style={{ margin: "var(--space-md) 0 var(--space-lg)", maxWidth: "14ch" }}>
          Esta página <span className="swatch">no existe</span>.
        </h1>
        <p className="lede" style={{ marginBottom: "var(--space-xl)" }}>
          O nunca existió, o la movimos y se nos fue dejar el camino. Si llegaste desde un enlace
          nuestro, dinos cuál y lo arreglamos.
        </p>

        <div className="hero__actions" style={{ marginBottom: "var(--space-2xl)" }}>
          <Link className="btn" href="/">Volver al inicio</Link>
          <Link className="link" href="/contacto">Avisarnos del enlace roto →</Link>
        </div>

        <nav aria-label="Secciones del sitio">
          <p className="label" style={{ marginBottom: "var(--space-md)" }}>A dónde sí puedes ir</p>
          <ul className="ruta404">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link className="link" href={n.href}>{n.texto} →</Link>
              </li>
            ))}
            <li><Link className="link" href="/contacto">Contacto →</Link></li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
