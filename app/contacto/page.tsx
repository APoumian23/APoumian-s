import type { Metadata } from "next";
import Diagnostico from "../componentes/Diagnostico";
import { SITE } from "@/lib/contenido";
import { CORREO, WA_GENERAL } from "@/lib/enlaces";
import Datos from "@/app/componentes/Datos";
import { migas } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contacto y diagnóstico sin costo",
  description: "Pide un diagnóstico sin costo en Celaya: te decimos qué haríamos, en qué orden y cuánto cuesta, por escrito y sin compromiso.",
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  return (
    <>
      <Datos nodos={[migas([{ nombre: "Contacto", url: "/contacto/" }])]} />
      <section className="band band--deep deep grid-bg">
        <div className="wrap contact__grid">
          <div>
            <span className="label label--accent label--dash">Diagnóstico</span>
            <h1 className="display display--s" style={{ margin: "var(--space-md) 0 var(--space-lg)", maxWidth: "14ch" }}>
              Empecemos por entender tu negocio.
            </h1>
            <p className="prose" style={{ marginBottom: "var(--space-xl)" }}>
              Cuéntanos qué te está costando tiempo o dinero. Te decimos qué haríamos, en qué orden y
              cuánto cuesta — aunque la respuesta sea que todavía no necesitas contratarnos.
            </p>

            <div className="contact__aside">
              <p className="contact__line">
                <span className="label contact__label">Prefieres escribir</span>
                <a className="link" href={WA_GENERAL} target="_blank" rel="noopener noreferrer">WhatsApp →</a>
              </p>
              <p className="contact__line">
                <span className="label contact__label">Correo</span>
                <a className="link" href={`mailto:${CORREO}`}>{CORREO}</a>
              </p>
              <p className="contact__line">
                <span className="label contact__label">Dónde estamos</span>
                <span className="prose">{SITE.ciudad}, {SITE.pais}. Trabajamos con clientes de todo el país.</span>
              </p>
            </div>
          </div>

          <Diagnostico whatsapp={WA_GENERAL} />
        </div>
      </section>
    </>
  );
}
