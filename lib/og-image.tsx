import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

type OgCardProps = {
  eyebrow: string;
  title: string;
  footer: string;
  concept?: boolean;
};

// Shared layout for generated social images, matching the light design
// system. Satori supports a flexbox subset only, so every element with
// several children sets display: flex.
export function renderOgImage({ eyebrow, title, footer, concept }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: 48,
          background: "#f8f8f5",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 56,
            background: "#ffffff",
            border: "1px solid #e5e5e0",
            borderRadius: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#666666" }}>
              <div style={{ width: 12, height: 12, borderRadius: 999, background: "#f26522" }} />
              {eyebrow}
            </div>
            {concept ? (
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  color: "#b6461a",
                  background: "#fdf0e8",
                  border: "2px dashed #b6461a",
                  borderRadius: 999,
                  padding: "6px 18px",
                }}
              >
                Concept project
              </div>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 48 ? 58 : 68,
              fontWeight: 600,
              lineHeight: 1.08,
              letterSpacing: -2,
              color: "#171717",
              maxWidth: 940,
            }}
          >
            {title}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 26 }}>
            <span style={{ color: "#666666" }}>{footer}</span>
            <span style={{ display: "flex", alignItems: "center", color: "#171717", fontWeight: 600 }}>
              {site.name}
              <span style={{ color: "#f26522" }}>.</span>
            </span>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
