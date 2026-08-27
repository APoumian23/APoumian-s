import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Bodoni_Moda } from "next/font/google";
import { SITE } from "@/lib/contenido";
import { TEL } from "@/lib/enlaces";
import Nav from "./componentes/Nav";
import Pie from "./componentes/Pie";
import BotonWhatsApp from "./componentes/BotonWhatsApp";
import ObservadorRevela from "./componentes/ObservadorRevela";
import Datos from "./componentes/Datos";
import { negocio, sitio } from "@/lib/schema";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-geist" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-mono" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["500"], style: ["normal"], display: "swap", variable: "--font-bodoni" });

/* Máximo 158 caracteres: pasado ese punto Google la trunca con puntos
   suspensivos y la última idea —la que suele traer el diferenciador— se
   pierde. La anterior medía 192 y se cortaba justo antes de "legal". */
const descripcion =
  "Agencia de tecnología e IA en Celaya, Guanajuato: sitios, apps y sistemas a la medida, Google y Meta Ads, asistentes de IA y respaldo legal y contable.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.dominio),
  title: {
    default: "APoumian Studio · Tecnología, publicidad e IA para pymes",
    template: "%s · APoumian Studio",
  },
  description: descripcion,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE.dominio,
    siteName: SITE.nombre,
    title: "APoumian Studio · Toda tu presencia digital, con un solo equipo",
    description: descripcion,
    /* Sin esto, WhatsApp y LinkedIn eligen solos qué imagen mostrar al pegar
       un enlace nuestro —y normalmente eligen nada. Se hereda a todas las
       páginas; la que quiera otra la sobrescribe. */
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE.nombre }],
  },
  twitter: {
    card: "summary_large_image",
    title: "APoumian Studio",
    description: descripcion,
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F4EDE1",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es-MX"
      className={`${geist.variable} ${mono.variable} ${bodoni.variable}`}
      /* El script de abajo pone `data-js` en <html> antes de hidratar. React
         compara todos los atributos de la raíz, así que sin esto lo reporta
         como desajuste y ABANDONA la hidratación: los componentes de cliente
         nunca montan. Es el caso para el que existe esta propiedad. */
      suppressHydrationWarning
    >
      <body>
        {/* Marca que hay JavaScript ANTES de pintar. Las reglas que ocultan
            algo para revelarlo después cuelgan de este atributo: si el script
            no corre, nada se oculta y la página se ve completa.

            Va en `data-js` y NO en className a propósito: React controla el
            className de <html> (ahí van las variables de las fuentes), así que
            tocarlo provoca un desajuste de hidratación y React abandona —
            dejando sin montar todos los componentes de cliente. Un atributo
            que React no renderiza no entra en esa comparación. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.setAttribute('data-js','')",
          }}
        />
        {/* Quién es este negocio y dónde está. Va en el layout para que salga
            en las 23 páginas: un buscador que llega directo a una interna
            necesita el dato ahí, no solo en el inicio. */}
        <Datos nodos={[negocio, sitio]} />
        <a className="skip" href="#contenido">Saltar al contenido</a>
        {/* Sin JavaScript la página se ve completa —las animaciones cuelgan de
            `data-js`— pero el formulario de auditoría no corre. Vale decirlo
            en vez de dejar a alguien picando un botón muerto. */}
        <noscript>
          <p className="noscript">
            Esta página funciona sin JavaScript, pero el buscador de auditorías
            necesita activarlo. Si prefieres no hacerlo, escríbenos por WhatsApp
            al <a href={`tel:+${TEL}`}>461 180 1622</a>.
          </p>
        </noscript>
        <Nav />
        <main id="contenido">{children}</main>
        <ObservadorRevela />
        <Pie />
        <BotonWhatsApp />
      </body>
    </html>
  );
}
