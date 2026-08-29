/* eslint-disable react/no-unknown-property */
import { useLayoutEffect } from 'react'
import { useThree } from '@react-three/fiber'

function frameCamera(camera, width) {
  const desktop = width >= 1024
  camera.position.set(-4.75, 8.35, 8.95)
  camera.lookAt(0.15, 0.35, -0.15)
  camera.fov = desktop ? 27 : 31
  camera.near = 0.1
  camera.far = 80
  camera.updateProjectionMatrix()
}

export default function KeypadCamera() {
  const camera = useThree((state) => state.camera)

  useLayoutEffect(() => {
    frameCamera(camera, window.innerWidth)
    const onResize = () => frameCamera(camera, window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [camera])

  return null
}
