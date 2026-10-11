import { FIELD, projectFallbackField } from "@/lib/signal-field";

// Server-rendered still of the signal field. It paints with the first HTML,
// stays visible when WebGL is unavailable, disabled (reduced motion, Data
// Saver) or fails, and sits underneath the canvas while it loads.
const dots = projectFallbackField();

export function SignalFieldFallback() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="size-full"
      aria-hidden="true"
      focusable="false"
    >
      {dots.map((dot, index) => (
        <circle
          key={index}
          cx={dot.x}
          cy={dot.y}
          r={dot.r}
          fill={dot.accent ? FIELD.colors.accent : FIELD.colors.ink}
          fillOpacity={dot.opacity}
        />
      ))}
    </svg>
  );
}
