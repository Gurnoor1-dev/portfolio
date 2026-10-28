import { useEffect, useState } from "react";
import screenshot1 from "./assets/Screenshots/1.png";
import screenshot2 from "./assets/Screenshots/2.png";
import screenshot3 from "./assets/Screenshots/3.png";
import screenshot4 from "./assets/Screenshots/4.png";
import screenshot5 from "./assets/Screenshots/5.png";

type Project = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  stack: string[];
  repo: string;
  visual: string;
  screenshot: string;
  accent: string;
  glyph: string;
  status: string;
};

const projects: Project[] = [
  {
    number: "01", title: "Air Astana Virtual", eyebrow: "AVIATION · BRAND EXPERIENCE",
    description: "A polished digital home for a virtual airline community, built around the spirit of Eurasia and the details that make a brand feel real.",
    stack: ["React", "TypeScript", "Vite"], repo: "https://github.com/Gurnoor1-dev/air-astana-virtual-site",
    visual: "airline", screenshot: screenshot1, accent: "#e6fb68", glyph: "✳", status: "WEB EXPERIENCE"
  },
  {
    number: "02", title: "Crew Center — KCVA", eyebrow: "AVIATION · OPERATIONS",
    description: "A connected crew workspace for pilot profiles, flight reports, logbooks, leaderboards, fleet management, and live-flight tracking.",
    stack: ["React", "Supabase", "Live data"], repo: "https://github.com/Gurnoor1-dev/crew-center-air-astana-virtual",
    visual: "cockpit", screenshot: screenshot2, accent: "#8cf4d1", glyph: "↗", status: "CREW PLATFORM"
  },
  {
    number: "03", title: "Australian Bite Hub", eyebrow: "COMMERCE · HOSPITALITY",
    description: "A restaurant ordering and operations experience designed to bring customer ordering and behind-the-scenes workflows together.",
    stack: ["TanStack Start", "React", "TypeScript"], repo: "https://github.com/Gurnoor1-dev/australian-bite",
    visual: "bite", screenshot: screenshot3, accent: "#ffb56b", glyph: "✳", status: "ORDERING EXPERIENCE"
  },
  {
    number: "04", title: "BreatheRise", eyebrow: "WELLBEING · COACHING",
    description: "A refined digital experience for performance coaching, connecting people with specialist support through a calm, premium interface.",
    stack: ["React", "TanStack", "Supabase"], repo: "https://github.com/Gurnoor1-dev/connect-care",
    visual: "breathe", screenshot: screenshot4, accent: "#b5a4ff", glyph: "◌", status: "DIGITAL PRODUCT"
  },
  {
    number: "05", title: "ATC Mentorship Hub", eyebrow: "AVIATION · LEARNING",
    description: "A gateway for aspiring Infinite Flight air traffic controllers, with mentoring, exam preparation, and mock-practical learning paths.",
    stack: ["React", "TypeScript", "UI systems"], repo: "https://github.com/Gurnoor1-dev/atcmh-website",
    visual: "atc", screenshot: screenshot5, accent: "#79c7ff", glyph: "⌁", status: "COMMUNITY PLATFORM"
  }
];

const skills = ["React", "TypeScript", "Vite", "Supabase", "TanStack", "Responsive UI", "Product thinking", "Motion design"];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="project-visual screenshot-visual">
      <img src={project.screenshot} alt={`${project.title} website screenshot`} loading="lazy" />
      <span className="screenshot-caption">{project.status}</span>
      <span className="visual-index">{project.number} / 05</span>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    return () => { window.removeEventListener("scroll", onScroll); revealObserver.disconnect(); };
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") { setActiveProject(null); setMenuOpen(false); } };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@gurnoor.dev");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = "mailto:hello@gurnoor.dev";
    }
  };

  return (
    <div className="site-shell">
      <div className="grain" aria-hidden="true" />
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <a className="brand" href="#home" aria-label="Gurnoor home"><span className="brand-mark">G.</span><span>GURNOOR<span className="brand-reg">®</span></span></a>
        <nav className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
          <a onClick={() => setMenuOpen(false)} href="#work">Selected work <span>05</span></a>
          <a onClick={() => setMenuOpen(false)} href="#about">About</a>
          <a onClick={() => setMenuOpen(false)} href="#contact">Contact</a>
        </nav>
        <a className="nav-availability" href="#contact"><span className="availability-dot" /> LET’S CONNECT <Arrow diagonal /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? "CLOSE −" : "MENU +"}</button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-meta reveal"><span><i className="live-dot" /> INDEPENDENT DEVELOPER</span><span>BASED IN INDIA · WORKING EVERYWHERE</span></div>
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow reveal"><span className="eyebrow-line" /> DESIGN-MINDED. DETAIL-OBSESSED.</p>
              <h1 className="hero-title"><span className="title-line reveal">I build</span><span className="title-line reveal delay-1">digital <em>things</em></span><span className="title-line reveal delay-2">that move<span className="title-period">.</span></span></h1>
              <div className="hero-bottom reveal delay-3"><p>Thoughtful interfaces. Useful products.<br/>A little extra feeling in every pixel.</p><a className="round-link" href="#work" aria-label="Explore selected work"><span>↓</span></a></div>
            </div>
            <div className="hero-art reveal delay-2" aria-label="Abstract animated orbital graphic">
              <div className="hero-orbit hero-orbit-1" /><div className="hero-orbit hero-orbit-2" /><div className="hero-orbit hero-orbit-3" />
              <div className="hero-star">✳</div><div className="hero-orbit-label label-top">CREATIVE CODE / 2026</div><div className="hero-orbit-label label-side">IDEAS INTO INTERFACES</div>
              <div className="hero-center"><span>G</span><small>BUILD<br/>WITH INTENT</small></div>
              <div className="hero-asterisk">✳</div>
            </div>
          </div>
          <div className="hero-footer reveal delay-3"><span>SCROLL TO EXPLORE <span className="scroll-line" /></span><span>SELECTED WORK · 2024—26</span><span className="hero-footer-right">INDEPENDENT BY NATURE <b>✳</b></span></div>
        </section>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading reveal"><div><p className="eyebrow"><span className="eyebrow-line" /> A FEW THINGS I’VE MADE</p><h2>Selected <em>work</em><span className="title-period">.</span></h2></div><p className="section-intro">Different worlds, same approach:<br/>make it useful, then make it feel right.</p></div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card reveal ${index % 2 ? "project-offset" : ""}`} key={project.number} style={{ transitionDelay: `${(index % 2) * 110}ms` }}>
                <button className="project-open" onClick={() => setActiveProject(project)} aria-label={`Open details for ${project.title}`}><ProjectVisual project={project} /><span className="card-open"><Arrow diagonal /></span></button>
                <div className="project-info"><div><p className="project-eyebrow">{project.eyebrow}</p><h3>{project.title}</h3></div><button className="project-arrow" onClick={() => setActiveProject(project)} aria-label={`View ${project.title}`}><Arrow diagonal /></button></div>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
          <div className="work-end reveal"><span>FIVE PROJECTS. ONE CURIOSITY.</span><span>MORE IDEAS IN THE WORKSHOP <b>↘</b></span></div>
        </section>

        <section className="about-section" id="about">
          <div className="about-inner section-wrap">
            <div className="about-left reveal"><p className="eyebrow"><span className="eyebrow-line" /> A BIT ABOUT ME</p><h2>Curious by<br/>default. <em>Builder</em><br/>by choice.</h2><div className="about-stamp">MADE WITH<br/><span>INTENTION</span><b>✳</b></div></div>
            <div className="about-right reveal delay-1"><p className="about-lead">Hey, I’m Gurnoor — I like turning ambitious ideas into digital experiences people can actually use.</p><p className="about-body">I work across web interfaces, product flows, and the systems behind them. From aviation communities to ordering experiences and coaching platforms, I enjoy learning the shape of a problem and building something clear, capable, and considered.</p><div className="skill-heading"><span>TOOLS & CRAFT</span><span>ALWAYS LEARNING ↗</span></div><div className="skill-cloud">{skills.map((skill, i) => <span key={skill} style={{ "--i": i } as React.CSSProperties}>{skill}</span>)}</div></div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-kicker reveal"><span className="live-dot" /> OPEN TO GOOD IDEAS</div>
          <div className="contact-main reveal"><h2>Have a good<br/>one in <em>mind?</em></h2><button className="contact-circle" onClick={copyEmail} aria-label="Copy email address"><span>{copied ? "COPIED!" : "LET’S TALK"}</span><b>{copied ? "✓" : "↗"}</b></button></div>
          <div className="contact-footer reveal"><div><span className="footer-label">START A CONVERSATION</span><button className="email-button" onClick={copyEmail}>{copied ? "Email copied!" : "hello@gurnoor.dev"} <Arrow diagonal /></button><span className="email-note">Replace with your preferred contact email before publishing.</span></div><div className="footer-socials"><a href="https://github.com/Gurnoor1-dev" target="_blank" rel="noreferrer">GITHUB <Arrow diagonal /></a><a href="mailto:hello@gurnoor.dev">EMAIL <Arrow diagonal /></a><a href="#home">BACK TO TOP ↑</a></div></div>
        </section>
      </main>

      <footer className="site-footer"><a className="brand" href="#home"><span className="brand-mark">G.</span><span>GURNOOR<span className="brand-reg">®</span></span></a><span>DESIGNED WITH CURIOSITY. BUILT WITH CARE.</span><span>© 2026 GURNOOR</span></footer>

      {activeProject && <div className="modal-backdrop" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setActiveProject(null); }}><section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close project details">×</button><ProjectVisual project={activeProject} /><p className="project-eyebrow">{activeProject.number} / {activeProject.eyebrow}</p><h2 id="modal-title">{activeProject.title}</h2><p className="modal-description">{activeProject.description}</p><div className="project-tags">{activeProject.stack.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="modal-repo" href={activeProject.repo} target="_blank" rel="noreferrer">OPEN PROJECT REPOSITORY <Arrow diagonal /></a></section></div>}
    </div>
  );
}

export default App;