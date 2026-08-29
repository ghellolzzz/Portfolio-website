/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react'
import { useThree } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { BallCollider, CuboidCollider, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import * as THREE from 'three'
import cardGLB from './card.glb'
import lanyard from './lanyard.png'
import CardFace from './CardFace'
import { useLanyardFrame } from './useLanyardFrame'

const ROPE = 0.3
const SEGMENT = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 5.2, linearDamping: 3.8 }
const CARD_SCALE = 2.42
const CLIP_TOP_Y = 1.228
const CLIP_JOINT_Y = 1.52
const CLIP_LOCAL = [0, CLIP_JOINT_Y, 0]
const HANG_Y = -ROPE * 5

function useLaneOffset() {
  const { camera, size } = useThree()
  return useMemo(() => {
    const aspect = size.width / Math.max(size.height, 1)
    const halfHeight = camera.position.z * Math.tan((camera.fov * Math.PI) / 360)
    if (size.width < 700) return 0
    return halfHeight * aspect * 0.38
  }, [camera.fov, camera.position.z, size.height, size.width])
}

function useAnchorY() {
  const { camera } = useThree()
  return useMemo(() => {
    const halfHeight = camera.position.z * Math.tan((camera.fov * Math.PI) / 360)
    return camera.position.y + halfHeight - 0.1
  }, [camera.fov, camera.position.y, camera.position.z])
}

export default function LanyardBand({
  isMobile = false,
  frontImage = null,
  lanyardImage = null,
  lanyardWidth = 0.18,
  name,
  title,
}) {
  const band = useRef()
  const fixed = useRef()
  const j1 = useRef()
  const j2 = useRef()
  const j3 = useRef()
  const j4 = useRef()
  const j5 = useRef()
  const card = useRef()
  const clipAttach = useRef()
  const laneX = useLaneOffset()
  const anchorY = useAnchorY()
  const { nodes, materials } = useGLTF(cardGLB)
  const bandTexture = useTexture(lanyardImage || lanyard)
  const frontTex = useTexture(frontImage || lanyard)
  const [curve] = useState(() => new THREE.CatmullRomCurve3(Array.from({ length: 6 }, () => new THREE.Vector3())))
  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)
  const midJoints = [j4, j3, j2, j1]
  const scale = isMobile ? 2.5 : CARD_SCALE
  const groupY = CLIP_JOINT_Y - CLIP_TOP_Y * scale
  const strapWidth = isMobile ? Math.min(lanyardWidth, 0.14) : lanyardWidth

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ROPE])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ROPE])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ROPE])
  useRopeJoint(j3, j4, [[0, 0, 0], [0, 0, 0], ROPE])
  useRopeJoint(j4, j5, [[0, 0, 0], [0, 0, 0], ROPE])
  useSphericalJoint(j5, card, [[0, 0, 0], CLIP_LOCAL])

  useEffect(() => {
    if (!hovered) return undefined
    document.body.style.cursor = dragged ? 'grabbing' : 'grab'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered, dragged])

  useLanyardFrame({
    band,
    fixed,
    midJoints,
    cardJoint: j5,
    card,
    curve,
    dragged,
    isMobile,
    clipAttach,
    strapWidth,
  })

  curve.curveType = 'chordal'
  bandTexture.wrapS = THREE.RepeatWrapping
  bandTexture.wrapT = THREE.ClampToEdgeWrapping
  bandTexture.colorSpace = THREE.SRGBColorSpace
  bandTexture.anisotropy = 8
  bandTexture.repeat.set(6, 1)

  return (
    <>
      <group position={[laneX, anchorY, 0]}>
        <RigidBody ref={fixed} {...SEGMENT} type="fixed">
          <mesh>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.85} roughness={0.25} />
          </mesh>
        </RigidBody>
        <RigidBody position={[0, -ROPE, 0]} ref={j1} {...SEGMENT}><BallCollider args={[0.07]} /></RigidBody>
        <RigidBody position={[0, -ROPE * 2, 0]} ref={j2} {...SEGMENT}><BallCollider args={[0.07]} /></RigidBody>
        <RigidBody position={[0, -ROPE * 3, 0]} ref={j3} {...SEGMENT}><BallCollider args={[0.07]} /></RigidBody>
        <RigidBody position={[0, -ROPE * 4, 0]} ref={j4} {...SEGMENT}><BallCollider args={[0.07]} /></RigidBody>
        <RigidBody position={[0, HANG_Y, 0]} ref={j5} {...SEGMENT}><BallCollider args={[0.07]} /></RigidBody>
        <RigidBody position={[0, HANG_Y, 0]} ref={card} {...SEGMENT} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.36 * scale, 0.52 * scale, 0.01]} />
          <group
            scale={scale}
            position={[0, groupY, 0]}
            frustumCulled={false}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(event) => {
              event.target.releasePointerCapture(event.pointerId)
              drag(false)
            }}
            onPointerDown={(event) => {
              event.stopPropagation()
              drag(new THREE.Vector3().copy(event.point).sub(new THREE.Vector3().copy(card.current.translation())))
            }}
          >
            <mesh ref={clipAttach} position={[0, 1.22, 0]} visible={false}>
              <sphereGeometry args={[0.02, 8, 8]} />
            </mesh>
            <CardFace nodes={nodes} materials={materials} isMobile={isMobile} frontImage={frontImage} frontTex={frontTex} name={name} title={title} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band} frustumCulled={false} raycast={() => null}>
        <meshStandardMaterial map={bandTexture} roughness={0.62} metalness={0.04} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

useGLTF.preload(cardGLB)
