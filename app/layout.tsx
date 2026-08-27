import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Bodoni_Moda } from "next/font/google";
import { SITE } from "@/lib/contenido";
import Nav from "./componentes/Nav";
import Pie from "./componentes/Pie";
import BotonWhatsApp from "./componentes/BotonWhatsApp";
import ObservadorRevela from "./componentes/ObservadorRevela";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-geist" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-mono" });
const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["500"], style: ["normal"], display: "swap", variable: "--font-bodoni" });

const descripcion =
  "Agencia de tecnología e IA en Celaya, Guanajuato. Sitios, tiendas, apps y sistemas a la medida; Google y Meta Ads; asistentes de IA y automatización — con respaldo legal y contable propio.";

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
  },
  twitter: { card: "summary_large_image", title: "APoumian Studio", description: descripcion },
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
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
        <a className="skip" href="#contenido">Saltar al contenido</a>
        <Nav />
        <main id="contenido">{children}</main>
        <ObservadorRevela />
        <Pie />
        <BotonWhatsApp />
      </body>
    </html>
  );
}
