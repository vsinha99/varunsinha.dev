import { ImageResponse } from "next/og";

export const alt = "Varun Sinha, Data Science and Machine Learning";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background: "#12151b",
          color: "#f2f0e9",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", color: "#8b7bff", fontSize: 28 }}>
          VARUN SINHA / DATA SCIENCE + ML
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 500, letterSpacing: "-0.06em", lineHeight: 0.9 }}>
            Varun Sinha
          </div>
          <div style={{ color: "#b8bdc7", fontSize: 36, marginTop: 30 }}>
            Machine learning, data science, and applied research.
          </div>
        </div>
        <div style={{ alignItems: "center", display: "flex", gap: 16 }}>
          <div style={{ background: "#f2f0e9", height: 12, width: 112 }} />
          <div style={{ background: "#6d5df5", borderRadius: 999, height: 20, width: 20 }} />
        </div>
      </div>
    ),
    size,
  );
}
