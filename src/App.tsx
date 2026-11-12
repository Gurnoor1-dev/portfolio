import React, { useEffect, useRef, useState } from "react";
import screenshot1 from "./assets/Screenshots/1.png";
import screenshot2 from "./assets/Screenshots/2.png";
import screenshot3 from "./assets/Screenshots/3.png";
import screenshot4 from "./assets/Screenshots/4.png";
import screenshot5 from "./assets/Screenshots/5.png";
import "./App.css";

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

const EMAIL = "Gurnoor1.if@gmail.com";

const projects: Project[] = [
  {
    number: "01",
    title: "Air Astana Virtual",
    eyebrow: "AVIATION · BRAND EXPERIENCE",
    description:
      "A polished digital home for a virtual airline community, built around the spirit of Eurasia and the details that make a brand feel real.",
    stack: ["React", "TypeScript", "Vite"],
    repo: "https://github.com/Gurnoor1-dev/air-astana-virtual-site",
    visual: "airline",
    screenshot: screenshot1,
    accent: "#e6fb68",
    glyph: "✳",
    status: "WEB EXPERIENCE",
  },
  {
    number: "02",
    title: "Crew Center — KCVA",
    eyebrow: "AVIATION · OPERATIONS",
    description:
      "A connected crew workspace for pilot profiles, flight reports, logbooks, leaderboards, fleet management, and live-flight tracking.",
    stack: ["React", "Supabase", "Live data"],
    repo: "https://github.com/Gurnoor1-dev/crew-center-air-astana-virtual",
    visual: "cockpit",
    screenshot: screenshot2,
    accent: "#8cf4d1",
    glyph: "↗",
    status: "CREW PLATFORM",
  },
  {
    number: "03",
    title: "Australian Bite Hub",
    eyebrow: "COMMERCE · HOSPITALITY",
    description:
      "A restaurant ordering and operations experience designed to bring customer ordering and behind-the-scenes workflows together.",
    stack: ["TanStack Start", "React", "TypeScript"],
    repo: "https://github.com/Gurnoor1-dev/australian-bite",
    visual: "bite",
    screenshot: screenshot3,
    accent: "#ffb56b",
    glyph: "✳",
    status: "ORDERING EXPERIENCE",
  },
  {
    number: "04",
    title: "BreatheRise",
    eyebrow: "WELLBEING · COACHING",
    description:
      "A refined digital experience for performance coaching, connecting people with specialist support through a calm, premium interface.",
    stack: ["React", "TanStack", "Supabase"],
    repo: "https://github.com/Gurnoor1-dev/connect-care",
    visual: "breathe",
    screenshot: screenshot4,
    accent: "#b5a4ff",
    glyph: "◌",
    status: "DIGITAL PRODUCT",
  },
  {
    number: "05",
    title: "ATC Mentorship Hub",
    eyebrow: "AVIATION · LEARNING",
    description:
      "A gateway for aspiring Infinite Flight air traffic controllers, with mentoring, exam preparation, and mock-practical learning paths.",
    stack: ["React", "TypeScript", "UI systems"],
    repo: "https://github.com/Gurnoor1-dev/atcmh-website",
    visual: "atc",
    screenshot: screenshot5,
    accent: "#79c7ff",
    glyph: "⌁",
    status: "COMMUNITY PLATFORM",
  },
];

const skills = [
  "React",
  "TypeScript",
  "Vite",
  "Supabase",
  "TanStack",
  "Responsive UI",
  "Product thinking",
  "Motion design",
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className="arrow">
      {diagonal ? "↗" : "→"}
    </span>
  );
}

function ProjectVisual({ project }: { project: Project }) {
  return (
    <div
      className="project-visual screenshot-visual"
      style={{ "--card-accent": project.accent } as React.CSSProperties}
    >
      <img
        src={project.screenshot}
        alt={`${project.title} website screenshot`}
        loading="lazy"
      />
      <div className="visual-glare" aria-hidden="true" />
      <span className="screenshot-caption">{project.status}</span>
      <span className="visual-index">{project.number} / 05</span>
    </div>
  );
}

function InteractiveCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -4.5;
    const rotateY = ((x - centerX) / centerX) * 4.5;

    el.style.setProperty("--rx", `${rotateX.toFixed(2)}deg`);
    el.style.setProperty("--ry", `${rotateY.toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    el.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`project-card reveal ${index % 2 ? "project-offset" : ""}`}
      style={
        {
          transitionDelay: `${(index % 2) * 110}ms`,
          "--accent": project.accent,
        } as React.CSSProperties
      }
      data-cursor="VIEW"
    >
      <button
        className="project-open"
        onClick={() => onOpen(project)}
        aria-label={`Open details for ${project.title}`}
      >
        <ProjectVisual project={project} />
        <span className="card-open">
          <Arrow diagonal />
        </span>
      </button>
      <div className="project-info">
        <div>
          <p className="project-eyebrow">{project.eyebrow}</p>
          <h3>{project.title}</h3>
        </div>
        <button
          className="project-arrow"
          onClick={() => onOpen(project)}
          aria-label={`View ${project.title}`}
        >
          <Arrow diagonal />
        </button>
      </div>
      <p className="project-description">{project.description}</p>
      <div className="project-tags">
        {project.stack.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </article>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [istTime, setIstTime] = useState("");

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);
  const magneticBtnRef = useRef<HTMLButtonElement>(null);

  // Live IST Clock
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setIstTime(`${formatted} IST`);
      } catch {
        setIstTime("INDIA");
      }
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll & Intersection Reveal
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document
      .querySelectorAll(".reveal")
      .forEach((el) => revealObserver.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
    };
  }, []);

  // Custom Smooth Cursor + Ambient Spotlight
  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      document.documentElement.style.setProperty("--cursor-x", `${mouseX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${mouseY}px`);

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      const customCursorEl = target?.closest("[data-cursor]") as HTMLElement | null;
      const interactiveEl = target?.closest("a, button");

      if (cursorRingRef.current && cursorLabelRef.current) {
        if (customCursorEl) {
          const label = customCursorEl.getAttribute("data-cursor") || "";
          cursorRingRef.current.classList.add("cursor-view");
          cursorRingRef.current.classList.remove("cursor-hover");
          cursorLabelRef.current.textContent = label;
        } else if (interactiveEl) {
          cursorRingRef.current.classList.add("cursor-hover");
          cursorRingRef.current.classList.remove("cursor-view");
          cursorLabelRef.current.textContent = "";
        } else {
          cursorRingRef.current.classList.remove("cursor-hover", "cursor-view");
          cursorLabelRef.current.textContent = "";
        }
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Escape Key Listener & Body Scroll Lock for Modal
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", close);
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  // Magnetic Button Handler
  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px) scale(1.04)`;
  };

  const handleMagneticLeave = () => {
    const btn = magneticBtnRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px) scale(1)";
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className="site-shell">
      <div className="ambient-glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* Custom Studio Cursor (Desktop) */}
      <div ref={cursorDotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={cursorRingRef} className="cursor-ring" aria-hidden="true">
        <span ref={cursorLabelRef} className="cursor-label" />
      </div>

      {/* Top Scroll Progress Line */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <a className="brand" href="#home" aria-label="Gurnoor home">
          <span className="brand-mark">G.</span>
          <span>
            GURNOOR<span className="brand-reg">®</span>
          </span>
        </a>

        <nav
          className={menuOpen ? "nav-links nav-open" : "nav-links"}
          aria-label="Main navigation"
        >
          <a onClick={() => setMenuOpen(false)} href="#work">
            Selected work <span>05</span>
          </a>
          <a onClick={() => setMenuOpen(false)} href="#about">
            About
          </a>
          <a onClick={() => setMenuOpen(false)} href="#contact">
            Contact
          </a>
        </nav>

        <a className="nav-availability" href="#contact">
          <span className="availability-dot" /> LET’S CONNECT <Arrow diagonal />
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? "CLOSE −" : "MENU +"}
        </button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-meta reveal">
            <span>
              <i className="live-dot" /> INDEPENDENT DEVELOPER
            </span>
            <span>BASED IN INDIA · {istTime}</span>
          </div>

          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow reveal">
                <span className="eyebrow-line" /> DESIGN-MINDED. DETAIL-OBSESSED.
              </p>
              <h1 className="hero-title">
                <span className="title-mask">
                  <span className="title-line reveal">I build</span>
                </span>
                <span className="title-mask">
                  <span className="title-line reveal delay-1">
                    digital <em>things</em>
                  </span>
                </span>
                <span className="title-mask">
                  <span className="title-line reveal delay-2">
                    that move<span className="title-period">.</span>
                  </span>
                </span>
              </h1>
              <div className="hero-bottom reveal delay-3">
                <p>
                  Thoughtful interfaces. Useful products.
                  <br />A little extra feeling in every pixel.
                </p>
                <a
                  className="round-link"
                  href="#work"
                  aria-label="Explore selected work"
                >
                  <span>↓</span>
                </a>
              </div>
            </div>

            <div
              className="hero-art reveal delay-2"
              aria-label="Abstract animated orbital graphic"
            >
              <div className="hero-orbit hero-orbit-1" />
              <div className="hero-orbit hero-orbit-2" />
              <div className="hero-orbit hero-orbit-3" />
              <div className="hero-star">✳</div>
              <div className="hero-orbit-label label-top">
                CREATIVE CODE / 2026
              </div>
              <div className="hero-orbit-label label-side">
                IDEAS INTO INTERFACES
              </div>
              <div className="hero-center">
                <span>G</span>
                <small>
                  BUILD
                  <br />
                  WITH INTENT
                </small>
              </div>
              <div className="hero-asterisk">✳</div>
            </div>
          </div>

          <div className="hero-footer reveal delay-3">
            <span>
              SCROLL TO EXPLORE <span className="scroll-line" />
            </span>
            <span>SELECTED WORK · 2024—26</span>
            <span className="hero-footer-right">
              INDEPENDENT BY NATURE <b>✳</b>
            </span>
          </div>
        </section>

        {/* Kinetic Ticker Ribbon */}
        <div className="ticker-wrap" aria-hidden="true">
          <div className="ticker-track">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div className="ticker-group" key={idx}>
                <span>REACT & TYPESCRIPT</span>
                <b>✳</b>
                <span>PRODUCT ENGINEERING</span>
                <b>✳</b>
                <span>MOTION SYSTEMS</span>
                <b>✳</b>
                <span>SUPABASE & TANSTACK</span>
                <b>✳</b>
                <span>CRAFTED INTERFACES</span>
                <b>✳</b>
              </div>
            ))}
          </div>
        </div>

        <section className="work-section section-wrap" id="work">
          <div className="section-heading reveal">
            <div>
              <p className="eyebrow">
                <span className="eyebrow-line" /> A FEW THINGS I’VE MADE
              </p>
              <h2>
                Selected <em>work</em>
                <span className="title-period">.</span>
              </h2>
            </div>
            <p className="section-intro">
              Different worlds, same approach:
              <br />
              make it useful, then make it feel right.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <InteractiveCard
                key={project.number}
                project={project}
                index={index}
                onOpen={setActiveProject}
              />
            ))}
          </div>

          <div className="work-end reveal">
            <span>FIVE PROJECTS. ONE CURIOSITY.</span>
            <span>
              MORE IDEAS IN THE WORKSHOP <b>↘</b>
            </span>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-inner section-wrap">
            <div className="about-left reveal">
              <p className="eyebrow">
                <span className="eyebrow-line" /> A BIT ABOUT ME
              </p>
              <h2>
                Curious by
                <br />
                default. <em>Builder</em>
                <br />
                by choice.
              </h2>
              <div className="about-stamp">
                MADE WITH
                <br />
                <span>INTENTION</span>
                <b>✳</b>
              </div>
            </div>

            <div className="about-right reveal delay-1">
              <p className="about-lead">
                Hey, I’m Gurnoor — I like turning ambitious ideas into digital
                experiences people can actually use.
              </p>
              <p className="about-body">
                I work across web interfaces, product flows, and the systems
                behind them. From aviation communities to ordering experiences
                and coaching platforms, I enjoy learning the shape of a problem
                and building something clear, capable, and considered.
              </p>
              <div className="skill-heading">
                <span>TOOLS & CRAFT</span>
                <span>ALWAYS LEARNING ↗</span>
              </div>
              <div className="skill-cloud">
                {skills.map((skill, i) => (
                  <span key={skill} style={{ "--i": i } as React.CSSProperties}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-kicker reveal">
            <span className="live-dot" /> OPEN TO GOOD IDEAS
          </div>
          <div className="contact-main reveal">
            <h2>
              Have a good
              <br />
              one in <em>mind?</em>
            </h2>
            <button
              ref={magneticBtnRef}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              className={`contact-circle ${copied ? "is-copied" : ""}`}
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              <span>{copied ? "COPIED!" : "LET’S TALK"}</span>
              <b>{copied ? "✓" : "↗"}</b>
            </button>
          </div>
          <div className="contact-footer reveal">
            <div>
              <span className="footer-label">START A CONVERSATION</span>
              <button className="email-button" onClick={copyEmail}>
                {copied ? "Copied to clipboard!" : EMAIL} <Arrow diagonal />
              </button>
            </div>
            <div className="footer-socials">
              <a
                href="https://github.com/Gurnoor1-dev"
                target="_blank"
                rel="noreferrer"
              >
                GITHUB <Arrow diagonal />
              </a>
              <a href={`mailto:${EMAIL}`}>
                EMAIL <Arrow diagonal />
              </a>
              <a href="#home">BACK TO TOP ↑</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand" href="#home">
          <span className="brand-mark">G.</span>
          <span>
            GURNOOR<span className="brand-reg">®</span>
          </span>
        </a>
        <span>DESIGNED WITH CURIOSITY. BUILT WITH CARE.</span>
        <span>© 2026 GURNOOR</span>
      </footer>

      {activeProject && (
        <div
          className="modal-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveProject(null);
          }}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              className="modal-close"
              onClick={() => setActiveProject(null)}
              aria-label="Close project details"
            >
              ×
            </button>
            <ProjectVisual project={activeProject} />
            <p className="project-eyebrow">
              {activeProject.number} / {activeProject.eyebrow}
            </p>
            <h2 id="modal-title">{activeProject.title}</h2>
            <p className="modal-description">{activeProject.description}</p>
            <div className="project-tags">
              {activeProject.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <a
              className="modal-repo"
              href={activeProject.repo}
              target="_blank"
              rel="noreferrer"
            >
              OPEN PROJECT REPOSITORY <Arrow diagonal />
            </a>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
