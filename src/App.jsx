import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, Mail, Github, Linkedin, FileText, MapPin, Sun, Moon, Award, BriefcaseBusiness, GraduationCap, Rocket, LayoutDashboard, Timeline, ShieldCheck, Medal, Link2 } from 'lucide-react'

function App() {
  // UI state
  const [active, setActive] = useState('home')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark')

  // Theme toggle (no dependency required)
  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  // Scroll spy
  useEffect(() => {
    const handler = () => {
      const sections = ['home','about','experience','projects','leadership','certifications','skills','contact']
      const offsets = sections.map(id => ({ id, el: document.getElementById(id) }))
        .filter(x => x.el)
        .map(x => ({ id: x.id, top: Math.abs(x.el.getBoundingClientRect().top) }))
      const current = offsets.reduce((prev, curr) => curr.top < prev.top ? curr : prev, { id: 'home', top: Infinity })
      if (current && current.id) setActive(current.id)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Data from resume
  const name = 'Nitya Jhaveri'
  const location = 'West Lafayette, IN'
  const tagline = 'Purdue CS + Economics Junior — building data-driven products where technology meets markets.'

  const socials = useMemo(() => ([
    { title: 'GitHub', icon: Github, href: 'https://github.com/Nityaj22' },
    { title: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/nityajhaveri/' },
    { title: 'Resume', icon: FileText, href: '#' , primary: true},
  ]), [])

  const experience = [
    {
      role: 'Data Science & Software Engineering Intern',
      org: 'Cygnet.One',
      time: 'Jun 2025 – Jul 2025 • Ahmedabad, India',
      bullets: [
        'Migrated legacy ASPX modules to ASP.NET MVC with Razor views, controllers, and models.',
        'Built delivery status and KPI dashboards improving usability for HR, managers, and employees.',
        'Integrated C# controllers with SQL stored procedures for validations and conflict detection.',
        'Participated in staging, deployment, and workflow reviews; strengthened debugging and team skills.'
      ],
      tags: ['C#', 'ASP.NET MVC', 'SQL', 'JavaScript']
    },
    {
      role: 'Project Assistant — The Data Mine Corporate Partners',
      org: 'Purdue University',
      time: 'Aug 2024 – May 2025 • West Lafayette, IN',
      bullets: [
        'Streamlined 80+ features to <20 and applied clustering to deliver an 88% accurate model.',
        'Translating complex data into actionable insights using Python, R, Tableau, and Snowflake.',
        'Using Agile practices for coordination and milestone tracking.'
      ],
      tags: ['Python', 'R', 'Tableau', 'Snowflake']
    },
    {
      role: 'Tutor',
      org: 'Shyam Sir Classes',
      time: 'Jun 2023 – Jul 2023 • Ahmedabad, India',
      bullets: [
        'Led a class of 30 students achieving a 100% pass rate in Java assessments.',
        'Customized teaching approaches; 95% improvement in proficiency.',
        'Known for simplifying complex concepts and fostering a supportive environment.'
      ],
      tags: ['Java', 'Teaching', 'Mentorship']
    },
  ]

  const projects = [
    {
      title: 'Economic Scholars Program',
      description: 'Advanced discussion-driven exploration of money and payment systems; analyzed cash, digital payments, and DeFi; designed a new currency model.',
      tags: ['FinTech', 'Policy', 'Economics'],
      link: '#'
    },
    {
      title: 'Moonshot Pitch Competition — Finalist',
      description: 'Reached finals by pitching an innovative solution using financial modeling, strategic insights, and market analysis.',
      tags: ['Pitch', 'Strategy', 'Modeling'],
      link: '#'
    },
    {
      title: 'KPI Dashboard Modernization',
      description: 'Built interactive KPI dashboards and delivery status views for HR/managers during Cygnet.One internship.',
      tags: ['Tableau', 'JavaScript', 'SQL'],
      link: '#'
    },
    {
      title: 'Customer Segmentation Pipeline',
      description: 'Feature reduction from 80+ to <20 and clustering ensemble achieving ~88% accuracy.',
      tags: ['Python', 'R', 'ML'],
      link: '#'
    },
  ]

  const leadership = [
    { title: 'Social Media Lead', org: 'Purdue SEARCH Club', details: 'Managed digital engagement and outreach.' },
    { title: 'Treasurer', org: 'F1@Purdue Club', details: 'Managed finances and grant funds.' },
    { title: 'Teaching Assistant', org: 'ECON 252 (Macroeconomics)', details: 'Assisted in lectures, grading, and support.' },
    { title: 'Team Lead', org: 'TiE’s TYE Program', details: 'Led a startup team from ideation to pitch.' },
    { title: 'Verbal Recognition', org: 'Chhatra Sansad Ahmedabad MUN', details: 'Recognized for exceptional debate skills.' },
  ]

  const certifications = [
    'Data Analytics Basics — IBM (edX)',
    'Intro to Career Skills in Data Analytics — LinkedIn Learning',
    'Data with Excel — IBM (edX)',
    'Programming with Arduino — Purdue University',
  ]

  const skills = {
    Languages: ['Python', 'Java', 'C++', 'R', 'C#', 'SQL', 'JavaScript', 'HTML', 'CSS'],
    Frameworks: ['ASP.NET MVC', 'React', 'FastAPI', 'Tailwind CSS'],
    Data: ['Tableau', 'Power BI', 'Snowflake', 'Pandas', 'NumPy', 'scikit-learn'],
    Tools: ['Git', 'GitHub', 'Excel', 'SPSS', 'Stata']
  }

  async function submitContact(e) {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    const form = new FormData(e.currentTarget)
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      subject: form.get('subject'),
      message: form.get('message')
    }
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      await res.json()
      setResult({ ok: true, msg: 'Thanks! Your message was sent.' })
      e.currentTarget.reset()
    } catch (err) {
      setResult({ ok: false, msg: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 dark:text-slate-100">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-black/5 bg-white/70 dark:bg-slate-950/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="font-semibold tracking-tight">
            {name}
          </button>
          <nav className="hidden md:flex gap-6 text-sm">
            {['about','experience','projects','leadership','certifications','skills','contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`hover:text-amber-600 transition-colors ${active===id? 'text-amber-600 font-medium' : 'text-slate-600 dark:text-slate-300'}`}
              >{id.charAt(0).toUpperCase()+id.slice(1)}</button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle dark={dark} setDark={setDark} />
            {socials.map(({ title, icon:Icon, href, primary }) => (
              <a key={title} href={href} target="_blank" rel="noreferrer" aria-label={title}
                 className={`${primary ? 'px-3 py-1.5 rounded bg-amber-600 text-white text-sm hover:bg-amber-700 inline-flex items-center gap-2' : 'p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                <Icon size={primary ? 16 : 18} />
                {primary && <span>{title}</span>}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-6xl px-4 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium bg-amber-50/80 dark:bg-amber-400/10 border border-amber-200/70 dark:border-amber-300/20 px-3 py-1 rounded-full mb-4">
              <GraduationCap size={16}/> Purdue University • CS + Economics
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {name}
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              {tagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => scrollTo('projects')} className="px-5 py-2.5 rounded bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 inline-flex items-center gap-2">See Projects <ArrowRight size={16}/></button>
              <button onClick={() => scrollTo('contact')} className="px-5 py-2.5 rounded border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800">Contact</button>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
              <MapPin size={16}/> {location}
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-300"><LayoutDashboard size={16}/> Interested in: Product, Data, FinTech</span>
              <span className="hidden sm:inline-flex items-center gap-2 text-slate-700 dark:text-slate-300"><Rocket size={16}/> Open to internships</span>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-300/10 dark:to-amber-200/5 border border-amber-300/60 dark:border-amber-200/20 shadow-inner"/>
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-44 h-44 md:w-56 md:h-56 rounded-full bg-white/90 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 shadow-lg grid place-items-center text-slate-700 dark:text-slate-300 font-semibold">Your Photo</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <Section id="about" title="About" subtitle="Blending computing with economics to build pragmatic, high‑impact solutions.">
        <p className="text-slate-600 dark:text-slate-300 max-w-3xl">
          I’m a junior at Purdue University double majoring in Computer Science and Economics. I enjoy designing systems that pair solid engineering with sound economic reasoning. Recently, I’ve worked on migrating legacy systems, building KPI dashboards, and streamlining ML pipelines for customer segmentation.
        </p>
      </Section>

      {/* Experience */}
      <Section id="experience" title="Experience" icon={BriefcaseBusiness}>
        <div className="mt-6 grid gap-4">
          {experience.map((e, i) => (
            <ExperienceCard key={i} {...e} />
          ))}
        </div>
      </Section>

      {/* Projects & Activities */}
      <Section id="projects" title="Projects & Activities" icon={Timeline}>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </Section>

      {/* Leadership & Awards */}
      <Section id="leadership" title="Leadership & Engagement" icon={ShieldCheck}>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {leadership.map((l, i) => (
            <div key={i} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{l.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{l.org}</p>
                </div>
                <Medal className="text-amber-600" size={18} />
              </div>
              <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{l.details}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Certifications */}
      <Section id="certifications" title="Certifications" icon={Award}>
        <ul className="mt-4 grid sm:grid-cols-2 gap-3">
          {certifications.map((c) => (
            <li key={c} className="flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4">
              <Award className="text-amber-600" size={18} />
              <span className="text-sm">{c}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Skills */}
      <Section id="skills" title="Skills">
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([cat, list]) => (
            <div key={cat} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <h4 className="font-semibold">{cat}</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {list.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Get in touch">
        <p className="mt-2 text-slate-600 dark:text-slate-300">Have a project, internship, or collaboration in mind? I’d love to chat.</p>
        <form onSubmit={submitContact} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <input name="name" required placeholder="Your name" className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"/>
          <input name="email" type="email" required placeholder="Email" className="w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"/>
          <input name="subject" placeholder="Subject" className="md:col-span-2 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"/>
          <textarea name="message" required rows={5} placeholder="Message" className="md:col-span-2 w-full rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"/>
          <div className="md:col-span-2 flex items-center gap-4">
            <button disabled={submitting} className="px-5 py-2.5 rounded bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-60 inline-flex items-center gap-2">
              <Mail size={16}/> {submitting ? 'Sending…' : 'Send message'}
            </button>
            {result && (
              <span className={`${result.ok ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>{result.msg}</span>
            )}
          </div>
        </form>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="mailto:jhaverin@purdue.edu" className="inline-flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 hover:underline"><Mail size={16}/> jhaverin@purdue.edu</a>
          <a href="https://www.linkedin.com/in/nityajhaveri/" target="_blank" className="inline-flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 hover:underline" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a>
          <a href="https://github.com/Nityaj22" target="_blank" className="inline-flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 hover:underline" rel="noreferrer"><Github size={16}/> GitHub</a>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t border-black/5 dark:border-white/5 py-10 text-center text-sm text-slate-600 dark:text-slate-400">
        <p>© {new Date().getFullYear()} {name} — Purdue University • CS + Economics</p>
      </footer>
    </div>
  )
}

function ThemeToggle({ dark, setDark }) {
  return (
    <button
      onClick={() => setDark(v => !v)}
      aria-label="Toggle theme"
      className="p-2 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}

function Section({ id, title, subtitle, icon:Icon, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 py-16 border-t border-black/5 dark:border-white/5">
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-amber-600" size={20} />}
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      {subtitle && <p className="mt-2 text-slate-600 dark:text-slate-300">{subtitle}</p>}
      {children}
    </section>
  )
}

function ExperienceCard({ role, org, time, bullets, tags }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h3 className="font-semibold text-lg">{role}</h3>
          <p className="text-slate-600 dark:text-slate-400">{org}</p>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{time}</p>
      </div>
      <ul className="mt-3 list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
      {tags && (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map(t => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ title, description, tags, link }) {
  return (
    <div className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-shadow">
      <div className="p-5">
        <h3 className="font-semibold text-lg group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">{title}</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tags?.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{t}</span>
          ))}
        </div>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-sm text-amber-700 dark:text-amber-400 hover:underline">
            Learn more <Link2 size={14} />
          </a>
        )}
      </div>
    </div>
  )
}

export default App
