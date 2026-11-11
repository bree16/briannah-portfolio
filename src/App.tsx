import { motion, AnimatePresence } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ExternalLink, FolderGit2, Mail, Download, FileText, Award, GraduationCap, Camera, ShieldCheck, Link2 } from 'lucide-react'

const BOOT_LINES = [
  'ACCESS_TERMINAL v2.6',
  'Initializing secure session...',
  'Verifying credentials...',
  'Loading profile: B. GREENE',
  'Clearance level: VISITOR',
  'Awaiting authorization...',
]

const ACCESS_CODE = 'odu'

function BootSequence({ onDone }: { onDone: () => void }) {
  const [lineCount, setLineCount] = useState(0)
  const [phase, setPhase] = useState<'print' | 'prompt' | 'denied' | 'granted'>('print')
  const [code, setCode] = useState('')
  const [exiting, setExiting] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

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
    const toPrompt = setTimeout(() => setPhase('prompt'), 220 * BOOT_LINES.length + 500)
    const skipAll = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExiting(true)
    }
    window.addEventListener('keydown', skipAll)
    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(toPrompt)
      window.removeEventListener('keydown', skipAll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (phase === 'prompt') inputRef.current?.focus()
  }, [phase])

  const submit = () => {
    if (code.trim().toLowerCase() === ACCESS_CODE) {
      setPhase('granted')
      setTimeout(() => setExiting(true), 750)
    } else {
      setPhase('denied')
      setCode('')
      setTimeout(() => setPhase('prompt'), 900)
    }
  }

  const showPrompt = phase === 'prompt' || phase === 'denied' || phase === 'granted'

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
          <p key={line} className="text-bone/80">
            {i === 0 ? <span className="text-paper">{line}</span> : line}
          </p>
        ))}
        {phase === 'print' && (
          <span className="boot-cursor inline-block w-2.5 h-4 bg-seal align-middle mt-1" />
        )}

        {showPrompt && (
          <div className="mt-2 flex items-center gap-2 text-gold">
            <span>ENTER ACCESS CODE:</span>
            <input
              ref={inputRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit()
              }}
              disabled={phase !== 'prompt' && phase !== 'denied'}
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              aria-label="Access code"
              style={{ caretColor: 'var(--color-seal)' }}
              className="bg-transparent border-b border-gold/50 text-paper tracking-[0.2em] uppercase focus:outline-none focus:border-gold w-28"
            />
          </div>
        )}
        {phase === 'denied' && (
          <p className="text-seal text-xs mt-1">ACCESS DENIED. RETRY.</p>
        )}
        {phase === 'granted' && (
          <p className="text-seal font-bold mt-2">Access granted. Decrypting portfolio...</p>
        )}
        <p className="text-bone/30 text-[0.65em] mt-4 tracking-wide">esc to skip</p>
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
  { href: '#works', label: 'Works' },
  { href: '#photography', label: 'Photography' },
  { href: '#contact', label: 'Contact' },
]

type WorkDoc = {
  title: string
  meta: string
  file: string
  format: 'PDF' | 'PPTX' | 'DOCX'
  credit?: string
}

const PAPERS: WorkDoc[] = [
  {
    title: 'Security Policy Paper',
    meta: 'Cybersecurity Policy Writing',
    file: '/works/security-policy-paper.docx',
    format: 'DOCX',
  },
  {
    title: 'Cybersecurity and the Social Sciences',
    meta: 'Cybersecurity and the Social Sciences · Oct 2026',
    file: '/works/cybersec-and-social-sciences.pptx',
    format: 'PPTX',
  },
  {
    title: 'Criminology APA Research Report',
    meta: 'Introduction to Criminology · Aug 2026',
    file: '/works/crjs-apa-report.pdf',
    format: 'PDF',
  },
  {
    title: 'Wo De Shenghuo (我的生活): "My Life"',
    meta: 'Mandarin Chinese Language Project · Jun 2026',
    file: '/works/wo-de-shenghuo.pptx',
    format: 'PPTX',
  },
  {
    title: 'Mandarin Final Presentation',
    meta: 'Chinese Language Final Project · Jun 2026',
    file: '/works/mandarin-final-presentation.pptx',
    format: 'PPTX',
  },
  {
    title: 'Dialogue Script (Chinese)',
    meta: 'Chinese II · May 2024',
    file: '/works/chin120-dialogue-script.pdf',
    format: 'PDF',
  },
  {
    title: 'Dialogue Script (English Translation)',
    meta: 'Chinese II · May 2024',
    file: '/works/chin120-dialogue-script-english.pdf',
    format: 'PDF',
  },
  {
    title: 'NSLI-Y Korean Dialogue Script',
    meta: 'NSLI-Y Korean Language Program · Final Script',
    file: '/works/nsliy-korean-script.pdf',
    format: 'PDF',
  },
  {
    title: 'Holidays in Mexico',
    meta: 'Spanish Language Coursework',
    file: '/works/spanish-midterm-holidays.pptx',
    format: 'PPTX',
    credit: 'with Xavier McInturff',
  },
  {
    title: 'The Uses of Tener',
    meta: 'Spanish Language Coursework',
    file: '/works/spanish-final-tener.pptx',
    format: 'PPTX',
  },
  {
    title: 'Newport News Housing Hub Presentation',
    meta: 'Teamship Hampton Roads · Prepared for the Director of Housing & Neighborhood Services',
    file: '/works/newport-news-housing-hub-presentation.pptx',
    format: 'PPTX',
  },
  {
    title: 'Housing Hub Team Research Document',
    meta: 'Teamship Hampton Roads · Team 2 Collaborative Research',
    file: '/works/housing-hub-team-research.pdf',
    format: 'PDF',
    credit: 'with Jastiasia, Christiney Ponton, Cat Greene & Andy',
  },
]

const RECOMMENDATIONS: WorkDoc[] = [
  {
    title: 'Letter of Recommendation',
    meta: 'Scholarship Recommendation Materials',
    file: '/works/letter-of-recommendation.pdf',
    format: 'PDF',
  },
  {
    title: 'Recommendation Write-Up',
    meta: 'Scholarship Recommendation Materials',
    file: '/works/recommendation-write-up.pdf',
    format: 'PDF',
  },
  {
    title: 'General Information for Recommenders',
    meta: 'Background Packet for Recommenders',
    file: '/works/info-for-recommenders.docx',
    format: 'DOCX',
  },
]

const SYLLABI: WorkDoc[] = [
  {
    title: 'CYSE 200: Cybersecurity, Innovation & Society',
    meta: 'Old Dominion University · Fall 2026',
    file: '/works/syllabus-cyse200.pdf',
    format: 'PDF',
  },
  {
    title: 'CHIN 120: Chinese II',
    meta: 'Old Dominion University · Fall 2026',
    file: '/works/syllabus-chin120.pdf',
    format: 'PDF',
  },
]

const CERTIFICATIONS: WorkDoc[] = [
  {
    title: 'Standard Diploma',
    meta: 'Commonwealth of Virginia · Virginia Beach City Public Schools, Ocean Lakes High School · Jun 2023',
    file: '/works/standard-diploma-ocean-lakes.pdf',
    format: 'PDF',
  },
  {
    title: 'Aspirations in Computing Award',
    meta: 'National Center for Women & Information Technology (NCWIT), Virginia/DC Affiliate · 2023',
    file: '/works/ncwit-aspirations-in-computing-2023.pdf',
    format: 'PDF',
  },
  {
    title: 'GenCyber Certificate of Award',
    meta: 'National Security Agency (NSA) & Old Dominion University GenCyber Program · Jul 2022',
    file: '/works/nsa-odu-gencyber-certificate-of-award.pdf',
    format: 'PDF',
  },
  {
    title: 'Cybersecurity Virtual Experience Program',
    meta: 'Forage, Mastercard & the NY Jobs CEO Council · Jun 2022',
    file: '/works/forage-mastercard-cybersecurity-program.pdf',
    format: 'PDF',
  },
  {
    title: 'Shields Up: Cybersecurity Virtual Experience Program',
    meta: 'Forage, AIG & the NY Jobs CEO Council · Jun 2022',
    file: '/works/forage-aig-shields-up-cybersecurity-program.pdf',
    format: 'PDF',
  },
  {
    title: 'SANS Foundations Certificate of Completion',
    meta: 'SANS Institute · 38 CPE Credits · Jun 2022',
    file: '/works/sans-foundations-certificate.pdf',
    format: 'PDF',
  },
  {
    title: 'NSLI-Y Korean Program Certificate of Completion',
    meta: 'U.S. Department of State, National Security Language Initiative for Youth (NSLI-Y) · Fall 2022',
    file: '/works/nsli-y-korean-certificate.docx',
    format: 'DOCX',
  },
  {
    title: 'Scholastic Excellence Medal',
    meta: 'The American Legion, Post 310 · Churchland High School · May 2022',
    file: '/works/american-legion-scholastic-excellence-medal.pdf',
    format: 'PDF',
  },
  {
    title: 'Certificate of Membership',
    meta: 'Distributive Education Clubs of America (DECA) · Churchland High School · May 2022',
    file: '/works/deca-certificate-of-membership.pdf',
    format: 'PDF',
  },
  {
    title: 'Introduction to Cybersecurity Course',
    meta: 'Girls Who Code · 2022',
    file: '/works/girls-who-code-intro-to-cybersecurity.pdf',
    format: 'PDF',
  },
  {
    title: 'Future Agents in Training Program',
    meta: 'Federal Bureau of Investigation (FBI) · 2022',
    file: '/works/fbi-future-agents-in-training.pdf',
    format: 'PDF',
  },
  {
    title: 'National Workplace Readiness Skills Certification',
    meta: 'Career and Technical Education Consortium of States (CTECS) · Mar 2022',
    file: '/works/ctecs-national-workplace-readiness-certification.pdf',
    format: 'PDF',
  },
  {
    title: 'Lance Corporal Appointment',
    meta: "United States Marine Corps Junior Reserve Officers' Training Corps (JROTC) · Churchland High School · Dec 2021",
    file: '/works/jrotc-lance-corporal-appointment.pdf',
    format: 'PDF',
  },
  {
    title: 'Private First Class Appointment',
    meta: "United States Marine Corps Junior Reserve Officers' Training Corps (JROTC) · Churchland High School · Oct 2021",
    file: '/works/jrotc-private-first-class-appointment.pdf',
    format: 'PDF',
  },
  {
    title: 'FAB Camp Certificate of Completion',
    meta: "Athena Racing · 2020",
    file: '/works/athena-racing-fab-camp.pdf',
    format: 'PDF',
  },
]

const WORK_TABS = [
  { key: 'papers', label: 'School Papers', icon: FileText, docs: PAPERS },
  { key: 'recommendations', label: 'Recommendation Materials', icon: Award, docs: RECOMMENDATIONS },
  { key: 'syllabuses', label: 'Syllabuses', icon: GraduationCap, docs: SYLLABI },
  { key: 'certifications', label: 'Certifications', icon: ShieldCheck, docs: CERTIFICATIONS },
] as const

const HONORS = [
  'CompTIA Security+ (in progress)',
  'SANS Foundation Cybersecurity Cert.',
  'Microsoft Cybersecurity Grant Recipient',
  'NCWIT Award for Computing',
]

const SKILL_GROUPS = [
  {
    title: 'Programming & Systems',
    items: ['Python', 'Java', 'React / TypeScript', 'Linux', 'VirtualBox / VMware', 'Unreal Engine 5'],
    wide: true,
  },
  {
    title: 'Cybersecurity & Networking',
    items: ['Wireshark', 'Cisco Packet Tracer', 'Firewall configuration', 'Vulnerability testing', 'Cryptography fundamentals'],
    wide: true,
  },
  {
    title: 'Agentic AI',
    items: ['Kiro (AWS)', 'Replit Agent', 'Prompt engineering', 'AI oversight & cost analysis'],
    wide: true,
  },
  {
    title: 'Design',
    items: ['Adobe Photoshop', 'Lightroom', 'Canva', 'UI/UX fundamentals'],
    wide: false,
  },
  {
    title: 'Languages',
    items: ['English (fluent)', 'Mandarin Chinese (minor)', 'Korean (NSLI-Y, 2022)'],
    wide: false,
  },
]

/** A document card that starts "classified" (redacted title + stamp) and declassifies
 *  itself shortly after scrolling into view, revealing the real title. PPTX/DOCX files
 *  open an inline slide/doc viewer on click; PDFs open directly in a new tab. */
function WorkCard({
  doc,
  index = 0,
  onPreview,
}: {
  doc: WorkDoc
  index?: number
  onPreview: (doc: WorkDoc) => void
}) {
  const [declassified, setDeclassified] = useState(false)
  const isViewable = doc.format === 'PPTX' || doc.format === 'DOCX'

  const cardInner = (
    <>
      <span
        className={`pointer-events-none absolute -top-2.5 -right-3 border-2 border-seal text-seal font-mono font-bold text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 rotate-[-7deg] bg-ink-soft transition-all duration-500 ${
          declassified ? 'opacity-0 scale-110' : 'opacity-90 scale-100'
        }`}
        aria-hidden="true"
      >
        Classified
      </span>

      <span className="mt-0.5 shrink-0 w-9 h-9 flex items-center justify-center border border-gold/40 text-gold text-[10px] font-bold tracking-wide">
        {doc.format}
      </span>

      <span className="flex-1 min-w-0">
        <span className="relative block">
          <span className="block font-serif text-base font-semibold text-paper group-hover:text-gold transition-colors">
            {doc.title}
          </span>
          <span
            className={`absolute inset-0 bg-ink-soft border-l-2 border-seal flex items-center overflow-hidden px-2 font-mono text-[10px] tracking-[0.2em] text-bone/40 origin-right transition-transform duration-700 ease-out ${
              declassified ? 'scale-x-0' : 'scale-x-100'
            }`}
            aria-hidden="true"
          >
            &#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;&#9608;
          </span>
        </span>
        <span className="block text-base text-bone/70 mt-1">
          {doc.meta}
          {doc.credit && <span className="block text-bone/50 text-sm mt-0.5">{doc.credit}</span>}
        </span>
      </span>

      {isViewable ? (
        <a
          href={doc.file}
          download
          onClick={(e) => e.stopPropagation()}
          title="Download original file"
          className="shrink-0 mt-1 text-bone/40 hover:text-gold transition-colors"
        >
          <Download className="w-4 h-4" />
        </a>
      ) : (
        <Download className="w-4 h-4 text-bone/40 group-hover:text-gold transition-colors shrink-0 mt-1" />
      )}
    </>
  )

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      variants={fadeUp}
      onViewportEnter={() => {
        setTimeout(() => setDeclassified(true), 550 + index * 160)
      }}
    >
      {isViewable ? (
        <button
          type="button"
          onClick={() => onPreview(doc)}
          className="group relative flex items-start gap-4 border border-white/10 bg-ink-soft p-5 hover:border-gold/60 transition-colors text-left w-full"
        >
          {cardInner}
        </button>
      ) : (
        <a
          href={doc.file}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-start gap-4 border border-white/10 bg-ink-soft p-5 hover:border-gold/60 transition-colors"
        >
          {cardInner}
        </a>
      )}
    </motion.div>
  )
}

/** Full-screen viewer for PPTX/DOCX documents, rendered via Microsoft's Office web viewer. */
function WorkPreviewModal({ doc, onClose }: { doc: WorkDoc | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          className="fixed inset-0 z-[90] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-3 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-5xl h-full md:h-[85vh] bg-ink-soft border border-gold/30 flex flex-col"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/10">
              <div className="min-w-0">
                <p className="font-serif text-paper font-semibold truncate">{doc.title}</p>
                <p className="text-bone/60 text-xs mt-0.5">{doc.meta}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <a
                  href={doc.file}
                  download
                  className="text-xs font-bold tracking-[0.1em] uppercase text-gold hover:text-gold-soft transition-colors inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-bone/60 hover:text-seal transition-colors text-xl leading-none px-1"
                  aria-label="Close preview"
                >
                  &times;
                </button>
              </div>
            </div>
            <div className="flex-1 bg-paper">
              <iframe
                key={doc.file}
                title={doc.title}
                src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                  `${window.location.origin}${doc.file}`
                )}`}
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const btnPrimary =
  'inline-flex items-center gap-2 px-6 py-3 bg-seal text-paper font-semibold rounded-sm hover:bg-seal-deep transition-colors'
const btnOutlineDark =
  'inline-flex items-center gap-2 px-6 py-3 border border-bone/30 text-paper font-semibold rounded-sm hover:border-seal hover:text-seal transition-colors'

const GHOST_COUNT = 6
const GHOST_SPACING = 3

function GlitchCursor() {
  const coreRef = useRef<HTMLDivElement | null>(null)
  const ghostRefs = useRef<(HTMLDivElement | null)[]>([])
  const mouse = useRef({ x: -100, y: -100 })
  const visible = useRef(false)
  const history = useRef<{ x: number; y: number }[]>([])
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (hover: hover)')
    if (!mq.matches) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      visible.current = true
    }
    const onLeave = () => {
      visible.current = false
    }
    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.body.classList.add('glitch-cursor-active')

    const maxLen = GHOST_COUNT * GHOST_SPACING + 1

    const tick = () => {
      history.current.unshift({ ...mouse.current })
      if (history.current.length > maxLen) history.current.length = maxLen

      const op = visible.current ? 1 : 0
      if (coreRef.current) {
        coreRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`
        coreRef.current.style.opacity = String(op)
      }
      ghostRefs.current.forEach((el, i) => {
        if (!el) return
        const idx = Math.min((i + 1) * GHOST_SPACING, history.current.length - 1)
        const p = history.current[idx] ?? mouse.current
        el.style.transform = `translate(${p.x}px, ${p.y}px)`
        el.style.opacity = String(op * Math.max(0, 1 - (i + 1) / (GHOST_COUNT + 1)))
      })
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.body.classList.remove('glitch-cursor-active')
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <div className="glitch-cursor-root" aria-hidden="true">
      {Array.from({ length: GHOST_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            ghostRefs.current[i] = el
          }}
          className={`glitch-ghost glitch-ghost-${i % 3}`}
        />
      ))}
      <div ref={coreRef} className="glitch-core" />
    </div>
  )
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [workTab, setWorkTab] = useState<(typeof WORK_TABS)[number]['key']>('papers')
  const activeWorkTab = WORK_TABS.find((t) => t.key === workTab) ?? WORK_TABS[0]
  const [previewDoc, setPreviewDoc] = useState<WorkDoc | null>(null)

  return (
    <div className="min-h-screen bg-ink text-bone overflow-x-hidden font-sans">
      <GlitchCursor />
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
      <section id="top" className="gold-dust relative px-6 md:px-12 pt-24 md:pt-32 pb-28 md:pb-36 bg-ink overflow-hidden">
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
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
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
            <span className="block w-14 h-px bg-gold mb-6" />
            <div className="space-y-4 text-charcoal leading-relaxed text-[1.2rem]">
              <p className="drop-cap">
                Hi, I'm Briannah. I'm a cybersecurity senior at Old Dominion University
                (3.94 GPA, graduating May 2027), pursuing the accelerated
                bachelor's-to-master's track: a cybersecurity master's with a
                concentration in AI security, plus a minor in Mandarin Chinese. I
                earned my Associate of Science in Computer Science, Natural Science,
                and Mathematics from Grossmont College before transferring in. Right
                now I'm a funded researcher with the Coastal Virginia Center for Cyber
                Innovation, studying what I call Oversight Drift: how far AI agents
                stray from their set rules and policies when oversight is low, and who
                loses the most when people trust and check them less.
              </p>
              <p>
                I'm especially drawn to the analytical side of cybersecurity. Digital
                forensics and incident response appeal to me because they combine
                technical problem solving with understanding the people and motivations
                behind an attack. I'm hands on with Linux, Wireshark, firewall
                configuration, and vulnerability testing, and currently working toward
                CompTIA Security+. Outside coursework, I built a VR cyber awareness game
                that won the GenCyber Scholar Award and an agentic AI housing tool for
                Teamship Hampton Roads.
              </p>
              <p>
                I also like building virtualizations that people use to learn. Looking
                ahead, I want to focus more on language-learning technology. When it
                comes to Mandarin, there aren't cyber workforce apps out there that
                teach the language at all, so I want to build that, especially for
                people like minorities who don't already have that in their lineage.
                Without ancestors or family already in these fields, people are less
                likely to even go looking for them, and that head start shouldn't only
                belong to the people who were born into it.
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
              <div className="relative aspect-[4/5] overflow-hidden border border-ink/15 shadow-xl bg-paper-soft">
                <img
                  src="https://sites.wp.odu.edu/briannahgreene/wp-content/uploads/sites/41585/2026/09/YAS02180.jpg"
                  alt="Briannah Greene"
                  className="w-full h-full object-cover grayscale-[15%]"
                />
                {/* scanning sweep, like a security-camera readout passing over the frame */}
                <div className="scan-sweep pointer-events-none absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-gold/50 to-transparent mix-blend-screen" />
              </div>
              {/* animated marching-ants targeting border */}
              <svg
                className="scan-border pointer-events-none absolute -inset-2.5"
                width="calc(100% + 1.25rem)"
                height="calc(100% + 1.25rem)"
                viewBox="0 0 100 125"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <rect
                  x="1"
                  y="1"
                  width="98"
                  height="123"
                  fill="none"
                  stroke="var(--color-gold)"
                  strokeWidth="0.6"
                  strokeDasharray="6 4"
                />
              </svg>
              {/* targeting-reticle corner brackets */}
              <span className="pointer-events-none absolute -top-3 -left-3 w-7 h-7 border-t-2 border-l-2 border-gold" />
              <span className="pointer-events-none absolute -top-3 -right-3 w-7 h-7 border-t-2 border-r-2 border-gold" />
              <span className="pointer-events-none absolute -bottom-3 -right-3 w-7 h-7 border-b-2 border-r-2 border-gold" />
              <Seal className="text-seal w-16 h-16 absolute -bottom-6 -left-6 -rotate-[10deg] bg-paper" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="relative px-6 md:px-12 py-24 md:py-32 bg-ink overflow-hidden">
        <span className="pointer-events-none select-none absolute -right-6 top-6 font-serif text-[16rem] leading-none text-paper/[0.03] hidden lg:block">
          02
        </span>
        <div className="max-w-6xl mx-auto relative">
          <Reveal className="flex items-baseline gap-4 mb-14">
            <SectionMark n="02" tone="ink" />
            <div>
              <Eyebrow>Technical Profile</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-paper">
                Skills &amp; Certifications
              </h2>
            </div>
          </Reveal>

          {/* featured: honors & certifications banner */}
          <Reveal className="mb-6">
            <div className="relative border border-gold/40 bg-gradient-to-br from-ink-soft to-ink p-7 md:p-9 overflow-hidden">
              <span className="pointer-events-none select-none absolute -top-10 -right-6 font-serif text-[9rem] leading-none text-gold/10">
                &#9733;
              </span>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-4 h-4 text-gold shrink-0" />
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-gold">
                  Honors &amp; Certifications
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5 relative">
                {HONORS.map((h, i) => (
                  <motion.span
                    key={h}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    className="px-3.5 py-1.5 border border-gold/30 text-paper text-base font-medium bg-ink/40"
                  >
                    {h}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* remaining categories, asymmetric bento grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SKILL_GROUPS.map((group, i) => (
              <Reveal
                key={group.title}
                delay={i * 0.06}
                className={group.wide ? 'lg:col-span-2' : ''}
              >
                <div className="group h-full border border-white/10 bg-ink-soft p-6 hover:border-seal/50 transition-colors">
                  <span className="block w-8 h-px bg-seal mb-4 group-hover:w-14 transition-all duration-500" />
                  <h3 className="font-serif text-lg font-semibold text-paper mb-4">
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((it) => (
                      <span
                        key={it}
                        className="px-2.5 py-1 text-sm font-mono tracking-wide text-bone/80 border border-white/10 bg-ink/50"
                      >
                        {it}
                      </span>
                    ))}
                  </div>
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
                  <p className="text-bone/85 mb-6 leading-relaxed text-lg">
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
                <p className="text-charcoal/90 text-base leading-relaxed">
                  Mentor-guided research asking: when AI agents act on our behalf, how
                  far do they drift from the set rules and policies with little
                  oversight, and who loses the most when people trust and check them
                  less? I call this work Oversight Drift. Borrowing the idea of a
                  phone's battery health indicator, I'm building a simple 0 to 100
                  score: run an agent loop with review at every step, then again with
                  little or none, and measure what quietly breaks. Culminating in a
                  paper and presentation at the December 2026 Student Research
                  Showcase.
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
                <p className="text-charcoal/90 text-base leading-relaxed mb-4">
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
                    <p className="text-bone/90 text-lg leading-relaxed">{e.desc}</p>
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
                <p className="text-charcoal/80 text-base">
                  Minor in Mandarin Chinese &middot; 3.94 GPA &middot; Senior standing
                </p>
              </div>
              <div className="bg-paper p-6">
                <h3 className="font-serif font-semibold mb-1">A.S. Computer Science</h3>
                <p className="text-seal text-sm font-semibold mb-2">
                  Grossmont College &middot; Completed June 2026
                </p>
                <p className="text-charcoal/80 text-base">
                  Natural Science &amp; Math &middot; STEM Promise Scholar
                </p>
              </div>
            </div>
            <div className="border border-ink/15 bg-paper p-6 mb-8">
              <h3 className="font-serif font-semibold mb-3">Selected Honors &amp; Certifications</h3>
              <ul className="text-charcoal/85 text-base space-y-1.5 list-disc list-inside">
                <li>STEM Promise Scholar</li>
                <li>Horatio Scholar</li>
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

      {/* WORKS */}
      <section id="works" className="gold-dust px-6 md:px-12 py-24 md:py-32 bg-ink">
        <div className="max-w-5xl mx-auto">
          <Reveal className="flex items-baseline gap-4 mb-10">
            <SectionMark n="06" tone="ink" />
            <div>
              <Eyebrow>Portfolio Library</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-paper">
                Works &amp; Documentation
              </h2>
              <p className="text-bone/70 mt-3 max-w-xl text-lg">
                School papers, presentations, recommendation materials, and course
                syllabi, all in one place. Click any item to view or download it.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-6">
              {WORK_TABS.map((tab) => {
                const Icon = tab.icon
                const active = tab.key === workTab
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setWorkTab(tab.key)}
                    className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-[0.1em] uppercase border transition-colors ${
                      active
                        ? 'bg-gold text-ink border-gold'
                        : 'border-white/15 text-bone/70 hover:border-gold/50 hover:text-gold'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </Reveal>

          {activeWorkTab.docs.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {activeWorkTab.docs.map((doc, i) => (
                <WorkCard key={doc.title} doc={doc} index={i} onPreview={setPreviewDoc} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-white/15 text-bone/50 text-sm px-6 py-10 text-center">
              Certificates coming soon.
            </div>
          )}
        </div>
      </section>

      <WorkPreviewModal doc={previewDoc} onClose={() => setPreviewDoc(null)} />

      {/* PHOTOGRAPHY */}
      <section id="photography" className="grain px-6 md:px-12 py-24 md:py-32 bg-paper text-ink">
        <div className="max-w-5xl mx-auto">
          <Reveal className="flex items-baseline gap-4 mb-10">
            <SectionMark n="07" tone="paper" />
            <div>
              <Eyebrow>Behind The Lens</Eyebrow>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                Photography
              </h2>
              <p className="text-charcoal/80 mt-3 max-w-xl text-lg">
                Outside of security work, I shoot and edit my own photography under YAS
                Entertainment. Here's a look at the gallery.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <a
              href="https://www.viewbug.com/member/yasentertainmentonlinenews"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border border-ink/15 bg-ink text-paper overflow-hidden"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-b border-white/10">
                <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-gold">
                  <Camera className="w-4 h-4" /> YAS Entertainment &middot; ViewBug Gallery
                </span>
                <span className="text-xs font-bold tracking-[0.1em] uppercase text-gold group-hover:text-gold-soft transition-colors inline-flex items-center gap-1.5">
                  View Full Gallery <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
              <div className="relative min-h-[280px] md:min-h-[360px] flex flex-col items-center justify-center gap-4 px-6 py-14 text-center">
                <div className="gold-dust absolute inset-0 opacity-40" />
                <Camera className="w-10 h-10 text-gold relative" />
                <p className="relative max-w-md text-paper/80 text-base leading-relaxed">
                  My photography lives on ViewBug, not here. Click through to browse
                  the full gallery.
                </p>
                <span className="relative inline-flex items-center gap-2 px-5 py-2.5 border border-gold text-gold text-xs font-bold tracking-[0.1em] uppercase group-hover:bg-gold group-hover:text-ink transition-colors">
                  Visit the Gallery <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
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
            <p className="max-w-xl text-bone/80 mb-8 text-lg">
              Open to internships, research collaborations, and conversations about
              security analysis, threat intelligence, and digital forensics.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a href="mailto:bgree045@odu.edu" className={btnPrimary}>
                <Mail className="w-4 h-4" /> bgree045@odu.edu
              </a>
              <a
                href="https://www.linkedin.com/in/briannah-greene-725197169"
                target="_blank"
                rel="noopener noreferrer"
                className={btnOutlineDark}
              >
                <Link2 className="w-4 h-4" /> LinkedIn
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
