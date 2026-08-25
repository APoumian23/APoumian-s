"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/contenido";
import Marca from "./Marca";
import { MOTOR_ACCESO } from "@/lib/enlaces";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [abierto, setAbierto] = useState(false);
  const ruta = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setAbierto(false); }, [ruta]);

  const activa = (href: string) => (ruta === href || ruta.startsWith(href + "/") ? "page" : undefined);

  return (
    <header className="nav" data-scrolled={scrolled}>
      <div className="wrap nav__inner">
        <Link href="/" aria-label="APoumian Studio — inicio">
          <Marca />
        </Link>

        <nav className="nav__rail" aria-label="Principal">
          {NAV.map((n) => (
            <Link key={n.href} className="nav__link" href={n.href} aria-current={activa(n.href)}>
              {n.texto}
            </Link>
          ))}
        </nav>

        <div className="nav__end">
          {/* El sitio no tiene cuentas propias: la sesión es la del motor de
              auditorías, que vive en su propio subdominio. */}
          <a
            className="btn btn--ghost nav__cta"
            href={MOTOR_ACCESO}
            target="_blank"
            rel="noopener noreferrer"
          >
            Iniciar sesión
          </a>
          <Link className="btn nav__cta" href="/contacto">Hablemos</Link>
          <button
            className="btn btn--ghost nav__toggle"
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
          >
            {abierto ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      {abierto && (
        <div className="wrap">
          <nav className="nav__sheet" id="menu-movil" aria-label="Principal (móvil)">
            {NAV.map((n) => (
              <Link key={n.href} className="nav__link" href={n.href} aria-current={activa(n.href)}>
                {n.texto}
              </Link>
            ))}
            <a className="btn btn--ghost" href={MOTOR_ACCESO} target="_blank" rel="noopener noreferrer">
              Iniciar sesión en auditorías
            </a>
            <Link className="btn" href="/contacto">Hablemos</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
