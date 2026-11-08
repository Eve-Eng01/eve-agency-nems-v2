import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Eve Studio. From idea to launch day.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", background: "#fff", color: "#1a0b2e", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 700 }}>
          <div style={{ width: 26, height: 26, borderRadius: 13, background: "#8800ff" }} />
          Eve Studio
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3, textTransform: "uppercase" }}>
          <span>From idea to</span>
          <span style={{ color: "#8800ff" }}>launch day.</span>
        </div>
        <div style={{ fontSize: 30, color: "#5b4f6b" }}>Apps, websites, brands and launch campaigns for founders.</div>
      </div>
    ),
    size,
  );
}
