# 独立原生实现

run/index.html 为真实、自包含运行入口，内嵌完整样式和脚本；source/index.html 是同版本可读源码。run/effect.js 与 source/effect.js 是从该入口提取的脚本阅读副本，勿与内嵌脚本重复加载。

零第三方运行依赖，系统字体与原创 CSS/SVG 图形，不读取用户数据或请求网络。概念来源是设计研究引用，不是作者源码适配或逐像素复刻。减少动态效果与键盘由实现处理；真实卡片悬停由原画廊管理。

# ATELIER — Context-Aware Wordmark

## Status and provenance

An independently authored Motion Vault study. All HTML, CSS, JavaScript, copy and abstract artwork are original to this implementation. It contains no external font, photo, dependency, asset request, or copied upstream source.

Conceptual reference: [Codrops / ContextAwareLogoAnimationScroll](https://github.com/codrops/ContextAwareLogoAnimationScroll), the broad idea of a fixed identity reacting to the content it crosses. This is an original interpretation, not an upstream adaptation, a port, or a claim of visual equivalence. Its public repository description was consulted; its implementation was not copied.

## Design brief

- Production uses: studio site identity, editorial landing page, long-form brand story and case-study section navigation.
- Purpose: keep a brand present without occupying the same visual weight everywhere. The wordmark yields space as the hero scrolls away, then reacts letter by letter to each incoming chapter boundary.
- Composition: near-white editorial canvas, bold sans-serif wordmark, large serif statements, sparse metadata and original CSS sculptures. An ink-dark middle chapter creates a meaningful material change; the final chapter returns to a warm paper surface.
- Motion logic: logo size tracks hero departure. Each glyph samples a slightly staggered point relative to the true scroll boundary; a glyph folds upward, changes ink as it crosses, and unfolds into the new context. The effect follows scroll in both directions and is not a timed loop. Footer controls sample their own position to remain legible independently of the header.
- Narrative: introduction → considered practice → future possibility. The three actual editorial layouts make the context change meaningful.

## Run

Open `run/index.html` directly, or serve its folder locally. There are no imports or remote assets. The page is suitable for an opaque-origin iframe with `sandbox="allow-scripts"`, with no parent access, storage, cookies or network requests.

The full-size design target is 1100 × 670. Compact CSS supports 360 × 240. Actual browser rendering is still unverified in this environment; see QA below.

## Real interaction

- `#scroller`: native wheel, trackpad and touch scrolling; focusable for assistive access.
- `[data-section-go="1"]`: the hero's “Explore our approach” action and the second chapter marker.
- `.scroll-nav [data-section-go="0"/"1"/"2"]`: direct chapter navigation.
- `.back[data-section-go="0"]`: return to the beginning.
- ArrowDown / PageDown / Space advance a chapter. ArrowUp / PageUp go back. Home / End go to the first / last chapter. Space on a focused button keeps native button behavior.
- Wheel, touch or pointer press interrupts the programmatic scroll immediately. Repeated chapter selection replaces the prior scroll animation instead of stacking animations.
- The wordmark's letters respond continuously to real scroll position, including a reversed boundary crossing.

## Reusable controls

CSS custom properties at the top of the file:

| Property | Default | Role |
| --- | --- | --- |
| `--paper` | `#f4f3ed` | Hero stock / reverse text |
| `--ink` | `#272925` | Default text and middle section |
| `--accent` | `#b95734` | Small identity accent |
| `--pad` | `clamp(18px,4.4vw,58px)` | Editorial gutter |
| `--logo-max` | `min(15vw,24vh)` | Full hero wordmark |
| `--logo-min` | `clamp(27px,4.5vw,50px)` | Compact fixed wordmark |
| `--roll-distance` | `45` | Glyph departure distance in pixels, unitless |
| `--scroll-duration` | `1700` | Programmatic chapter-scroll duration in milliseconds, unitless |

The compact breakpoint overrides logo sizing. Edit panel copy, artwork and chapter labels directly in the file. The script derives section height from the viewport and assumes the current three equal-height chapters. To use variable-height chapters, adapt boundary sampling to the panels' measured positions. The three ink colors are centralized in `update()` alongside the section contrast logic.

### Demonstration / lifecycle API

`window.MotionExample` exposes:

- `goTo(0 | 1 | 2)`: navigate to a chapter.
- `demo()`: opt into forward/back chapter demonstration with 2.3-second rests.
- `stop()`: stop demonstration and programmatic scroll.
- `reset()`: stop active work and return to the hero.
- `dispose()`: abort event listeners and cancel requestAnimationFrame / timeout work; idempotent.
- `state`: read-only section, scrollTop, disposed, reducedMotion, demoEnabled and gliding snapshot.

`?demo=1` enables the optional demo. The default standalone view is static until interacted with. Real pointer movement/press, wheel, touch and keyboard input yield to the user; leaving the stage may resume a demo that was explicitly enabled. Demonstration calls the scroll routine directly, without synthetic clicks or invented input events.

Reduced motion disables glyph rolling and programmatic smooth scrolling; chapter navigation is immediate and the wordmark keeps sufficient contrast. Scroll position still determines contextual size and color. Automatic demonstration stays off. The `?motionIntent=hover` override is reserved for explicit gallery hover intent; it does not alter any system setting.

No continuous render loop runs while idle. A passive scroll listener schedules one update frame. Hidden documents cancel programmatic motion, update frames and demo timeouts. Visibility restoration samples the actual position and may resume an enabled demo. `pagehide` calls disposal.

## QA and acceptance boundary

- Passed: JavaScript syntax parsing and static HTML, section/navigation structure, dependency and lifecycle checks, recorded in the package QA reports.
- Not run: browser rendering, screenshots, actual wheel/touch/keyboard execution, motion timing, reduced-motion execution, sandbox runtime, video or aesthetic acceptance. The parent's Chromium launch was blocked by an OS socket permission error. No alternate launch was attempted.
- Pending Motion Vault study only; implementation and integration do not imply the user's approval.

### Browser test flow for the integrating agent

1. Open at 1100 × 670; inspect the hero typography, line sculpture and legible lower navigation.
2. Scroll `#scroller` by wheel. Confirm wordmark collapse, individual folds and contrasting ink as the dark panel crosses the header; reverse across the same boundary.
3. Click the second/third chapter markers; interrupt with a real wheel or touch, then choose another marker. Confirm no competing scroll animations.
4. Test Home / End / PageUp / PageDown and Tab + Enter. Verify `aria-current` matches the chapter.
5. Repeat at 360 × 240 and inside `sandbox="allow-scripts"` without same-origin privileges.
6. Emulate reduced motion: chapter buttons must jump directly and letters must not roll.
7. Run `demo()`, interrupt with real input, leave the viewport, hide/restore the document and call `dispose()` twice; verify no errors or further scheduled motion.
