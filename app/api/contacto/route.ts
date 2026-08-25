import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Cuerpo = {
  nombre?: string;
  negocio?: string;
  correo?: string;
  telefono?: string;
  servicio?: string;
  presupuesto?: string;
  mensaje?: string;
  // Trampa para robots: si viene llena, es spam.
  sitio?: string;
};

const limpia = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let cuerpo: Cuerpo;
  try {
    cuerpo = (await request.json()) as Cuerpo;
  } catch {
    return NextResponse.json({ error: "El cuerpo de la solicitud no es JSON válido." }, { status: 400 });
  }

  if (limpia(cuerpo.sitio)) {
    // Solicitud automatizada: se responde 200 para no darle señal al robot.
    return NextResponse.json({ ok: true });
  }

  const datos = {
    nombre: limpia(cuerpo.nombre, 120),
    negocio: limpia(cuerpo.negocio, 160),
    correo: limpia(cuerpo.correo, 160),
    telefono: limpia(cuerpo.telefono, 40),
    servicio: limpia(cuerpo.servicio, 160),
    presupuesto: limpia(cuerpo.presupuesto, 60),
    mensaje: limpia(cuerpo.mensaje, 4000),
  };

  const faltantes: string[] = [];
  if (!datos.nombre) faltantes.push("nombre");
  if (!datos.negocio) faltantes.push("negocio");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(datos.correo)) faltantes.push("correo");
  if (datos.mensaje.length < 12) faltantes.push("mensaje");

  if (faltantes.length > 0) {
    return NextResponse.json(
      { error: "Faltan datos o tienen formato inválido.", campos: faltantes },
      { status: 422 },
    );
  }

  const texto = [
    `Nombre: ${datos.nombre}`,
    `Negocio: ${datos.negocio}`,
    `Correo: ${datos.correo}`,
    `Teléfono: ${datos.telefono || "—"}`,
    `Servicio: ${datos.servicio || "sin definir"}`,
    `Presupuesto: ${datos.presupuesto || "sin definir"}`,
    "",
    datos.mensaje,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const destino = process.env.CONTACTO_TO;

  if (apiKey && destino) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "APoumian Studio <no-reply@apoumian.com>",
          to: [destino],
          reply_to: datos.correo,
          subject: `Diagnóstico · ${datos.negocio} (${datos.nombre})`,
          text: texto,
        }),
      });
      if (!res.ok) {
        console.error("[contacto] Resend respondió", res.status, await res.text());
        return NextResponse.json(
          { error: "No se pudo entregar el correo. Intenta por WhatsApp." },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("[contacto] Falló el envío", err);
      return NextResponse.json(
        { error: "No se pudo entregar el correo. Intenta por WhatsApp." },
        { status: 502 },
      );
    }
  } else {
    // Sin RESEND_API_KEY el formulario sigue vivo: la solicitud queda en el log del servidor.
    console.warn("[contacto] RESEND_API_KEY o CONTACTO_TO sin definir — solicitud registrada solo en el log:\n" + texto);
  }

  return NextResponse.json({ ok: true });
}
