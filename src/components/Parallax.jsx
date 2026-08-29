import { useEffect } from 'react'

export function ParallaxEngine() {
  useEffect(() => {
    let frame = 0

    const tick = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0
      const viewportH = window.innerHeight

      document.querySelectorAll('[data-parallax-root]').forEach((root) => {
        const rect = root.getBoundingClientRect()
        const centerOffset = rect.top + rect.height / 2 - viewportH / 2

        root.querySelectorAll('[data-speed]').forEach((node) => {
          const speed = Number(node.getAttribute('data-speed')) || 0
          const sectionShift = centerOffset * speed * -0.42
          const scrollShift = scrollY * speed * 0.05
          const y = sectionShift + scrollShift
          node.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
        })
      })

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return null
}
