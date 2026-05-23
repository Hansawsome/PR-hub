import { useEffect } from "react";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Career } from "@/components/sections/Career";
import { Projects } from "@/components/sections/Projects";
import { Expertise } from "@/components/sections/Expertise";
import { Impact } from "@/components/sections/Impact";
import { Vision } from "@/components/sections/Vision";
import { Growth } from "@/components/sections/Growth";
import { Contact } from "@/components/sections/Contact";

export default function App() {
  useEffect(() => {
    document.body.setAttribute("data-theme", "dark");
    document.body.setAttribute("data-accent", "cyan");
  }, []);

  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Career />
        <Projects />
        <Expertise />
        <Impact />
        <Vision />
        <Growth />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
