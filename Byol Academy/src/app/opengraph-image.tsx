import { ImageResponse } from "next/og";

export const alt = "BYOL Academy — Learning that responds to you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF7F0",
          color: "#0B1B3B",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "76px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: 26, fontWeight: 700 }}>
          BYOL Academy
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          <div style={{ color: "#1F3A8A", fontSize: 24, marginBottom: 18 }}>Educate · Uplift · Empower</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 80, lineHeight: 1.05, fontWeight: 700, letterSpacing: -3 }}>Learning that<br />responds to you.</div>
          <div style={{ color: "#4A5470", fontSize: 24, marginTop: 24 }}>Medicine · Schools · Colleges</div>
        </div>
        <div style={{ alignSelf: "flex-end", color: "#4A5470", fontSize: 18 }}>byolacademy.com</div>
      </div>
    ),
    { ...size },
  );
}
