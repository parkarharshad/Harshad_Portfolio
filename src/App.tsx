import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { CustomCursor } from "./components/CustomCursor";
import { Experience } from "./components/Experience";
import { RamsCaseStudy } from "./components/RamsCaseStudy";
import { MSCGoCaseStudy } from "./components/MSCGoCaseStudy";
import { INodeCaseStudy } from "./components/iNodeCaseStudy";

type View = "home" | "rams-case-study" | "msc-case-study" | "inode-case-study";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (currentView === "rams-case-study") {
    return (
      <div className="min-h-screen" style={{ background: "#000", cursor: "none" }}>
        <CustomCursor />
        <RamsCaseStudy onBack={() => handleViewChange("home")} />
      </div>
    );
  }

  if (currentView === "msc-case-study") {
    return (
      <div className="min-h-screen" style={{ background: "#000", cursor: "none" }}>
        <CustomCursor />
        <MSCGoCaseStudy onBack={() => handleViewChange("home")} />
      </div>
    );
  }

  if (currentView === "inode-case-study") {
    return (
      <div className="min-h-screen" style={{ background: "#000", cursor: "none" }}>
        <CustomCursor />
        <INodeCaseStudy onBack={() => handleViewChange("home")} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ cursor: "none" }}>
      <CustomCursor />
      <Navigation theme={theme} onToggleTheme={() => setTheme(t => t === "dark" ? "light" : "dark")} />
      <main>
        <Hero />
        <Portfolio
          onViewCaseStudy={(id) => {
            if (id === "rams") handleViewChange("rams-case-study");
            if (id === "msc") handleViewChange("msc-case-study");
            if (id === "inode") handleViewChange("inode-case-study");
          }}
        />
        <Experience />
        <About />
        <Contact />
      </main>
    </div>
  );
}