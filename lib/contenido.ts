export const SITE = {
  nombre: "APoumian Studio",
  dominio: "https://apoumian.com",
  eslogan: "Toda tu presencia digital, con un solo equipo.",
  ciudad: "Celaya, Guanajuato",
  pais: "México",
} as const;

export type Servicio = {
  nombre: string;
  entrega: string;
  area: string;
};

export type Disciplina = {
  id: string;
  slug: string;
  numero: string;
  nombre: string;
  alias: string;
  titulo: string;
  cuerpo: string;
  nota: string;
  servicios: Servicio[];
};

export const DISCIPLINAS: Disciplina[] = [
  {
    id: "producto",
    slug: "producto-digital",
    numero: "01",
    nombre: "Producto digital",
    alias: "producto digital",
    titulo: "Lo que tu negocio necesita que exista.",
    cuerpo:
      "El sitio, la tienda, el sistema interno, la app. Se construye a la medida de cómo ya trabajas, no al revés: nadie cambia su operación para caberle a un software genérico. Sale con tu identidad, con base de datos propia y con capacitación para tu gente.",
    nota:
      "Entregamos por fases funcionales: adoptas cada módulo sin frenar la operación. Al liquidar, el sistema es tuyo — no rentas software de por vida.",
    servicios: [
      {
        nombre: "Páginas web",
        entrega: "Sitio propio, veloz y medible: diseño con tu marca, textos, formularios que llegan a donde los lees y analítica conectada.",
        area: "Frontend · Backend · UX-UI",
      },
      {
        nombre: "Tiendas en línea",
        entrega: "Catálogo, carrito, pagos en línea y envíos. Conectada al inventario cuando ya tienes sistema, para que el stock no mienta.",
        area: "Frontend · Backend",
      },
      {
        nombre: "Aplicaciones web",
        entrega: "Herramientas internas con usuarios, roles y permisos. Instalables como app (PWA) en celular, tablet y computadora.",
        area: "Frontend · Backend",
      },
      {
        nombre: "Apps móviles",
        entrega: "App nativa o híbrida para iOS y Android, con publicación en tienda y las integraciones que ya usas.",
        area: "Mobile",
      },
      {
        nombre: "Sistemas a la medida",
        entrega: "Inventario, compras, ventas, CRM, cotizador, facturación CFDI 4.0, cobranza y tablero de indicadores en una sola plataforma.",
        area: "Backend · Datos",
      },
    ],
  },
  {
    id: "crecimiento",
    slug: "crecimiento",
    numero: "02",
    nombre: "Crecimiento",
    alias: "crecimiento",
    titulo: "Y que además entre gente.",
    cuerpo:
      "Un sitio sin tráfico es un folleto caro. Operamos la publicidad y el posicionamiento con la misma mano que construyó el producto, así que la campaña sabe exactamente a dónde manda a la gente y qué pasa cuando llega.",
    nota:
      "Reportamos en lenguaje de negocio — leads, costo por lead, ventas, ROAS — no en capturas de pantalla del panel.",
    servicios: [
      {
        nombre: "Google Ads",
        entrega: "Búsqueda, Performance Max y remarketing: estructura de campañas, palabras clave, anuncios, conversiones medidas y optimización mensual.",
        area: "Mercadotecnia",
      },
      {
        nombre: "Meta Ads",
        entrega: "Facebook e Instagram: públicos, creatividades, pruebas A/B y seguimiento de resultados hasta la venta o el mensaje.",
        area: "Mercadotecnia",
      },
      {
        nombre: "SEO y Google Maps",
        entrega: "Posicionamiento orgánico y ficha de negocio: contenido, técnica del sitio, reseñas y presencia local en tu zona.",
        area: "Mercadotecnia",
      },
      {
        nombre: "Foto y video para pymes",
        entrega: "Producción de creatividades para redes y anuncios: producto, servicio y equipo, editadas para el formato de cada red.",
        area: "Diseño",
      },
      {
        nombre: "Diseño de marca y UX/UI",
        entrega: "Identidad, manual de marca, sistema de color y tipografía, y el diseño de pantallas antes de programar nada.",
        area: "Diseño",
      },
    ],
  },
  {
    id: "ia",
    slug: "ia-y-automatizacion",
    numero: "03",
    nombre: "IA y automatización",
    alias: "automatización",
    titulo: "Y que deje de comerte el día.",
    cuerpo:
      "La parte repetitiva del negocio — contestar lo mismo, capturar facturas a mano, pasar datos de un lado a otro — se automatiza. No como demostración: conectado a tu operación real, con reglas claras y con una persona que revisa.",
    nota:
      "Cada automatización se entrega con su bitácora: qué hizo, cuándo y con qué dato. Si no se puede auditar, no se instala.",
    servicios: [
      {
        nombre: "Asistentes de IA, con y sin voz",
        entrega: "Atienden preguntas frecuentes, cotizan, agendan y pasan a un humano cuando toca. Entrenados con tu información, no con genéricos.",
        area: "Ingeniería de IA",
      },
      {
        nombre: "Agentes por WhatsApp",
        entrega: "Atención y seguimiento en el canal donde ya te escriben tus clientes, con plantillas autorizadas y traspaso a tu equipo.",
        area: "Automatización con IA",
      },
      {
        nombre: "Automatización de procesos",
        entrega: "Reportes, correos, altas, conciliaciones y avisos que hoy hace alguien a mano y que a partir de mañana se hacen solos.",
        area: "Automatización con IA",
      },
      {
        nombre: "OCR y procesamiento de documentos",
        entrega: "Facturas, remisiones, tickets e identificaciones en PDF o foto convertidos en datos que entran directo a tu sistema.",
        area: "Visión y OCR",
      },
      {
        nombre: "Datos y modelos predictivos",
        entrega: "Tableros con lo que de verdad mueve el negocio, y modelos de demanda, rotación o riesgo cuando hay historia que aprovechar.",
        area: "Ciencia de Datos",
      },
    ],
  },
  {
    id: "respaldo",
    slug: "legal-y-contable",
    numero: "04",
    nombre: "Respaldo legal y contable",
    alias: "respaldo legal",
    titulo: "Y que nada de esto te meta en un problema.",
    cuerpo:
      "Casi ninguna agencia tiene esto. Nosotros sí: abogados y contadores propios revisan que lo que construimos cumpla con el SAT, la Ley Federal del Trabajo y la Ley Federal de Protección de Datos Personales.",
    nota:
      "Aplica al proyecto que hacemos contigo. Si necesitas asesoría más allá del alcance, se cotiza aparte y lo decimos antes, no después.",
    servicios: [
      {
        nombre: "Corporativo",
        entrega: "Contratos, términos y condiciones, convenios con proveedores y revisión de lo que firmas alrededor del proyecto.",
        area: "Legal",
      },
      {
        nombre: "Fiscal",
        entrega: "Esquema de facturación, CFDI 4.0 y cumplimiento ante el SAT de lo que se cobra y se paga en la plataforma.",
        area: "Legal · Finanzas",
      },
      {
        nombre: "Laboral",
        entrega: "Reglamento, contratos de trabajo y control de asistencia cuando el sistema toca nómina o personal.",
        area: "Legal",
      },
      {
        nombre: "Protección de datos",
        entrega: "Aviso de privacidad, consentimiento y manejo de datos personales conforme a la LFPDPPP.",
        area: "Legal",
      },
      {
        nombre: "Contabilidad e impuestos",
        entrega: "Contabilidad del negocio, declaraciones y lectura financiera de lo que el sistema empieza a medir.",
        area: "Finanzas",
      },
    ],
  },
];

export const INCLUIDO = [
  { concepto: "Diseño con tu identidad", incluido: "Sí", nota: "Sobre tu manual de marca, o lo creamos si no lo tienes." },
  { concepto: "Dominio el primer año", incluido: "Sí", nota: "Registrado a tu nombre, no al nuestro." },
  { concepto: "Publicación y hosting", incluido: "Sí", nota: "Configurado, con certificado de seguridad y respaldos." },
  { concepto: "Analítica conectada", incluido: "Sí", nota: "Para saber de dónde llegan y qué hacen, desde el primer día." },
  { concepto: "Capacitación de tu equipo", incluido: "Sí", nota: "En vivo y grabada, para quien entre después." },
  { concepto: "Soporte de arranque", incluido: "Sí", nota: "Acompañamiento posterior a la entrega, no te dejamos solo el día uno." },
  { concepto: "Propiedad del código", incluido: "Tuya", nota: "Al liquidar el proyecto. No rentas software de por vida." },
  { concepto: "Factura con IVA", incluido: "Sí", nota: "CFDI 4.0. Somos un proveedor formal en México." },
];

export type Trabajo = {
  nombre: string;
  que: string;
  tipo: string;
  /** Dominio en vivo, sin protocolo. Solo para proyectos publicados y visitables. */
  sitio?: string;
  /** Captura real del sitio, tomada del sitio en vivo. */
  shot?: string;
};

export const TRABAJO: Trabajo[] = [
  {
    nombre: "AMPA",
    que: "Sitio de un centro de psicotraumatología, con panel para editar contenido e imágenes sin tocar código.",
    tipo: "Web",
    sitio: "ampapsicotraumayarte.com",
    shot: "/trabajo/ampa.webp",
  },
  {
    nombre: "dePits",
    que: "Ecosistema de telemarketing: aplicación de escritorio, portal web y catálogo de reportes.",
    tipo: "Sistema",
    sitio: "depits.com",
    shot: "/trabajo/depits.webp",
  },
  {
    nombre: "Cayman-Ru Ore",
    que: "Tienda en línea de minerales de la Sierra de Guerrero: catálogo, carrito, pagos, inventario con movimientos y panel de administración.",
    tipo: "Tienda",
    sitio: "caymanru-ore.com",
    shot: "/trabajo/caymanru.webp",
  },
];

export const PASOS = [
  { titulo: "Diagnóstico", cuerpo: "Escuchamos cómo trabajas hoy y dónde se pierde el dinero o el tiempo. Sin costo y sin compromiso." },
  { titulo: "Propuesta", cuerpo: "Alcance por escrito, entregables, calendario y precio cerrado. Lo que no entra, también queda por escrito." },
  { titulo: "Construcción", cuerpo: "Entregas por fases funcionales, con avance visible cada semana y una persona responsable de tu cuenta." },
  { titulo: "Arranque y medición", cuerpo: "Capacitación, salida a producción y seguimiento de resultados. Ajustamos con datos, no con corazonadas." },
];

export const AREAS = [
  "Dirección", "Comercial", "Mercadotecnia", "Datos e IA", "Desarrollo",
  "Diseño", "Finanzas", "Legal", "Seguridad", "Innovación",
];


export const NAV = [
  { href: "/servicios", texto: "Servicios" },
  { href: "/auditorias", texto: "Auditorías" },
  { href: "/tapreviews", texto: "TapReviews" },
  { href: "/casos", texto: "Casos" },
  { href: "/estudio", texto: "Estudio" },
] as const;

/** Cifras del sello del héroe. Todas verificables — ninguna inventada. */
export const CIFRAS = [
  { n: "4", q: "disciplinas bajo un mismo techo" },
  { n: "20", q: "servicios en catálogo" },
  { n: "10", q: "áreas de especialidad" },
  { n: "3", q: "sitios de clientes en línea" },
];

/** Producto de auditoría. Vive en su propio subdominio. */
export const AUDITORIAS = {
  subdominio: "auditorias.apoumian.com",
  url: "https://auditorias.apoumian.com",
  que: "Auditoría SEO y técnica de tu sitio: hallazgos priorizados, historial y comparativo entre corridas. El plan con IA añade recomendaciones, evaluación y el informe en PDF.",
  planes: [
    {
      id: "basico",
      nombre: "Básico",
      precio: 99,
      incluye: [
        "Hallazgos completos de cada auditoría",
        "Historial de todas tus corridas",
        "Comparativo entre corridas",
        "Un panel por sitio",
      ],
      excluye: ["Recomendaciones", "Evaluación con IA", "Informe en PDF"],
    },
    {
      id: "ia",
      nombre: "Con IA",
      precio: 199,
      destacado: true,
      incluye: [
        "Todo lo del plan Básico",
        "Recomendaciones por hallazgo",
        "Evaluación del sitio con IA",
        "Soluciones propuestas",
        "Informe en PDF para compartir",
      ],
      excluye: [],
    },
  ],
} as const;


/** TapReviews · producto propio.
 *
 *  Modelo de SUSCRIPCIÓN: la medición y el reporte son mensuales, así que el
 *  cobro también lo es. El equipo (tarjeta o display) va incluido en el plan y
 *  ya NO se vende como pago único.
 *
 *  Los tres planes de arriba conservan los precios que están escritos en
 *  `tapreviews/src/app/precios/page.tsx`. El plan de entrada lleva el precio en
 *  `null` a propósito: todavía no se define y una cifra inventada aquí acabaría
 *  cobrándose de verdad. */
export const TAPREVIEWS = {
  nombre: "TapReviews",
  que: "Tus clientes te dejan una reseña de Google en cinco segundos, acercando el teléfono a una tarjeta que vive en tu mostrador. Sin instalar nada, ni ellos ni tú.",
  porQueMensual:
    "La tarjeta es lo de menos: lo que se cobra cada mes es que alguien mida tus taps, te avise cuando entra una reseña mala y te entregue el reporte. Por eso el equipo va incluido y no se vende aparte.",
  comoFunciona: [
    { n: "01", t: "Lo colocas", d: "En el mostrador, la caja, o donde el cliente espera. Te lo mandamos configurado." },
    { n: "02", t: "Lo tocan", d: "Acercan el teléfono y caen directo en tu reseña. Cinco segundos." },
    { n: "03", t: "Lo mides", d: "Cada mes ves cuántos taps, qué días y a qué horas, y cómo se movió tu rating." },
  ],
  incluidoSiempre: [
    "El equipo incluido: tarjeta o display, sin costo inicial",
    "Código QR de respaldo en cada pieza",
    "La configuramos por ti antes de enviártela",
    "Cambiamos a dónde apunta cuando quieras, sin tocar el plástico",
    "Panel con tus taps por día y por hora",
  ],
  planes: [
    {
      id: "entrada",
      nombre: "Entrada",
      precio: null,
      unidad: "/ mes",
      nota: "Para un negocio de un solo local que quiere empezar a medir.",
      incluye: [
        "Equipo incluido",
        "Panel con tus taps",
        "Reporte mensual con tu rating y tus taps",
      ],
      excluye: ["Respuesta a tus reseñas", "Alertas de reseña mala", "Gestión del perfil"],
    },
    {
      id: "esencial",
      nombre: "Esencial",
      precio: 1290,
      unidad: "/ mes",
      nota: "Que ninguna reseña se quede sin respuesta.",
      incluye: [
        "Todo lo del plan Entrada",
        "Respondemos todas tus reseñas",
        "Alerta el mismo día si entra una de 3 estrellas o menos",
      ],
      excluye: ["Gestión del perfil", "Comparativa contra competencia"],
    },
    {
      id: "pro",
      nombre: "Pro",
      precio: 2490,
      unidad: "/ mes",
      destacado: true,
      nota: "Tu perfil de Google, gestionado completo.",
      incluye: [
        "Todo lo de Esencial",
        "Fotos, horarios y publicaciones en tu perfil",
        "Respondemos las preguntas de clientes",
        "Comparativa contra tu competencia directa",
      ],
      excluye: [],
    },
    {
      id: "multi",
      nombre: "Multi-sucursal",
      precio: 890,
      unidad: "/ mes por sucursal",
      nota: "Cadenas y franquicias. Mínimo 3 sucursales.",
      incluye: [
        "Todo lo de Pro en cada sucursal",
        "Panel único con todas juntas",
        "Ranking interno entre sucursales",
      ],
      excluye: [],
    },
  ],
  faq: [
    { q: "¿Funciona con iPhone y Android?", a: "Sí, en cualquier teléfono con NFC activado. Y todas llevan código QR de respaldo por si acaso." },
    { q: "¿Hay que instalar una app?", a: "No. Ni tú ni tu cliente. Se abre el navegador y ya." },
    { q: "¿Por qué es mensual y no un pago único?", a: "Porque lo que compras no es el plástico: es que cada mes alguien mida tus taps, te avise si entra una reseña mala y te entregue el reporte. El equipo va incluido en el plan, sin costo inicial." },
    { q: "¿Y si cancelo?", a: "Dejas de recibir el reporte y el acceso al panel. La tarjeta la conservas, pero sin el panel deja de darte información." },
    { q: "¿Puedo cambiar a dónde apunta?", a: "Sí, y sin tocar el plástico. Nos dices y lo cambiamos el mismo día. Si te mudas de local o rehaces tu perfil de Google, tu tarjeta sigue sirviendo." },
    { q: "¿Puedo filtrar las reseñas malas?", a: "No, y no deberías querer. Google prohíbe mandar a unos clientes a reseñar y a otros no, y penaliza al negocio que lo hace. Todos tus clientes llegan a la misma página." },
  ],
} as const;


/** Productos propios, mostrados en /codigo como obra construida.
 *  No llevan enlace externo: todavía no están desplegados en público. */
export const PRODUCTOS_TRABAJO = [
  {
    nombre: "Auditorías SEO",
    que: "Motor de auditoría SEO y técnica con cuentas, planes de suscripción, control de uso de IA y límite de tasa. Autenticación propia con scrypt y Google, verificación de correo y cambio de correo en dos pasos.",
    tipo: "Producto · SaaS",
    href: "/auditorias",
  },
  {
    nombre: "TapReviews",
    que: "Tarjetas NFC ligadas a comercios para reseñas de Google. Las tarjetas se graban en blanco y se asignan después; panel de admin, portal del comercio, métricas de taps y reportes mensuales.",
    tipo: "Producto · NFC",
    href: "/tapreviews",
  },
] as const;


/** Fragmentos REALES de los repos de la agencia. Cada uno se eligió porque el
 *  comentario explica una decisión, no porque el código se vea bonito. */
export const CODIGO = [
  {
    titulo: "Un admin no puede nombrar admins",
    archivo: "audit-engine · prisma/schema.prisma",
    lenguaje: "prisma",
    porque:
      "Si un administrador pudiera dar permisos de administrador, robar una sola sesión bastaría para tomar el control de todas las cuentas. Por eso el permiso se otorga desde el servidor, no desde la aplicación.",
    codigo: `/// Personal de APoumian Studio. Ve todo sin pagar y puede
/// activarle el plan a un cliente.
///
/// A propósito NO se puede activar desde la aplicación, ni
/// siquiera siendo admin: se pone con
/// \`npm run admin -- correo@ejemplo.com\`, que exige acceso
/// al servidor. Si un admin pudiera nombrar admins, robar
/// una sola sesión bastaría para quedarse con el control
/// de todas las cuentas.
esAdmin  Boolean  @default(false)`,
  },
  {
    titulo: "El dominio se compra a diez años",
    archivo: "tapreviews · .env.example",
    lenguaje: "bash",
    porque:
      "La dirección queda grabada en plástico que el cliente reparte. Cambiarla no es una migración: es tirar a la basura cada tarjeta que ya está en la calle.",
    codigo: `# El dominio queda impreso y grabado en plástico que dura
# años. Si cambia, mueren todas las tarjetas repartidas:
# se compra a diez años y no se toca.
NEXT_PUBLIC_BASE_URL="https://tudominio.com"

# Zona con la que se agrupan días y horas en los reportes.
# Si se deja en UTC, en México todo lo de después de las
# 18:00 cae al día siguiente.
REPORT_TIMEZONE="America/Mexico_City"`,
  },
  {
    titulo: "Un precio inventado envenena el tablero",
    archivo: "audit-engine · src/lib/finanzas.ts",
    lenguaje: "ts",
    porque:
      "El precio se lee de una variable de entorno y arranca en cero. Si nadie lo define, el tablero muestra cero — que es incómodo pero cierto. Poner una cifra de relleno haría que las decisiones se tomaran sobre un número falso.",
    codigo: `/* El precio del plan vive en el entorno, no en el código.
 * Un precio inventado en el código produce un panel que
 * miente con confianza. */
export const PRECIO_PLAN_MXN =
  Number(process.env.PLAN_IA_PRECIO_MXN ?? 0);

export const HAY_TARIFAS =
  COSTO_ENTRADA_MXN_M > 0 || COSTO_SALIDA_MXN_M > 0;`,
  },
] as const;


/** Casos con nombre. Todo lo que dice cada uno es verificable: sale del código
 *  del proyecto o de su documentación. NO hay resultados de negocio inventados
 *  ("subimos las ventas 40%") — de eso no tenemos medición, y un número
 *  fabricado destruye la credibilidad que el caso viene a construir. */
export const CASOS = [
  {
    slug: "ampa",
    cliente: "AMPA",
    quien: "Asociación Mexicana de Psicotraumatología y Arte A.C. · Morelia, desde 2012",
    sector: "Salud mental",
    sitio: "ampapsicotraumayarte.com",
    shot: "/trabajo/ampa.webp",
    reto: "Una asociación sin equipo técnico que necesitaba cambiar textos e imágenes de su sitio sin depender de nadie — y sin arriesgar el sitio al hacerlo.",
    construimos: [
      "Sitio con portada, equipo, servicios clínicos, formación y cursos para niños",
      "CMS propio en PHP: panel con acceso, edición por secciones y carga de imágenes",
      "Contraseña con hash, nunca escrita en el código",
      "Validación real del tipo de archivo en cada subida, no solo por la extensión",
      "Sesiones HttpOnly con retraso anti fuerza bruta en el acceso",
    ],
    ahora: "Cualquiera del equipo entra al panel y cambia el contenido en vivo, sin tocar código y sin llamarnos.",
  },
  {
    slug: "depits",
    cliente: "dePits",
    quien: "Marketplace de autopartes y refacciones · México",
    sector: "Marketplace",
    sitio: "depits.com",
    shot: "/trabajo/depits.webp",
    reto: "Profesionalizar un mercado tradicionalmente informal: conectar yonkes y proveedores con compradores, cobrando comisión y protegiendo a las dos partes.",
    construimos: [
      "Plataforma de compraventa con cobro por Mercado Pago y transferencia SPEI",
      "Retención automática de impuestos al vendedor (IVA, ISR y cédula estatal)",
      "Política de devoluciones y garantías aplicada dentro del flujo",
      "Alta masiva de inventario para catálogos de proveedores",
      "Aplicación de escritorio para el equipo de telemarketing, con su catálogo de reportes",
    ],
    ahora: "El pago, la comisión y la retención de impuestos ocurren dentro de la plataforma, no en una hoja de cálculo aparte.",
  },
  {
    slug: "caymanru",
    cliente: "Cayman-Ru Ore",
    quien: "Minerales de la Sierra de Guerrero · Buenavista de Cuéllar",
    sector: "Tienda en línea",
    sitio: "caymanru-ore.com",
    shot: "/trabajo/caymanru.webp",
    reto: "Vender en línea productos que se cobran por peso, con inventario real detrás y sin perder de vista cuánto se gana en cada uno.",
    construimos: [
      "Tienda con catálogo, carrito y pago con Stripe o transferencia",
      "Cuentas de cliente con verificación de correo, direcciones e historial",
      "Inventario con movimientos: entrada, salida, ajuste, devolución y merma",
      "Envío por peso, con cotización manual arriba de 4 kg",
      "Reportes con costo por producto y ganancia neta",
      "Blog con SEO y correos automáticos en cada paso del pedido",
    ],
    ahora: "Ven su ganancia neta por producto, no nada más sus ventas.",
  },
] as const;
