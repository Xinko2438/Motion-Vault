# 独立原生实现

run/index.html 为真实、自包含运行入口，内嵌完整样式和脚本；source/index.html 是同版本可读源码。run/effect.js 与 source/effect.js 是从该入口提取的脚本阅读副本，勿与内嵌脚本重复加载。

零第三方运行依赖，系统字体与原创 CSS/SVG 图形，不读取用户数据或请求网络。概念来源是设计研究引用，不是作者源码适配或逐像素复刻。减少动态效果与键盘由实现处理；真实卡片悬停由原画廊管理。

# Reversible radial-cover navigation

An original spatial-practice composition with layered architectural SVG artwork. Page typography, geometry and marginal notes separate outward along radial vectors as a circular cover grows from the menu control. Navigation rows emerge through clipped boundaries. A single spring-driven progress value orchestrates the composition and retains position and velocity when reversed mid-flight.

## Run and reuse
Open `run/index.html` directly or serve it from any static server. Everything is inline; no fonts, images, network, libraries or build system are required. Suitable for an `allow-scripts` sandbox without same-origin permissions.

Theme tokens are at the top of the stylesheet. `--spring-stiffness` and `--spring-damping` tune the physical response. Each `data-exit="x,y,rotation"` defines a composition fragment's radial movement; `data-reveal` sets a stagger order. `size()` calculates a cover radius that reaches the farthest corner at the actual viewport size. `sections` defines the three local destinations.

## Interaction and accessibility
- Explore toggles the menu. Clicking it again during opening or closing reverses from current position and velocity.
- Hover / keyboard focus shifts the navigation title and reveals an arrow. These are native anchors, with `#work`, `#studio` and `#journal` switching real local content and updating the current section.
- Escape closes and restores focus. Closed menu links are inert. The page is inert while covered and focus is contained in the toggle plus navigation links.
- Opening settles focus on the current section. Local links, back/forward hash navigation, and the page call to action all update the displayed section.
- Reduced-motion mode jumps directly to the chosen state. Resizing recalculates the cover; page visibility cancels unfinished animation at its intended endpoint. No default autoplay.
- Responsive layouts include 1100×670 and 360×240.

## Scope and limitations
The three sections are compact local excerpts, not full separate web pages. No server navigation or content loading is simulated. The spring is a bounded, single-frame-loop native implementation and not GSAP. The composition is original illustrative architecture rather than photography or a real building specification.

## Provenance
Independently authored HTML/CSS/JavaScript and SVG artwork for Motion Vault. Concept reference only: [Codrops — EaseReverseClipMenu](https://github.com/codrops/EaseReverseClipMenu). No upstream source, GSAP, images, fonts or brand assets are copied. This study is not an upstream adaptation or a visual-parity claim.
