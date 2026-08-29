import { cn } from '@/lib/utils'

const SECTION_DECOR = {
  hero: [
    { tone: 'teal', speed: -0.45, style: { top: '6%', left: '-6%', width: 'min(54vw, 580px)', height: 'min(54vw, 580px)' } },
    { tone: 'cyan', speed: 0.3, style: { top: '48%', right: '-8%', width: 'min(40vw, 440px)', height: 'min(40vw, 440px)' } },
  ],
  about: [
    { tone: 'amber', speed: 0.34, style: { top: '10%', right: '-10%', width: 'min(38vw, 420px)', height: 'min(38vw, 420px)' } },
    { tone: 'teal', speed: -0.26, style: { bottom: '-12%', left: '2%', width: 'min(44vw, 480px)', height: 'min(44vw, 480px)' } },
  ],
  skills: [
    { tone: 'cyan', speed: -0.32, style: { top: '18%', left: '-8%', width: 'min(36vw, 400px)', height: 'min(36vw, 400px)' } },
    { tone: 'teal', speed: 0.22, style: { bottom: '-8%', right: '6%', width: 'min(32vw, 360px)', height: 'min(32vw, 360px)' } },
  ],
  projects: [
    { tone: 'teal', speed: 0.38, style: { top: '8%', left: '18%', width: 'min(46vw, 500px)', height: 'min(46vw, 500px)' } },
    { tone: 'amber', speed: -0.24, style: { bottom: '-6%', right: '-4%', width: 'min(34vw, 380px)', height: 'min(34vw, 380px)' } },
  ],
  journey: [
    { tone: 'amber', speed: -0.36, style: { top: '14%', left: '-6%', width: 'min(42vw, 460px)', height: 'min(42vw, 460px)' } },
    { tone: 'cyan', speed: 0.28, style: { bottom: '-10%', right: '8%', width: 'min(30vw, 340px)', height: 'min(30vw, 340px)' } },
  ],
  activities: [
    { tone: 'cyan', speed: 0.3, style: { top: '12%', right: '-6%', width: 'min(40vw, 440px)', height: 'min(40vw, 440px)' } },
    { tone: 'teal', speed: -0.22, style: { bottom: '-8%', left: '10%', width: 'min(36vw, 400px)', height: 'min(36vw, 400px)' } },
  ],
  'other-activities': [
    { tone: 'teal', speed: -0.28, style: { top: '20%', left: '-4%', width: 'min(38vw, 420px)', height: 'min(38vw, 420px)' } },
    { tone: 'amber', speed: 0.26, style: { bottom: '-6%', right: '-8%', width: 'min(32vw, 360px)', height: 'min(32vw, 360px)' } },
  ],
  contact: [
    { tone: 'cyan', speed: -0.34, style: { top: '8%', right: '12%', width: 'min(44vw, 480px)', height: 'min(44vw, 480px)' } },
    { tone: 'amber', speed: 0.24, style: { bottom: '-12%', left: '-6%', width: 'min(36vw, 400px)', height: 'min(36vw, 400px)' } },
  ],
}

export default function ParallaxSection({ id, variant = 'about', className = '', children }) {
  const decor = SECTION_DECOR[variant] ?? SECTION_DECOR.about

  return (
    <section id={id} className={cn('parallax-section', className)} data-parallax-root>
      <div className="parallax-section-stage" aria-hidden="true">
        {decor.map((item, index) => (
          <div
            key={`${variant}-${index}`}
            className={cn('parallax-section-blob', `parallax-section-blob-${item.tone}`)}
            data-speed={item.speed}
            style={item.style}
          />
        ))}
      </div>
      {children}
    </section>
  )
}
