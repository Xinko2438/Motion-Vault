import './style.css';
import * as THREE from "three/webgpu"
import { sobel } from 'three/addons/tsl/display/SobelOperatorNode'
import { bayerDither } from 'three/addons/tsl/math/Bayer'
import { ThreeStart, ThreeContextEvents, addComponent } from "three-start"
import { InnerMaterial } from "./materials/Inner"
import { ClusterMaterial, map } from "./materials/Cluster"
import { Spin } from "./behaviors/Spin"
import { HoverEffect } from "./behaviors/HoverEffect"
import { Fn } from 'three/tsl'

const starter = new ThreeStart()

starter.mount(document.getElementById("app"))
starter.start()

const { scene, camera, renderPipeline, scenePass } = starter.ctx

camera.position.z = 4

const innerGeometry = new THREE.IcosahedronGeometry(1, 1)
const innerMesh = new THREE.Mesh(innerGeometry, InnerMaterial)
innerMesh.name = 'innerMesh'
addComponent(innerMesh, Spin, -0.4)
addComponent(innerMesh, HoverEffect)
scene.add(innerMesh)

const textureLoader = new THREE.TextureLoader()
const matcap = await textureLoader.loadAsync('/yellow-18.png')
matcap.colorSpace = THREE.SRGBColorSpace
map.value = matcap

function createExtrudedFaces(mesh) {
  if (!mesh) return console.error('Mesh is required')

  const { geometry } = mesh
  const { position: meshPosition } = mesh
  const positionAttribute = geometry.getAttribute('position')
  const { length: numVertices } = positionAttribute.array
  const faceCentroid = new THREE.Vector3()
  const faceDirection = new THREE.Vector3()
  const instanceMatrix = new THREE.Matrix4()

  // We need to count how many faces the base mesh has.
  // We can calculate it by dividing the number of vertices by the number of vertices per face.
  // Each face has 3 vertices, and each vertex has 3 components (x, y, z), so we divide by 9.
  const numFaces = numVertices / 9

  // Create the batched mesh
  const facesMesh = new THREE.BatchedMesh(
    numFaces,
    numVertices * 6,
    numVertices * 6,
    ClusterMaterial,
  )

  facesMesh.name = 'facesMesh'

  // Iterate over the vertices of the base mesh; 9, so 1 face, per loop iteration.
  // For each loop iteration, we need to create a new instance geometry.
  // The instance geometry will be a triangle with the same vertices as the base mesh.
  let i
  for (i = 0; i < numVertices; i += 9) {
    // Get the vertices of the face.
    const x1 = positionAttribute.array[i + 0]
    const y1 = positionAttribute.array[i + 1]
    const z1 = positionAttribute.array[i + 2]

    const x2 = positionAttribute.array[i + 3]
    const y2 = positionAttribute.array[i + 4]
    const z2 = positionAttribute.array[i + 5]

    const x3 = positionAttribute.array[i + 6]
    const y3 = positionAttribute.array[i + 7]
    const z3 = positionAttribute.array[i + 8]

    // Calculate the centroid
    faceCentroid.set(x1 + x2 + x3, y1 + y2 + y3, z1 + z2 + z3).divideScalar(3)

    // Calculate the normal of the face by subtracting the centroid from the mesh position and normalizing the result.
    faceDirection.copy(faceCentroid).sub(meshPosition).normalize()

    const faceExtrusion = 0.45

    const x4 = x1 + faceDirection.x * faceExtrusion
		const y4 = y1 + faceDirection.y * faceExtrusion
		const z4 = z1 + faceDirection.z * faceExtrusion

		const x5 = x2 + faceDirection.x * faceExtrusion
		const y5 = y2 + faceDirection.y * faceExtrusion
		const z5 = z2 + faceDirection.z * faceExtrusion

		const x6 = x3 + faceDirection.x * faceExtrusion
		const y6 = y3 + faceDirection.y * faceExtrusion
		const z6 = z3 + faceDirection.z * faceExtrusion

    // Create the instance geometry.
    const instanceGeometry = new THREE.BufferGeometry()

    // Create the `position` attribute array for the instance geometry.
    const attributeArray = new Float32Array([
      x1, y1, z1,
      x3, y3, z3,
      x2, y2, z2,

      x1, y1, z1,
      x2, y2, z2,
      x4, y4, z4,

      x2, y2, z2,
      x5, y5, z5,
      x4, y4, z4,

      x2, y2, z2,
      x3,	y3,	z3,
      x5,	y5,	z5,

      x3, y3, z3,
      x6, y6, z6,
      x5, y5, z5,

      x3, y3, z3,
      x1, y1, z1,
      x6, y6, z6,

      x1, y1, z1,
      x4, y4, z4,
      x6, y6, z6,

      x4, y4, z4,
      x5, y5, z5,
      x6, y6, z6,
    ])
    const posAttribute = new THREE.Float32BufferAttribute(attributeArray, 3)
    instanceGeometry.setAttribute('position', posAttribute)

    // Translate the instance geometry back to the centroid.
    instanceGeometry.translate(-faceCentroid.x, -faceCentroid.y, -faceCentroid.z)

    // Compute the vertex normals for the instance geometry.
    // instanceGeometry.computeVertexNormals()

    // Add the instance geometry to the faces mesh.
    const instanceGeometryID = facesMesh.addGeometry(instanceGeometry)
    const instanceID = facesMesh.addInstance(instanceGeometryID)

    // Set the matrix of the instance.
    instanceMatrix.makeTranslation(faceCentroid.x, faceCentroid.y, faceCentroid.z)
    facesMesh.setMatrixAt(instanceID, instanceMatrix)
   }

  facesMesh.geometry.computeVertexNormals()

  innerMesh.add(facesMesh)
}

createExtrudedFaces(innerMesh)

const scenePassColor = scenePass.getTextureNode()
const scenePassDepth = scenePass.getTextureNode('depth')

const scenePassSobel = sobel(scenePassDepth)
const sobelPass = Fn(() => {
  return scenePassSobel.step(0.01)
})()

const outputPass = Fn(() => {
  const result = scenePassColor.add(sobelPass)
  result.assign(bayerDither(result))

  return result
})()

renderPipeline.outputNode = outputPass
