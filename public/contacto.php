<?php
/**
 * Recepción del formulario de diagnóstico.
 *
 * Sustituye a la ruta de Next `app/api/contacto/route.ts`, que no sobrevive a
 * `output: "export"`. Respeta el mismo contrato para no tocar el formulario:
 * recibe JSON, responde 422 con la lista de campos malos, 200 con {ok:true}.
 *
 * Vive en `public/` porque Next copia esa carpeta tal cual a la exportación,
 * así que el archivo llega a la raíz del sitio sin pasos extra.
 */

// ── Configuración ───────────────────────────────────────────────────────────
// Buzón que recibe las solicitudes. Debe ser una cuenta del propio dominio.
$DESTINO = 'hola@apoumian.com';
// Remitente. Tiene que ser @apoumian.com o el correo se marcará como spam:
// el SPF del dominio solo autoriza a los servidores de Hostinger a enviar en
// su nombre. Nunca poner aquí el correo de quien llena el formulario.
$REMITENTE = 'no-reply@apoumian.com';
// Segundos mínimos entre dos envíos de la misma IP.
$ESPERA = 30;

header('Content-Type: application/json; charset=utf-8');

function salir(int $codigo, array $cuerpo): never {
    http_response_code($codigo);
    echo json_encode($cuerpo, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    salir(405, ['error' => 'Método no permitido.']);
}

$crudo = file_get_contents('php://input');
$cuerpo = json_decode($crudo, true);
if (!is_array($cuerpo)) {
    salir(400, ['error' => 'El cuerpo de la solicitud no es JSON válido.']);
}

/** Recorta y limita, igual que `limpia()` en la versión de Node. */
function limpia(array $c, string $k, int $max = 2000): string {
    $v = $c[$k] ?? '';
    return is_string($v) ? mb_substr(trim($v), 0, $max) : '';
}

// Trampa para robots: si viene llena, es spam. Se responde 200 para no darle
// señal de que fue detectado; si supiera que falló, ajustaría e insistiría.
if (limpia($cuerpo, 'sitio') !== '') {
    salir(200, ['ok' => true]);
}

$datos = [
    'nombre'      => limpia($cuerpo, 'nombre', 120),
    'negocio'     => limpia($cuerpo, 'negocio', 160),
    'correo'      => limpia($cuerpo, 'correo', 160),
    'telefono'    => limpia($cuerpo, 'telefono', 40),
    'servicio'    => limpia($cuerpo, 'servicio', 160),
    'presupuesto' => limpia($cuerpo, 'presupuesto', 60),
    'mensaje'     => limpia($cuerpo, 'mensaje', 4000),
];

$faltantes = [];
if ($datos['nombre'] === '')  $faltantes[] = 'nombre';
if ($datos['negocio'] === '') $faltantes[] = 'negocio';
if (!filter_var($datos['correo'], FILTER_VALIDATE_EMAIL)) $faltantes[] = 'correo';
if (mb_strlen($datos['mensaje']) < 12) $faltantes[] = 'mensaje';

if ($faltantes) {
    salir(422, ['error' => 'Faltan datos o tienen formato inválido.', 'campos' => $faltantes]);
}

// ── Freno de abuso ──────────────────────────────────────────────────────────
// Un formulario público que envía correo es un relé gratis para quien lo
// encuentre. El señuelo detiene robots tontos; esto detiene al que insiste.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'desconocida';
$marca = sys_get_temp_dir() . '/apoumian-contacto-' . md5($ip);
if (is_file($marca) && (time() - filemtime($marca)) < $ESPERA) {
    salir(429, ['error' => 'Espera unos segundos antes de enviar otra solicitud.']);
}
@touch($marca);

// ── Envío ───────────────────────────────────────────────────────────────────
// Cualquier valor que vaya a una cabecera se limpia de saltos de línea: un
// \r\n dentro del correo permitiría inyectar cabeceras y convertir esto en
// una plataforma de envío masivo a nombre del dominio.
$sinSaltos = static fn(string $v): string => str_replace(["\r", "\n"], ' ', $v);

$asunto = $sinSaltos("Diagnostico - {$datos['negocio']} ({$datos['nombre']})");
$texto = implode("\n", [
    "Nombre: {$datos['nombre']}",
    "Negocio: {$datos['negocio']}",
    "Correo: {$datos['correo']}",
    'Teléfono: ' . ($datos['telefono'] ?: '—'),
    'Servicio: ' . ($datos['servicio'] ?: 'sin definir'),
    'Presupuesto: ' . ($datos['presupuesto'] ?: 'sin definir'),
    '',
    $datos['mensaje'],
    '',
    '—',
    "Enviado desde apoumian.com el " . date('Y-m-d H:i:s') . " (IP $ip)",
]);

$cabeceras = implode("\r\n", [
    'From: APoumian Studio <' . $REMITENTE . '>',
    'Reply-To: ' . $sinSaltos($datos['nombre']) . ' <' . $sinSaltos($datos['correo']) . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'MIME-Version: 1.0',
]);

// El quinto parámetro fija el sobre del remitente; sin él, Hostinger envía a
// nombre del usuario del sistema y el SPF del dominio no coincide.
$enviado = @mail($DESTINO, '=?UTF-8?B?' . base64_encode($asunto) . '?=', $texto, $cabeceras, '-f' . $REMITENTE);

if (!$enviado) {
    // No se pierde la solicitud: queda en disco para poder recuperarla.
    @file_put_contents(__DIR__ . '/../solicitudes.log', $texto . "\n\n===\n\n", FILE_APPEND);
    error_log('[contacto] mail() falló para ' . $datos['correo']);
    salir(502, ['error' => 'No se pudo entregar el correo. Intenta por WhatsApp.']);
}

salir(200, ['ok' => true]);
