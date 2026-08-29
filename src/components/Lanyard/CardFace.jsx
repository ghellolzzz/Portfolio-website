/* eslint-disable react/no-unknown-property */
import { useBadgePhoto } from './useBadgePhoto'
import { useNamePlateTexture } from './useNamePlateTexture'

const PHOTO_SIZE = [0.7, 0.7]
const PLATE_SIZE = [0.7, 0.155]
const FACE_Z = 0.008

export default function CardFace({ nodes, materials, isMobile, frontImage, frontTex, name, title }) {
  const plateTex = useNamePlateTexture(name, title)
  const badgeTex = useBadgePhoto(frontImage ? frontTex : null)

  return (
    <>
      <mesh geometry={nodes.card.geometry} frustumCulled={false}>
        <meshPhysicalMaterial color="#0b1220" clearcoat={isMobile ? 0 : 0.45} clearcoatRoughness={0.28} roughness={0.48} metalness={0.18} />
      </mesh>
      {badgeTex ? (
        <mesh position={[0, 0.58, FACE_Z]} frustumCulled={false}>
          <planeGeometry args={PHOTO_SIZE} />
          <meshBasicMaterial map={badgeTex} toneMapped={false} depthWrite={false} />
        </mesh>
      ) : null}
      {plateTex ? (
        <mesh position={[0, 0.125, FACE_Z + 0.001]} frustumCulled={false}>
          <planeGeometry args={PLATE_SIZE} />
          <meshBasicMaterial map={plateTex} transparent toneMapped={false} depthWrite={false} />
        </mesh>
      ) : null}
      <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} frustumCulled={false} />
      <mesh geometry={nodes.clamp.geometry} material={materials.metal} frustumCulled={false} />
    </>
  )
}
