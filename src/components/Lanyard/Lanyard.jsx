import { useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IntroContext } from '../WelcomeScreen'
import LanyardFallback from './LanyardFallback'
import LanyardScene from './LanyardScene'
import { LanyardErrorBoundary } from './LanyardErrorBoundary'
import './Lanyard.css'

function hasWebGL() {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

export default function Lanyard({
  position = [0, 1.2, 21],
  gravity = [0, -40, 0],
  fov = 17,
  transparent = true,
  frontImage = null,
  backImage = null,
  imageFit = 'cover',
  lanyardImage = null,
  lanyardWidth = 0.18,
  name,
  title,
  location,
}) {
  const introReady = useContext(IntroContext)
  const [use3D, setUse3D] = useState(() => hasWebGL())
  const [heroStage, setHeroStage] = useState(() => (typeof document !== 'undefined' ? document.querySelector('.hero-stage') : null))
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1024)
  const fallback = <LanyardFallback frontImage={frontImage} name={name} title={title} location={location} />

  useEffect(() => {
    setHeroStage(document.querySelector('.hero-stage'))
    const onResize = () => setIsDesktop(window.innerWidth >= 1024)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!use3D) return fallback
  if (!introReady) return <div className="lanyard-wrapper" aria-hidden="true" />

  const overlay = Boolean(isDesktop && heroStage)
  const scene = (
    <div className="lanyard-stage">
      <LanyardScene
        position={position}
        gravity={gravity}
        fov={fov}
        transparent={transparent}
        frontImage={frontImage}
        backImage={backImage}
        imageFit={imageFit}
        lanyardImage={lanyardImage}
        lanyardWidth={lanyardWidth}
        name={name}
        title={title}
        eventSource={overlay ? heroStage : undefined}
        onContextLost={() => setUse3D(false)}
      />
    </div>
  )

  return (
    <LanyardErrorBoundary fallback={fallback}>
      <div className="lanyard-wrapper" aria-hidden="true">
        {overlay ? null : scene}
      </div>
      {overlay ? createPortal(scene, heroStage) : null}
    </LanyardErrorBoundary>
  )
}
