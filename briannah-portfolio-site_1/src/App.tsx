import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { ExternalLink, FolderGit2, Mail, Download, FileText } from 'lucide-react'

const BOOT_LINES = [
  'ACCESS_TERMINAL v2.6',
  'Initializing secure session...',
  'Verifying credentials... OK',
  'Loading profile: B. GREENE',
  'Clearance level: VISITOR',
  'Decrypting portfolio...',
  'Access granted.',
]

function BootSequence({ onDone }: { onDone: () => void }) {
  const [lineCount, setLineCount] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      onDone()
      return
    }

    const timers: ReturnType<typeof setTimeout>[] = []
    BOOT_LINES.forEach((_, i) => {
      timers.push(setTimeout(() => setLineCount(i + 1), 220 * i + 150))
    })
    const finish = setTimeout(() => setExiting(true), 220 * BOOT_LINES.length + 650)
    const skip = () => setExiting(true)
    window.addEventListener('keydown', skip)
    window.addEventListener('click', skip)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finish)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('click', skip)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-ink flex items-center justify-center px-6"
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      onAnimationComplete={() => exiting && onDone()}
    >
      <div className="font-mono text-sm md:text-base text-left w-full max-w-md">
        {BOOT_LINES.slice(0, lineCount).map((line, i) => (
          <p
            key={line}
            className={
              i === BOOT_LINES.length - 1 ? 'text-seal font-bold mt-1' : 'text-bone/80'
            }
          >
            {i === 0 ? <span className="text-paper">{line}</span> : line}
          </p>
        ))}
        <span className="boot-cursor inline-block w-2.5 h-4 bg-seal align-middle mt-1" />
      </div>
    </motion.div>
  )
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
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

/** A traditional chop/seal stamp mark. Doubles as the site's logo and a recurring motif. */
function Seal({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
      />
      <text
        x="50"
        y="42"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontWeight="700"
        fontSize="30"
        fill="currentColor"
      >
        B
      </text>
      <text
        x="50"
        y="78"
        textAnchor="middle"
        fontFamily="Fraunces, serif"
        fontWeight="700"
        fontSize="30"
        fill="currentColor"
      >
        G
      </text>
    </svg>
  )
}

function SectionMark({ n, tone = 'ink' }: { n: string; tone?: 'ink' | 'paper' }) {
  return (
    <span
      className={`font-serif text-6xl md:text-7xl font-light select-none ${
        tone === 'ink' ? 'text-paper/10' : 'text-ink/10'
      }`}
    >
      {n}
    </span>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-seal font-bold tracking-[0.25em] uppercase text-xs mb-2">
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

const btnPrimary =
  'inline-flex items-center gap-2 px-6 py-3 bg-seal text-paper font-semibold rounded-sm hover:bg-seal-deep transition-colors'
const btnOutlineDark =
  'inline-flex items-center gap-2 px-6 py-3 border border-bone/30 text-paper font-semibold rounded-sm hover:border-seal hover:text-seal transition-colors'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="min-h-screen bg-ink text-bone overflow-x-hidden font-sans">
      <AnimatePresence>
        {!booted && <BootSequence onDone={() => setBooted(true)} />}
      </AnimatePresence>
      {/* NAV */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/90 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 text-paper">
            <Seal className="w-7 h-7 text-seal" />
            <span className="font-serif text-lg tracking-tight">Briannah Greene</span>
          </a>
          <nav className="hidden md:flex gap-8 text-xs font-semibold tracking-[0.15em] uppercase text-bone/70">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-seal transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className={`${btnOutlineDark} !py-2 !px-4 text-xs`}>
            Let's Connect
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative px-6 md:px-12 pt-24 md:pt-32 pb-28 md:pb-36 bg-ink overflow-hidden">
        <div className="absolute left-6 md:left-12 top-32 bottom-20 w-px bg-seal/30 hidden md:block" />
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="flex items-center gap-3 mb-10 md:pl-10"
          >
            <span className="h-px w-10 bg-seal" />
            <span className="text-seal font-bold tracking-[0.3em] uppercase text-xs">
              Old Dominion University &middot; Cybersecurity
            </span>
          </motion.div>

          <div className="relative md:pl-10">
            <motion.h1
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="font-serif italic font-light text-[clamp(3rem,13vw,7.5rem)] leading-[0.95] text-paper"
            >
              Briannah
              <br />
              Greene
            </motion.h1>
            <Seal className="text-seal w-20 h-20 md:w-28 md:h-28 absolute right-2 md:right-10 top-2 md:top-8 rotate-[8deg] opacity-90" />
          </div>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-lg md:text-xl text-bone mt-10 md:pl-10 md:border-l md:border-white/10"
          >
            Future security analyst with a pull toward threat intelligence, incident
            response, and digital forensics. Building cross-cultural reach through a
            Mandarin minor along the way.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-10 md:pl-10"
          >
            <a href="#projects" className={btnPrimary}>
              View My Work
            </a>
            <a href="#resume" className={btnOutlineDark}>
              Resume
            </a>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="grain px-6 md:px-12 py-24 md:py-32 bg-paper text-ink">
        <div className="max-w-5xl mx-auto grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
          <Reveal>
            <div className="flex items-baseline gap-4 mb-6">
              <SectionMark n="01" tone="paper" />
              <div>
                <Eyebrow>About Me</Eyebrow>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                  Analytical by nature,
                  <br />
                  interdisciplinary by design
                </h2>
              </div>
            </div>
            <div className="space-y-4 text-charcoal leading-relaxed">
              <p>
                Hi, I'm Briannah. I'm a cybersecurity senior at Old Dominion University
                (3.94 GPA, graduating May 2027), pursuing the accelerated
                bachelor's-to-master's track with a minor in Mandarin Chinese. I earned
                my Associate of Science in Computer Science, Natural Science, and
                Mathematics from Grossmont College (3.48 GPA) before transferring in.
                Right now I'm a funded researcher with the Coastal Virginia Center for
                Cyber Innovation, studying what I call Oversight Drift: how much human
                review is actually left once AI agents start acting on our behalf, and
                who gets hurt most as that review quietly disappears.
              </p>
              <p>
                I'm especially drawn to the analytical side of cybersecurity. Digital
                forensics and incident response appeal to me because they combine
                technical problem solving with understanding the people and motivations
                behind an attack. I'm hands on with Linux, Wireshark, firewall
                configuration, and vulnerability testing, and currently working toward
                CompTIA Security+. Outside coursework, I built a VR cyber awareness game
                that won the GenCyber Scholar Award and an agentic AI housing tool for
                Teamship Hampton Roads. I like building things people can actually use,
                not just write about them.
              </p>
              <p>
                This portfolio tracks my research, projects, and professional development
                as I work toward an entry-level federal or government-contract
                cybersecurity role. Thanks for stopping by. Feel free to look through my
                work and reach out if you'd like to connect.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden border border-ink/15 shadow-xl bg-paper-soft">
                <img
                  src="https://sites.wp.odu.edu/briannahgreene/wp-content/uploads/sites/41585/2026/09/YAS02180.jpg"
                  alt="Briannah Greene"
                  className="w-full h-full object-cover grayscale-[15%]"
                />
              </div>
              <Seal className="text-seal w-16 h-16 absolute -bottom-6 -left-6 -rotate-[10deg] bg-paper" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="px-6 md:px-12 py-24 md:py-32 bg-ink">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex items-baseline gap-4 mb-14">
            <SectionMark n="02" tone="ink" />
            <div>
              <Eyebrow>Skills &amp; Certifications</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-paper">
                What I bring to the table
              </h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              {
                title: 'Honors & Certifications',
                items: [
                  'CompTIA Security+ (in progress)',
                  'SANS Foundation Cybersecurity Cert.',
                  'Microsoft Cybersecurity Grant Recipient',
                  'NCWIT Award for Computing',
                ],
              },
              {
                title: 'Programming & Systems',
                items: ['Python', 'Java', 'React / TypeScript', 'Linux', 'VirtualBox / VMware', 'Unreal Engine 5'],
              },
              {
                title: 'Cybersecurity & Networking',
                items: ['Wireshark', 'Cisco Packet Tracer', 'Firewall configuration', 'Vulnerability testing', 'Cryptography fundamentals'],
              },
              {
                title: 'Agentic AI',
                items: ['Kiro (AWS)', 'Replit Agent', 'Prompt engineering', 'AI oversight & cost analysis'],
              },
              {
                title: 'Design',
                items: ['Adobe Photoshop', 'Lightroom', 'Canva', 'UI/UX fundamentals'],
              },
              {
                title: 'Languages',
                items: ['English (fluent)', 'Mandarin Chinese (minor)', 'Korean (NSLI-Y, 2022)'],
              },
            ].map((group, i) => (
              <Reveal key={group.title} delay={i * 0.06} className="h-full">
                <div className="h-full bg-ink p-7">
                  <span className="block w-8 h-px bg-seal mb-4" />
                  <h3 className="font-serif text-lg font-semibold text-paper mb-3">
                    {group.title}
                  </h3>
                  <ul className="space-y-1.5 text-sm text-bone/80">
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
      <section id="projects" className="grain px-6 md:px-12 py-24 md:py-32 bg-paper text-ink">
        <div className="max-w-6xl mx-auto">
          <Reveal className="flex items-baseline gap-4 mb-14">
            <SectionMark n="03" tone="paper" />
            <div>
              <Eyebrow>Featured Work</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold">Projects</h2>
            </div>
          </Reveal>

          {/* Housing Hub - flagship */}
          <Reveal className="mb-10">
            <div className="border border-ink/15 bg-ink text-paper overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-seal mb-4">
                    <Seal className="w-4 h-4" /> Flagship Project
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4">
                    Newport News Housing Hub
                  </h3>
                  <p className="text-bone/85 mb-6 leading-relaxed">
                    A full interactive web app for the City of Newport News covering
                    affordable housing, homeownership programs, and neighborhood
                    resources, including an affordability calculator, a neighborhood
                    explorer, and a gamified homeownership simulator. Independently
                    designed and built during the Teamship Hampton Roads internship.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['React', 'TypeScript', 'Framer Motion', 'Leaflet'].map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 border border-white/15 text-xs font-medium text-bone/80"
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
                      className={btnPrimary}
                    >
                      Launch Live Demo <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href="https://github.com/bree16/City-Portal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={btnOutlineDark}
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
          <div className="grid md:grid-cols-2 gap-px bg-ink/10 border border-ink/15">
            <Reveal>
              <div className="h-full bg-paper p-7">
                <span className="block w-8 h-px bg-seal mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">
                  COVA CCI Undergraduate Research
                </h3>
                <p className="text-sm text-seal font-semibold mb-3">
                  Funded Research Fellowship &middot; Showcase Dec 2026
                </p>
                <p className="text-charcoal/90 text-sm leading-relaxed">
                  Mentor-guided research asking how much human oversight is actually
                  left once AI agents start acting on our behalf, work I call Oversight
                  Drift. Borrowing the idea of a phone's battery health indicator, I'm
                  building a simple 0 to 100 score: run an agent loop with review at
                  every step, then again with little or none, and measure what quietly
                  breaks. Culminating in a paper and presentation at the December 2026
                  Student Research Showcase.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full bg-paper p-7">
                <span className="block w-8 h-px bg-seal mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">GenCyber VR Awareness Game</h3>
                <p className="text-sm text-seal font-semibold mb-3">
                  GenCyber Scholar Award Winner
                </p>
                <p className="text-charcoal/90 text-sm leading-relaxed mb-4">
                  Independently designed and built a virtual reality cyber-awareness
                  learning game in under two days, using Oculus and Unreal Engine 5.
                  Awarded the Scholar Award, the camp's highest honor.
                </p>
                <div className="overflow-hidden border border-ink/15 aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/lWN6RjahD1M"
                    title="GenCyber VR Cyber Awareness Game walkthrough"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="px-6 md:px-12 py-24 md:py-32 bg-ink">
        <div className="max-w-4xl mx-auto">
          <Reveal className="flex items-baseline gap-4 mb-14">
            <SectionMark n="04" tone="ink" />
            <div>
              <Eyebrow>Where I've Been</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-paper">
                Experience
              </h2>
            </div>
          </Reveal>
          <div className="divide-y divide-white/10 border-t border-b border-white/10">
            {[
              {
                title: 'Undergraduate Cybersecurity Researcher',
                org: 'COVA CCI, Old Dominion University',
                time: 'Sep 2026 – Present',
                desc: 'Selected for a competitive, funded research program; studying "Oversight Drift" in AI-assisted workflows under mentor Prof. Teresa Duvall, culminating in a paper and presentation at the Dec. 2026 Student Research Showcase.',
              },
              {
                title: 'Lead Web Developer & UX Designer',
                org: 'Teamship Hampton Roads',
                time: 'Jul – Aug 2026',
                desc: 'Independently designed and built the Newport News Housing Hub, a full interactive civic web app, using agentic AI tools, and directed a four-person team from concept through final stakeholder presentation.',
              },
              {
                title: 'AWS ReachBack Cohort Participant',
                org: 'Amazon Web Services, Arlington, VA',
                time: 'Aug 2026',
                desc: "Selected for AWS's talent development cohort; built with Kiro, AWS's agentic AI coding IDE, alongside AWS engineers and recruiters.",
              },
              {
                title: 'B.S. Cybersecurity (4+1 BS/MS track)',
                org: 'Old Dominion University',
                time: 'Summer 2026 – Present',
                desc: "Minor in Mandarin Chinese. 3.94 GPA, senior standing, expected graduation May 2027. Pursuing the accelerated bachelor's-to-master's cybersecurity program.",
              },
              {
                title: 'Lead Officer, MWR',
                org: 'AFROTC Detachment 075, San Diego State University',
                time: 'Aug 2024 – Sep 2025',
                desc: 'Managed event logistics and budget for a 150+ member cadet unit and drafted Operations Orders. Voluntarily disenrolled in Sep. 2025, without prejudice, to pursue civilian cybersecurity work.',
              },
            ].map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <div className="grid md:grid-cols-[1fr_2.2fr] gap-2 md:gap-8 py-7">
                  <div>
                    <span className="text-seal text-xs font-bold tracking-[0.2em] uppercase">
                      {e.time}
                    </span>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1.5">
                      <h3 className="font-serif text-lg font-semibold text-paper">{e.title}</h3>
                    </div>
                    <p className="text-seal text-sm font-semibold mb-2">{e.org}</p>
                    <p className="text-bone/80 text-sm leading-relaxed">{e.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="grain px-6 md:px-12 py-24 md:py-32 bg-paper text-ink">
        <div className="max-w-3xl mx-auto">
          <Reveal className="flex items-baseline gap-4 mb-10">
            <SectionMark n="05" tone="paper" />
            <div>
              <Eyebrow>Resume</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                Education &amp; Highlights
              </h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid sm:grid-cols-2 gap-px bg-ink/10 border border-ink/15 mb-px">
              <div className="bg-paper p-6">
                <h3 className="font-serif font-semibold mb-1">B.S. Cybersecurity</h3>
                <p className="text-seal text-sm font-semibold mb-2">
                  Old Dominion University &middot; Expected May 2027
                </p>
                <p className="text-charcoal/80 text-sm">
                  Minor in Mandarin Chinese &middot; 3.94 GPA &middot; Senior standing
                </p>
              </div>
              <div className="bg-paper p-6">
                <h3 className="font-serif font-semibold mb-1">A.S. Computer Science</h3>
                <p className="text-seal text-sm font-semibold mb-2">
                  Grossmont College &middot; Completed June 2026
                </p>
                <p className="text-charcoal/80 text-sm">
                  Natural Science &amp; Math &middot; 3.48 GPA &middot; STEM Promise
                  Scholar
                </p>
              </div>
            </div>
            <div className="border border-ink/15 bg-paper p-6 mb-8">
              <h3 className="font-serif font-semibold mb-3">Selected Honors &amp; Certifications</h3>
              <ul className="text-charcoal/85 text-sm space-y-1.5 list-disc list-inside">
                <li>CompTIA Security+ (in progress)</li>
                <li>Microsoft Cybersecurity Grant Recipient (2023)</li>
                <li>SANS Foundation Cybersecurity Certification (2023)</li>
                <li>NCWIT Award for Computing (2023)</li>
                <li>FBI Future Agents in Training, FBI PFT and coursework (2022)</li>
                <li>Virtual NSLI-Y Korean Language Scholarship, U.S. Dept. of State (2022)</li>
              </ul>
            </div>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={btnPrimary}>
              <Download className="w-4 h-4" /> Download Full Résumé (PDF)
            </a>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative px-6 md:px-12 py-28 md:py-36 bg-ink overflow-hidden">
        <Seal className="text-seal w-40 h-40 absolute -right-10 -bottom-10 rotate-[8deg] opacity-[0.07] hidden md:block" />
        <div className="max-w-3xl mx-auto relative">
          <Reveal>
            <Eyebrow>Get In Touch</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-5 text-paper">
              Let's build something secure
            </h2>
            <p className="max-w-xl text-bone/80 mb-8">
              Open to internships, research collaborations, and conversations about
              security analysis, threat intelligence, and digital forensics.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="mailto:bgree045@odu.edu" className={btnPrimary}>
                <Mail className="w-4 h-4" /> bgree045@odu.edu
              </a>
              <a
                href="https://github.com/bree16"
                target="_blank"
                rel="noopener noreferrer"
                className={btnOutlineDark}
              >
                <FolderGit2 className="w-4 h-4" /> GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-bone/40 text-xs border-t border-white/10 bg-ink flex items-center justify-center gap-2">
        <FileText className="w-3.5 h-3.5" />
        Built by Briannah Greene &middot; React, Tailwind &amp; Framer Motion
      </footer>
    </div>
  )
}
