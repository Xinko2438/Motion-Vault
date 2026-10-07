import { Object3DBehaviour } from "three-start";

export class Spin extends Object3DBehaviour {
  #initRotY = 0

  speed = 1

  constructor(speed = 1) {
    super()
    this.speed = speed
  }

  onUpdate() {
    // Make the object spin around the y-axis.
    // The rotation is frame indepentent thanks to the usage of the delta time.
    const dt = this.ctx.getDeltaTime()
    this.object.rotation.y += dt * this.speed
  }

  onDestroy() {
    this.object.rotation.y = this.#initRotY
  }
}
