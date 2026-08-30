import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Research from "@/components/Research";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Detour from "@/components/Detour";
import Contact from "@/components/Contact";
import EasterEggPanel from "@/components/EasterEggPanel";
import ParticleField from "@/components/ParticleField";
import Nav from "@/components/Nav";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import ScrollProgress from "@/components/ScrollProgress";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <ParticleField />
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Research />
        <Skills />
        <Projects />
        <Detour />
        <Contact />
      </main>
      <Footer />
      <EasterEggPanel />
      <ThemeSwitcher />
    </>
  );
}
