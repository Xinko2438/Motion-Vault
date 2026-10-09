import { lifecycle, rejectShaderErrors, assertFirstFrame } from '../../../lifecycle.js';
import { smaaImages } from '../../../resources.js';
const vaultMotion = matchMedia('(prefers-reduced-motion: reduce)');
const vaultError = error => lifecycle.fail(error);
const vaultListen = (...args) => lifecycle.listen(...args);
import { EffectPass, RenderPass, SMAAEffect, SMAAPreset, SSAOEffect } from "postprocessing"
import {
  DoubleSide,
  NoToneMapping,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  WebGLRenderer,
} from "three"
import glassNormalFrag from "../shaders/xylophone/glassNormalFrag.glsl?raw"
import xylophoneVert from "../shaders/xylophone/xylophoneVert.glsl?raw"
import { FBOHelper } from "./common/FBOHelper"
import { FluidSim } from "./components/FluidSim"
import { Xylophone } from "./components/xylophone/Xylophone"
import { XylophoneBg } from "./components/XylophoneBg"
import { FLUID, FROST, QUALITY, SSAO } from "./configs/XylophoneConfig"
import { FrostBackdropPass } from "./passes/FrostBackdropPass"
import { GlassBufferPass } from "./passes/GlassBufferPass"
import { Input } from "./utils/input"
import { Properties } from "./utils/properties"
import { RAFCollection } from "./utils/RAFCollection"

import "../../css/base.css"

const MAX_DELTA = 1 / 20 // clamp long frames (tab restore) so nothing integrates a huge step

class App {
  private readonly gl: WebGLRenderer
  private readonly scene = new Scene()
  private readonly camera: PerspectiveCamera

  // components
  private readonly xylophone = new Xylophone()
  private readonly xylophoneBg = new XylophoneBg()
  private readonly fluid: FluidSim

  // passes — composited in this order
  private readonly frostBackdropPass: FrostBackdropPass
  private readonly renderPass: RenderPass
  private readonly glassBufferPass: GlassBufferPass
  private readonly glassNormalMaterial: ShaderMaterial
  private readonly ssaoEffect: SSAOEffect
  private readonly ssaoPass: EffectPass
  private readonly aaPass: EffectPass

  // ui

  // frame
  private size = { width: 0, height: 0 }
  private dateTime = performance.now()
  private isContextLost = false
  private rafId = 0
  private destroyed = false

  private readonly boundUpdate = this.update.bind(this)
  private readonly boundResize = this.resize.bind(this)

  /* ---------------------------------- setup --------------------------------- */
  private createRenderer() {
    const gl = new WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: "high-performance",
      premultipliedAlpha: false,
    })
    rejectShaderErrors(gl)
    if(!gl.getContext().getExtension('EXT_color_buffer_float')){gl.dispose();gl.forceContextLoss();throw new Error('This authored fluid effect requires EXT_color_buffer_float')}
    gl.outputColorSpace = SRGBColorSpace
    gl.toneMapping = NoToneMapping
    gl.setPixelRatio(Properties.dpr)
    gl.setSize(window.innerWidth, window.innerHeight)

    const canvas = gl.domElement
    canvas.id = "canvas"
    canvas.setAttribute("aria-hidden", "true")
    canvas.style.position = "fixed"
    canvas.style.left = "0px"
    canvas.style.top = "0px"
    canvas.style.pointerEvents = "none"
    document.body.prepend(canvas)

    // Context loss is common on mobile when backgrounding. three re-uploads every GPU
    // resource itself on restore, so we only have to stop and resume drawing.
    vaultListen(canvas,"webglcontextlost", (event) => {
      event.preventDefault()
      this.isContextLost = true
      console.warn("WebGL context lost — pausing render")
    })
    vaultListen(canvas,"webglcontextrestored", () => {
      this.isContextLost = false
      console.warn("WebGL context restored — resuming render")
    })

    return gl
  }

  /** One bg render -> Gaussian-blurred backdrop the frosted bars transmit through. */
  private createFrostPass() {
    const pass = new FrostBackdropPass(this.scene, this.camera)
    pass.blurRadius = FROST.strength * FROST.maxBlurPx
    this.xylophone.uniforms.u_tBackdrop.value = pass.blurredTexture

    return pass
  }

  /**
   * View-space normals for SSAO. three's NormalPass can't reproduce our instanced helix pose,
   * so we re-render the bars with the same vertex shader and share the animation uniforms —
   * the buffer then tracks the live pose. Depth comes from the main render pass.
   */
  private createGlassNormalMaterial() {
    const u = this.xylophone.uniforms

    return new ShaderMaterial({
      vertexShader: xylophoneVert,
      fragmentShader: glassNormalFrag,
      side: DoubleSide, // match the display material so both plate faces write normals
      uniforms: {
        u_time: u.u_time,
        u_spinSpeed: u.u_spinSpeed,
        u_swingScale: u.u_swingScale,
        u_swingAxis: u.u_swingAxis,
      },
    })
  }

  /* ---------------------------------- debug --------------------------------- */
  // lil-gui is imported dynamically so it never lands in the production bundle.
  private async setupDebug() {
    if (!import.meta.env.DEV) return

    const { default: GUI } = await import("three/examples/jsm/libs/lil-gui.module.min.js")
    Properties.gui = new GUI()

    const u = this.xylophone.uniforms
    const folder = Properties.gui.addFolder("Frosted")

    folder
      .add({ frost: FROST.strength }, "frost", 0, 1, 0.01)
      .onChange((v: number) => (this.frostBackdropPass.blurRadius = v * FROST.maxBlurPx))
    folder.add(u.u_transmission, "value", 0, 1, 0.01).name("transmission")
    folder.add(u.u_refractStrength, "value", 0, 0.2, 0.001).name("refract strength")
    folder.add(u.u_fresnelPower, "value", 0, 10, 0.1).name("fresnel power")
    folder.add(u.u_fluidStrength, "value", 0, 3, 0.01).name("fluid strength")
    folder.add(u.u_tintStrength, "value", 0, 1, 0.01).name("tint strength")
    folder.add(u.u_tintGlow, "value", 0, 1, 0.01).name("tint glow")

    const irid = folder.addFolder("Iridescence")
    irid.add(u.u_iridStrength, "value", 0, 2, 0.01).name("strength")
    irid.add(u.u_iridCycles, "value", 0, 8, 0.1).name("cycles")
    irid.add(u.u_iridShift, "value", 0, 1, 0.01).name("hue shift")
    irid.add(u.u_iridPower, "value", 0.5, 6, 0.1).name("rim power")
    irid.add(u.u_iridBody, "value", 0, 1, 0.01).name("body")

    const ao = folder.addFolder("Contact shadow")
    ao.add(this.ssaoPass, "enabled").name("enabled")
    ao.add(this.ssaoEffect.ssaoMaterial, "intensity", 0, 6, 0.05).name("intensity")
    ao.add(this.ssaoEffect.ssaoMaterial, "radius", 0.001, 0.5, 0.001).name("radius")
    ao.add(this.ssaoEffect.ssaoMaterial, "bias", 0, 0.2, 0.001).name("bias")
    ao.add(this.ssaoEffect.ssaoMaterial, "fade", 0, 0.2, 0.001).name("fade")

    // high-contrast bg so the transmission has something obvious to reveal
    folder.add(this.xylophoneBg.uniforms.u_debugPattern, "value", 0, 1, 1).name("bg test pattern")
  }

  /* ---------------------------------- main ---------------------------------- */
  constructor() {
    lifecycle.addCleanup(()=>this.destroy())
    Properties.viewportWidth = window.innerWidth
    Properties.viewportHeight = window.innerHeight

    this.gl = this.createRenderer()
    Properties.gl = this.gl
    Properties.composer.setRenderer(this.gl)

    this.camera = new PerspectiveCamera(45, Properties.viewportWidth / Properties.viewportHeight, 0.1, 200)
    this.camera.position.set(0, 0, 5)

    Input.init()
    FBOHelper.init()

    // setup components
    this.scene.add(this.xylophone.group)
    this.scene.add(this.xylophoneBg.build())

    this.fluid = new FluidSim(FLUID)
    this.xylophone.setFluid(this.fluid.uniforms.velocity)

    // setup passes
    // frostBackdrop -> render -> glassBuffer -> ssao -> aa
    this.frostBackdropPass = this.createFrostPass()
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.glassNormalMaterial = this.createGlassNormalMaterial()
    this.glassBufferPass = new GlassBufferPass(
      this.scene,
      this.camera,
      this.glassNormalMaterial,
      QUALITY.glassBufferScale
    )
    this.ssaoEffect = new SSAOEffect(this.camera, this.glassBufferPass.glassTexture, SSAO)
    this.ssaoPass = new EffectPass(this.camera, this.ssaoEffect)
    this.aaPass = new EffectPass(
      this.camera,
      new (SMAAEffect as any)(smaaImages[0], smaaImages[1], QUALITY.isMobile ? SMAAPreset.MEDIUM : SMAAPreset.ULTRA)
    )

    for (const pass of [this.frostBackdropPass, this.renderPass, this.glassBufferPass, this.ssaoPass, this.aaPass]) {
      Properties.composer.addPass(pass)
    }

    // post update
    this.resize()
    window.addEventListener("resize", this.boundResize)

    this.xylophone.setMuted(true)

    // The loader covers the page until the bars exist. `load()` swallows its own asset failures,
    // so the overlay can't get stuck on a failed fetch.
    void this.xylophone.load().then(() => {
      if(lifecycle.disposed)return
      Properties.composer.render(0);assertFirstFrame(this.gl)
      document.body.classList.remove("loading")
      lifecycle.succeed({modelLoaded:true,smaaImages:2,firstFrameSubmitted:true})
      if(lifecycle.running)this.resume()
    }).catch(vaultError)
    void this.setupDebug()

    this.update()
  }

  private resize() {
    // #sizer tracks the layout viewport, which is steadier than innerHeight on mobile
    const sizerEl = document.getElementById("sizer")
    const rect = sizerEl?.getBoundingClientRect()
    const width = rect?.width ?? window.innerWidth
    const height = rect?.height ?? window.innerHeight

    if (this.size.width === width && this.size.height === height) return
    this.size = { width, height }

    Properties.viewportWidth = width
    Properties.viewportHeight = height
    Properties.globalUniforms.u_resolution.value.set(width * Properties.dpr, height * Properties.dpr)

    this.gl.setSize(width, height)
    Properties.composer.setSize(width, height)
    Input.resize()

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
  }

  private update() {
    if (!lifecycle.running || lifecycle.disposed) return
    this.rafId = window.requestAnimationFrame(this.boundUpdate)
    if (this.isContextLost) return

    const now = performance.now()
    const delta = Math.min((now - this.dateTime) / 1e3, MAX_DELTA)
    this.dateTime = now

    Properties.deltaTime = delta
    Properties.interactionTime += delta
    Properties.reduceMotion = vaultMotion.matches
    this.xylophone.uniforms.u_spinSpeed.value = Properties.reduceMotion ? 0 : 0.3
    this.xylophone.uniforms.u_swingScale.value = Properties.reduceMotion ? 0 : 1
    if (!Properties.reduceMotion) Properties.time += delta
    Properties.globalUniforms.u_deltaTime.value = delta
    Properties.globalUniforms.u_time.value = Properties.time

    RAFCollection.forEach((callback) => callback(delta))
    this.xylophone.update(delta, this.camera)

    Properties.composer.render(delta)
    Input.postUpdate()
  }

  stop() { cancelAnimationFrame(this.rafId); this.rafId=0; Input.resetGesture(); }
  resume() { if(lifecycle.disposed || !lifecycle.running || this.rafId) return; this.dateTime=performance.now(); this.update(); }
  destroy() {
    if(this.destroyed)return
    this.destroyed=true
    window.cancelAnimationFrame(this.rafId)
    window.removeEventListener("resize", this.boundResize)
    Input.destroy()
    FBOHelper.fsQuad?.dispose()

    for (const pass of [this.frostBackdropPass, this.renderPass, this.glassBufferPass, this.ssaoPass, this.aaPass]) {
      if(pass){Properties.composer.removePass(pass);pass.dispose()}
    }

    this.glassNormalMaterial?.dispose()
    this.fluid?.dispose()
    this.xylophone?.dispose()
    this.xylophoneBg?.dispose()
    Properties.composer.dispose()
    this.gl?.dispose()
    this.gl?.forceContextLoss()
  }
}

let app: App | null = null
lifecycle.setHandlers({
  stop(){app?.stop()},resume(){app?.resume()},dispose(){app?.destroy();app=null},
  inspect(){return {renderer:'Three182 WebGL2; float/half-float fluid targets; SSAO/SMAA',input:['native mouse sweep','native wheel','native touch drag'],resources:'one embedded-buffer GLB; two embedded SMAA PNGs; no active Draco/worker/audio',reducedMotionBehavior:'shader spin and swing frozen; independent real-input clock retains fluid hover and idle sleep'};}
})
try { app = new App();if(!lifecycle.running)app.stop() } catch(error) { vaultError(error); document.body.classList.remove('loading'); }
