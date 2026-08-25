/** Ilustración construida a mano: la tarjeta y las ondas del tap.
 *  No es decoración — anima exactamente lo que hace el producto. */
export default function Nfc() {
  return (
    <svg className="nfc" viewBox="0 0 320 240" role="img" aria-label="Un teléfono acercándose a una tarjeta NFC y activándola">
      {/* tarjeta */}
      <g className="nfc__card">
        <rect x="24" y="96" width="150" height="96" rx="8"
              fill="var(--color-paper-2)" stroke="var(--color-ink)" strokeWidth="2" />
        <rect x="40" y="112" width="34" height="26" rx="4"
              fill="none" stroke="var(--color-accent)" strokeWidth="2" />
        <path d="M46 138v-14a5 5 0 0 1 5-5h18" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
        <rect x="40" y="154" width="86" height="4" rx="2" fill="var(--color-rule)" />
        <rect x="40" y="166" width="58" height="4" rx="2" fill="var(--color-rule)" />
      </g>

      {/* ondas: el tap */}
      <g className="nfc__waves" stroke="var(--color-accent)" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path className="nfc__w" style={{ "--d": "0ms" } as React.CSSProperties} d="M186 100a52 52 0 0 1 0 76" />
        <path className="nfc__w" style={{ "--d": "260ms" } as React.CSSProperties} d="M204 84a78 78 0 0 1 0 108" />
        <path className="nfc__w" style={{ "--d": "520ms" } as React.CSSProperties} d="M222 68a104 104 0 0 1 0 140" />
      </g>

      {/* teléfono */}
      <g className="nfc__phone">
        <rect x="248" y="52" width="52" height="98" rx="9"
              fill="var(--color-ink)" stroke="var(--color-ink)" strokeWidth="2" />
        <rect x="254" y="62" width="40" height="74" rx="3" fill="var(--color-paper)" />
        <g className="nfc__stars" fill="var(--color-accent)">
          <path d="M262 82l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" />
          <path d="M280 82l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z" />
        </g>
        <rect x="258" y="106" width="32" height="3" rx="1.5" fill="var(--color-rule)" />
        <rect x="258" y="114" width="22" height="3" rx="1.5" fill="var(--color-rule)" />
      </g>
    </svg>
  );
}
