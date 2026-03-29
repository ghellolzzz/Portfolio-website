import { useEffect, useState } from 'react'
import Reveal from './components/Reveal'
import { portfolioData } from './data/portfolio'

function SectionIntro({ eyebrow, title, copy }) {
  return (
    <div className="max-w-2xl">
      <span className="label-pill">{eyebrow}</span>
      <h2 className="section-title mt-6">{title}</h2>
      <p className="section-copy mt-5">{copy}</p>
    </div>
  )
}

function parseTimelineOrganization(organization) {
  const match = organization.match(/^(.*?)\s*\((.*?)\)$/)

  if (!match) {
    return {
      name: organization,
      meta: '',
    }
  }

  return {
    name: match[1],
    meta: match[2],
  }
}

function isCurrentTimelineEntry(date) {
  return /present/i.test(date)
}

function Icon({ name, className = 'h-5 w-5' }) {
  const icons = {
    menu: (
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
    close: (
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
    arrow: (
      <path
        d="M6 12h12M12 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    mail: (
      <>
        <rect
          x="3.5"
          y="5.5"
          width="17"
          height="13"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M5 7l7 6 7-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    github: (
      <path
        d="M12 3.7a8.3 8.3 0 0 0-2.63 16.18c.42.08.57-.18.57-.4v-1.43c-2.33.5-2.82-1-2.82-1-.38-.98-.93-1.24-.93-1.24-.76-.52.06-.51.06-.51.84.06 1.28.86 1.28.86.75 1.28 1.97.91 2.45.7.08-.54.29-.91.52-1.12-1.86-.21-3.82-.93-3.82-4.16 0-.92.33-1.67.86-2.26-.09-.21-.37-1.06.08-2.22 0 0 .7-.22 2.3.86a8.02 8.02 0 0 1 4.18 0c1.6-1.08 2.3-.86 2.3-.86.45 1.16.17 2.01.08 2.22.53.59.86 1.34.86 2.26 0 3.24-1.96 3.94-3.83 4.15.3.26.57.78.57 1.57v2.33c0 .22.15.48.58.4A8.3 8.3 0 0 0 12 3.7Z"
        fill="currentColor"
      />
    ),
    linkedin: (
      <>
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="2.8"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8.2 10.1v5.6M8.2 8.3h.01M11.8 15.7v-3.2c0-1.5.8-2.4 2-2.4 1.2 0 1.8.8 1.8 2.4v3.2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </>
    ),
    download: (
      <>
        <path d="M12 4.5v10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path
          d="M8 11.5 12 15.5l4-4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M5 18.5h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </>
    ),
    spark: (
      <path
        d="M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9-1.9 5.1-1.9-5.1-5.1-1.9 5.1-1.9L12 3.5Z"
        fill="currentColor"
      />
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M12 2.8v2.4M12 18.8v2.4M21.2 12h-2.4M5.2 12H2.8M18.7 5.3l-1.7 1.7M7 17l-1.7 1.7M18.7 18.7 17 17M7 7 5.3 5.3"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </>
    ),
    moon: (
      <path
        d="M14.9 3.5a8.6 8.6 0 1 0 5.6 13.8 7.6 7.6 0 1 1-5.6-13.8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function LinkButton({ href, icon, children, secondary = false }) {
  const baseClass =
    'cta-button inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition duration-300'
  const variantClass = secondary
    ? 'cta-button-secondary border border-white/12 bg-white/6 text-stone-200 hover:border-white/25 hover:bg-white/10'
    : 'cta-button-primary border border-cyan-300/30 bg-cyan-300/14 text-cyan-50 hover:border-cyan-200/50 hover:bg-cyan-300/20'

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className={`${baseClass} ${variantClass}`}
    >
      <Icon name={icon} className="h-4 w-4" />
      <span>{children}</span>
    </a>
  )
}

function TypewriterTagline({ text, animate }) {
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    if (!animate) {
      return undefined
    }

    let index = 0
    const typewriter = setInterval(() => {
      index += 1
      setTypedText(text.slice(0, index))

      if (index >= text.length) {
        clearInterval(typewriter)
      }
    }, 35)

    return () => clearInterval(typewriter)
  }, [animate, text])

  if (!animate) {
    return text
  }

  const showCaret = typedText.length < text.length
  return (
    <>
      {typedText}
      {showCaret && (
        <span className="typewriter-caret" aria-hidden="true">
          |
        </span>
      )}
    </>
  )
}

function ActivityCard({ activity, isOpen, onToggle, onImageOpen }) {
  const highlights = activity.highlights ?? []
  const gallery = activity.gallery ?? []

  return (
    <div className="panel interactive-lift p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/75">{activity.role}</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{activity.title}</h3>
          <p className="mt-2 text-sm text-stone-400">
            {activity.organization} {activity.period ? `| ${activity.period}` : ''}
          </p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-100 transition hover:border-cyan-300/35 hover:bg-cyan-300/12"
          aria-expanded={isOpen}
        >
          {isOpen ? 'Collapse' : 'Expand'}
          <Icon
            name="arrow"
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          />
        </button>
      </div>

      <p className="mt-4 text-sm leading-7 text-stone-300">{activity.description}</p>

      <div className={`activity-expand ${isOpen ? 'is-open' : ''}`}>
        <div className="activity-expand-inner">
          {!!highlights.length && (
            <ul className="mt-5 space-y-2.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-7 text-stone-300">
                  <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {!!gallery.length && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {gallery.map((image) => (
                <figure
                  key={`${image.src}-${image.caption}`}
                  className="activity-photo overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                >
                  <button
                    type="button"
                    onClick={() => onImageOpen(image)}
                    className="group block w-full text-left"
                    aria-label={`Open full photo: ${image.caption}`}
                  >
                    <div className="border-b border-white/10 bg-black/35 p-2">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-44 w-full rounded-xl object-contain transition duration-300 group-hover:scale-[1.015]"
                      />
                    </div>
                  </button>
                  <figcaption className="border-t border-white/10 px-4 py-3 text-xs tracking-[0.05em] text-stone-300">
                    <p>{image.caption}</p>
                    {image.date && (
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-cyan-100/75">
                        {image.date}
                      </p>
                    )}
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-cyan-100/70">
                      Click image to view full photo
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function OtherActivityCard({ item, isOpen, onToggle, onImageOpen }) {
  const gallery = item.gallery ?? []

  return (
    <div className="panel interactive-lift p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/75">{item.role}</p>
          <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-sm text-stone-400">{item.period}</p>
        </div>

        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cyan-100 transition hover:border-cyan-300/35 hover:bg-cyan-300/12"
          aria-expanded={isOpen}
        >
          {isOpen ? 'Hide Gallery' : 'Open Gallery'}
          <Icon
            name="arrow"
            className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          />
        </button>
      </div>

      <p className="mt-4 text-sm leading-7 text-stone-300">{item.description}</p>

      <div className={`activity-expand ${isOpen ? 'is-open' : ''}`}>
        <div className="activity-expand-inner">
          {!!gallery.length && (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {gallery.map((image) => (
                <figure
                  key={`${image.src}-${image.caption}`}
                  className="activity-photo overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                >
                  <button
                    type="button"
                    onClick={() => onImageOpen(image)}
                    className="group block w-full text-left"
                    aria-label={`Open full photo: ${image.caption}`}
                  >
                    <div className="border-b border-white/10 bg-black/35 p-2">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-44 w-full rounded-xl object-contain transition duration-300 group-hover:scale-[1.015]"
                      />
                    </div>
                  </button>
                  <figcaption className="border-t border-white/10 px-4 py-3 text-xs tracking-[0.04em] text-stone-300">
                    <p>{image.caption}</p>
                    {image.date && (
                      <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-cyan-100/75">
                        {image.date}
                      </p>
                    )}
                    <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-cyan-100/70">
                      Click image to view full photo
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          )}

          {!gallery.length && (
            <div className="gallery-empty mt-5 rounded-2xl border border-dashed border-white/20 bg-black/15 px-4 py-5 text-sm leading-7 text-stone-300">
              No gallery photos added yet. Add image items under `otherActivities[].gallery` in
              `src/data/portfolio.js`.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [expandedActivity, setExpandedActivity] = useState(-1)
  const [expandedOtherActivity, setExpandedOtherActivity] = useState(-1)
  const [activeOtherPhoto, setActiveOtherPhoto] = useState(null)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return 'dark'
    }

    const storedTheme = window.localStorage.getItem('portfolio-theme')
    return storedTheme === 'light' ? 'light' : 'dark'
  })
  const {
    activities,
    contacts,
    focusAreas,
    navigation,
    otherActivities,
    profile,
    projects,
    skills,
    stats,
    timeline,
  } = portfolioData

  const iconByContact = {
    Email: 'mail',
    LinkedIn: 'linkedin',
    GitHub: 'github',
    Resume: 'download',
  }

  useEffect(() => {
    if (!activeOtherPhoto) {
      return undefined
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setActiveOtherPhoto(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [activeOtherPhoto])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  return (
    <div className={`relative overflow-x-hidden bg-transparent ${theme === 'light' ? 'theme-light text-slate-900' : 'text-stone-100'}`}>
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] ${
          theme === 'light'
            ? 'bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.16),transparent_32%),radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.14),transparent_18%)]'
            : 'bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_32%),radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.18),transparent_18%)]'
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-x-0 top-[32rem] -z-10 h-[48rem] ${
          theme === 'light'
            ? 'bg-[radial-gradient(circle_at_85%_20%,rgba(56,189,248,0.14),transparent_20%),linear-gradient(180deg,rgba(241,245,249,0)_0%,rgba(241,245,249,0.78)_50%,rgba(241,245,249,0)_100%)]'
            : 'bg-[radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.12),transparent_20%),linear-gradient(180deg,rgba(9,9,11,0)_0%,rgba(9,9,11,0.7)_50%,rgba(9,9,11,0)_100%)]'
        }`}
      />

      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-xl ${
          theme === 'light' ? 'border-slate-900/12 bg-slate-100/82' : 'border-white/8 bg-[#050816]/80'
        }`}
      >
        <div className="section-shell flex items-center justify-between py-4">
          <a
            href="#home"
            className="text-sm font-semibold uppercase tracking-[0.28em] text-white"
          >
            {profile.name}
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-stone-300 transition hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/12"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-100 md:hidden"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              <Icon name={isMenuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className="border-t border-white/8 md:hidden">
            <div className="section-shell flex flex-col gap-2 py-4">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-stone-200 transition hover:bg-white/8"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        <section id="home" className="scroll-mt-24">
          <div className="section-shell py-16 sm:py-20 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-[1.18fr_0.82fr]">
              <Reveal variant="left" className="space-y-8">
                <span className="label-pill">
                  <Icon name="spark" className="h-4 w-4" />
                  Welcome to my Portfolio
                </span>

                <div className="space-y-5">
                  <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/85">
                    {profile.title}
                  </p>
                  <h1
                    className="max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.06em] text-white sm:text-5xl lg:text-7xl"
                    aria-label={profile.tagline}
                  >
                    <TypewriterTagline
                      key={profile.tagline}
                      text={profile.tagline}
                      animate
                    />
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                    {profile.intro}
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <LinkButton href="#projects" icon="arrow">
                    View projects
                  </LinkButton>
                  <LinkButton href={profile.resumeUrl} icon="download" secondary>
                    Open resume
                  </LinkButton>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {stats.map((item, index) => (
                    <Reveal
                      variant="zoom"
                      key={item.label}
                      delay={index * 90}
                      className="panel interactive-lift p-5 text-left"
                    >
                      <p className="text-3xl font-semibold tracking-[-0.05em] text-white">
                        {item.value}
                      </p>
                      <p className="mt-2 text-sm text-stone-300">{item.label}</p>
                    </Reveal>
                  ))}
                </div>
              </Reveal>

              <Reveal variant="right" delay={140} className="mx-auto w-full max-w-md">
                <div className="panel relative overflow-hidden p-3">
                  <div className="absolute inset-x-6 top-6 h-24 rounded-full bg-cyan-300/12 blur-3xl" />
                  <img
                    src={profile.profileImage}
                    alt={`${profile.name} profile photo`}
                    className="relative h-[26rem] w-full rounded-[24px] border border-white/10 object-cover object-[center_18%] sm:h-[31rem] sm:object-[center_14%]"
                  />
                </div>
              </Reveal>
            </div>

            <Reveal variant="tilt" delay={220} className="mt-10 panel interactive-tilt p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/75">
                    Quick snapshot
                  </p>
                  <p className="mt-4 text-lg leading-8 text-stone-200">{profile.availability}</p>
                </div>
                <div className="grid gap-3 text-sm text-stone-300 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/75">
                      Base
                    </p>
                    <p className="mt-2 text-base text-white">{profile.location}</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-black/10 px-4 py-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/75">
                      Focus
                    </p>
                    <p className="mt-2 text-base text-white">Full Stack applications</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

                <section id="about" className="scroll-mt-24">
          <div className="section-shell py-12 sm:py-16">
            <Reveal variant="fade">
              <SectionIntro
                eyebrow="About Me"
                title="Building practical, secure, and user-focused software."
                copy="I enjoy transforming ideas into full-stack products that feel polished in the UI and reliable under the hood."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <Reveal variant="left" className="panel interactive-lift h-fit self-start p-7 sm:p-8">
                <p className="section-copy">
                  I&apos;m a Full-Stack Software Developer based in Singapore, currently pursuing
                  a Diploma in Information Technology with a focus on software development.
                </p>
                <p className="section-copy mt-5">
                  I build real-world applications that are not just functional, but also clean,
                  secure, and user-friendly. My experience includes full-stack systems with
                  Node.js, Express, and PostgreSQL, plus responsive frontends with React and
                  Tailwind CSS.
                </p>
                <p className="section-copy mt-5">
                  I&apos;ve worked on authentication systems, RESTful APIs, admin dashboards, and
                  secure web apps following OWASP best practices. I&apos;m especially interested in
                  clean code, practical problem-solving, and continuous growth as a developer.
                </p>
              </Reveal>

              <Reveal
                variant="right"
                delay={120}
                className="panel interactive-lift h-fit self-start p-7 sm:p-8"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-100/75">
                  Current focus
                </p>
                <div className="mt-5 space-y-4">
                  {focusAreas.map((item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl border border-white/8 bg-black/10 px-4 py-4"
                    >
                      <div className="focus-dot" />
                      <p className="text-sm leading-7 text-stone-300">{item}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="skills" className="scroll-mt-24">
          <div className="section-shell py-12 sm:py-16">
            <Reveal variant="fade">
              <SectionIntro
                eyebrow="Skills"
                title="Technical strenghts that I was able to gain and adapt"
                copy="Tools, technologies, and workflows I use to design, build, and deliver complete software projects."
              />
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {skills.map((group, index) => (
                <Reveal
                  variant="zoom"
                  key={group.category}
                  delay={index * 70}
                  className="panel interactive-lift p-6"
                >
                  <p className="text-lg font-medium text-white">{group.category}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="skill-chip rounded-full border border-white/10 bg-black/10 px-3 py-2 text-sm text-stone-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24">
          <div className="section-shell py-12 sm:py-16">
            <Reveal variant="fade">
              <SectionIntro
                eyebrow="Featured Projects"
                title="Includes both personal and school projects"
                copy="Here are all the featured projects I have done during my course of study in Singapore Polytechnic as well as during free time. Feel free to click on the links to learn more about them!"
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {projects.map((project, index) => (
                <Reveal
                  variant={project.highlight ? 'tilt' : 'right'}
                  key={project.title}
                  delay={index * 110}
                  className={`panel interactive-tilt overflow-hidden ${project.highlight ? 'lg:col-span-2' : ''}`}
                >
                  <div
                    className={`grid gap-0 ${project.highlight ? 'lg:grid-cols-[0.98fr_1.02fr]' : ''}`}
                  >
                    <div className="min-h-full border-b border-white/8 bg-black/10 lg:border-r lg:border-b-0 lg:border-white/8">
                      <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-center gap-3">
                        {project.highlight && (
                          <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-100">
                            Featured
                          </span>
                        )}
                        <p className="text-xs uppercase tracking-[0.24em] text-stone-400">
                          Project spotlight
                        </p>
                      </div>

                      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-stone-300 sm:text-base">
                        {project.summary}
                      </p>
                      <p className="mt-4 text-sm leading-7 text-stone-400 sm:text-base">
                        {project.impact}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.stack.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-stone-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-7 flex flex-wrap gap-3">
                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2.5 text-sm text-stone-100 transition hover:border-cyan-300/30 hover:bg-cyan-300/10"
                          >
                            <span>{link.label}</span>
                            <Icon name="arrow" className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="journey" className="scroll-mt-24">
          <div className="section-shell py-12 sm:py-16">
            <Reveal variant="fade">
              <SectionIntro
                eyebrow="Journey"
                title="My experiences along the way"
                copy="A timeline of internships, leadership involvement, and hands-on roles that shaped how I build, collaborate, and grow."
              />
            </Reveal>

            <div className="journey-timeline mt-10">
              {timeline.map((entry, index) => {
                const organization = parseTimelineOrganization(entry.organization)
                const isCurrent = isCurrentTimelineEntry(entry.date)

                return (
                  <Reveal
                    variant="up"
                    key={`${entry.date}-${entry.title}`}
                    delay={index * 100}
                    className="journey-row"
                  >
                    <div className="journey-date hidden md:flex">
                      <span className="journey-date-pill">{entry.date}</span>
                      <span className="journey-step">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    <div className="journey-spine">
                      <span className="timeline-dot" />
                    </div>

                    <div className="journey-card panel interactive-lift p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-3 md:hidden">
                        <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/75">
                          {entry.date}
                        </p>
                        {isCurrent ? <span className="journey-status-pill">Current</span> : null}
                      </div>

                      <div className="mt-1 md:mt-0">
                        <h3 className="text-xl font-semibold text-white sm:text-[1.7rem] sm:leading-tight">
                          {entry.title}
                        </h3>
                        <p className="mt-3 text-sm font-medium text-stone-300 sm:text-[0.98rem]">
                          {organization.name}
                        </p>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2.5">
                        {organization.meta ? (
                          <span className="journey-meta-pill">{organization.meta}</span>
                        ) : null}
                        {isCurrent ? (
                          <span className="hidden md:inline-flex journey-status-pill">Current</span>
                        ) : null}
                      </div>

                      <p className="mt-5 text-sm leading-7 text-stone-300 sm:text-[0.98rem]">
                        {entry.description}
                      </p>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section id="activities" className="scroll-mt-24">
          <div className="section-shell py-12 sm:py-16">
            <Reveal variant="fade">
              <SectionIntro
                eyebrow="Activities"
                title="Leadership, teamwork, and initiative beyond technical tasks."
               
              />
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {activities.map((activity, index) => (
                <Reveal
                  variant="zoom"
                  key={activity.title}
                  delay={index * 90}
                  className={activities.length % 2 === 1 && index === activities.length - 1 ? 'md:col-span-2' : ''}
                >
                  <ActivityCard
                    activity={activity}
                    isOpen={expandedActivity === index}
                    onToggle={() =>
                      setExpandedActivity((current) => (current === index ? -1 : index))
                    }
                    onImageOpen={setActiveOtherPhoto}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="other-activities" className="scroll-mt-24">
          <div className="section-shell py-12 sm:py-16">
            <Reveal variant="fade">
              <SectionIntro
                eyebrow="Other Co-Curriculars"
                title="Featured activities I participated in."
            
              />
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {otherActivities.map((item, index) => (
                <Reveal
                  variant="zoom"
                  key={`${item.title}-${item.period}`}
                  delay={index * 80}
                  className={
                    otherActivities.length % 2 === 1 && index === otherActivities.length - 1
                      ? 'md:col-span-2 xl:col-span-1'
                      : ''
                  }
                >
                  <OtherActivityCard
                    item={item}
                    isOpen={expandedOtherActivity === index}
                    onToggle={() =>
                      setExpandedOtherActivity((current) => (current === index ? -1 : index))
                    }
                    onImageOpen={setActiveOtherPhoto}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {activeOtherPhoto && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm ${
              theme === 'light' ? 'bg-slate-900/38' : 'bg-black/75'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Full photo viewer"
            onClick={() => setActiveOtherPhoto(null)}
          >
            <div
              className={`w-full max-w-5xl rounded-3xl p-4 sm:p-6 ${
                theme === 'light'
                  ? 'border border-slate-900/15 bg-white/95 text-slate-900'
                  : 'border border-white/15 bg-[#08101d] text-stone-100'
              }`}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm font-medium ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    {activeOtherPhoto.caption}
                  </p>
                  {activeOtherPhoto.date && (
                    <p className={`mt-1 text-xs uppercase tracking-[0.18em] ${
                      theme === 'light' ? 'text-cyan-800/80' : 'text-cyan-100/75'
                    }`}>
                      {activeOtherPhoto.date}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveOtherPhoto(null)}
                  className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition ${
                    theme === 'light'
                      ? 'border border-slate-900/18 bg-slate-100 text-slate-800 hover:border-cyan-700/40 hover:bg-cyan-100'
                      : 'border border-white/20 bg-white/6 text-stone-100 hover:border-cyan-300/40 hover:bg-cyan-300/15'
                  }`}
                >
                  Close
                </button>
              </div>

              <div
                className={`rounded-2xl p-3 ${
                  theme === 'light'
                    ? 'border border-slate-900/12 bg-slate-100/80'
                    : 'border border-white/10 bg-black/35'
                }`}
              >
                <img
                  src={activeOtherPhoto.src}
                  alt={activeOtherPhoto.alt}
                  className="max-h-[70vh] w-full rounded-xl object-contain"
                />
              </div>
            </div>
          </div>
        )}

        <section id="contact" className="scroll-mt-24">
          <div className="section-shell py-12 sm:py-16 lg:pb-24">
            <Reveal variant="tilt" className="panel interactive-tilt overflow-hidden p-7 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-start">
                <div>
                  <span className="label-pill">Contact</span>
                  <h2 className="mt-6 max-w-xl text-3xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
                    Always open to discussing new oppurtunities, collaborations, or just connecting with like-minded individuals.
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-stone-300">
                    Whether or not you have a project in mind, an internship oppurtunity, or simply want a chat about development, feel free to reach out - Lets connect !
                  </p>
                </div>

                <div className="grid gap-3 lg:self-start">
                  {contacts.map((contact) => (
                    <a
                      key={contact.label}
                      href={contact.url}
                      target={contact.url.startsWith('http') ? '_blank' : undefined}
                      rel={contact.url.startsWith('http') ? 'noreferrer' : undefined}
                      className="grid min-h-[86px] grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[22px] border border-white/10 bg-black/10 px-5 py-4 transition hover:border-cyan-300/25 hover:bg-cyan-300/8"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-cyan-100">
                        <Icon name={iconByContact[contact.label]} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm leading-5 text-stone-400">{contact.label}</p>
                        <p className="truncate text-sm leading-6 text-white sm:text-base">
                          {contact.value}
                        </p>
                      </div>
                      <div className="justify-self-end">
                        <Icon name="arrow" className="h-4 w-4 text-stone-400" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 py-6">
        <div className="section-shell text-center text-sm text-stone-400">
          <p>Mee Ghel F. / Mee Ghel / 2026</p>
        </div>
      </footer>
    </div>
  )
}

export default App

