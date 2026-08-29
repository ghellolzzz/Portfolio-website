import { useCallback, useEffect, useRef, useState } from 'react'

const DEG = Math.PI / 180
const STRAP_REST = 104
const START_Y = -STRAP_REST
const START_THETA = 0.34
const FIXED_DT = 1 / 120
const MAX_STEPS = 8
const MAX_THETA = 55 * DEG
const MAX_OMEGA = 18
const GRAVITY = 1050
const PENDULUM_LENGTH = 240
const PENDULUM_GRAVITY = 2100
const ANGULAR_DAMPING = 0.32
const CATCH_STIFFNESS = 220
const CATCH_DAMPING = 15
const CATCH_RESTITUTION = 0.34
const CARD_STIFFNESS = 36
const CARD_DAMPING = 4.6
const CARD_UPRIGHT = 0.55
const GRAB_FOLLOW = 22
const DROP_DELAY = 0.4

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function createState(startDropped) {
  return {
    theta: startDropped ? 0 : START_THETA,
    omega: startDropped ? 0 : 0.15,
    y: startDropped ? 0 : START_Y,
    vy: 0,
    cardTheta: 0,
    cardOmega: 0,
    caught: startDropped,
    dragging: false,
    pointerTheta: 0,
    pointerActive: false,
    dropDelay: startDropped ? 0 : DROP_DELAY,
  }
}

export function useLanyardPhysics({ wrapperRef, rigRef, cardRef, strapRef, startDrop = true }) {
  const [isDragging, setIsDragging] = useState(false)
  const sim = useRef(createState(false))

  const publish = useCallback(() => {
    const state = sim.current
    const rig = rigRef.current
    const card = cardRef.current
    const strap = strapRef.current
    if (rig) {
      rig.style.transform = `rotate(${state.theta / DEG}deg)`
    }
    if (card) {
      card.style.transform = `rotate(${state.cardTheta / DEG}deg)`
    }
    if (strap) {
      strap.style.height = `${clamp(STRAP_REST + state.y, 10, STRAP_REST * 1.22)}px`
    }
  }, [cardRef, rigRef, strapRef])

  const angleFromPointer = useCallback(
    (clientX, clientY) => {
      const wrapper = wrapperRef.current
      if (!wrapper) return 0
      const rect = wrapper.getBoundingClientRect()
      const originX = rect.left + rect.width / 2
      const originY = rect.top + 10
      // Screen Y points down, CSS rotate() is clockwise. From hanging-down,
      // clockwise swings the badge left — so the pointer x offset is negated.
      return clamp(-Math.atan2(clientX - originX, Math.max(clientY - originY, 24)), -MAX_THETA, MAX_THETA)
    },
    [wrapperRef],
  )

  const onPointerDown = useCallback(
    (event) => {
      event.preventDefault()
      event.stopPropagation()
      sim.current.caught = true
      sim.current.y = Math.max(sim.current.y, 0)
      sim.current.dragging = true
      sim.current.pointerActive = true
      sim.current.pointerTheta = angleFromPointer(event.clientX, event.clientY)
      setIsDragging(true)
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    [angleFromPointer],
  )

  useEffect(() => {
    sim.current = createState(false)
    publish()
    if (!startDrop) return undefined

    let frame = 0
    let previous = performance.now()
    let accumulator = 0

    const onPointerMove = (event) => {
      if (!sim.current.dragging) return
      sim.current.pointerTheta = angleFromPointer(event.clientX, event.clientY)
      sim.current.pointerActive = true
    }

    const onPointerUp = () => {
      if (!sim.current.dragging) return
      sim.current.dragging = false
      sim.current.pointerActive = false
      setIsDragging(false)
    }

    const step = (dt) => {
      const state = sim.current

      if (!state.caught) {
        if (state.dropDelay > 0) {
          state.dropDelay -= dt
          return
        }
        state.vy += GRAVITY * dt
        state.y += state.vy * dt
        if (state.y >= 0) {
          state.caught = true
          state.omega += clamp((state.vy / PENDULUM_LENGTH) * Math.sin(state.theta) * 1.5, -6, 6)
          state.y = 0
          state.vy *= -CATCH_RESTITUTION
        }
      } else if (!state.dragging) {
        const ay = -CATCH_STIFFNESS * state.y - CATCH_DAMPING * state.vy
        state.vy += ay * dt
        state.y += state.vy * dt
        if (Math.abs(state.y) < 0.4 && Math.abs(state.vy) < 10) {
          state.y = 0
          state.vy = 0
        }
      } else {
        state.y *= 0.6
        state.vy = 0
      }

      const gravityAlpha = -(PENDULUM_GRAVITY / PENDULUM_LENGTH) * Math.sin(state.theta)
      const previousTheta = state.theta

      if (state.dragging && state.pointerActive) {
        const follow = 1 - Math.exp(-GRAB_FOLLOW * dt)
        state.theta = clamp(state.theta + (state.pointerTheta - state.theta) * follow, -MAX_THETA, MAX_THETA)
        state.omega = clamp((state.theta - previousTheta) / dt, -MAX_OMEGA, MAX_OMEGA)
      } else {
        const alpha = gravityAlpha - ANGULAR_DAMPING * state.omega
        state.omega = clamp(state.omega + alpha * dt, -MAX_OMEGA, MAX_OMEGA)
        state.theta = clamp(state.theta + state.omega * dt, -MAX_THETA, MAX_THETA)
        if (Math.abs(state.theta) === MAX_THETA) state.omega *= -0.3
      }

      const cardTarget = -state.theta * CARD_UPRIGHT
      const cardAlpha = CARD_STIFFNESS * (cardTarget - state.cardTheta) - CARD_DAMPING * state.cardOmega
      state.cardOmega += cardAlpha * dt
      state.cardTheta += state.cardOmega * dt
    }

    const tick = (now) => {
      const elapsed = Math.min(0.05, (now - previous) / 1000)
      previous = now
      accumulator += elapsed
      let steps = 0
      while (accumulator >= FIXED_DT && steps < MAX_STEPS) {
        step(FIXED_DT)
        accumulator -= FIXED_DT
        steps += 1
      }
      publish()
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
    }
  }, [angleFromPointer, publish, startDrop])

  return { isDragging, onPointerDown }
}
