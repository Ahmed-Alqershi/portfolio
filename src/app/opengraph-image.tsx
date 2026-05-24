import { ImageResponse } from "next/og";

export const alt = "Ahmed Alqershi — Modelling, ML, Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0c0a09",
          color: "#fafaf9",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#a5b4fc",
            display: "flex",
          }}
        >
          Ahmed Alqershi
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 92,
            fontWeight: 500,
            letterSpacing: -2,
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          Modelling · Machine Learning · Software
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 30,
            color: "#a8a29e",
            maxWidth: 980,
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Mathematical models, machine learning, and the platforms that put
          them to work.
        </div>
      </div>
    ),
    size,
  );
}
