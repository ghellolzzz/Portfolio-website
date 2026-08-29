/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useLayoutEffect, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import * as THREE from 'three'
import LanyardBand from './LanyardBand'

function StudioLights() {
  return (
    <Environment blur={0.75}>
      <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
      <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
      <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
      <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
    </Environment>
  )
}

function AimedCamera({ position, fov }) {
  const camera = useThree((state) => state.camera)

  useLayoutEffect(() => {
    camera.position.set(position[0], position[1], position[2])
    camera.fov = fov
    camera.lookAt(0, position[1], 0)
    camera.updateProjectionMatrix()
  }, [camera, fov, position[0], position[1], position[2]])

  return null
}

export default function LanyardScene({
  position,
  gravity,
  fov,
  transparent,
  frontImage,
  backImage,
  imageFit,
  lanyardImage,
  lanyardWidth,
  name,
  title,
  eventSource,
  onContextLost,
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Canvas
      camera={{ position, fov, near: 0.1, far: 200 }}
      dpr={[1, isMobile ? 1.25 : 1.75]}
      eventSource={eventSource || undefined}
      eventPrefix="client"
      style={{ pointerEvents: eventSource ? 'none' : 'auto' }}
      gl={{ alpha: transparent, antialias: !isMobile, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault()
          onContextLost?.()
        }, { once: true })
      }}
    >
      <AimedCamera position={position} fov={fov} />
      <ambientLight intensity={Math.PI} />
      {!isMobile ? <StudioLights /> : null}
      <directionalLight position={[4, 6, 8]} intensity={1.1} />
      <Suspense fallback={null}>
        <Physics gravity={gravity} timeStep={1 / 60}>
          <LanyardBand
            isMobile={isMobile}
            frontImage={frontImage}
            backImage={backImage}
            imageFit={imageFit}
            lanyardImage={lanyardImage}
            lanyardWidth={lanyardWidth}
            name={name}
            title={title}
          />
        </Physics>
      </Suspense>
    </Canvas>
  )
}
