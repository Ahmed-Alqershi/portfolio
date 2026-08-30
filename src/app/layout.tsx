import type { Metadata } from "next";
import { Geist, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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

// Title, description and social copy all state the same positioning, so the
// tab, the search result and a pasted link agree with each other.
const TITLE = "Ahmed Alqershi | Operations Research & Stochastic Optimization";
const DESCRIPTION =
  "Operations researcher and scientific-software developer working on stochastic optimization, GAMSPy, mathematical modelling and applied optimization.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aalqershi.com"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Ahmed Alqershi",
  authors: [{ name: "Ahmed Alqershi", url: "https://aalqershi.com" }],
  creator: "Ahmed Alqershi",
  keywords: [
    "Ahmed Alqershi",
    "operations research",
    "stochastic optimization",
    "stochastic programming",
    "SDDP",
    "Benders decomposition",
    "mathematical optimization",
    "mathematical modelling",
    "scientific software",
    "GAMS",
    "GAMSPy",
    "energy-system modelling",
    "CGE modelling",
    "computable general equilibrium",
    "simulation-optimization",
    "machine learning",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://aalqershi.com",
    siteName: "Ahmed Alqershi · Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  // After deploy, add the Search Console code here:
  // verification: { google: "your-verification-code" },
};

const SITE_URL = "https://aalqershi.com";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Ahmed Alqershi · Portfolio",
      alternateName: "Ahmed Alqershi",
      url: SITE_URL,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Ahmed Alqershi",
      url: SITE_URL,
      image: `${SITE_URL}/profile.jpeg`,
      sameAs: [
        "https://www.linkedin.com/in/ahmed-alqershi/",
        "https://github.com/Ahmed-Alqershi",
      ],
      jobTitle: "Operations Research Analyst",
      worksFor: [
        { "@type": "Organization", name: "GAMS Software GmbH" },
        { "@type": "Organization", name: "Kaizen Consulting" },
      ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Abdullah Gül University",
      },
      knowsAbout: [
        "Operations Research",
        "Stochastic Programming",
        "Stochastic Dual Dynamic Programming",
        "Benders Decomposition",
        "Mathematical Optimization",
        "Mathematical Modelling",
        "Energy System Modelling",
        "GAMS",
        "GAMSPy",
        "Mixed Integer Programming",
        "Discrete-Event Simulation",
        "Computable General Equilibrium",
        "Scientific Software",
        "Python",
      ],
      description:
        "Operations research analyst and scientific-software developer working on stochastic optimization, GAMSPy and mathematical modelling.",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
