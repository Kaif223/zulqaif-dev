import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

type OgCardProps = {
  eyebrow: string;
  title: string;
  footer: string;
};

// Shared layout for generated social images (Satori supports a flexbox
// subset only, so every element with several children sets display: flex).
export function renderOgImage({ eyebrow, title, footer }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0b0c0e",
          color: "#edeae3",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#9c9a94",
          }}
        >
          <span>{eyebrow}</span>
          <span>{site.location.coordinates}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: title.length > 24 ? 76 : 104,
              fontWeight: 800,
              lineHeight: 0.95,
              textTransform: "uppercase",
              letterSpacing: -2,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <div style={{ height: 2, width: 560, background: "#2a2e35" }} />
            <div style={{ height: 2, width: 120, background: "#ff5b1f" }} />
            <div style={{ height: 2, width: 392, background: "#2a2e35" }} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#edeae3",
          }}
        >
          <span>{footer}</span>
          <span style={{ color: "#ff5b1f" }}>{site.name}</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
