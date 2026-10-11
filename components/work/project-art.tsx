import { fieldHeight } from "@/lib/signal-field";

type Variant = "phone" | "list" | "grid" | "wave" | "field";

const INK = "#171717";
const SOFT = "#c9c9c2";
const ACCENT = "#f26522";

// Abstract cover artwork for projects without authorised screenshots.
// Deliberately non-literal (no fake UI or data), decorative only.
export function ProjectArt({ variant }: { variant: Variant }) {
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className="size-full bg-subtle"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id={`dots-${variant}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill={SOFT} />
        </pattern>
      </defs>
      <rect width="400" height="250" fill={`url(#dots-${variant})`} />
      {variant === "phone" ? <Phone /> : null}
      {variant === "list" ? <List /> : null}
      {variant === "grid" ? <Grid /> : null}
      {variant === "wave" ? <Wave /> : null}
      {variant === "field" ? <Field /> : null}
    </svg>
  );
}

function Phone() {
  return (
    <g>
      <rect x="148" y="28" width="104" height="200" rx="18" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <rect x="184" y="38" width="32" height="5" rx="2.5" fill={SOFT} />
      <circle cx="226" cy="70" r="11" fill={ACCENT} />
      <rect x="162" y="62" width="44" height="6" rx="3" fill={INK} />
      <rect x="162" y="74" width="30" height="5" rx="2.5" fill={SOFT} />
      {[0, 1].map((col) =>
        [0, 1].map((row) => (
          <rect
            key={`${col}-${row}`}
            x={162 + col * 40}
            y={96 + row * 52}
            width="36"
            height="44"
            rx="8"
            fill={col === 1 && row === 0 ? "#fdf0e8" : "#f1f1ec"}
            stroke={col === 1 && row === 0 ? ACCENT : SOFT}
          />
        )),
      )}
      <rect x="162" y="204" width="76" height="12" rx="6" fill={INK} />
      <rect x="72" y="92" width="58" height="36" rx="8" fill="#fff" stroke={SOFT} />
      <circle cx="88" cy="110" r="7" fill="none" stroke={ACCENT} strokeWidth="1.5" />
      <rect x="100" y="106" width="22" height="4" rx="2" fill={SOFT} />
      <rect x="270" y="132" width="62" height="40" rx="8" fill="#fff" stroke={SOFT} />
      <path d="M282 160l10-10 8 6 12-14" fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function List() {
  return (
    <g>
      <rect x="90" y="36" width="220" height="178" rx="14" fill="#fff" stroke={SOFT} />
      <rect x="108" y="54" width="120" height="8" rx="4" fill={INK} />
      <rect x="262" y="52" width="30" height="12" rx="6" fill="#f1f1ec" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(108 ${80 + i * 30})`}>
          <circle cx="8" cy="8" r="7" fill={i === 1 ? ACCENT : "none"} stroke={i === 1 ? ACCENT : SOFT} strokeWidth="1.5" />
          {i === 1 ? <path d="M4.5 8l2.5 2.5 4.5-5" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /> : null}
          <rect x="24" y="4" width={[110, 84, 128, 72][i]} height="7" rx="3.5" fill={i === 1 ? SOFT : INK} opacity={i === 1 ? 1 : 0.85} />
        </g>
      ))}
      <g transform="translate(108 196)">
        {[0, 1, 2].map((i) => (
          <rect key={i} x={i * 18} y="0" width="12" height="6" rx="3" fill={i === 0 ? INK : SOFT} />
        ))}
      </g>
    </g>
  );
}

function Grid() {
  const cols = 5;
  const rows = 6;
  return (
    <g>
      <rect x="70" y="30" width="260" height="190" rx="12" fill="#fff" stroke={SOFT} />
      <rect x="70" y="30" width="260" height="28" rx="12" fill="#f1f1ec" />
      {Array.from({ length: cols - 1 }, (_, i) => (
        <line key={`v${i}`} x1={70 + ((i + 1) * 260) / cols} y1="30" x2={70 + ((i + 1) * 260) / cols} y2="220" stroke={SOFT} />
      ))}
      {Array.from({ length: rows }, (_, i) => (
        <line key={`h${i}`} x1="70" y1={58 + i * 27} x2="330" y2={58 + i * 27} stroke={SOFT} />
      ))}
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => (
          <rect key={`${r}-${c}`} x={82 + (c * 260) / cols} y={67 + r * 27} width={16 + ((r * 7 + c * 13) % 18)} height="5" rx="2.5" fill={r === 2 && c === 2 ? INK : SOFT} />
        )),
      )}
      <rect x={70 + (2 * 260) / cols + 2} y={58 + 2 * 27 + 2} width={260 / cols - 4} height="23" rx="4" fill="none" stroke={ACCENT} strokeWidth="2" />
    </g>
  );
}

function Wave() {
  return (
    <g fill="none" strokeLinecap="round">
      {Array.from({ length: 9 }, (_, i) => {
        const y = 60 + i * 17;
        const points = Array.from({ length: 41 }, (_, k) => {
          const x = k * 10;
          const v = y + Math.sin(k * 0.32 + i * 0.6) * (10 + i * 1.5);
          return `${x},${Math.round(v * 10) / 10}`;
        }).join(" ");
        return <polyline key={i} points={points} stroke={i === 4 ? ACCENT : INK} strokeWidth={i === 4 ? 2 : 1} opacity={i === 4 ? 1 : 0.25 + i * 0.03} />;
      })}
    </g>
  );
}

function Field() {
  const dots: { x: number; y: number; r: number; accent: boolean }[] = [];
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 26; col++) {
      const x = (col / 25 - 0.5) * 7;
      const z = (row / 11 - 0.5) * 5;
      const h = fieldHeight(x, z, 1.4);
      const scale = 0.55 + (row / 11) * 0.6;
      dots.push({
        x: Math.round((200 + x * 46 * scale) * 10) / 10,
        y: Math.round((70 + row * 14 * scale - h * 40) * 10) / 10,
        r: Math.round(scale * 2.2 * 10) / 10,
        accent: h > 0.2,
      });
    }
  }
  return (
    <g>
      {dots.map((dot, i) => (
        <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} fill={dot.accent ? ACCENT : INK} opacity={dot.accent ? 0.95 : 0.35} />
      ))}
    </g>
  );
}
