import { useContext, useEffect, useRef } from 'react'
import { IntroContext } from './WelcomeScreen'
import { animateNumber } from '../lib/animate'

const offsets = {
  up: { x: 0, y: 80 },
  down: { x: 0, y: -80 },
  left: { x: -90, y: 0 },
  right: { x: 90, y: 0 },
  zoom: { x: 0, y: 48 },
  tilt: { x: 0, y: 56 },
  fade: { x: 0, y: 24 },
}

function Reveal({ className = '', delay = 0, variant = 'up', children }) {
  const introReady = useContext(IntroContext)
  const nodeRef = useRef(null)
  const shownRef = useRef(false)
  const offset = offsets[variant] ?? offsets.up

  useEffect(() => {
    const node = nodeRef.current
    if (!node || !introReady) return undefined

    node.style.opacity = '0'
    node.style.transform = `translate(${offset.x}px, ${offset.y}px)`

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || shownRef.current) return
        shownRef.current = true
        window.setTimeout(() => {
          animateNumber(0, 1, 750, (value) => {
            node.style.opacity = String(value)
            node.style.transform = `translate(${offset.x * (1 - value)}px, ${offset.y * (1 - value)}px)`
          })
        }, delay)
        observer.disconnect()
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [delay, introReady, offset.x, offset.y])

  return (
    <div ref={nodeRef} className={className} style={{ opacity: introReady ? undefined : 0 }}>
      {children}
    </div>
  )
}

export default Reveal
