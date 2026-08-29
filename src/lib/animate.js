export function animateNumber(from, to, duration, onUpdate, onDone) {
  const started = performance.now()
  const ease = (time) => 1 - (1 - time) ** 3
  let frame = 0

  const tick = (now) => {
    const time = Math.min(1, (now - started) / duration)
    onUpdate(from + (to - from) * ease(time))
    if (time < 1) {
      frame = requestAnimationFrame(tick)
      return
    }
    onDone?.()
  }

  frame = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(frame)
}
