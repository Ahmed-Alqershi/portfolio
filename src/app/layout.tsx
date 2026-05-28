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

// SEO title kept as "Machine Learning" for the technical search audience.
const TITLE =
  "Ahmed Alqershi — Mathematical Modelling, Machine Learning & Software";
// Social title is just the name — the image and description carry the
// positioning, so the bold line in WhatsApp/LinkedIn previews reads like a
// clean contact card rather than a résumé summary.
const SOCIAL_TITLE = "Ahmed Alqershi";
// Keyword-rich for Google's meta description.
const DESCRIPTION =
  "Mathematical modelling, machine learning, and the software around them. Operations research, GAMS, optimization. Things are interactive — look around.";
// Warm invitation for WhatsApp/LinkedIn/Twitter previews. The image already
// carries the name, photo, logo, and positioning — the description doesn't
// need to repeat any of that. It just extends a hand.
const SOCIAL_DESCRIPTION =
  "Welcome! This is where I keep my work. Have a look around. Maybe we'll team up on something.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aalqershi.com"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "Ahmed Alqershi",
  authors: [{ name: "Ahmed Alqershi", url: "https://aalqershi.com" }],
  creator: "Ahmed Alqershi",
  keywords: [
    "Ahmed Alqershi",
    "mathematical modelling",
    "machine learning",
    "operations research",
    "mathematical optimization",
    "GAMS",
    "Gurobi",
    "CGE modelling",
    "computable general equilibrium",
    "software engineering",
    "Siamese neural networks",
    "drug repositioning",
    "Kaizen Consulting",
    "consultant",
    "freelance",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    url: "https://aalqershi.com",
    siteName: "Ahmed Alqershi",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
  },
  // After deploy, add the Search Console code here:
  // verification: { google: "your-verification-code" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahmed Alqershi",
  url: "https://aalqershi.com",
  image: "https://aalqershi.com/profile.jpeg",
  sameAs: [
    "https://www.linkedin.com/in/ahmed-alqershi/",
    "https://github.com/Ahmed-Alqershi",
  ],
  jobTitle: ["Technical Consultant", "Operations Research Analyst"],
  worksFor: [
    { "@type": "Organization", name: "Kaizen Consulting" },
    { "@type": "Organization", name: "GAMS Development Corporation" },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Abdullah Gül University",
  },
  knowsAbout: [
    "Mathematical Modelling",
    "Operations Research",
    "Machine Learning",
    "Mathematical Optimization",
    "GAMS",
    "Gurobi",
    "Computable General Equilibrium",
    "Mixed Integer Programming",
    "Stochastic Programming",
    "Software Engineering",
    "Python",
    "TypeScript",
  ],
  description:
    "Independent consultant in mathematical modelling, machine learning, and the software around them.",
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
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
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
