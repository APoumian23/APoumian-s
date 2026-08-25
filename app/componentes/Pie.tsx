import Link from "next/link";
import { DISCIPLINAS, SITE } from "@/lib/contenido";
import { CORREO, MOTOR, TAP_ACCESO, WA_GENERAL } from "@/lib/enlaces";
import Marca from "./Marca";

/* Pie en tres columnas: marca con acción, mapa del sitio y productos/contacto.
 *
 * Se eligió esta estructura sobre la fila plana anterior porque el sitio ya
 * tiene nueve rutas, dos productos y tres canales de contacto: en una sola
 * línea no se distingue qué es qué.
 *
 * No lleva fila de iconos sociales ni columna de "Recursos" vacía — esas dos
 * cosas son las que convierten un pie estructurado en relleno. Cada enlace de
 * aquí va a algo que existe. */
export default function Pie() {
  const anio = new Date().getFullYear();

  return (
    <footer className="pie">
      <div className="wrap">
        <div className="pie__cols">
          <div className="pie__marca">
            <Marca />
            <p className="pie__desc">
              Agencia de tecnología e inteligencia artificial en {SITE.ciudad}. Construimos el
              sitio, la tienda y el sistema con el que trabajas, operamos tu publicidad y
              automatizamos con IA lo repetitivo.
            </p>
            <div className="pie__acciones">
              <Link className="btn" href="/contacto">Pedir un diagnóstico</Link>
              <a className="btn btn--ghost" href={WA_GENERAL} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>

          <nav className="pie__col" aria-labelledby="pie-paginas">
            <h2 className="pie__h" id="pie-paginas">Páginas</h2>
            <ul className="pie__lista">
              <li><Link className="foot__link" href="/">Inicio</Link></li>
              <li><Link className="foot__link" href="/servicios">Servicios</Link></li>
              {DISCIPLINAS.map((d) => (
                <li key={d.slug}>
                  <Link className="foot__link" href={`/servicios/${d.slug}`}>{d.nombre}</Link>
                </li>
              ))}
              <li><Link className="foot__link" href="/casos">Casos</Link></li>
              <li><Link className="foot__link" href="/estudio">Estudio</Link></li>
              <li><Link className="foot__link" href="/contacto">Contacto</Link></li>
            </ul>
          </nav>

          <div className="pie__col">
            <h2 className="pie__h">Productos y contacto</h2>
            <ul className="pie__lista">
              <li><Link className="foot__link" href="/auditorias">Auditorías SEO</Link></li>
              <li><Link className="foot__link" href="/tapreviews">TapReviews</Link></li>
              <li>
                <a className="foot__link" href={MOTOR} target="_blank" rel="noopener noreferrer">
                  Entrar a auditorías ↗
                </a>
              </li>
              <li>
                <a className="foot__link" href={TAP_ACCESO} target="_blank" rel="noopener noreferrer">
                  Panel de TapReviews ↗
                </a>
              </li>
              <li><a className="foot__link" href={`mailto:${CORREO}`}>{CORREO}</a></li>
              <li>
                <a className="foot__link" href={WA_GENERAL} target="_blank" rel="noopener noreferrer">
                  WhatsApp ↗
                </a>
              </li>
              <li className="pie__lugar">{SITE.ciudad}, {SITE.pais}</li>
              <li><Link className="foot__link" href="/privacidad">Aviso de privacidad</Link></li>
            </ul>
          </div>
        </div>

        <div className="pie__base">
          <p>© {anio} {SITE.nombre}. Todos los derechos reservados.</p>
          <p>{SITE.eslogan}</p>
        </div>
      </div>
    </footer>
  );
}
