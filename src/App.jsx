import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { modules, pages, faqs } from "./data";
import { Demo } from "./Demo";
import {
  consent,
  setConsent,
  track,
  getEvents,
  clearEvents,
  downloadText,
  sampleReport,
} from "./utils";
import "./styles.css";
import "./refinement.css";
import { VisualStage, ChapterFigure, visualKind, routeTheme } from "./Visuals";
gsap.registerPlugin(ScrollTrigger);
export const I = ({ name, className = "" }) => (
  <img
    className={`icon ${className}`}
    src={`/assets/icons/${name}.svg`}
    width="20"
    height="20"
    alt=""
    aria-hidden="true"
  />
);
export const Button = ({ to, children, variant = "", onClick, ...props }) =>
  to ? (
    <Link className={`button ${variant}`} to={to} {...props}>
      {children}
      <I name="arrow-right" />
    </Link>
  ) : (
    <button className={`button ${variant}`} onClick={onClick} {...props}>
      {children}
      <I name="arrow-right" />
    </button>
  );
export const Badge = ({ children, tone = "info" }) => (
  <span className={`badge ${tone}`}>{children}</span>
);
export const DemoLabel = () => (
  <div className="demo-label">
    DEMO — SYNTHETIC DATA <span>CONCEPT PREVIEW</span>
  </div>
);
const Eyebrow = ({ children }) => (
  <p className="eyebrow">
    {children}
    <span />
  </p>
);
const Scene = ({ name, alt, className = "", eager = false }) => (
  <img
    className={`scene ${className}`}
    src={`/assets/${name}.webp`}
    alt={alt}
    loading={eager ? "eager" : "lazy"}
    fetchPriority={eager ? "high" : "auto"}
    width={name === "module-atlas" ? 1800 : name === "hero-atlas" ? 1536 : 1200}
    height={name === "module-atlas" ? 800 : name === "hero-atlas" ? 1024 : 900}
  />
);
const menuGroups = [
  {
    label: "Evidence",
    items: [
      [
        "The five proposed modules",
        "/products",
        "Identity, scope, behavior, review and change",
      ],
      [
        "Evidence workbench",
        "/platform",
        "One record with sources and next actions",
      ],
      [
        "Sample evidence pack",
        "/sample-evidence-pack",
        "Inspect the fictional report",
      ],
      ["How it works", "/how-it-works", "Consent to buyer decision"],
    ],
  },
  {
    label: "For buyers",
    items: [
      [
        "For marketplaces",
        "/solutions/marketplaces",
        "Listing and install-flow operators",
      ],
      [
        "For procurement",
        "/solutions/procurement",
        "Vendor-risk and purchase-gate reviewers",
      ],
      ["Ecosystem fit", "/integrations", "Dependencies, not live connections"],
      ["Pilot criteria", "/results", "What would count as validation"],
    ],
  },
  {
    label: "Independence",
    items: [
      [
        "Proposed independence policy",
        "/independence",
        "Funding, conflicts and assessor control",
      ],
      [
        "Evidence standard",
        "/evidence-standard",
        "Sources, protocols and review boundaries",
      ],
      [
        "Reviewer limits & revocation",
        "/review-limits",
        "What a report does and does not cover",
      ],
      ["About Vetting Harbor", "/about", "Research-stage mission and status"],
    ],
  },
];
function Header() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const header = useRef();
  const location = useLocation();
  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [location.pathname]);
  useEffect(() => {
    function close(e) {
      if (e.key === "Escape") {
        setOpen(null);
        setMobile(false);
        header.current?.querySelector(".nav-menu-toggle")?.focus();
      }
      if (e.type === "pointerdown" && !header.current?.contains(e.target)) {
        setOpen(null);
        setMobile(false);
      }
    }
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", close);
    };
  }, []);
  return (
    <header className="header" ref={header}>
      <div className="nav-wrap">
        <Link to="/" className="brand" aria-label="Vetting Harbor home">
          <img
            src="/assets/brand/horizontal-primary.svg"
            alt="Vetting Harbor"
            width="232"
            height="44"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {menuGroups.map((g, i) => (
            <div className="nav-item" key={g.label}>
              <button
                className="nav-menu-toggle"
                aria-expanded={open === i}
                aria-controls={`menu-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {g.label}
                <I name="chevron-down" />
              </button>
              {open === i && (
                <div className="mega-menu" id={`menu-${i}`}>
                  <div className="menu-note">
                    <Eyebrow>The Harbor Atlas</Eyebrow>
                    <p>
                      Start with the source.
                      <br />
                      Follow the evidence.
                    </p>
                    <Link to="/demo">
                      Open synthetic workspace <I name="arrow-up-right" />
                    </Link>
                  </div>
                  <div className="menu-links">
                    {g.items.map(([title, path, desc]) => (
                      <Link key={path} to={path}>
                        <strong>{title}</strong>
                        <span>{desc}</span>
                      </Link>
                    ))}
                    {i === 0 && (
                      <div className="menu-modules">
                        {modules.map((m) => (
                          <Link key={m.slug} to={`/products/${m.slug}`}>
                            {m.short} <I name="arrow-up-right" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
          <NavLink to="/pilot-pricing">Pilot pricing</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/sign-in" className="sign-in">
            Sign in
          </Link>
          <Button to="/sample-evidence-pack" variant="small">
            View sample pack
          </Button>
          <button
            className="menu-button"
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            aria-expanded={mobile}
            onClick={() => setMobile(!mobile)}
          >
            <I name={mobile ? "x" : "menu"} />
          </button>
        </div>
      </div>
      {mobile && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {menuGroups.map((g) => (
            <div key={g.label}>
              <h2>{g.label}</h2>
              {g.items.map(([title, path]) => (
                <Link key={path} to={path}>
                  {title}
                  <I name="arrow-up-right" />
                </Link>
              ))}
            </div>
          ))}
          <Link to="/pilot-pricing">Pilot pricing</Link>
          <Link to="/pilot">Prepare a pilot discussion</Link>
          <Link to="/sign-in">Sign in / demo access</Link>
        </nav>
      )}
    </header>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <Link to="/" aria-label="Vetting Harbor home">
          <img
            src="/assets/brand/horizontal-primary.svg"
            alt="Vetting Harbor"
            width="230"
            height="44"
          />
        </Link>
        <p>A more open agent economy.</p>
        <Button to="/pilot" variant="outline">
          Discuss a pilot
        </Button>
      </div>
      <div className="footer-map">
        <div>
          <h3>Proposed modules</h3>
          <Link to="/products">All five proposed modules</Link>
          {modules.map((m) => (
            <Link key={m.slug} to={`/products/${m.slug}`}>
              {m.name.replace("Vetting Harbor ", "")}
            </Link>
          ))}
        </div>
        <div>
          <h3>Explore</h3>
          {[
            ["Why version evidence", "/why-version-evidence"],
            ["Platform", "/platform"],
            ["How it works", "/how-it-works"],
            ["Solutions overview", "/solutions"],
            ["Ecosystem fit", "/integrations"],
            ["For marketplaces", "/solutions/marketplaces"],
            ["For procurement", "/solutions/procurement"],
            ["Pilot pricing", "/pilot-pricing"],
            ["Synthetic workspace", "/demo"],
          ].map(([t, p]) => (
            <Link key={p} to={p}>
              {t}
            </Link>
          ))}
        </div>
        <div>
          <h3>Evidence & governance</h3>
          {[
            ["Evidence standard", "/evidence-standard"],
            ["Independence policy", "/independence"],
            ["Reviewer limits", "/review-limits"],
            ["Sample evidence pack", "/sample-evidence-pack"],
            ["Research & resources", "/resources"],
            ["Pilot criteria", "/results"],
          ].map(([t, p]) => (
            <Link key={p} to={p}>
              {t}
            </Link>
          ))}
        </div>
        <div>
          <h3>Company</h3>
          {[
            ["About", "/about"],
            ["Contact", "/contact"],
            ["Privacy", "/privacy"],
            ["Terms", "/terms"],
            ["Sign in", "/sign-in"],
          ].map(([t, p]) => (
            <Link key={p} to={p}>
              {t}
            </Link>
          ))}
          <address className="company-address">
            224/22 Pham Van Hai Street<br />
            Ward 5, Tan Binh District<br />
            Ho Chi Minh City 790935<br />
            Vietnam
          </address>
          <div className="socials">
            <span aria-label="LinkedIn company profile not yet published">
              <img
                src="/assets/icons/linkedin.svg"
                width="20"
                height="20"
                alt=""
              />
              LinkedIn <small>Not published</small>
            </span>
            <span aria-label="Crunchbase company profile not yet published">
              <img
                src="/assets/icons/crunchbase.png"
                width="20"
                height="20"
                alt=""
              />
              Crunchbase <small>Not published</small>
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <small>© 2026 Vetting Harbor · Proposed brand</small>
        <small>Research-stage concept. Demand and pricing unvalidated.</small>
        <button
          className="text-button"
          onClick={() => window.dispatchEvent(new Event("vh-open-consent"))}
        >
          Privacy preferences
        </button>
      </div>
    </footer>
  );
}
function Motion({ enabled }) {
  const location = useLocation();
  useEffect(() => {
    document.title = `${location.pathname === "/" ? "Version-specific agent evidence" : location.pathname.split("/").filter(Boolean).join(" · ").replaceAll("-", " ")} — Vetting Harbor`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta)
      meta.content =
        "Version-specific evidence for third-party agent purchase decisions. Explore the Vetting Harbor research-stage concept and synthetic demo.";
    const hash = location.hash;
    const timer = setTimeout(() => {
      if (hash) document.querySelector(hash)?.scrollIntoView();
      else window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "enabled" : "paused";
    if (
      !enabled ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, anchors: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    const progressTracks = [];
    const mm = gsap.matchMedia();
    let ctx = gsap.context(() => {
      if (!document.querySelector("#main.public-page")) return;
      gsap.utils.toArray("#main [data-reveal]").forEach((el) => {
        const direction = el.dataset.reveal;
        gsap.from(el, {
          y: direction === "up" ? 26 : 0,
          x: direction === "left" ? -26 : direction === "right" ? 26 : 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true },
        });
      });
      const sections = [
        ...document.querySelectorAll("#main.public-page > section"),
      ];
      sections.forEach((section) => {
        section.dataset.scrollSection = "true";
        const track = document.createElement("div");
        track.className = "chapter-progress-track";
        track.setAttribute("aria-hidden", "true");
        track.innerHTML = "<span></span>";
        section.appendChild(track);
        progressTracks.push(track);
        gsap.fromTo(
          section,
          { "--chapter-progress": 0 },
          {
            "--chapter-progress": 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 90%",
              end: "bottom 30%",
              scrub: true,
            },
          },
        );
      });
      mm.add("(min-width: 701px)", () => {
        sections.forEach((section, sectionIndex) => {
          const heading = section.querySelector("h1, h2");
          if (heading)
            gsap.fromTo(
              heading,
              { y: 12 },
              {
                y: -12,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          const pieces = [
            ...section.querySelectorAll(
              "[data-motion-piece], .price-card, .lane-flow > span, .process-steps > li, .form-panel, .module-steps > li, .editorial-sections article, .faq-section details",
            ),
          ];
          pieces.forEach((piece, index) => {
            const levelCard = piece.matches(
              ".life-stamp, .hero-version-strip, .identity-main, .identity-note, .review-slip, .purchase-memo",
            );
            const distance =
              sectionIndex % 3 === 0 ? 30 : sectionIndex % 3 === 1 ? 22 : 38;
            gsap.fromTo(
              piece,
              {
                ...(levelCard ? { rotation: 0 } : {}),
                y: distance + (index % 3) * 12,
                x: sectionIndex % 2 ? (index % 2 ? 14 : -14) : 0,
              },
              {
                ...(levelCard ? { rotation: 0 } : {}),
                y: -5,
                x: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: piece,
                  start: "top 95%",
                  end: "top 32%",
                  scrub: 0.6,
                },
              },
            );
          });
        });
        document.querySelectorAll("[data-flow-line]").forEach((path) => {
          const length = path.getTotalLength();
          gsap.fromTo(
            path,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: {
                trigger: path.closest(".visual-stage"),
                start: "top 85%",
                end: "bottom 40%",
                scrub: 0.5,
              },
            },
          );
        });
        if (document.querySelector(".hero-scene"))
          gsap.to(".hero-scene", {
            y: 55,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        if (document.querySelector(".atlas-scene"))
          gsap.fromTo(
            ".atlas-scene",
            { x: -18 },
            {
              x: 18,
              ease: "none",
              scrollTrigger: {
                trigger: ".offers",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    document.addEventListener("toggle", refresh, true);
    const timer = requestAnimationFrame(refresh);
    return () => {
      cancelAnimationFrame(timer);
      document.removeEventListener("toggle", refresh, true);
      mm.revert();
      ctx.revert();
      progressTracks.forEach((track) => track.remove());
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, [location.pathname, enabled]);
  return null;
}
function FAQ() {
  return (
    <div className="faq-list">
      {faqs.map(([q, a]) => (
        <details key={q}>
          <summary>
            {q}
            <I name="plus" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
function CompareStory() {
  const steps = [
    [
      "Publisher",
      "Start with a named source.",
      "Clearpath Agents is a fictional publisher. Documentation status is explicitly sample, and ownership is bound to the submitted record.",
    ],
    [
      "Version",
      "The v1.2 review stops at v1.2.",
      "A current v1.3 submission is a new subject for review. The earlier report remains a historical source.",
    ],
    [
      "Scope",
      "One additional permission.",
      "v1.2 asks for read:tickets. v1.3 adds write:contacts, extending the requested scope into a write action.",
    ],
    [
      "Tests",
      "The new action is not tested.",
      "A read-only protocol cannot answer a contact-write question. No v1.3 contact-write test has been run in this synthetic example.",
    ],
    [
      "Lifecycle",
      "Keep the states distinct.",
      "A changed version, an expired report and a revoked report mean different things. Each needs its own reason and next action.",
    ],
    [
      "Buyer",
      "Make the next step explicit.",
      "Agree a version-specific test boundary and your acceptance criteria. A human reviewer and buyer remain responsible for the decision.",
    ],
  ];
  const [index, setIndex] = useState(0);
  const chapter = useRef();
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 901 ||
      window.innerHeight < 651
    )
      return;
    const trigger = ScrollTrigger.create({
      trigger: chapter.current,
      start: "top 100",
      end: "bottom bottom",
      onUpdate: (s) => {
        if (document.documentElement.dataset.motion !== "paused")
          setIndex(Math.min(5, Math.floor(s.progress * 6)));
      },
    });
    return () => trigger.kill();
  }, []);
  return (
    <section className="compare-story" id="version-story" ref={chapter}>
      <div className="compare-sticky">
        <div className="compare-heading">
          <Eyebrow>02 / Unfold the difference</Eyebrow>
          <h2>
            Same agent.
            <br />
            <em>A different scope.</em>
          </h2>
          <p>The v1.2 review does not cover v1.3.</p>
          <div className="story-tabs" aria-label="Version story steps">
            {steps.map(([label], i) => (
              <button
                key={label}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >
                {String(i + 1).padStart(2, "0")} <span>{label}</span>
              </button>
            ))}
          </div>
          <div className="story-explanation" aria-live="polite">
            <h3>{steps[index][1]}</h3>
            <p>{steps[index][2]}</p>
          </div>
          <Link className="text-link" to="/demo/reviews/CP-013/diff">
            Inspect the full version diff <I name="arrow-right" />
          </Link>
          <a className="skip-link-inline" href="#offers">
            Skip to the five modules ↓
          </a>
        </div>
        <div className="compare-visual">
          <Scene
            name="version-folios"
            alt="Synthetic Clearpath Agents v1.2 and v1.3 paper manifests, with an added write:contacts permission highlighted"
          />
          <DemoLabel />
          <div className="scope-delta">
            <span>v1.2 · read:tickets</span>
            <I name="arrow-right" />
            <span className="added">v1.3 · + write:contacts</span>
          </div>
          <Badge tone="warning">Added scope · Not tested</Badge>
        </div>
      </div>
    </section>
  );
}
function Offers() {
  const [active, setActive] = useState(0);
  const atlas = useRef();
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.innerWidth < 901
    )
      return;
    const t = ScrollTrigger.create({
      trigger: atlas.current,
      start: "top 60%",
      end: "bottom 70%",
      onUpdate: (s) => {
        if (document.documentElement.dataset.motion !== "paused")
          setActive(Math.min(4, Math.floor(s.progress * 5)));
      },
    });
    return () => t.kill();
  }, []);
  return (
    <section className="offers" id="offers" ref={atlas}>
      <div className="container">
        <div className="section-heading" data-reveal="up">
          <Eyebrow>03 / Five questions. Five proposed modules.</Eyebrow>
          <h2>
            Start with the source.
            <br />
            Follow every question.
          </h2>
          <p>Distinct offers to test. Select one for the first pilot.</p>
        </div>
        <div className="module-tabs" aria-label="Proposed modules">
          {modules.map((m, i) => (
            <button
              key={m.slug}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <span className="number">{i + 1}</span>
              <strong>{m.short}</strong>
              <span>{m.question}</span>
            </button>
          ))}
        </div>
        <Scene
          className="atlas-scene"
          name="module-atlas"
          alt="Five synthetic evidence stations connected by a sage route: Identity, Scope, Behavior, Review and Change"
        />
        <div className="module-feature" data-reveal="left">
          <div>
            <small>Proposed module {active + 1} / 5</small>
            <h3>{modules[active].name}</h3>
          </div>
          <p>{modules[active].description}</p>
          <Link className="text-link" to={`/products/${modules[active].slug}`}>
            Explore {modules[active].short.toLowerCase()}
            <I name="arrow-up-right" />
          </Link>
        </div>
        <div className="all-module-links">
          {modules.map((m) => (
            <Link key={m.slug} to={`/products/${m.slug}`}>
              <I name={m.icon} />
              <span>{m.name}</span>
              <I name="arrow-up-right" />
            </Link>
          ))}
        </div>
        <p className="caption">
          All five are proposed directions, not live services. No attestation or
          monitoring is operating.
        </p>
      </div>
    </section>
  );
}
function Governance({ compact = false }) {
  return (
    <section className="governance" id="independence">
      <div className="container governance-grid">
        <div className="governance-copy" data-reveal="left">
          <Eyebrow>06 / The review relationship</Eyebrow>
          <h2>
            Evidence you can inspect.
            <br />
            <em>Limits you can see.</em>
          </h2>
          <p>
            Different perspectives, the same source material. Keep publisher,
            assessor and buyer responsibilities visible.
          </p>
          <Button to="/independence" variant="wine">
            Explore the independence policy
          </Button>
          <p className="caption">
            Proposed governance · no universal safety certification
          </p>
        </div>
        <div className="governance-art" data-reveal="right">
          <Scene
            name="open-report"
            alt="Synthetic open evidence report with overview, permission, test, change and source tabs"
          />
          <div className="roles">
            {[
              ["user-round", "Publisher", "Provides consented documentation"],
              [
                "files",
                "Independent assessor",
                "Tests and records findings · proposed",
              ],
              ["eye", "Buyer", "Uses evidence in its own decision"],
            ].map(([icon, title, desc]) => (
              <div key={title}>
                <I name={icon} />
                <div>
                  <strong>{title}</strong>
                  <span>{desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="container disclosure-row">
        <p>
          <I name="file-text" />
          <span>
            <strong>Assessor controls findings</strong>Proposed recusal and
            challenge policy.
          </span>
        </p>
        <p>
          <I name="eye" />
          <span>
            <strong>Funding disclosures required</strong>Explain payers and
            financial relationships.
          </span>
        </p>
      </div>
    </section>
  );
}
export function Pricing({ full = false }) {
  const Heading = full ? "h1" : "h2";
  useEffect(() => {
    if (full) track("pricing_view", "public-preview");
  }, [full]);
  return (
    <section className="pricing" id="pricing">
      <div className="container">
        <div className="section-heading" data-reveal="up">
          <Eyebrow>08 / Pilot pricing hypotheses</Eyebrow>
          <Heading>
            A focused study.
            <br />
            <em>A useful commitment.</em>
          </Heading>
          <p>
            Test prices for discussion. No checkout, active subscription or
            accepted willingness to pay.
          </p>
        </div>
        {full && <VisualStage kind="pricing" compact />}
        <div className="price-grid">
          <article className="price-card" data-reveal="left">
            <small>ONE LISTING / MANUAL STUDY</small>
            <h3>
              $2,500 <span>per reviewed listing study</span>
            </h3>
            <p>
              Test one version-specific evidence pack against an agreed buyer
              decision.
            </p>
            <ul>
              <li>A consenting publisher and exact version</li>
              <li>One proposed module selected for evaluation</li>
              <li>Source-linked report and reviewer limits</li>
              <li>Buyer workshop on evidence acceptance</li>
            </ul>
            <Button to="/pilot?offer=listing">Discuss a listing study</Button>
            <Badge tone="warning">
              Hypothetical price · not an active offer
            </Badge>
          </article>
          <article className="price-card sage" data-reveal="right">
            <small>MARKETPLACE / DISTRIBUTION PILOT</small>
            <h3>
              $1,500 <span>per month · pilot hypothesis</span>
            </h3>
            <p>
              Explore evidence use inside an actual listing, install or
              procurement gate.
            </p>
            <ul>
              <li>Named marketplace workflow and sponsor</li>
              <li>Two consenting publishers for sample packs</li>
              <li>Agreed review criteria and independence</li>
              <li>Change-notification design exploration</li>
            </ul>
            <Button to="/pilot?offer=marketplace" variant="wine">
              Discuss a marketplace pilot
            </Button>
            <Badge tone="warning">Hypothetical price · scope to agree</Badge>
          </article>
        </div>
        <p className="pricing-note">
          Manual evidence packs first. Monitoring and procurement integrations
          later, if distribution and independence are validated. Seller-funded
          studies require an explicit conflict policy.
        </p>
        {!full && (
          <Link
            className="text-link"
            to="/pilot-pricing"
            onClick={() => track("pricing_view", "public-preview")}
          >
            Read the pricing assumptions <I name="arrow-right" />
          </Link>
        )}
        {full && <FAQ />}
      </div>
    </section>
  );
}
function Home() {
  const videoRef = useRef(null);
  const originalHeroRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [introFinished, setIntroFinished] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.sessionStorage.getItem("vh-harbor-intro-finished") === "true"
      );
    } catch {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
  });
  useEffect(() => {
    track("landing_view", "public-preview");
  }, []);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finishForReducedMotion = (event) => {
      if (event.matches) setIntroFinished(true);
    };
    preference.addEventListener?.("change", finishForReducedMotion);
    return () => preference.removeEventListener?.("change", finishForReducedMotion);
  }, []);
  useEffect(() => {
    if (!introFinished) return;
    const timeout = window.setTimeout(() => {
      originalHeroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 450);
    return () => window.clearTimeout(timeout);
  }, [introFinished]);
  useEffect(() => {
    if (introFinished || videoReady) return;
    const timeout = window.setTimeout(finishIntro, 3500);
    return () => window.clearTimeout(timeout);
  }, [introFinished, videoReady]);
  const finishIntro = () => {
    if (introFinished) return;
    setIntroFinished(true);
    try {
      window.sessionStorage.setItem("vh-harbor-intro-finished", "true");
    } catch {
      // The page still works when browser storage is unavailable.
    }
    videoRef.current?.pause();
  };
  return (
    <>
      <section className={`harbor-intro${introFinished ? " is-finished" : ""}`} aria-label="Vetting Harbor introduction">
        <video
          className="hero-intro-video"
          ref={videoRef}
          autoPlay={!introFinished}
          muted
          playsInline
          preload="auto"
          poster="/assets/harbor-intro-poster.jpg"
          aria-hidden="true"
          tabIndex={-1}
          onEnded={finishIntro}
          onError={finishIntro}
          onLoadedData={() => setVideoReady(true)}
          onLoadedMetadata={(event) => {
            if (introFinished && Number.isFinite(event.currentTarget.duration))
              event.currentTarget.currentTime = event.currentTarget.duration;
          }}
        >
          <source src="/assets/harbor-intro.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-shade" aria-hidden="true" />
        {!introFinished && (
          <button
            className="hero-intro-skip"
            type="button"
            onClick={() => {
              finishIntro();
              requestAnimationFrame(() =>
                document.querySelector("#home-hero .button")?.focus({
                  preventScroll: true,
                }),
              );
            }}
          >
            Skip intro <span aria-hidden="true">↗</span>
          </button>
        )}
        <div className="harbor-intro-caption" aria-hidden="true">
          <span>VETTING HARBOR · A RESEARCH-STAGE CONCEPT</span>
          <p>Follow the evidence.<br /><em>See what changed.</em></p>
        </div>
        <a className="harbor-intro-cue" href="#home-hero">
          {introFinished ? "Enter Vetting Harbor" : "The harbor is opening"}
          <span aria-hidden="true">↓</span>
        </a>
      </section>
      <aside className="funding-announcement" aria-label="Funding announcement">
        <span>Company update</span>
        <p>Vetting Harbor has secured venture capital funding. Investor and amount to be announced.</p>
      </aside>
      <section className="hero" id="home-hero" ref={originalHeroRef}>
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">RESEARCH-STAGE CONCEPT / VETTING HARBOR</p>
            <h1>See what changed.<br />Decide what’s next.</h1>
            <p className="lead">
              Version-specific evidence for third-party
              <br className="desktop-br" /> agent purchase decisions.
            </p>
            <Button to="/sample-evidence-pack">Review a sample evidence pack</Button>
            <Link className="hero-secondary" to="/demo">
              Explore the synthetic workspace <I name="arrow-up-right" />
            </Link>
            <DemoLabel />
            <p className="hero-note">More context.<br /><em>A clearer conversation.</em></p>
          </div>
          <img className="hero-scene" src="/assets/hero-atlas.webp" alt="A fictional evidence journey connecting publisher identity, version scope, tests and a review report" />
          <div className="hero-version-strip" data-motion-piece>
            <span>Reviewed v1.2</span>
            <I name="arrow-right" />
            <strong>v1.3 · + write:contacts</strong>
            <small>Sample · not tested</small>
          </div>
        </div>
        <div className="hero-bottom">
          <span>For marketplace operators & procurement reviewers</span>
          <a href="#why">Follow the evidence <I name="arrow-right" /></a>
        </div>
      </section>
      <section className="why container" id="why">
        <div data-reveal="left">
          <Eyebrow>01 / A version changes the question</Eyebrow>
          <h2>
            A small update can
            <br />
            ask a bigger question.
          </h2>
        </div>
        <div className="why-right">
          <VisualStage kind="delta" compact />
          <div className="scope-delta">
            <span>v1.2: read:tickets</span>
            <I name="arrow-right" />
            <span className="added">v1.3: + write:contacts</span>
          </div>
          <p>
            A marketplace listing or an old review may not explain the current
            version’s permissions, behavior or evidence age.
          </p>
          <Link className="text-link" to="/why-version-evidence">
            Why the version matters <I name="arrow-up-right" />
          </Link>
        </div>
      </section>
      <CompareStory />
      <Offers />
      <section className="buyers container" id="buyers">
        <div className="section-heading" data-reveal="up">
          <Eyebrow>04 / Two buyers. One evidence conversation.</Eyebrow>
          <h2>
            Meet the decision
            <br />
            where it happens.
          </h2>
        </div>
        <div className="buyer-lanes">
          <article data-reveal="left">
            <span className="lane-label">01 / MARKETPLACE OPERATOR</span>
            <h3>
              At the listing.
              <br />
              Before the install.
            </h3>
            <p>
              Put version-specific evidence inside the flow you own. Agree the
              review standard, publisher consent and what happens when scope
              changes.
            </p>
            <div className="lane-flow">
              <span>Publisher</span>
              <I name="arrow-right" />
              <span>Review evidence</span>
              <I name="arrow-right" />
              <span>Listing gate</span>
            </div>
            <Button to="/solutions/marketplaces" variant="outline">
              For marketplaces
            </Button>
          </article>
          <article data-reveal="right">
            <span className="lane-label">02 / PROCUREMENT & VENDOR RISK</span>
            <h3>
              At the purchase gate.
              <br />
              Before authorizing scope.
            </h3>
            <p>
              Inspect the source, tested actions and limits before relying on a
              report. Your team defines acceptance; the report supports the
              discussion.
            </p>
            <div className="lane-flow">
              <span>Report</span>
              <I name="arrow-right" />
              <span>Reviewer</span>
              <I name="arrow-right" />
              <span>Buyer decision</span>
            </div>
            <Button to="/solutions/procurement" variant="outline">
              For procurement
            </Button>
          </article>
        </div>
      </section>
      <section className="process" id="process">
        <div className="container">
          <div className="process-intro" data-reveal="up">
            <Eyebrow>05 / A traceable process</Eyebrow>
            <h2>
              Evidence in.
              <br />
              <em>A documented next step out.</em>
            </h2>
            <Link className="text-link" to="/how-it-works">
              See the proposed workflow <I name="arrow-up-right" />
            </Link>
          </div>
          <ol className="process-steps">
            {[
              [
                "Agree the boundary",
                "Buyer criteria, marketplace access and publisher consent come first.",
              ],
              [
                "Bind the source",
                "Identity documents, manifest and exact version enter one record.",
              ],
              [
                "Record the test",
                "Keep protocol, environment and inconclusive outcomes visible.",
              ],
              [
                "Review the pack",
                "An assessor records findings; a human buyer owns the decision.",
              ],
            ].map(([t, d], i) => (
              <li key={t} data-reveal={i % 2 ? "right" : "left"}>
                <span>0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Governance />
      <section className="lifecycle container">
        <div className="section-heading" data-reveal="up">
          <Eyebrow>07 / Evidence has a lifecycle</Eyebrow>
          <h2>
            Changed. Expired. Revoked.
            <br />
            <em>Three different conversations.</em>
          </h2>
        </div>
        <Lifecycle />
        <Link className="text-link" to="/review-limits">
          Read the precise review limits <I name="arrow-right" />
        </Link>
      </section>
      <Pricing />
      <section className="pilot-home">
        <div className="container pilot-grid">
          <div data-reveal="left">
            <Eyebrow>09 / The next piece of evidence</Eyebrow>
            <h2>
              A real workflow.
              <br />
              <em>Two consenting publishers.</em>
            </h2>
            <p>
              We’re testing whether a marketplace or procurement team will use
              version-bound evidence in an actual decision.
            </p>
            <ul className="check-list">
              <li>Named review criteria</li>
              <li>Listing / install access or a purchase gate</li>
              <li>Explicit evidence-use agreement</li>
              <li>Independent review governance</li>
            </ul>
            <Link className="text-link" to="/results">
              Read the experiment’s stop / go criteria <I name="arrow-right" />
            </Link>
          </div>
          <LeadForm compact />
        </div>
      </section>
      <section className="faq-section container" data-reveal="up">
        <Eyebrow>10 / Questions worth asking</Eyebrow>
        <h2>A little more context.</h2>
        <FAQ />
      </section>
    </>
  );
}
export function Lifecycle() {
  const [state, setState] = useState("Changed version");
  const content = {
    "Changed version": [
      "info",
      "Current v1.3 · needs review",
      "The v1.2 report remains historical evidence. write:contacts in v1.3 is not tested. No automatic revocation.",
      "Next: agree a v1.3 test boundary.",
    ],
    Expired: [
      "warning",
      "v1.2 report · expired",
      "Separate sample scenario: validity ended 09 Oct 2026. An expiry says the declared period ended, not that an unsafe action was observed.",
      "Next: agree renewed evidence and review dates.",
    ],
    Revoked: [
      "danger",
      "v1.2 report · revoked",
      "Separate sample scenario: issuer withdrew the report on 09 Oct 2026 because protocol provenance was incomplete. Findings remain visible as withdrawn.",
      "Next: resolve provenance before relying on the report.",
    ],
  };
  const [tone, title, body, next] = content[state];
  return (
    <div className="lifecycle-panel">
      <div className="segmented" aria-label="Sample lifecycle scenarios">
        {Object.keys(content).map((v) => (
          <button
            key={v}
            aria-pressed={state === v}
            onClick={() => setState(v)}
          >
            {v}
          </button>
        ))}
      </div>
      <div className="life-content" aria-live="polite">
        <div>
          <DemoLabel />
          <h3>{title}</h3>
          <p>{body}</p>
          <strong>{next}</strong>
        </div>
        <div className="life-stamp">
          <I
            name={
              state === "Revoked"
                ? "circle-x"
                : state === "Expired"
                  ? "clock"
                  : "git-branch"
            }
          />
          <Badge tone={tone}>{state}</Badge>
          <span>
            Fixed sample clock
            <br />
            10 Oct 2026 · 12:00 UTC
          </span>
        </div>
      </div>
    </div>
  );
}
export function LeadForm({ compact = false, contact = false }) {
  const [started, setStarted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState(() => ({
    email: "",
    company: "",
    role: "",
    module:
      modules.find(
        (m) => m.slug === new URLSearchParams(location.search).get("module"),
      )?.name || "",
    prompt: "",
    consent: false,
    interview: false,
  }));
  const [busy, setBusy] = useState(false);
  const form = useRef();
  const successTitle = useRef();
  useEffect(() => {
    if (success) {
      form.current?.scrollIntoView({ block: "center", behavior: "auto" });
      successTitle.current?.focus({ preventScroll: true });
    }
  }, [success]);
  function change(e) {
    if (!started) {
      track("form_start", "public-preview", contact ? "contact" : "pilot");
      setStarted(true);
    }
    setData({
      ...data,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: null });
  }
  function submit(e) {
    e.preventDefault();
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = "Enter a valid work email.";
    if (!data.company.trim())
      next.company = "Enter your company or organization.";
    if (!data.role) next.role = "Choose your role.";
    if (!data.prompt.trim()) next.prompt = "Describe your decision workflow.";
    if (!data.consent) next.consent = "Acknowledge the preview privacy notice.";
    setErrors(next);
    if (Object.keys(next).length) {
      setTimeout(
        () => form.current?.querySelector('[aria-invalid="true"]')?.focus(),
        0,
      );
      return;
    }
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSuccess(true);
      track("form_submit", "public-preview", `draft-${crypto.randomUUID()}`);
    }, 400);
  }
  function save() {
    downloadText(
      "vetting-harbor-pilot-draft.txt",
      `LOCAL PREVIEW DRAFT — NOT SENT\n${data.company}\nWork email: ${data.email}\nRole: ${data.role}\nModule: ${data.module || "To agree"}\nDecision workflow: ${data.prompt}\nInterview opt-in: ${data.interview}\nPrivacy acknowledgement: ${data.consent}\nNo lead has been sent, verified or booked.`,
    );
  }
  return (
    <div className="form-panel" ref={form}>
      {success ? (
        <div className="form-success" role="status">
          <I name="check" />
          <Eyebrow>Preview completed</Eyebrow>
          <h3 ref={successTitle} tabIndex={-1}>
            Your pilot draft is ready.
          </h3>
          <p>
            This form is a local preview. Your details have not been sent or
            stored on a server. Download your draft for a future discussion.
          </p>
          <Button onClick={save}>Download your draft</Button>
          <button className="text-button" onClick={() => setSuccess(false)}>
            Edit the draft
          </button>
          <p className="caption">
            No verified signup or interview booking has occurred.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <h3>
            {contact ? "Prepare a contact note" : "Prepare a pilot discussion"}
          </h3>
          <p className="form-disclosure">
            Local preview · no submission is sent. Do not include secrets,
            contracts or logs.
          </p>
          <div className="form-field">
            <label htmlFor={`${contact ? "c" : "p"}-email`}>
              Work email <span>Required</span>
            </label>
            <input
              id={`${contact ? "c" : "p"}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={data.email}
              onChange={change}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <small className="error" id="email-error">
                {errors.email}
              </small>
            )}
          </div>
          <div className="form-two">
            <div className="form-field">
              <label htmlFor="company">
                Company <span>Required</span>
              </label>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                value={data.company}
                onChange={change}
                aria-invalid={!!errors.company}
                aria-describedby={errors.company ? "company-error" : undefined}
              />
              {errors.company && (
                <small className="error" id="company-error">
                  {errors.company}
                </small>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="role">
                Your role <span>Required</span>
              </label>
              <select
                id="role"
                name="role"
                value={data.role}
                onChange={change}
                aria-invalid={!!errors.role}
                aria-describedby={errors.role ? "role-error" : undefined}
              >
                <option value="">Choose a role</option>
                <option>Marketplace operator</option>
                <option>Procurement / vendor risk</option>
                <option>Security reviewer</option>
                <option>Agent publisher</option>
                <option>Other</option>
              </select>
              {errors.role && (
                <small className="error" id="role-error">
                  {errors.role}
                </small>
              )}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="module">
              Proposed module <span>Optional</span>
            </label>
            <select
              id="module"
              name="module"
              value={data.module}
              onChange={change}
            >
              <option value="">Select together in discussion</option>
              {modules.map((m) => (
                <option key={m.slug}>{m.name}</option>
              ))}
            </select>
          </div>
          <div className="form-field">
            <label htmlFor="prompt">
              {contact
                ? "What would you like to discuss?"
                : "Where would your team use this evidence?"}{" "}
              <span>Required</span>
            </label>
            <textarea
              id="prompt"
              name="prompt"
              rows="3"
              maxLength="1000"
              value={data.prompt}
              onChange={change}
              aria-invalid={!!errors.prompt}
              aria-describedby={errors.prompt ? "prompt-error" : undefined}
              placeholder="Listing or install flow / purchase gate, accepted review standard, and whether two publishers could consent to testing."
            />
            {errors.prompt && (
              <small className="error" id="prompt-error">
                {errors.prompt}
              </small>
            )}
          </div>
          <label className="checkbox">
            <input
              name="interview"
              type="checkbox"
              checked={data.interview}
              onChange={change}
            />
            <span>
              I would be open to a research interview.{" "}
              <small>Optional · no interview is booked here.</small>
            </span>
          </label>
          <label className="checkbox">
            <input
              name="consent"
              type="checkbox"
              checked={data.consent}
              onChange={change}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "consent-error" : undefined}
            />
            <span>
              I understand this is a local draft and acknowledge the{" "}
              <Link to="/privacy">preview privacy notice</Link>. Required.
            </span>
          </label>
          {errors.consent && (
            <small className="error" id="consent-error">
              {errors.consent}
            </small>
          )}
          <button className="button" type="submit" disabled={busy}>
            {busy ? "Preparing…" : "Prepare my pilot draft"}
            <I name="arrow-right" />
          </button>
          <p className="caption">
            Details stay in this tab’s memory until you leave or reload. You
            control any downloaded draft.
          </p>
        </form>
      )}
    </div>
  );
}
function StandardPage({ data }) {
  const location = useLocation();
  const kind = visualKind(location.pathname);
  return (
    <>
      <section className="page-hero container">
        <div data-reveal="left">
          <Eyebrow>{data.eyebrow}</Eyebrow>
          <h1>
            {data.title.split("\n").map((t, i) => (
              <span key={i}>
                {t}
                <br />
              </span>
            ))}
          </h1>
          <p className="lead">{data.intro}</p>
          <Button
            to={
              {
                delta: "/demo/reviews/CP-013/diff",
                workbench: "/demo",
                workflow: "/sample-evidence-pack",
                schema: "/sample-evidence-pack",
                governance: "/pilot",
                boundary: "/demo/reviews/CP-013/lifecycle",
                harbor: "/results",
                ecosystem: "/pilot",
                experiment: "/pilot",
                listing: "/pilot",
                purchase: "/pilot",
              }[kind] || "/sample-evidence-pack"
            }
          >
            {data.cta || "Explore the synthetic workspace"}
          </Button>
        </div>
        <div className="page-art" data-reveal="right">
          <VisualStage kind={kind} />
        </div>
      </section>
      <section className="page-body container">
        <div className="page-aside">
          <Eyebrow>In this chapter</Eyebrow>
          {data.sections.map(([t], i) => (
            <a key={t} href={`#section-${i}`}>
              {t}
            </a>
          ))}
          <Link className="text-link" to="/sample-evidence-pack">
            Read the sample pack <I name="arrow-up-right" />
          </Link>
        </div>
        <div className="editorial-sections">
          {data.sections.map(([title, body], i) => (
            <article
              id={`section-${i}`}
              key={title}
              data-reveal={i % 2 ? "right" : "left"}
            >
              <span className="section-index">0{i + 1}</span>
              <h2>{title}</h2>
              <p>{body}</p>
              <ChapterFigure kind={kind} index={i} title={title} />
              {title === "Existing review is real" && (
                <p className="source-links">
                  <a
                    href="https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-how-it-works.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Salesforce review documentation ↗
                  </a>
                  <a
                    href="https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-agent-store"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Microsoft Agent Store documentation ↗
                  </a>
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
      {data.eyebrow === "Assurance boundaries" && (
        <section className="container section-space">
          <Lifecycle />
        </section>
      )}
      <PageCTA />
    </>
  );
}
function PageCTA() {
  return (
    <section className="page-cta container" data-reveal="up">
      <div>
        <Eyebrow>See the evidence for yourself</Eyebrow>
        <h2>Start with one sample.</h2>
      </div>
      <Button to="/sample-evidence-pack">Review a sample evidence pack</Button>
    </section>
  );
}
function Products() {
  return (
    <>
      <section className="portfolio-hero container">
        <Eyebrow>The five proposed offers</Eyebrow>
        <h1>
          Five questions.
          <br />
          <em>One evidence record.</em>
        </h1>
        <p className="lead">
          Each module has a distinct job. The first pilot selects one; the suite
          is a product hypothesis, not five live services.
        </p>
        <VisualStage kind="module-map" />
      </section>
      <section className="product-list container">
        {modules.map((m, i) => (
          <article key={m.slug} data-reveal={i % 2 ? "right" : "left"}>
            <span className="number">{i + 1}</span>
            <div>
              <Eyebrow>Proposed module / {m.short}</Eyebrow>
              <h2>{m.name}</h2>
              <p>{m.description}</p>
              <Link className="text-link" to={`/products/${m.slug}`}>
                {m.question}
                <I name="arrow-right" />
              </Link>
            </div>
            <VisualStage kind={m.slug} compact />
          </article>
        ))}
      </section>
      <PageCTA />
    </>
  );
}
function ModulePage() {
  const location = useLocation();
  const m = modules.find((m) => location.pathname === `/products/${m.slug}`);
  if (!m) return <NotFound />;
  return (
    <>
      <section className="module-hero container">
        <div data-reveal="left">
          <Eyebrow>Proposed module / {m.short}</Eyebrow>
          <h1>{m.name.replace("Vetting Harbor ", "")}</h1>
          <p className="lead">{m.description}</p>
          <Badge tone="warning">Proposed offer · no live service</Badge>
          <Button to={`/pilot?module=${m.slug}`}>Discuss this module</Button>
        </div>
        <div className="module-detail-proof">
          <VisualStage kind={m.slug} />
          <div className="module-proof-meta">
            <small>
              {m.source} · {m.state}
            </small>
            <Link
              className="text-link"
              to={`/demo/reviews/CP-013/${m.short === "Behavior" ? "tests" : m.short === "Review" ? "report" : m.short === "Change" ? "notifications" : m.short === "Scope" ? "diff" : "overview"}`}
            >
              Inspect the sample evidence <I name="arrow-right" />
            </Link>
          </div>
        </div>
      </section>
      <section className="module-body container">
        <div>
          <Eyebrow>Inputs & responsibilities</Eyebrow>
          <h2>{m.question}</h2>
          <p>{m.input}</p>
          <p>
            For marketplace operators and procurement reviewers. A publisher
            supplies consented artifacts; an assessor records findings; the
            buyer defines acceptance.
          </p>
        </div>
        <ol className="module-steps">
          {m.steps.map((s, i) => (
            <li key={s} data-reveal="up">
              <span>0{i + 1}</span>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="output-band">
        <div className="container">
          <div>
            <Eyebrow>Proposed output</Eyebrow>
            <h2>{m.output}</h2>
          </div>
          <div>
            <Eyebrow>Exact limit</Eyebrow>
            <p>{m.limit}</p>
            <Link className="text-link" to="/review-limits">
              All reviewer limits <I name="arrow-up-right" />
            </Link>
          </div>
        </div>
      </section>
      <section className="container section-space">
        <h2>Test the module in a real workflow.</h2>
        <p className="lead reading">
          Manually prepared packs first. Agree criteria, sources, consent and an
          independence policy before proceeding. No live marketplace connections
          or actual attestation issuance are present in this preview.
        </p>
        <Button to="/pilot-pricing" variant="outline">
          See the pricing hypotheses
        </Button>
      </section>
      <PageCTA />
    </>
  );
}
function Solutions() {
  return (
    <>
      <section className="page-hero container">
        <div>
          <Eyebrow>Two buyer workflows</Eyebrow>
          <h1>
            Different gates.
            <br />
            <em>The same need for context.</em>
          </h1>
          <p className="lead">
            The evidence must be accepted and used by the team making the
            decision.
          </p>
        </div>
        <VisualStage kind="gates" />
      </section>
      <section className="buyer-lanes container">
        <article>
          <h2>Marketplace operators</h2>
          <p>
            Listing, publisher review and install access. Evidence distribution
            belongs inside the marketplace workflow.
          </p>
          <Button to="/solutions/marketplaces">Explore marketplace use</Button>
        </article>
        <article>
          <h2>Procurement & vendor risk</h2>
          <p>
            Purchase gates, scope questions and accepted review criteria.
            Evidence has to change a decision.
          </p>
          <Button to="/solutions/procurement">Explore procurement use</Button>
        </article>
      </section>
      <PageCTA />
    </>
  );
}
function BuyerPage({ procurement = false }) {
  const data = procurement
    ? {
        eyebrow: "For procurement & vendor risk",
        title: "See the scope\nbefore the purchase gate.",
        intro:
          "Make the exact version, evidence age and untested actions part of the vendor-risk conversation. Your team owns the acceptance decision.",
        image: "version-folios",
        sections: [
          [
            "Your decision workflow",
            "Inspect a submitted agent’s current version alongside the reviewed one. Ask what permissions changed, which actions were tested and which artifacts support the findings.",
          ],
          [
            "The buyer’s gate",
            "Name the accepted review standard, decision owner, budget owner and escalation route. A report can inform a gate only if your team agrees how it will use the evidence.",
          ],
          [
            "A practical starting point",
            "Review two manually prepared packs for consenting agents. Start with Scope or Behavior; record whether the evidence changed the purchase decision.",
          ],
          [
            "Keep authority explicit",
            "No score or seal replaces your criteria. The report does not authorize installation, payment or external actions. A human approval remains necessary.",
          ],
        ],
        cta: "Prepare a procurement pilot discussion",
      }
    : {
        eyebrow: "For enterprise marketplaces",
        title: "Bring the evidence\nto the listing and install flow.",
        intro:
          "Explore a version-bound evidence record at the point where your marketplace already makes publisher, listing and deployment decisions.",
        image: "module-atlas",
        sections: [
          [
            "Access is the starting condition",
            "A pilot needs a named operator with verified access to the listing or install flow. A stand-alone badge directory is not the proposed distribution model.",
          ],
          [
            "Agree the evidence contract",
            "Set an accepted standard, version and scope binding, source access, consent, reviewer responsibilities and handling of expiry or revocation.",
          ],
          [
            "Try two consenting publishers",
            "Prepare manual packs and watch operators and buyers use them in the actual flow. Select one proposed module; record the effect on a real decision.",
          ],
          [
            "Respect existing controls",
            "Complement the store’s own reviews and enterprise admin controls. No Salesforce, Microsoft or other marketplace integration is live.",
          ],
        ],
        cta: "Prepare a marketplace pilot discussion",
      };
  return <StandardPage data={data} />;
}
function SamplePack() {
  return (
    <>
      <section className="sample-hero container">
        <div>
          <Eyebrow>A sample you can inspect</Eyebrow>
          <h1>
            The evidence.
            <br />
            <em>And its edges.</em>
          </h1>
          <p className="lead">
            A fictional Clearpath Agents record shows what a version-bound
            report could make visible.
          </p>
          <Button to="/demo/reviews/CP-013/report">
            Open the report explorer
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              downloadText("DEMO-clearpath-evidence-pack.txt", sampleReport())
            }
          >
            Download sample report
          </Button>
        </div>
        <VisualStage kind="report" />
      </section>
      <section className="container sample-report">
        <DemoLabel />
        <div className="report-title">
          <div>
            <small>CP-ATT-12 / SAMPLE EVIDENCE PACK</small>
            <h2>Clearpath Support Assistant</h2>
            <p>Fictional publisher · Clearpath Agents</p>
          </div>
          <Badge tone="warning">v1.3 needs review</Badge>
        </div>
        <div className="report-facts">
          <div>
            <small>Reviewed version</small>
            <strong>1.2</strong>
            <span>read:tickets</span>
          </div>
          <div>
            <small>Current submission</small>
            <strong>1.3</strong>
            <span>+ write:contacts · Not tested</span>
          </div>
          <div>
            <small>Review date / evidence age</small>
            <strong>01 Oct 2026</strong>
            <span>9 days at the fixed sample clock</span>
          </div>
        </div>
        <div className="report-columns">
          <div>
            <h3>Source and protocol</h3>
            <p>
              CP-MAN-12 / CP-MAN-13 · version manifests
              <br />
              CP-ID-12 · sample publisher documentation
              <br />
              CP-TST-12 · isolated mock ticket-store protocol
            </p>
            <p>
              v1.2 ticket-read fixture recorded. v1.3 contact-write action not
              run. No network, real agent scanning or publisher verification.
            </p>
          </div>
          <div>
            <h3>Issuer and limitations</h3>
            <p>
              Harbor Review Lab · fictional assessor
              <br />
              Mira Sol · fictional reviewer
              <br />
              Funding · fictional marketplace sponsor
            </p>
            <p>
              Sample attestation only. No real signature or certification. A
              v1.2 review does not cover v1.3. Buyer retains decision authority.
            </p>
          </div>
        </div>
      </section>
      <section className="container section-space">
        <Lifecycle />
      </section>
      <PageCTA />
    </>
  );
}
function Pilot() {
  return (
    <section className="container intake-page">
      <div>
        <Eyebrow>Marketplace / procurement pilot</Eyebrow>
        <h1>
          Let’s test the
          <br />
          <em>evidence in context.</em>
        </h1>
        <p className="lead">
          Start with your decision workflow, an accepted standard and two
          consenting publishers.
        </p>
        <ol className="intake-steps">
          <li>
            <strong>01 / Name the gate</strong>
            <p>Who owns the listing, install or purchase decision?</p>
          </li>
          <li>
            <strong>02 / Agree the sources</strong>
            <p>What review criteria count, and can two publishers consent?</p>
          </li>
          <li>
            <strong>03 / Establish independence</strong>
            <p>
              Who funds the study, who reviews it, and how are conflicts
              handled?
            </p>
          </li>
        </ol>
        <VisualStage kind="pilot" compact />
        <p className="notice">
          This form prepares a local draft. Delivery, interviews and funded
          evaluations are not connected.
        </p>
      </div>
      <LeadForm />
    </section>
  );
}
function Contact() {
  return (
    <section className="container intake-page">
      <div>
        <Eyebrow>Contact / research discussion</Eyebrow>
        <h1>
          A specific question
          <br />
          <em>is a good beginning.</em>
        </h1>
        <p className="lead">
          Tell us about marketplace access, review acceptance or the
          independence policy you would need.
        </p>
        <p>
          No verified company inbox or legal operator has been supplied for this
          concept. This preview lets you prepare a note locally; it does not
          send email.
        </p>
        <VisualStage kind="contact" compact />
        <Link className="text-link" to="/pilot">
          Prepare a structured pilot discussion
          <I name="arrow-right" />
        </Link>
        <p className="notice">
          For deletion in this preview: leave or reload the tab to clear form
          details, and use Privacy preferences to clear event data. Delete any
          files you download separately.
        </p>
      </div>
      <LeadForm contact />
    </section>
  );
}
function SignIn() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  return (
    <section className="access-page container">
      <div>
        <Eyebrow>Vetting Harbor / preview access</Eyebrow>
        <h1>
          Take a seat
          <br />
          <em>at the review desk.</em>
        </h1>
        <VisualStage kind="access" />
      </div>
      <div className="form-panel">
        <DemoLabel />
        <h2>Open the demo workspace</h2>
        <p>
          No account or identity provider is connected. You can explore all
          synthetic records without credentials.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              setError(
                "Enter a valid email, or leave it blank for the public demo.",
              );
              return;
            }
            navigate("/demo");
          }}
        >
          <label htmlFor="access-email">
            Work email <small>Optional · stays in this view</small>
          </label>
          <input
            id="access-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            aria-invalid={!!error}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button">
            Enter synthetic workspace
            <I name="arrow-right" />
          </button>
        </form>
        <Link className="text-link" to="/pilot">
          Discuss future pilot access
          <I name="arrow-up-right" />
        </Link>
        <Link className="text-link" to="/contact">
          Access help
          <I name="arrow-up-right" />
        </Link>
        <p className="caption">
          No authentication, SSO, password reset or registration is active.
        </p>
      </div>
    </section>
  );
}
function Resources() {
  return (
    <section className="container resources-page">
      <Eyebrow>Research & resources</Eyebrow>
      <h1>Sources before slogans.</h1>
      <p className="lead">
        Factual comparators inform this concept. They do not endorse Vetting
        Harbor.
      </p>
      <VisualStage kind="sources" compact />
      <div className="resource-list">
        <a
          href="https://developer.salesforce.com/docs/platform/isvforce/guide/security-review-how-it-works.html"
          target="_blank"
          rel="noreferrer"
        >
          <span>01 / OFFICIAL DOCUMENTATION</span>
          <h2>Salesforce security review</h2>
          <p>
            An existing marketplace review process, not a universal
            certification.
          </p>
          <I name="arrow-up-right" />
        </a>
        <a
          href="https://learn.microsoft.com/en-us/microsoft-365/copilot/copilot-agent-store"
          target="_blank"
          rel="noreferrer"
        >
          <span>02 / OFFICIAL DOCUMENTATION</span>
          <h2>Microsoft Agent Store</h2>
          <p>
            An existing discovery and deployment context with administrator
            controls.
          </p>
          <I name="arrow-up-right" />
        </a>
        {[
          [
            "Evidence standard",
            "/evidence-standard",
            "The proposed minimum evidence fields.",
          ],
          [
            "Reviewer limits",
            "/review-limits",
            "Version, environment and lifecycle boundaries.",
          ],
          [
            "Pilot experiment",
            "/results",
            "What would count as actual demand evidence.",
          ],
        ].map(([t, p, d], i) => (
          <Link to={p} key={p}>
            <span>0{i + 3} / CONCEPT GUIDE</span>
            <h2>{t}</h2>
            <p>{d}</p>
            <I name="arrow-up-right" />
          </Link>
        ))}
      </div>
    </section>
  );
}
function Legal({ terms = false }) {
  return (
    <section className="container legal-page">
      <Eyebrow>
        {terms ? "Preview terms" : "Preview privacy notice"} · 10 Oct 2026
      </Eyebrow>
      <h1>
        {terms ? "A bounded concept preview." : "Your data in this preview."}
      </h1>
      <p className="lead">
        This notice describes the current local prototype. A verified operator,
        jurisdiction and production policy must be established before real lead
        collection or publication.
      </p>
      <VisualStage kind={terms ? "terms" : "privacy"} compact />
      {terms ? (
        <>
          <h2>What you are viewing</h2>
          <p>
            Vetting Harbor is a research-stage concept, not an operating review
            product. Publisher identities, review records, owners, artifacts and
            outcomes in the demo are fictional. All exports remain labeled
            synthetic.
          </p>
          <h2>No assurance or transaction</h2>
          <p>
            No report is a universal safety certification, regulatory
            accreditation, legal opinion or install authorization. Prices are
            test hypotheses. No payment, subscription, real signature, scanning
            or notification service is available.
          </p>
          <h2>Buyer and reviewer authority</h2>
          <p>
            Any real evaluation requires consent, agreed scope, accepted
            criteria and an independence policy. Humans retain responsibility
            for external actions and purchase decisions.
          </p>
          <h2>Assets and brand</h2>
          <p>
            Original concept imagery, approved logo, licensed fonts and icons
            are included. Third-party names are factual comparators. The
            provisional company name and domain are not trademark-cleared.
          </p>
        </>
      ) : (
        <>
          <h2>Forms</h2>
          <p>
            Work email, company, role and qualification text remain in browser
            memory while the form is open. No form content is sent, persisted to
            local storage or accepted by a server. Leave or reload the page to
            clear it. Downloaded drafts remain on your device until you delete
            them.
          </p>
          <h2>Optional preview analytics</h2>
          <p>
            Analytics is off by default. If enabled, only the event name, random
            event identifier, timestamp, preview context and sanitized campaign
            fields are held in tab memory. No email, company, free text or
            source documents are included. No analytics request is sent.
          </p>
          <h2>Consent and retention</h2>
          <p>
            Only the analytics preference is stored on this device. Use Privacy
            preferences to revoke consent and clear events. Reloading clears
            memory-only events. There is no server-side lead retention in this
            build.
          </p>
          <h2>Demo isolation</h2>
          <p>
            Fixtures are local to the site. Demo records and simulated actions
            never send messages, call third-party agents or write to external
            systems. Demo analytics has its own synthetic context.
          </p>
          <h2>Production readiness</h2>
          <p>
            Before collecting real leads, establish a legal operator, contact
            and deletion route, retention period, consent language, required
            double opt-in and a consent-aware server receiver with
            deduplication. Those services are not configured in this preview.
          </p>
        </>
      )}
      <Button to="/contact" variant="outline">
        Contact preview
      </Button>
      <button
        className="text-button"
        onClick={() => window.dispatchEvent(new Event("vh-open-consent"))}
      >
        Manage privacy preferences
      </button>
    </section>
  );
}
function NotFound() {
  return (
    <section className="container not-found">
      <Eyebrow>404 / A missing page</Eyebrow>
      <h1>
        This route ends here.
        <br />
        <em>The evidence doesn’t.</em>
      </h1>
      <p>Return to the atlas or open the synthetic review workspace.</p>
      <Button to="/">Back to the atlas</Button>
      <Button to="/demo" variant="outline">
        Open the demo
      </Button>
    </section>
  );
}
function PrivacyPanel() {
  const [show, setShow] = useState(false);
  const [allowed, setAllowed] = useState(consent());
  const [count, setCount] = useState(0);
  useEffect(() => {
    const open = () => setShow(true);
    const update = () => {
      setAllowed(consent());
      setCount(getEvents().length);
    };
    window.addEventListener("vh-open-consent", open);
    window.addEventListener("vh-events-change", update);
    window.addEventListener("vh-consent-change", update);
    return () => {
      window.removeEventListener("vh-open-consent", open);
      window.removeEventListener("vh-events-change", update);
      window.removeEventListener("vh-consent-change", update);
    };
  }, []);
  return (
    <>
      <button
        className="privacy-trigger"
        onClick={() => setShow(!show)}
        aria-label="Privacy and motion preferences"
      >
        <I name="lock-keyhole" />
      </button>
      {show && (
        <aside className="privacy-panel" aria-label="Privacy preferences">
          <button
            className="panel-close"
            aria-label="Close privacy preferences"
            onClick={() => setShow(false)}
          >
            <I name="x" />
          </button>
          <h2>Privacy preferences</h2>
          <p>
            Optional analytics is off by default. Enabling it keeps anonymous
            preview events in this tab only. No requests are sent.
          </p>
          <label className="checkbox">
            <input
              type="checkbox"
              checked={allowed}
              onChange={(e) =>
                setConsent(e.target.checked ? "allowed" : "denied")
              }
            />
            <span>Allow memory-only preview analytics</span>
          </label>
          <p className="caption">
            {count} preview events in memory · no real leads
          </p>
          <button
            className="text-button"
            onClick={() => {
              setConsent("denied");
              clearEvents();
            }}
          >
            Revoke consent and clear events
          </button>
          <button
            className="text-button"
            onClick={() =>
              downloadText(
                "preview-events.json",
                JSON.stringify(getEvents(), null, 2),
                "application/json",
              )
            }
          >
            Export preview events
          </button>
          <Link to="/privacy" onClick={() => setShow(false)}>
            Read the privacy notice
          </Link>
        </aside>
      )}
    </>
  );
}
function Site() {
  const [motion, setMotion] = useState(true);
  const location = useLocation();
  useEffect(() => {
    const handle = () => {
      if (location.pathname === "/") track("landing_view", "public-preview");
      if (location.pathname === "/pilot-pricing")
        track("pricing_view", "public-preview");
      if (location.pathname.startsWith("/demo"))
        track("demo_open", "synthetic-demo");
    };
    window.addEventListener("vh-consent-change", handle);
    return () => window.removeEventListener("vh-consent-change", handle);
  }, [location.pathname]);
  const demo = location.pathname.startsWith("/demo");
  return (
    <>
      <a className="skip-main" href="#main">
        Skip to content
      </a>
      <Motion enabled={motion} />
      {!demo && <Header />}
      <main
        id="main"
        className={
          demo
            ? "demo-page"
            : `public-page theme-${routeTheme(location.pathname)} page-${visualKind(location.pathname)}`
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          {Object.entries(pages).map(([path, data]) => (
            <Route
              key={path}
              path={path}
              element={<StandardPage data={data} />}
            />
          ))}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ModulePage />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/marketplaces" element={<BuyerPage />} />
          <Route
            path="/solutions/procurement"
            element={<BuyerPage procurement />}
          />
          <Route path="/sample-evidence-pack" element={<SamplePack />} />
          <Route path="/pilot-pricing" element={<Pricing full />} />
          <Route path="/pilot" element={<Pilot />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/privacy" element={<Legal />} />
          <Route path="/terms" element={<Legal terms />} />
          <Route path="/demo/*" element={<Demo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!demo && <Footer />}
      <div className="motion-control">
        <button
          onClick={() => setMotion(!motion)}
          aria-pressed={!motion}
          aria-label={motion ? "Pause scroll motion" : "Enable scroll motion"}
        >
          <I name={motion ? "pause" : "play"} />
          <span>{motion ? "Pause motion" : "Motion paused"}</span>
        </button>
      </div>
      <PrivacyPanel />
    </>
  );
}
export function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}
