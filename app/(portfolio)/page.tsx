import Hero from "../components/main/Hero";
import Skills from "../components/main/Skills";
import Projects from "../components/main/Projects";

import Contact from "../components/main/Contact";
import Experience from "../components/main/Experience";

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col">
        <Hero />
        <Skills />
        <Experience />
        <Projects />

        <Contact />
      </div>
    </main>
  );
}
