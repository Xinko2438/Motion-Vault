import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { world } from '@/Experience/'
import { Scroll } from '@/Experience/Scroll'

class Engine {
  constructor(canvas, experience = world) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error('Engine requires a valid canvas element')
    }

    // Initialization
    this.canvas = canvas
    this.experience = experience
    this.debug = this.experience.debug
    this.isInitialized = false
    this.isDisposed = false
    this.isRunning = false
    this.isDebugBound = false
    this.animationFrameRequestId = null
    this.preloadedTextures = new Map()
    this.stats = null
    this.showFps = true
    this.isDebugUiVisible = false
    this.scene = new THREE.Scene()

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    this.camera.position.set(0, 0, 6)

    // Scroll
    this.scroll = new Scroll(this.camera, this.experience.gallery, this.debug)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.autoClear = false

    this.onResize = () => {
      this.resize()
    }
    this.onKeyDown = (event) => {
      if (event.repeat) return
      if (event.key.toLowerCase() !== 'd') return
      this.setDebugUiVisible(!this.isDebugUiVisible)
    }

    this.animate = this.update.bind(this)
  }

  async init({ autoStart = true } = {}) {
    if (this.isInitialized) return

    document.body.classList.add('loading')

    try {
      this.preloadedTextures = await this.preloadTextures()
      if (this.isDisposed) throw new DOMException("Disposed", "AbortError")
      this.experience.gallery.setPreloadedTextures(this.preloadedTextures)

      await this.experience.init(this.scene, this.camera)
      if (this.isDisposed) throw new DOMException("Disposed", "AbortError")
      this.scroll.init()
      this.initStats()
      this.bindDebug()
      this.setDebugUiVisible(false)

      this.resize()
      window.addEventListener('resize', this.onResize)
      window.addEventListener('keydown', this.onKeyDown)
      this.scroll.bindEvents()

      this.isInitialized = true
      if (autoStart) this.start()
    } finally {
      document.body.classList.remove('loading')
    }
  }

  start() {
    if (this.isDisposed || !this.isInitialized || this.isRunning) return

    this.isRunning = true
    this.update()
  }

  resize() {
    const width = this.canvas.clientWidth || window.innerWidth || 1
    const height = this.canvas.clientHeight || window.innerHeight || 1
    if (width <= 0 || height <= 0) return

    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height, false)
    this.experience.gallery.updatePlaneScale()
    this.experience.gallery.layoutPlanes()
    this.experience.label.resize(width, height)
  }

  async preloadTextures() {
    const textureSources = this.experience.gallery.getTextureSources()
    if (!textureSources.length) return new Map()

    const textureLoader = new THREE.TextureLoader()
    const loadedTextures = new Map()
    this.preloadedTextures = loadedTextures

    await Promise.all(
      textureSources.map(async (textureSource) => {
        try {
          const texture = await textureLoader.loadAsync(textureSource)
          if (this.isDisposed) { texture.dispose(); throw new DOMException("Disposed", "AbortError") }
          texture.colorSpace = THREE.SRGBColorSpace
          loadedTextures.set(textureSource, texture)
        } catch (error) {
          throw new Error(`Texture failed to load: ${textureSource}: ${error.message}`)
        }
      })
    )

    return loadedTextures
  }

  update() {
    if (!this.isRunning) return

    this.animationFrameRequestId = requestAnimationFrame(this.animate)
    this.renderFrame()
  }

  renderFrame() {
    if (this.isDisposed || !this.isInitialized) return
    this.stats?.begin()

    const time = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : performance.now()

    this.scroll.update()
    this.experience.update(time, this.camera, this.scroll)

    this.renderer.clear(true, true, true)
    this.experience.background.render(this.renderer)
    this.renderer.clearDepth()
    this.renderer.render(this.scene, this.camera)
    this.experience.label.render()
    this.stats?.end()
  }

  initStats() {
    if (this.stats) return

    this.stats = new Stats()
    this.stats.showPanel(0)
    this.stats.dom.classList.add('fps-stats')
    document.body.append(this.stats.dom)
    this.setFpsVisible(this.showFps)
  }

  setFpsVisible(isVisible) {
    if (!this.stats) return
    const shouldShow = Boolean(isVisible) && this.isDebugUiVisible
    this.stats.dom.style.display = shouldShow ? 'block' : 'none'
  }

  setDebugUiVisible(isVisible) {
    this.isDebugUiVisible = Boolean(isVisible)
    this.debug?.setVisible(this.isDebugUiVisible)
    this.scroll?.setDebugUiVisible(this.isDebugUiVisible)
    this.setFpsVisible(this.showFps)
  }

  bindDebug() {
    if (!this.debug || this.isDebugBound) return

    this.debug.addBinding({
      folderTitle: 'Engine',
      targetObject: this,
      property: 'showFps',
      label: 'Show FPS',
      onChange: (value) => {
        this.setFpsVisible(value)
      },
    })

    this.isDebugBound = true
  }

  dispose() {
    if (this.isDisposed) return
    this.isDisposed = true
    this.isRunning = false

    if (this.animationFrameRequestId !== null) {
      cancelAnimationFrame(this.animationFrameRequestId)
      this.animationFrameRequestId = null
    }

    window.removeEventListener('resize', this.onResize)
    window.removeEventListener('keydown', this.onKeyDown)
    this.scroll.dispose()

    this.preloadedTextures.forEach((texture) => {
      texture.dispose()
    })
    this.preloadedTextures.clear()
    this.stats?.dom.remove()
    this.stats = null
    this.experience.dispose?.()
    this.debug?.dispose()
    this.renderer.dispose()
    this.renderer.forceContextLoss()
  }
}

export { Engine }
