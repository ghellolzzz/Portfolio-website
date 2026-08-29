import { useLayoutEffect, useState } from 'react'
import * as THREE from 'three'

const SIZE = 1024
const ZOOM = 1.32

function paintCover(image) {
  const imageWidth = image.naturalWidth || image.width
  const imageHeight = image.naturalHeight || image.height
  if (!imageWidth || !imageHeight) return null
  const canvas = document.createElement('canvas')
  canvas.width = SIZE
  canvas.height = SIZE
  const ctx = canvas.getContext('2d', { alpha: false })
  if (!ctx) return null
  const scale = Math.max(SIZE / imageWidth, SIZE / imageHeight) * ZOOM
  const drawWidth = imageWidth * scale
  const drawHeight = imageHeight * scale
  ctx.drawImage(image, (SIZE - drawWidth) / 2, (SIZE - drawHeight) / 2, drawWidth, drawHeight)
  return canvas
}

export function useBadgePhoto(texture) {
  const [badgeTex, setBadgeTex] = useState(null)

  useLayoutEffect(() => {
    const image = texture?.image
    if (!image) return undefined

    const apply = () => {
      const canvas = paintCover(image)
      if (!canvas) return
      const next = new THREE.CanvasTexture(canvas)
      next.colorSpace = THREE.SRGBColorSpace
      next.repeat.set(1, 1)
      next.offset.set(0, 0)
      next.center.set(0, 0)
      next.anisotropy = 8
      next.minFilter = THREE.LinearFilter
      next.magFilter = THREE.LinearFilter
      next.generateMipmaps = false
      next.needsUpdate = true
      setBadgeTex((prev) => {
        prev?.dispose()
        return next
      })
    }

    if ((image.complete && (image.naturalWidth || image.width)) || image.width) {
      apply()
      return () => setBadgeTex((prev) => {
        prev?.dispose()
        return null
      })
    }

    image.addEventListener('load', apply)
    return () => {
      image.removeEventListener('load', apply)
      setBadgeTex((prev) => {
        prev?.dispose()
        return null
      })
    }
  }, [texture])

  return badgeTex
}
