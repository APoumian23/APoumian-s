/** IA y automatización: papeles sueltos entran a un nodo y salen como datos. */
export default function Automatizacion() {
  return (
    <svg className="ilu ilu--auto" viewBox="0 0 320 240" role="img" aria-label="Documentos sueltos entrando a un proceso y saliendo convertidos en datos ordenados">
      <g className="ilu__papeles">
        {[
          { y: 52, r: -8, d: "0ms" },
          { y: 100, r: 4, d: "140ms" },
          { y: 148, r: -3, d: "280ms" },
        ].map((p) => (
          <g key={p.y} className="ilu__papel" style={{ "--d": p.d } as React.CSSProperties}>
            <rect x="26" y={p.y} width="52" height="40" rx="4"
                  fill="var(--color-paper-2)" stroke="var(--color-rule)" strokeWidth="2"
                  transform={`rotate(${p.r} 52 ${p.y + 20})`} />
          </g>
        ))}
      </g>

      <g className="ilu__nodo">
        <circle cx="160" cy="120" r="34" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" />
        <circle cx="160" cy="120" r="8" fill="var(--color-accent)" />
        <g stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round">
          <path d="M160 86v-16" /><path d="M160 154v16" />
          <path d="M126 120h-14" /><path d="M194 120h14" />
        </g>
      </g>

      <g className="ilu__filas">
        {[70, 96, 122, 148, 174].map((y, i) => (
          <rect key={y} className="ilu__fila" style={{ "--d": `${420 + i * 90}ms` } as React.CSSProperties}
                x="228" y={y} width="66" height="8" rx="4"
                fill={i === 0 ? "var(--color-accent)" : "var(--color-rule)"} />
        ))}
      </g>
    </svg>
  );
}
