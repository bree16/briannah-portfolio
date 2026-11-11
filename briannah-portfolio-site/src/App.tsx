import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import {
  ShieldCheck,
  Globe2,
  Code2,
  Award,
  Briefcase,
  GraduationCap,
  ExternalLink,
  FolderGit2,
  Mail,
  Gamepad2,
  Building2,
  Brain,
} from 'lucide-react'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-gold font-bold tracking-[0.2em] uppercase text-sm mb-3">
      {children}
    </p>
  )
}

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#resume', label: 'Resume' },
  { href: '#contact', label: 'Contact' },
]

export default function App() {
  return (
    <div className="min-h-screen bg-navy-deep text-mist overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-navy-deep/80 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#top" className="font-extrabold text-lg tracking-tight">
            Briannah<span className="text-gold">.</span>
          </a>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-mist/80">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-gold transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-block px-4 py-2 rounded-full bg-teal text-white text-sm font-semibold hover:brightness-110 transition"
          >
            Let's Connect
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative px-6 pt-20 pb-28 text-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(60% 50% at 50% 0%, rgba(10,143,126,0.25) 0%, rgba(13,43,94,0) 70%)',
          }}
        />
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <span className="inline-block px-4 py-1.5 rounded-full border border-gold/40 bg-gold/10 text-gold text-xs font-bold tracking-[0.15em] uppercase mb-6">
            Old Dominion University &middot; Cybersecurity
          </span>
        </motion.div>
        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          Briannah Greene
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-mist/80 mb-10"
        >
          Future security analyst with a pull toward threat intelligence, incident
          response, and digital forensics — building cross-cultural reach through a
          Mandarin minor along the way.
        </motion.p>
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="px-6 py-3 rounded-full bg-teal text-white font-semibold shadow-lg shadow-teal/20 hover:brightness-110 transition"
          >
            View My Work
          </a>
          <a
            href="#resume"
            className="px-6 py-3 rounded-full bg-gold text-ink font-semibold shadow-lg shadow-gold/20 hover:brightness-110 transition"
          >
            Resume
          </a>
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-24 bg-navy">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
          <Reveal>
            <SectionLabel>About Me</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Analytical by nature, interdisciplinary by design
            </h2>
            <div className="space-y-4 text-mist/85 leading-relaxed">
              <p>
                Hi, I'm Briannah — a cybersecurity student in Old Dominion University's
                accelerated bachelor's-to-master's program, with a minor in Mandarin. I
                earned my Associate's Degree in University Studies (Computer Science,
                Natural Science, and Mathematics) before transferring to ODU, where I
                finished my first semester with a 4.0 GPA. I'm currently working through
                certifications including Security+, AWS Cloud Practitioner, (ISC)&sup2;
                CC, and CySA+.
              </p>
              <p>
                I'm especially drawn to the analytical side of cybersecurity — threat
                intelligence, incident response, and digital forensics all appeal to me
                because they combine technical problem-solving with understanding the
                people and motivations behind an attack. My Mandarin minor adds to that
                by building cross-cultural and language skills that are increasingly
                valuable in a field where both threats and defenders operate on a global
                scale.
              </p>
              <p>
                This portfolio tracks my coursework, hands-on labs, and professional
                development as I work toward a career in security analysis. Thanks for
                stopping by — feel free to look through my projects and reach out if
                you'd like to connect.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://sites.wp.odu.edu/briannahgreene/wp-content/uploads/sites/41585/2026/09/YAS02180.jpg"
                alt="Briannah Greene"
                className="w-full h-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>Skills &amp; Certifications</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold">
              What I bring to the table
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: 'Certifications',
                items: ['Security+', 'CySA+', 'AWS Cloud Practitioner', '(ISC)² CC (in progress)'],
              },
              {
                icon: Code2,
                title: 'Technical',
                items: ['Python', 'React / TypeScript', 'Unreal Engine 5', 'SQL & Databases', 'Linux'],
              },
              {
                icon: Brain,
                title: 'Core Coursework',
                items: ['Digital Forensics', 'Cyber & Criminology', 'Network Security', 'Cyber Law & Ethics'],
              },
              {
                icon: Globe2,
                title: 'Languages',
                items: ['English (native)', 'Mandarin Chinese (minor)'],
              },
            ].map((group, i) => (
              <Reveal key={group.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl bg-navy border border-white/10 p-6 hover:border-teal/50 transition-colors">
                  <div className="w-11 h-11 rounded-xl bg-teal/15 flex items-center justify-center mb-4">
                    <group.icon className="w-5 h-5 text-teal" />
                  </div>
                  <h3 className="font-bold text-lg mb-3">{group.title}</h3>
                  <ul className="space-y-1.5 text-sm text-mist/75">
                    {group.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="px-6 py-24 bg-navy">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>Featured Work</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold">Projects</h2>
          </Reveal>

          {/* Housing Hub - flagship */}
          <Reveal className="mb-10">
            <div className="rounded-3xl bg-gradient-to-br from-navy-deep to-navy border border-gold/30 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-gold mb-4">
                    <Building2 className="w-4 h-4" /> Flagship Project
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4">
                    Newport News Housing Hub
                  </h3>
                  <p className="text-mist/80 mb-6 leading-relaxed">
                    A full interactive web app for the City of Newport News covering
                    affordable housing, homeownership programs, and neighborhood
                    resources — including an affordability calculator, a neighborhood
                    explorer, and a gamified homeownership simulator. Independently
                    designed and built during the Teamship Hampton Roads internship.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['React', 'TypeScript', 'Framer Motion', 'Leaflet'].map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://breecityportal.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal text-white text-sm font-semibold hover:brightness-110 transition"
                    >
                      Launch Live Demo <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://github.com/bree16/City-Portal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-sm font-semibold hover:bg-white/10 transition"
                    >
                      <FolderGit2 className="w-4 h-4" /> View Code
                    </a>
                  </div>
                </div>
                <div className="relative min-h-[320px] border-t md:border-t-0 md:border-l border-white/10">
                  <iframe
                    src="https://breecityportal.vercel.app"
                    title="Newport News Housing Hub live preview"
                    className="absolute inset-0 w-full h-full"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Secondary project cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="h-full rounded-2xl bg-navy-deep border border-white/10 p-7 hover:border-teal/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-teal/15 flex items-center justify-center mb-4">
                  <Brain className="w-5 h-5 text-teal" />
                </div>
                <h3 className="font-bold text-xl mb-2">
                  COVA CCI Undergraduate Research
                </h3>
                <p className="text-sm text-gold font-semibold mb-3">
                  Paid Research Fellowship &middot; Showcase Dec 2026
                </p>
                <p className="text-mist/75 text-sm leading-relaxed">
                  Researching the generational access gap in cybersecurity education and
                  proposing agentic AI as an equitable learning tool — while studying the
                  oversight risks ("Oversight Drift") that same AI introduces when
                  automated decision chains go unreviewed.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl bg-navy-deep border border-white/10 p-7 hover:border-teal/40 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center mb-4">
                  <Gamepad2 className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-bold text-xl mb-2">GenCyber VR Awareness Game</h3>
                <p className="text-sm text-gold font-semibold mb-3">
                  GenCyber Scholar Award Winner
                </p>
                <p className="text-mist/75 text-sm leading-relaxed">
                  Built an immersive cyber-awareness game in Unreal Engine 5 for Oculus,
                  designed to teach cybersecurity fundamentals through hands-on,
                  game-based learning.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center mb-14">
            <SectionLabel>Where I've Been</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold">Experience</h2>
          </Reveal>
          <div className="space-y-6">
            {[
              {
                icon: Briefcase,
                title: 'Software Development Intern',
                org: 'Teamship Hampton Roads',
                time: 'Summer 2026',
                desc: 'Independently designed and built the Newport News Housing Hub, a full interactive civic web app, from concept through deployment.',
              },
              {
                icon: GraduationCap,
                title: 'BS Cybersecurity (4+1 BS/MS track)',
                org: 'Old Dominion University',
                time: '2026 – Present',
                desc: "Minor in Mandarin Chinese. Finished first ODU semester with a 4.0 GPA. Pursuing the accelerated bachelor's-to-master's cybersecurity program.",
              },
              {
                icon: Award,
                title: 'Lead Officer, MWR',
                org: 'AFROTC — San Diego State University',
                time: '~1.5 years',
                desc: 'Held a leadership role coordinating morale, welfare, and recreation programs within the detachment.',
              },
            ].map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <div className="flex gap-5 rounded-2xl bg-navy border border-white/10 p-6">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-teal/15 flex items-center justify-center">
                    <e.icon className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-bold text-lg">{e.title}</h3>
                      <span className="text-gold text-sm font-semibold">{e.org}</span>
                      <span className="text-mist/50 text-xs">{e.time}</span>
                    </div>
                    <p className="text-mist/75 text-sm mt-2 leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="px-6 py-24 bg-navy">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <SectionLabel>Resume</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              Education &amp; Highlights
            </h2>
            <div className="text-left grid sm:grid-cols-2 gap-6 mb-8">
              <div className="rounded-2xl bg-navy-deep border border-white/10 p-6">
                <h3 className="font-bold mb-1">B.S. Cybersecurity</h3>
                <p className="text-gold text-sm font-semibold mb-2">
                  Old Dominion University &middot; Expected May 2027
                </p>
                <p className="text-mist/70 text-sm">Minor in Mandarin Chinese</p>
              </div>
              <div className="rounded-2xl bg-navy-deep border border-white/10 p-6">
                <h3 className="font-bold mb-1">A.S. University Studies</h3>
                <p className="text-gold text-sm font-semibold mb-2">
                  Grossmont College &middot; 2026
                </p>
                <p className="text-mist/70 text-sm">
                  Computer Science, Natural Science &amp; Math &middot; 3.48 GPA
                </p>
              </div>
            </div>
            <p className="text-mist/60 text-sm">
              Full resume available on request —{' '}
              <a href="#contact" className="text-teal font-semibold hover:underline">
                reach out below
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-28 text-center">
        <Reveal>
          <SectionLabel>Get In Touch</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5">
            Let's build something secure
          </h2>
          <p className="max-w-xl mx-auto text-mist/75 mb-8">
            Open to internships, research collaborations, and conversations about
            security analysis, threat intelligence, and digital forensics.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:bgree045@odu.edu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal text-white font-semibold hover:brightness-110 transition"
            >
              <Mail className="w-4 h-4" /> bgree045@odu.edu
            </a>
            <a
              href="https://github.com/bree16"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 font-semibold hover:bg-white/10 transition"
            >
              <FolderGit2 className="w-4 h-4" /> GitHub
            </a>
          </div>
        </Reveal>
      </section>

      <footer className="px-6 py-8 text-center text-mist/40 text-xs border-t border-white/10">
        Built by Briannah Greene &middot; React, Tailwind &amp; Framer Motion
      </footer>
    </div>
  )
}
