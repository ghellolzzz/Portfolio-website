/* eslint-disable react/no-unknown-property */
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { KEYBOARD_COLS, KEYBOARD_ROWS } from '../data/techKeyboard'

const KEY_W = 0.84
const KEY_D = 0.84
const KEY_H = 0.48
const GAP = 0.11
const STEP_X = KEY_W + GAP
const STEP_Z = KEY_D + GAP
const PRESS_DEPTH = 0.08
const BASE_H = 0.36
const BEZEL = 0.22
const KEY_LIFT = BASE_H / 2 + 0.015
const LIGHT_CAP_COLORS = new Set(['F7DF1E', 'FFFFFF', 'FFCA28', 'BDFF2E', '61DAFB', '46E3B7', '00AD9F', '646CFF'])

function gridPosition(col, row) {
  const totalW = KEYBOARD_COLS * STEP_X - GAP
  const totalD = KEYBOARD_ROWS * STEP_Z - GAP
  const x = col * STEP_X - totalW / 2 + KEY_W / 2
  const z = row * STEP_Z - totalD / 2 + KEY_D / 2
  return [x, KEY_LIFT + KEY_H / 2, z]
}

function capColor(skill) {
  return `#${(skill?.color || '334155').replace('#', '')}`
}

function iconTone(skill) {
  return LIGHT_CAP_COLORS.has((skill?.color || '').toUpperCase()) ? '000000' : 'FFFFFF'
}

function createFallbackTexture(label) {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return null
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 58px ui-sans-serif, system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(label.slice(0, 4), 128, 136)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  return texture
}

function useSkillTexture(skill) {
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    if (!skill) {
      setTexture(null)
      return undefined
    }

    let active = true
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8

    const commit = (source) => {
      if (!active || !ctx) return
      ctx.clearRect(0, 0, 256, 256)
      if (source) ctx.drawImage(source, 40, 40, 176, 176)
      tex.needsUpdate = true
      setTexture(tex)
    }

    if (!skill.icon) {
      const fallback = createFallbackTexture(skill.abbrev || skill.label)
      commit(fallback?.image ?? null)
      return () => {
        active = false
        tex.dispose()
      }
    }

    const image = new Image()
    image.crossOrigin = 'anonymous'
    image.onload = () => commit(image)
    image.onerror = () => commit(createFallbackTexture(skill.abbrev || skill.label)?.image ?? null)
    image.src = `https://cdn.simpleicons.org/${skill.icon}/${iconTone(skill)}`

    return () => {
      active = false
      tex.dispose()
    }
  }, [skill?.label, skill?.icon, skill?.abbrev, skill?.color])

  return texture
}

function KeyIcon({ skill }) {
  const texture = useSkillTexture(skill)
  if (!texture) return null

  return (
    <mesh position={[0, KEY_H / 2 + 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[KEY_W * 0.46, KEY_D * 0.46]} />
      <meshBasicMaterial map={texture} transparent toneMapped={false} depthWrite={false} />
    </mesh>
  )
}

function KeyCap({ skill, position, onSelect }) {
  const groupRef = useRef(null)
  const pressedRef = useRef(0)
  const targetRef = useRef(0)
  const [hovered, setHovered] = useState(false)
  const color = capColor(skill)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    pressedRef.current = THREE.MathUtils.lerp(pressedRef.current, targetRef.current, 1 - Math.pow(0.00012, delta))
    groupRef.current.position.y = position[1] - pressedRef.current
  })

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(event) => {
        event.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'auto'
      }}
      onPointerDown={(event) => {
        event.stopPropagation()
        targetRef.current = PRESS_DEPTH
        onSelect?.(skill.label)
      }}
      onPointerUp={() => {
        targetRef.current = 0
      }}
      onPointerLeave={() => {
        targetRef.current = 0
      }}
    >
      <RoundedBox args={[KEY_W, KEY_H, KEY_D]} radius={0.15} smoothness={8} castShadow receiveShadow>
        <meshStandardMaterial
          color={color}
          roughness={0.38}
          metalness={0.04}
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.14 : 0}
        />
      </RoundedBox>
      <KeyIcon skill={skill} />
    </group>
  )
}

function KeyboardRig({ keys, onKeySelect }) {
  const baseW = KEYBOARD_COLS * STEP_X - GAP + BEZEL * 2
  const baseD = KEYBOARD_ROWS * STEP_Z - GAP + BEZEL * 2

  return (
    <group rotation={[-0.12, 0.28, 0.05]} position={[0, 0.12, 0]} scale={0.84}>
      <RoundedBox args={[baseW, BASE_H, baseD]} radius={0.2} smoothness={8} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#252b36" roughness={0.82} metalness={0.1} />
      </RoundedBox>
      {keys.map((skill, index) => {
        const col = index % KEYBOARD_COLS
        const row = Math.floor(index / KEYBOARD_COLS)
        return (
          <KeyCap
            key={skill.label}
            skill={skill}
            position={gridPosition(col, row)}
            onSelect={onKeySelect}
          />
        )
      })}
      <ContactShadows position={[0, -BASE_H / 2 - 0.02, 0]} opacity={0.45} scale={9} blur={2.1} far={3.2} />
    </group>
  )
}

export default function SkillsKeypadScene({ keys, onKeySelect }) {
  return (
    <>
      <ambientLight intensity={0.62} />
      <hemisphereLight args={['#f1f5f9', '#0f172a', 0.42]} />
      <directionalLight position={[-5, 10, 6]} intensity={1.55} castShadow shadow-mapSize={[1024, 1024]} shadow-bias={-0.00035} />
      <directionalLight position={[4, 5, 2]} intensity={0.28} />
      <KeyboardRig keys={keys} onKeySelect={onKeySelect} />
    </>
  )
}
