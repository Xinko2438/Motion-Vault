import { Fn, uniform, vec3, positionWorld, distance } from 'three/tsl'
import { MeshBasicNodeMaterial, BackSide } from 'three/webgpu'

export const InnerMaterial = new MeshBasicNodeMaterial({
  side: BackSide,
  colorWrite: false,
  depthWrite: false,
})

export const hoverPointWS = uniform(vec3(0))
export const effectStrength = uniform(0)

// Function to calculate the hover effect based on the position in world space.
// It calculates the distance between the position and the hover point,
// clamps it in the range [0, 1], and then applies a smoothstep function to it.
// Then multiplies the result by the effect strength because we're going to fade it /inout.
//
// This function is exported because we're going to use it in the ClusterMaterial as well.
export const hoverEffect = Fn(([positionWS]) => {
  return distance(positionWS, hoverPointWS)
          .clamp(0, 1)
          .smoothstep(0.8, 0.2)
          .mul(effectStrength)
})

InnerMaterial.colorNode = Fn(() => {
  return hoverEffect(positionWorld)
})()
