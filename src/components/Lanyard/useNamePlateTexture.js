import { useMemo } from 'react'
import * as THREE from 'three'

export function useNamePlateTexture(name, title) {
  return useMemo(() => {
    if (!name && !title) return null
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 160
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    const fade = ctx.createLinearGradient(0, 0, 0, 160)
    fade.addColorStop(0, 'rgba(5, 6, 10, 0)')
    fade.addColorStop(0.32, 'rgba(5, 6, 10, 0.45)')
    fade.addColorStop(1, 'rgba(5, 6, 10, 0.78)')
    ctx.fillStyle = fade
    ctx.fillRect(0, 0, 512, 160)
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    if (title) {
      ctx.fillStyle = '#99f6e4'
      ctx.font = '600 22px "Segoe UI", sans-serif'
      ctx.fillText(title, 28, 52, 456)
    }
    if (name) {
      ctx.fillStyle = '#ffffff'
      ctx.font = '650 34px "Segoe UI", sans-serif'
      ctx.fillText(name, 28, 88, 456)
    }
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    texture.generateMipmaps = false
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.needsUpdate = true
    return texture
  }, [name, title])
}
