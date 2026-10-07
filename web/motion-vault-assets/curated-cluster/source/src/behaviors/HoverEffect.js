import { Raycaster, Vector2 } from 'three/webgpu'
import { Object3DBehaviour } from 'three-start'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'

import { hoverPointWS, effectStrength } from '../materials/Inner'

gsap.registerPlugin(Observer)

export class HoverEffect extends Object3DBehaviour {
  ndc = new Vector2()
  raycaster = new Raycaster()

  #isHover = false

  onAwake() {
    this.createPointer()
  }

  createPointer() {
    Observer.create({
      type: 'pointer',
      target: this.ctx.canvasContainer,
      onMove: (event) => {
        const { x, y } = event

        this.ndc.set(
          x / this.ctx.canvasContainer.clientWidth * 2 - 1,
          -(y / this.ctx.canvasContainer.clientHeight) * 2 + 1
        )

        this.raycaster.setFromCamera(this.ndc, this.ctx.camera)
        const hit = this.raycaster.intersectObject(this.object, false)

        this.isHover = hit.length > 0

        if (!this.isHover) return

        gsap.to(hoverPointWS.value, {
          x: hit[0].point.x,
          y: hit[0].point.y,
          z: hit[0].point.z,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: true
        })

      }
    })
  }

  get isHover() {
    return this.#isHover
  }

  set isHover(value) {
    this.#isHover = value

    const effectValue = value ? 1 : 0
    const effectDuration = value ? 0.5 : 0.2

    gsap.to(effectStrength, {
      value: effectValue,
      duration: effectDuration,
      ease: 'power2.out',
      overwrite: true
    })
  }
}
