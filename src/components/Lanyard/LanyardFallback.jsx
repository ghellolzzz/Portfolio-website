import { useContext, useRef } from 'react'
import { IntroContext } from '../WelcomeScreen'
import { useLanyardPhysics } from './useLanyardPhysics'

export default function LanyardFallback({
  frontImage = '/images/profile.jpg',
  name = 'Mee Ghel Fetalvero',
  title = 'Software Developer',
  location = 'Based in Singapore',
}) {
  const startDrop = useContext(IntroContext)
  const wrapperRef = useRef(null)
  const rigRef = useRef(null)
  const cardRef = useRef(null)
  const strapRef = useRef(null)
  const { isDragging, onPointerDown } = useLanyardPhysics({
    wrapperRef,
    rigRef,
    cardRef,
    strapRef,
    startDrop,
  })

  return (
    <div className="lanyard-wrapper lanyard-fallback" ref={wrapperRef}>
      <div className="lanyard-hook" aria-hidden="true" />
      <div
        ref={rigRef}
        className={`lanyard-rig${isDragging ? ' is-dragging' : ''}`}
        style={{ transform: 'rotate(19deg)' }}
        onPointerDown={onPointerDown}
      >
        <div ref={strapRef} className="lanyard-strap" style={{ height: '10px' }} aria-hidden="true" />
        <div className="lanyard-clip" aria-hidden="true" />
        <article ref={cardRef} className="lanyard-card">
          <img src={frontImage} alt={`${name} profile photo`} draggable="false" />
          <div className="lanyard-card-meta">
            <p className="lanyard-card-kicker">{title}</p>
            <h3>{name}</h3>
            <p>{location}</p>
          </div>
        </article>
      </div>
    </div>
  )
}
