import { MeshBasicNodeMaterial, DataTexture } from 'three/webgpu'
import {
  attribute,
  positionLocal,
  Fn,
  float,
  mx_noise_float,
  time,
  vec3,
  normalWorld,
  positionWorld,
  mix,
  dot,
  modelWorldMatrix,
  uniform,
  matcapUV,
  texture
} from 'three/tsl'
import { hoverEffect } from './Inner'

const dummyTexture = new DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1)

export const ClusterMaterial = new MeshBasicNodeMaterial()

export const map = uniform(dummyTexture)

const scaleMin = float(0.15)
const scaleMax = float(0.75)
const centered = attribute('position', 'vec3')
const centroid = positionLocal.sub(centered)

const centroidWS = modelWorldMatrix.mul(centroid)
const hover = hoverEffect(centroidWS)

// Set the colors.
// ColorA is the color when the face is facing the center of the mesh.
// ColorB is the color when the face is facing away from the center of the mesh.
const colorA = vec3(0.8)
const colorB = vec3(0)

// Calculate a normalize vector that goes from the mesh instance to the center of the world.
const toOrigin = vec3(0).sub(positionWorld).normalize()

// Calculate the dot product and remap it to the [0, 1] range.
const dotRemapped = dot(normalWorld, toOrigin).remap(-1, 1, 0, 1)

ClusterMaterial.colorNode = Fn(() => {
  const toOrigin = vec3(0).sub(positionWorld).normalize()
  const dotRemapped = dot(normalWorld, toOrigin).remap(-1, 1, 0, 1)
  const matcap = texture(map.value, matcapUV).toVec3()

  const colAToMatcap = mix(colorA, matcap, hover)

  // Mix the colors based on the dot product.
  // The dot product is altered with the smoothstep function only for visual purposes.
  // This way the sides have a darker color.
  return mix(colorB, colAToMatcap, dotRemapped.smoothstep(0.35, 0.95))
})()

ClusterMaterial.positionNode = Fn(() => {
  const t = time.mul(0.5)

  const noise = mx_noise_float(centroid.yz.add(t))
  noise.remapAssign(-1, 1, scaleMin, scaleMax)

  // Additional scale factor based on the hover effect,
  // remapped to the [0, 0.45] range just not to go too high with the final value
  const scaleByHover = hover.remap(0, 1, 0, 0.45)

  return centroid.add(centered.mul(noise.add(scaleByHover)))
})()
