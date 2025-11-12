import { useEffect, useState } from 'react'
import { ArrowRight, Mail, Github, Linkedin, FileText, MapPin, School } from 'lucide-react'

function App() {
  const [active, setActive] = useState('home')
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const handler = () => {
      const sections = ['home','about','experience','projects','skills','contact']
      const offsets = sections.map(id => ({ id, top: document.getElementById(id)?.getBoundingClientRect().top || 0 }))
      const current = offsets.reduce((prev, curr) => Math.abs(curr.top) < Math.abs(prev.top) ? curr : prev)
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

  const projects = [
    {
      title: 'Market Microstructure Simulator',
      description: 'Agent-based limit order book simulation to explore liquidity, spreads, and execution under different market rules.',
      tags: ['Python', 'FastAPI', 'Pandas'],
      link: '#'
    },
    {
      title: 'Course Planner',
      description: 'Interactive planner that optimizes degree progress with prerequisites and workload constraints.',
      tags: ['React', 'Graph Algorithms'],
      link: '#'
    },
    {
      title: 'Econ Insights Dashboard',
      description: 'Macro indicators dashboard with time-series analysis and forecasting.',
      tags: ['React', 'D3', 'Time Series'],
      link: '#'
    }
  ]

  const skills = {
    Languages: ['Python', 'JavaScript/TypeScript', 'SQL', 'R'],
    Frameworks: ['React', 'FastAPI', 'Node', 'Tailwind'],
    Data: ['Pandas', 'NumPy', 'scikit-learn', 'MongoDB'],
    Concepts: ['Algorithms', 'Game Theory', 'Optimization', 'Econometrics']
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
      const data = await res.json()
      setResult({ ok: true, msg: 'Thanks! Your message was sent.' })
      e.currentTarget.reset()
    } catch (err) {
      setResult({ ok: false, msg: 'Something went wrong. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-800">
      {/* Top Nav */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-black/5 bg-white/70">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="font-semibold tracking-tight">CS + ECON @ Purdue</button>
          <nav className="hidden md:flex gap-6 text-sm">
            {['about','experience','projects','skills','contact'].map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`hover:text-amber-700 transition-colors ${active===id? 'text-amber-700 font-medium' : 'text-slate-600'}`}
              >{id.charAt(0).toUpperCase()+id.slice(1)}</button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="p-2 rounded hover:bg-slate-100"><Github size={18}/></a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded hover:bg-slate-100"><Linkedin size={18}/></a>
            <a href="#" className="px-3 py-1.5 rounded bg-amber-600 text-white text-sm hover:bg-amber-700 inline-flex items-center gap-2"><FileText size={16}/> Resume</a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="mx-auto max-w-6xl px-4 pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-700 font-medium bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">
              <School size={16}/> Purdue University
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              CS + Economics Junior
            </h1>
            <p className="mt-4 text-slate-600 text-lg leading-relaxed">
              I build data-driven products at the intersection of computing and markets. 
              I enjoy algorithmic problem solving, financial systems, and elegant user experiences.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => scrollTo('projects')} className="px-5 py-2.5 rounded bg-slate-900 text-white hover:bg-slate-800 inline-flex items-center gap-2">See Projects <ArrowRight size={16}/></button>
              <button onClick={() => scrollTo('contact')} className="px-5 py-2.5 rounded border border-slate-300 hover:bg-white">Contact</button>
            </div>
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
              <MapPin size={16}/> West Lafayette, IN
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300/60 shadow-inner"/>
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-40 h-40 rounded-full bg-white/90 border border-slate-200 shadow-lg grid place-items-center text-slate-700 font-semibold">Your Photo</div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-16 border-t border-black/5">
        <h2 className="text-2xl md:text-3xl font-bold">About</h2>
        <p className="mt-4 text-slate-600 max-w-3xl">
          I’m a junior studying Computer Science and Economics at Purdue. My interests span market design, 
          data systems, and full‑stack development. Recently, I’ve explored market microstructure, 
          curriculum planning algorithms, and macroeconomic data visualization.
        </p>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-6xl px-4 py-16 border-t border-black/5">
        <h2 className="text-2xl md:text-3xl font-bold">Experience</h2>
        <div className="mt-6 grid gap-4">
          <ExperienceItem role="Software Engineering Intern" org="Fintech Co" time="Summer 2024" bullets={[
            'Built APIs for portfolio analytics and trade attribution',
            'Reduced query times by 35% via indexing and caching',
          ]} />
          <ExperienceItem role="Research Assistant" org="Purdue Econ" time="2023 - Present" bullets={[
            'Implemented simulations for auction mechanisms',
            'Estimated structural models using panel data',
          ]} />
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="mx-auto max-w-6xl px-4 py-16 border-t border-black/5">
        <h2 className="text-2xl md:text-3xl font-bold">Projects</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="group rounded-xl border border-slate-200 bg-white hover:shadow-lg transition-shadow">
              <div className="p-5">
                <h3 className="font-semibold text-lg group-hover:text-amber-700 transition-colors">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">{t}</span>
                  ))}
                </div>
                <a href={p.link} className="mt-4 inline-block text-sm text-amber-700 hover:underline">Learn more</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-16 border-t border-black/5">
        <h2 className="text-2xl md:text-3xl font-bold">Skills</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(skills).map(([cat, list]) => (
            <div key={cat} className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-semibold">{cat}</h4>
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                {list.map((s) => (<li key={s}>• {s}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-16 border-t border-black/5">
        <h2 className="text-2xl md:text-3xl font-bold">Get in touch</h2>
        <p className="mt-2 text-slate-600">Have a project, internship, or collaboration in mind? I’d love to chat.</p>
        <form onSubmit={submitContact} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
          <input name="name" required placeholder="Your name" className="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"/>
          <input name="email" type="email" required placeholder="Email" className="w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"/>
          <input name="subject" placeholder="Subject" className="md:col-span-2 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"/>
          <textarea name="message" required rows={5} placeholder="Message" className="md:col-span-2 w-full rounded border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-600"/>
          <div className="md:col-span-2 flex items-center gap-4">
            <button disabled={submitting} className="px-5 py-2.5 rounded bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-60 inline-flex items-center gap-2">
              <Mail size={16}/> {submitting ? 'Sending…' : 'Send message'}
            </button>
            {result && (
              <span className={`${result.ok ? 'text-green-700' : 'text-red-700'}`}>{result.msg}</span>
            )}
          </div>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-10 text-center text-sm text-slate-600">
        <p>© {new Date().getFullYear()} Your Name — Purdue University • CS + Economics</p>
      </footer>
    </div>
  )
}

function ExperienceItem({ role, org, time, bullets }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h3 className="font-semibold text-lg">{role}</h3>
          <p className="text-slate-600">{org}</p>
        </div>
        <p className="text-sm text-slate-500">{time}</p>
      </div>
      <ul className="mt-3 list-disc list-inside text-sm text-slate-700 space-y-1">
        {bullets.map((b, i) => <li key={i}>{b}</li>)}
      </ul>
    </div>
  )
}

export default App
