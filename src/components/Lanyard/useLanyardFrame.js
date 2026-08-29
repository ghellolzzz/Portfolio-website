import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const IDENTITY = new THREE.Quaternion()
const TANGENT = new THREE.Vector3()
const SIDE = new THREE.Vector3()
const HINT = new THREE.Vector3(0, 0, 1)
const FALLBACK = new THREE.Vector3(1, 0, 0)

function writeStrapRibbon(geometry, points, width) {
  const half = width / 2
  const count = points.length
  let position = geometry.getAttribute('position')
  if (!position || position.count !== count * 2) {
    position = new THREE.BufferAttribute(new Float32Array(count * 6), 3)
    const uv = new THREE.BufferAttribute(new Float32Array(count * 4), 2)
    const indices = []
    for (let i = 0; i < count - 1; i += 1) {
      const a = i * 2
      indices.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
    }
    geometry.setIndex(indices)
    geometry.setAttribute('position', position)
    geometry.setAttribute('uv', uv)
  }

  const pos = geometry.getAttribute('position')
  const uv = geometry.getAttribute('uv')
  for (let i = 0; i < count; i += 1) {
    const prev = points[Math.max(0, i - 1)]
    const next = points[Math.min(count - 1, i + 1)]
    TANGENT.subVectors(next, prev)
    if (TANGENT.lengthSq() < 1e-8) TANGENT.set(0, -1, 0)
    TANGENT.normalize()
    SIDE.crossVectors(TANGENT, HINT)
    if (SIDE.lengthSq() < 1e-6) SIDE.crossVectors(TANGENT, FALLBACK)
    SIDE.normalize()
    const point = points[i]
    const i6 = i * 6
    pos.array[i6] = point.x - SIDE.x * half
    pos.array[i6 + 1] = point.y - SIDE.y * half
    pos.array[i6 + 2] = point.z - SIDE.z * half
    pos.array[i6 + 3] = point.x + SIDE.x * half
    pos.array[i6 + 4] = point.y + SIDE.y * half
    pos.array[i6 + 5] = point.z + SIDE.z * half
    const u = i / Math.max(count - 1, 1)
    uv.array[i * 4] = u
    uv.array[i * 4 + 1] = 0
    uv.array[i * 4 + 2] = u
    uv.array[i * 4 + 3] = 1
  }
  pos.needsUpdate = true
  uv.needsUpdate = true
  geometry.computeVertexNormals()
}

export function useLanyardFrame({
  band,
  fixed,
  midJoints,
  cardJoint,
  card,
  curve,
  dragged,
  isMobile,
  clipAttach,
  strapWidth,
  minSpeed = 8,
  maxSpeed = 28,
}) {
  const vec = useRef(new THREE.Vector3())
  const ang = useRef(new THREE.Vector3())
  const euler = useRef(new THREE.Euler())
  const quat = useRef(new THREE.Quaternion())
  const dir = useRef(new THREE.Vector3())
  const clipWorld = useRef(new THREE.Vector3())

  useFrame((state, delta) => {
    if (dragged) {
      vec.current.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.current.copy(vec.current).sub(state.camera.position).normalize()
      vec.current.add(dir.current.multiplyScalar(state.camera.position.length()))
      ;[card, cardJoint, fixed, ...midJoints].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({
        x: THREE.MathUtils.clamp(vec.current.x - dragged.x, -7.5, 7.5),
        y: THREE.MathUtils.clamp(vec.current.y - dragged.y, -6, 4.5),
        z: THREE.MathUtils.clamp(vec.current.z - dragged.z, -2, 2),
      })
    }

    if (!fixed.current || !cardJoint.current || !card.current || !band.current || !clipAttach.current) return
    if (midJoints.some((ref) => !ref.current)) return

    midJoints.forEach((ref) => {
      if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
      const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
      ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
    })

    clipAttach.current.updateWorldMatrix(true, false)
    clipAttach.current.getWorldPosition(clipWorld.current)
    curve.points[0].copy(clipWorld.current)
    midJoints.forEach((ref, index) => {
      curve.points[index + 1].copy(ref.current.lerped)
    })
    curve.points[curve.points.length - 1].copy(fixed.current.translation())
    if (!band.current.geometry) band.current.geometry = new THREE.BufferGeometry()
    writeStrapRibbon(band.current.geometry, curve.getPoints(isMobile ? 28 : 56), strapWidth)

    ang.current.copy(card.current.angvel())
    const spin = card.current.rotation()
    quat.current.set(spin.x, spin.y, spin.z, spin.w)
    if (!dragged) {
      quat.current.slerp(IDENTITY, 1 - Math.pow(0.06, delta * 60))
      card.current.setRotation(quat.current, true)
    } else {
      euler.current.setFromQuaternion(quat.current)
      card.current.setAngvel({
        x: ang.current.x - euler.current.x * 0.55,
        y: ang.current.y - euler.current.y * 0.5,
        z: ang.current.z - euler.current.z * 0.55,
      })
    }
  })
}
