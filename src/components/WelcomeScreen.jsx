import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { ChevronDown, Code2, MapPin, Sparkles } from 'lucide-react'
import { animateNumber } from '../lib/animate'
import WelcomeLine from './WelcomeLine'

export const IntroContext = createContext(true)

export default function WelcomeScreen({ name, title, location, onComplete }) {
  const panelRef = useRef(null)
  const chevronRef = useRef(null)
  const dismissedRef = useRef(false)
  const completeRef = useRef(onComplete)
  const [open, setOpen] = useState(true)
  const [gone, setGone] = useState(false)
  const [landed, setLanded] = useState(false)
  completeRef.current = onComplete

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return
    dismissedRef.current = true
    completeRef.current()
    setOpen(false)
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(dismiss, 3600)
    return () => window.clearTimeout(timeout)
  }, [dismiss])

  useEffect(() => {
    document.body.classList.toggle('welcome-lock', open && !gone)
    return () => document.body.classList.remove('welcome-lock')
  }, [gone, open])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel || gone) return undefined
    const from = open ? -100 : 0
    const to = open ? 0 : 100
    if (open) setLanded(true)
    panel.style.transform = `translateY(${from}%)`
    return animateNumber(from, to, 850, (value) => {
      panel.style.transform = `translateY(${value}%)`
    }, () => {
      if (open) setLanded(true)
      else setGone(true)
    })
  }, [gone, open])

  useEffect(() => {
    const el = chevronRef.current
    if (!el || !landed) return undefined
    let frame = 0
    const started = performance.now()
    const tick = (now) => {
      el.style.transform = `translateY(${Math.sin((now - started) / 280) * 6}px)`
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [landed])

  if (gone) return null

  return (
    <div
      ref={panelRef}
      className="welcome-screen"
      style={{ transform: 'translateY(-100%)' }}
      onClick={dismiss}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          dismiss()
        }
      }}
      role="dialog"
      aria-label="Welcome"
      aria-modal="true"
      tabIndex={0}
    >
      <div className="welcome-screen-copy">
        <WelcomeLine show={landed} delay={40} fromY={18} className="welcome-icons">
          <span className="welcome-icon-pill" aria-hidden="true"><Sparkles size={18} strokeWidth={1.75} /></span>
          <span className="welcome-icon-pill" aria-hidden="true"><Code2 size={18} strokeWidth={1.75} /></span>
          <span className="welcome-icon-pill" aria-hidden="true"><MapPin size={18} strokeWidth={1.75} /></span>
        </WelcomeLine>
        <WelcomeLine show={landed} delay={140} fromX={-40} fromY={0}>
          <p className="welcome-kicker">Welcome</p>
        </WelcomeLine>
        <WelcomeLine show={landed} delay={260} fromY={56}>
          <h1 className="welcome-name">{name}</h1>
        </WelcomeLine>
        <WelcomeLine show={landed} delay={400} fromX={32} fromY={0}>
          <p className="welcome-meta">
            <span className="welcome-meta-item"><Code2 size={16} strokeWidth={1.75} aria-hidden="true" />{title}</span>
            <span className="welcome-meta-dot" aria-hidden="true">/</span>
            <span className="welcome-meta-item"><MapPin size={16} strokeWidth={1.75} aria-hidden="true" />{location}</span>
          </p>
        </WelcomeLine>
        <WelcomeLine show={landed} delay={540} fromY={18} className="welcome-hint-row">
          <span ref={chevronRef} className="welcome-hint-icon" aria-hidden="true">
            <ChevronDown size={18} strokeWidth={1.75} />
          </span>
          <p className="welcome-hint">Click to enter</p>
        </WelcomeLine>
      </div>
    </div>
  )
}
