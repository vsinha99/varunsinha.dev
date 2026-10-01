import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CustomCursor } from "@/components/custom-cursor";
import { ScrollRevealController } from "@/components/scroll-reveal-controller";

const riisStack = [
  "Python",
  "FastAPI",
  "YOLOv8",
  "Fetch.ai uAgents",
  "Unity",
];

const routerStack = [
  "Python",
  "FastAPI",
  "Redis",
  "scikit-learn",
  "Prometheus + Grafana",
  "Docker",
];

const experience = [
  {
    organization: "Carboncopies Foundation",
    role: "MLE Intern",
    period: "Aug 2025 - Present",
    logo: "/logos/carboncopies_logo.png",
    logoAlt: "Carboncopies Foundation logo",
    detail:
      "Working under Dr. Randal A. Koene on neural circuit simulation (NETMORPH). Applied Bayesian optimization (Optuna/TPE) to tune parameters improving connectivity in reservoir computing models, and built a Python framework automating experiments across a 15-dimensional parameter search space, cutting compute from 45+ hours to roughly 8. Extended the approach to multi-objective optimization on an 8-bit spiking-neuron shift register, generating a Pareto front across accuracy and timing robustness.",
    caseStudyHref: "/carboncopies",
  },
  {
    organization: "UC San Diego",
    role: "Data Science Researcher",
    period: "Oct 2025 - Present",
    logo: "/logos/ucsd_logo.png",
    logoAlt: "UC San Diego logo",
    detail:
      "Designed a weighted performance scoring system across 5 seasons of professional basketball play-by-play data (2,000+ player-seasons), flagging statistically significant performers using efficiency metrics and volume thresholds. Analysis contributed to consulting work with the UCSD Men's Basketball program.",
    caseStudyHref: null,
  },
];

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="text-link label-text" href={href} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight aria-hidden="true" />
    </Link>
  );
}

function StackLine({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="stack-line">
      <p className="label-text">{label}</p>
      <div className="badge-row" aria-label={`${label}: ${items.join(", ")}`}>
        {items.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </div>
  );
}

function RiisMark() {
  return (
    <div className="native-project-mark riis-mark" role="img" aria-label="RIIS rover mark and wordmark">
      <svg viewBox="0 0 96 72" aria-hidden="true">
        <circle cx="35" cy="55" r="7" />
        <circle cx="61" cy="55" r="7" />
        <path d="M27 50h42l-8-18H35l-8 18ZM48 32V16h13M58 12h8v8h-8" />
      </svg>
      <div>
        <strong>RIIS</strong>
        <span>Rapid Incident Intelligence System</span>
      </div>
    </div>
  );
}

function RouterMark() {
  return (
    <div className="native-project-mark router-mark" role="img" aria-label="Finance LLM Router branching route mark">
      <svg viewBox="0 0 176 96" aria-hidden="true">
        <path d="M12 48h46c20 0 20-28 44-28h62" />
        <path d="M58 48h106" />
        <path d="M58 48c20 0 20 28 44 28h62" />
      </svg>
      <strong>LLM Router</strong>
    </div>
  );
}

function LungIqMark() {
  return (
    <div className="native-project-mark lungiq-mark" role="img" aria-label="LungIQ lungs mark and wordmark">
      <svg viewBox="0 0 104 104" aria-hidden="true">
        <path d="M52 20v31M52 35c-7-14-18-17-25-6-9 14-11 39-5 53 4 9 15 6 22 1 6-5 8-18 8-32" />
        <path d="M52 35c7-14 18-17 25-6 9 14 11 39 5 53-4 9-15 6-22 1-6-5-8-18-8-32" />
        <path d="M52 51 39 42M52 51l13-9" />
      </svg>
      <strong>LungIQ</strong>
    </div>
  );
}

function ProjectCard({
  className,
  primaryHref,
  visual,
  meta,
  title,
  pitch,
  stackLabel = "Stack",
  stack,
  links,
}: {
  className: string;
  primaryHref: string;
  visual: React.ReactNode;
  meta: string;
  title: string;
  pitch: string;
  stackLabel?: string;
  stack: string[];
  links: { href: string; label: string }[];
}) {
  return (
    <article className={`project-card ${className}`} data-scroll-reveal>
      <Link
        className="project-card-primary-link"
        href={primaryHref}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${title}`}
      />
      <div className="project-card-visual visual-frame">{visual}</div>
      <div className="project-card-content">
        <p className="work-meta label-text">{meta}</p>
        <h3>{title}</h3>
        <p className="work-pitch">{pitch}</p>
        <StackLine label={stackLabel} items={stack} />
        <div className="project-links" aria-label={`${title} links`}>
          {links.map((link) => (
            <ExternalLink href={link.href} key={link.href}>
              {link.label}
            </ExternalLink>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ScrollRevealController />
      <main id="top" tabIndex={-1}>
        <section id="about" className="site-shell opening" aria-labelledby="hero-title" data-scroll-reveal>
          <div className="section-grid hero-layout">
            <div className="hero-heading">
              <h1 id="hero-title">Varun Sinha</h1>
              <div className="hero-accolades label-text" aria-label="Selected accolades">
                <p>2x Hackathon Winner</p>
              </div>
              <div className="profile-links" aria-label="Varun Sinha profiles and contact">
                <Link
                  className="profile-link"
                  href="mailto:v1sinha@ucsd.edu"
                  aria-label="Email Varun Sinha"
                  title="Email"
                >
                  <Mail aria-hidden="true" />
                </Link>
                <Link
                  className="profile-link"
                  href="https://linkedin.com/in/varunsinha99"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Varun Sinha on LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin aria-hidden="true" />
                </Link>
                <Link
                  className="profile-link"
                  href="https://github.com/vsinha99"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Varun Sinha on GitHub"
                  title="GitHub"
                >
                  <Github aria-hidden="true" />
                </Link>
                <Link
                  className="profile-link"
                  href="/resume.pdf"
                  download
                  prefetch={false}
                  aria-label="Download Varun Sinha's résumé"
                  title="Résumé"
                >
                  <FileText aria-hidden="true" />
                </Link>
              </div>
            </div>

            <figure className="hero-portrait">
              <Image
                src="/logos/headshot.png"
                alt="Varun Sinha"
                fill
                priority
                sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, 384px"
              />
            </figure>

            <div className="hero-copy">
              <div className="hero-intro">
              <p>
                Hey, I&apos;m Varun. Data Science major at UC San Diego, ML concentration,
                graduating 2028.
              </p>
              <p>
                Right now I&apos;m co-founding Spatio Labs, working on spatial AI for robotics. I
                also intern at Carboncopies Foundation, a nonprofit researching whole brain
                emulation, where I work on neural simulation. I also built a cost-aware LLM router
                for finance that&apos;s featured below.
              </p>
              <p>
                Outside of that, I&apos;ve been playing classical violin since 4th grade. Also been
                following the NBA and soccer for a while, big Mavericks and Barca fan.
              </p>
              </div>

              <Link className="hero-contact" href="#contact">
                Start a Conversation
                <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <section id="work" className="site-shell section-block" aria-labelledby="featured-projects-title" data-scroll-reveal>
          <Separator />
          <h2 id="featured-projects-title" className="sr-only">Featured projects</h2>

          <div className="projects-grid">
            <ProjectCard
              className="spatio-card"
              primaryHref="https://spatiolabs.ai"
              visual={
                <div className="spatio-mark" aria-hidden="true">
                  <Image
                    src="/logos/spatio_logo.png"
                    alt=""
                    width={160}
                    height={160}
                    loading="lazy"
                  />
                </div>
              }
              meta="Co-founder / Frontend and ML lead"
              title="Spatio Labs"
              pitch="Building evaluation tooling that surfaces spatial reasoning failures and makes model behavior easier to inspect across robotics perception test cases."
              stackLabel="Focus"
              stack={["Robotics perception", "Machine learning", "Frontend"]}
              links={[
                { href: "https://spatiolabs.ai", label: "Website" },
                { href: "https://youtu.be/m8AimjnOwEA?is=2BpXjxX_u_hFKYdI", label: "Demo video" },
              ]}
            />

            <ProjectCard
              className="router-card"
              primaryHref="https://finance-llm-router.vercel.app"
              visual={<RouterMark />}
              meta="18% Higher Judged Reward / 38% Lower Cost"
              title="Finance LLM Router"
              pitch="Classifies finance prompts by task and complexity, enforces provider constraints, and routes each request to the cheapest capable model. A LinUCB bandit updates from judge feedback."
              stack={routerStack}
              links={[
                { href: "https://github.com/vsinha99/finance_llm_router", label: "GitHub" },
                { href: "https://finance-llm-router.vercel.app", label: "Full case study" },
              ]}
            />
          </div>
        </section>

        <section className="site-shell section-block" aria-labelledby="supporting-work-title" data-scroll-reveal>
          <Separator />
          <div className="section-grid section-heading">
            <h2 id="supporting-work-title">Two hackathon wins.</h2>
          </div>

          <div className="projects-grid">
            <ProjectCard
              className="riis-card"
              primaryHref="https://devpost.com/software/riis"
              visual={<RiisMark />}
              meta="2nd Place Overall, LA Hacks 2026 · Fetch.ai ASI:One Track Winner"
              title="RIIS"
              pitch="Vision and agent workflow for a ground rover operating in collapsed structures, producing annotated video, SBAR reports, multilingual contact, and a walkable 3D scene."
              stack={riisStack}
              links={[
                { href: "https://github.com/vsinha99/RIIS", label: "GitHub" },
                { href: "https://devpost.com/software/riis", label: "Devpost" },
                { href: "https://www.youtube.com/watch?v=juhHSR9_-UE", label: "Demo video" },
              ]}
            />

            <ProjectCard
              className="lungiq-card"
              primaryHref="https://devpost.com/software/lungiq"
              visual={<LungIqMark />}
              meta="Winner / DiamondHacks 2026 Healthcare Track"
              title="LungIQ"
              pitch="Processes DICOM CT scans through tumor segmentation, radiomics, historical-case retrieval, and live ClinicalTrials.gov and PubMed evidence."
              stack={["Python", "FastAPI", "ChromaDB", "pydicom", "SimpleITK"]}
              links={[
                { href: "https://github.com/vsinha99/lungiq", label: "GitHub" },
                { href: "https://devpost.com/software/lungiq", label: "Devpost" },
                { href: "https://www.youtube.com/watch?v=_OYnmWs7EKA", label: "Demo video" },
              ]}
            />
          </div>
        </section>

        <section id="experience" className="site-shell section-block" aria-labelledby="experience-title" data-scroll-reveal>
          <Separator />
          <div className="section-grid section-heading experience-heading">
            <h2 id="experience-title">Applied work and research.</h2>
          </div>

          <div className="experience-list">
            {experience.map((item) => (
              <article className="experience-row" key={item.organization}>
                <p className="experience-period label-text">{item.period}</p>
                <div className="experience-identity">
                  <figure className="experience-mark">
                    <Image
                      src={item.logo}
                      alt={item.logoAlt}
                      fill
                      loading="lazy"
                      sizes="96px"
                    />
                  </figure>
                  <div className="experience-title">
                    <h3>{item.organization}</h3>
                    <p className="label-text">{item.role}</p>
                  </div>
                </div>
                <div className="experience-copy">
                  <p className="experience-detail">{item.detail}</p>
                  {item.caseStudyHref ? (
                    <Link className="experience-read-more text-link label-text" href={item.caseStudyHref}>
                      Read more
                      <ArrowUpRight aria-hidden="true" />
                    </Link>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="site-shell section-block contact-section" aria-labelledby="contact-title" data-scroll-reveal>
          <Separator />
          <div className="section-grid contact-grid">
            <div className="contact-heading">
              <h2 id="contact-title">Let&apos;s talk.</h2>
              <p>Internship recruiting for data science and software roles.</p>
            </div>
            <div className="contact-links">
              <div>
                <p className="label-text">Email</p>
                <Link href="mailto:v1sinha@ucsd.edu">v1sinha@ucsd.edu</Link>
                <Link href="mailto:varuns0906@gmail.com">varuns0906@gmail.com</Link>
              </div>
              <div>
                <p className="label-text">Profiles</p>
                <ExternalLink href="https://github.com/vsinha99">GitHub</ExternalLink>
                <ExternalLink href="https://linkedin.com/in/varunsinha99">LinkedIn</ExternalLink>
                <Link className="text-link label-text" href="/resume.pdf" download prefetch={false}>
                  Résumé PDF
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-shell site-footer label-text">
        <Separator />
        <div>
          <p>Varun Sinha / Data Science + ML</p>
          <p>UC San Diego / Class of 2028</p>
          <Link href="#top">Back to top</Link>
        </div>
      </footer>
    </>
  );
}
