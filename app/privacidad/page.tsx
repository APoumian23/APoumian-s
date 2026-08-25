import type { Metadata } from "next";
import Link from "next/link";
import { RESPONSABLE, SITE } from "@/lib/contenido";
import { CORREO, MOTOR } from "@/lib/enlaces";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Qué datos personales recaba APoumian Studio, para qué los usa y cómo ejercer tus derechos ARCO.",
  alternates: { canonical: "/privacidad" },
};

/** Fecha de la última revisión. Se escribe a mano: un aviso que dice
 *  "actualizado hoy" cada vez que se recarga la página no acredita nada. */
const ACTUALIZADO = "25 de agosto de 2026";

export default function Privacidad() {
  return (
    <>
      <section className="band band--close grid-bg">
        <div className="wrap wrap--narrow">
          <span className="label label--accent label--dash">Legal</span>
          <h1 className="display display--s" style={{ margin: "var(--space-md) 0 var(--space-lg)", maxWidth: "14ch" }}>
            Aviso de privacidad.
          </h1>
          <p className="lede">
            Qué datos te pedimos, para qué los usamos y cómo pedirnos que los corrijamos o los
            borremos. Última revisión: {ACTUALIZADO}.
          </p>
        </div>
      </section>

      <section className="band rule-top">
        <div className="wrap wrap--narrow legal">
          <h2>Quién es responsable de tus datos</h2>
          <p>
            <strong>{SITE.nombre}</strong> es el nombre comercial bajo el que
            {RESPONSABLE.nombreLegal
              ? ` opera ${RESPONSABLE.nombreLegal}, persona física`
              : " opera una persona física"}{" "}
            establecida en {RESPONSABLE.ciudad}, {RESPONSABLE.pais}, responsable del
            tratamiento de los datos personales que nos proporciones a través de este sitio, en
            los términos de la Ley Federal de Protección de Datos Personales en Posesión de los
            Particulares.
          </p>
          <p>
            Para cualquier asunto relacionado con tus datos —incluidas notificaciones formales—
            el medio de contacto es <a className="link" href={`mailto:${CORREO}`}>{CORREO}</a>.
            Si necesitas nuestro domicilio completo por escrito, lo proporcionamos por ese mismo
            medio a quien lo solicite.
          </p>

          <h2>Qué datos recabamos</h2>
          <p>Solo los que escribes tú, y solo en dos lugares del sitio:</p>
          <ul className="legal__l">
            <li>
              <strong>Formulario de diagnóstico:</strong> tu nombre, el nombre de tu negocio, tu
              correo electrónico, tu teléfono (opcional), el servicio que te interesa, el rango de
              presupuesto y el mensaje que escribas.
            </li>
            <li>
              <strong>Buscador de auditorías:</strong> la dirección del sitio web que quieras
              auditar. Esa consulta la procesa nuestra propia aplicación de auditorías en{" "}
              {MOTOR.replace(/^https?:\/\//, "")}, que tiene su propio aviso de privacidad.
            </li>
          </ul>
          <p>
            No recabamos datos personales sensibles, ni datos financieros o patrimoniales a través
            de este sitio.
          </p>

          <h2>Qué NO hacemos</h2>
          <ul className="legal__l">
            <li>Este sitio no usa cookies de publicidad ni de analítica de terceros.</li>
            <li>No creamos perfiles de navegación ni rastreamos tu comportamiento entre sitios.</li>
            <li>No vendemos, rentamos ni compartimos tus datos con terceros para fines comerciales.</li>
          </ul>

          <h2>Para qué usamos tus datos</h2>
          <p><strong>Finalidades necesarias</strong>, sin las cuales no podemos atenderte:</p>
          <ul className="legal__l">
            <li>Responder tu solicitud de diagnóstico o tu consulta.</li>
            <li>Elaborarte una propuesta y darle seguimiento.</li>
            <li>Prestarte el servicio si decides contratarnos, y facturarlo.</li>
          </ul>
          <p><strong>Finalidades adicionales</strong>, que puedes rechazar sin que eso afecte lo anterior:</p>
          <ul className="legal__l">
            <li>Enviarte información sobre nuestros servicios o novedades.</li>
          </ul>
          <p>
            Para negarte a las finalidades adicionales basta con escribirnos a{" "}
            <a className="link" href={`mailto:${CORREO}`}>{CORREO}</a>. No te vamos a dejar de
            atender por eso.
          </p>

          <h2>Con quién compartimos tus datos</h2>
          <p>
            Con nadie, salvo dos proveedores que solo actúan como encargados y que necesitamos
            para que el sitio funcione:
          </p>
          <ul className="legal__l">
            <li><strong>Vercel</strong>, donde está alojado este sitio.</li>
            <li><strong>Resend</strong>, que entrega el correo con tu solicitud a nuestra bandeja.</li>
          </ul>
          <p>
            Ninguno de los dos usa tus datos para fines propios. No se realizan transferencias que
            requieran tu consentimiento en términos del artículo 37 de la Ley.
          </p>

          <h2>Cuánto tiempo los conservamos</h2>
          <p>
            Las solicitudes que no derivan en un proyecto se conservan hasta 24 meses, por si
            retomas el contacto. Si te volvemos cliente, tus datos se conservan mientras dure la
            relación y después el tiempo que exija la normativa fiscal y contable aplicable.
          </p>

          <h2>Tus derechos ARCO</h2>
          <p>
            Puedes pedirnos <strong>acceder</strong> a tus datos, <strong>rectificarlos</strong> si
            son inexactos, <strong>cancelarlos</strong> cuando consideres que no los necesitamos, u{" "}
            <strong>oponerte</strong> a que los usemos para un fin concreto. También puedes revocar
            tu consentimiento en cualquier momento.
          </p>
          <p>
            Escríbenos a <a className="link" href={`mailto:${CORREO}`}>{CORREO}</a> con tu nombre,
            un medio para contestarte, qué derecho quieres ejercer y un documento que acredite tu
            identidad. Te respondemos en un plazo máximo de 20 días hábiles.
          </p>

          <h2>Si cambiamos este aviso</h2>
          <p>
            Publicaremos la versión nueva en esta misma página y cambiaremos la fecha de última
            revisión. Te recomendamos consultarla de vez en cuando.
          </p>

          <h2>Si no quedas conforme</h2>
          <p>
            Puedes acudir al Instituto Nacional de Transparencia, Acceso a la Información y
            Protección de Datos Personales (INAI).
          </p>
        </div>
      </section>

      <section className="band band--deep deep rule-top">
        <div className="wrap wrap--narrow">
          <h2 className="head__title" style={{ marginBottom: "var(--space-md)" }}>¿Alguna duda sobre tus datos?</h2>
          <p className="lede" style={{ marginBottom: "var(--space-xl)" }}>
            Escríbenos y te contestamos una persona, no un formulario automático.
          </p>
          <Link className="btn" href="/contacto">Contactar</Link>
        </div>
      </section>
    </>
  );
}
