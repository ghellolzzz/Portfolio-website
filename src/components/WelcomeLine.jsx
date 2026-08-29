import { useEffect, useRef } from 'react'
import { animateNumber } from '../lib/animate'

export default function WelcomeLine({ show, delay = 0, fromX = 0, fromY = 28, duration = 780, className, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !show) return undefined
    el.style.opacity = '0'
    el.style.transform = `translate(${fromX}px, ${fromY}px)`
    let stop
    const timer = window.setTimeout(() => {
      stop = animateNumber(0, 1, duration, (value) => {
        el.style.opacity = String(value)
        el.style.transform = `translate(${fromX * (1 - value)}px, ${fromY * (1 - value)}px)`
      })
    }, delay)
    return () => {
      window.clearTimeout(timer)
      stop?.()
    }
  }, [delay, duration, fromX, fromY, show])

  return (
    <div className="welcome-line">
      <div ref={ref} className={className} style={{ opacity: 0 }}>
        {children}
      </div>
    </div>
  )
}
