import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { TECH_KEYBOARD } from '../data/techKeyboard'
import SkillsKeypadScene from './SkillsKeypadScene'
import KeypadCamera from './KeypadCamera'

export default function SkillsKeypad({ children }) {
  const [selectedLabel, setSelectedLabel] = useState('')

  return (
    <div className="skills-section-stage">
      <div className="skills-keypad-canvas">
        <Canvas
          className="skills-keypad-canvas-inner"
          camera={{ position: [-4.75, 8.35, 8.95], fov: 27, near: 0.1, far: 80 }}
          dpr={[1, 1.5]}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          shadows
        >
          <Suspense fallback={null}>
            <KeypadCamera />
            <SkillsKeypadScene keys={TECH_KEYBOARD} onKeySelect={setSelectedLabel} />
          </Suspense>
        </Canvas>
      </div>

      <div className="skills-section-content section-shell">
        {children}
        <p className="skills-keypad-readout skills-keypad-readout-single">
          {selectedLabel || 'Press a key to explore the stack'}
        </p>
      </div>
    </div>
  )
}
