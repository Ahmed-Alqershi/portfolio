import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Ahmed Alqershi — Modelling, Artificial Intelligence & Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const profileBuffer = await readFile(
    join(process.cwd(), "public", "profile.jpeg"),
  );
  const profileDataUri = `data:image/jpeg;base64,${profileBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a14",
          color: "#fafaf9",
          padding: "60px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
          }}
        >
          <img
            src={profileDataUri}
            width={180}
            height={180}
            style={{
              borderRadius: 90,
              objectFit: "cover",
            }}
          />

          <svg width="180" height="180" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="6" fill="#faf7f2" />
            <line
              x1="5"
              y1="28"
              x2="13"
              y2="13"
              stroke="#1c1917"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="27"
              y1="28"
              x2="19"
              y2="13"
              stroke="#1c1917"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="16" cy="7" r="2.2" fill="#4f46e5" />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 84,
            fontWeight: 600,
            letterSpacing: -2.5,
          }}
        >
          Ahmed Alqershi
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: -0.5,
            color: "#a5b4fc",
          }}
        >
          Modelling · Artificial Intelligence · Software
        </div>
      </div>
    ),
    size,
  );
}
