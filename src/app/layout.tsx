import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed Alqershi — Modelling, ML, Software",
  description:
    "Personal portfolio — mathematical modelling, machine learning, and the software around them. Things are interactive — look around.",
  authors: [{ name: "Ahmed Alqershi" }],
  openGraph: {
    title: "Ahmed Alqershi — Modelling, ML, Software",
    description:
      "Personal portfolio — mathematical modelling, machine learning, and the software around them. Things are interactive — look around.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Alqershi — Modelling, ML, Software",
    description:
      "Personal portfolio — mathematical modelling, machine learning, and the software around them. Things are interactive — look around.",
  },
};

const themeBootstrap = `
(function(){
  try {
    var t = localStorage.getItem('theme') || 'indigo';
    var pref = localStorage.getItem('colorMode') || 'system';
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved = pref === 'system' ? (systemDark ? 'dark' : 'light') : pref;
    var r = document.documentElement;
    r.setAttribute('data-theme', t);
    r.setAttribute('data-mode', resolved);
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
