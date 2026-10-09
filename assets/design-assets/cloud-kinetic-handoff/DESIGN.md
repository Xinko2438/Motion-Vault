# 字形穿越的双页叙事接续

标题字形离开排版锚点，形成过渡构图，再落回下一页；让章节身份和页面切换来自同一组字形。

# FORM / FLOW — Kinetic Editorial Handoff

## Status and provenance

An independently authored Motion Vault study. HTML, CSS, JavaScript, abstract line sculptures, typography composition and editorial copy were written for this study. No upstream implementation, photograph, font, library or other asset is bundled. There is no network dependency.

Conceptual reference: [Codrops / KineticTypePageTransition](https://github.com/codrops/KineticTypePageTransition), specifically the idea of bringing typography forward to carry a reader between content levels. This is an original reinterpretation, not an adaptation, port, reproduction, or claim of visual parity. The reference repository's public description was consulted; its source code was not copied.

## Design brief

- Production uses: editorial chapter handoff, cultural publication, design studio case-study navigation, campaign narrative opening.
- Purpose: make navigation itself feel like a transformation of the subject, with visible typographic continuity between two distinct compositions.
- Visual system: warm near-white stock, ink-black oversize type, narrow rules, serif editorial captions and a single accent. Two original CSS line sculptures switch from structured arches to a loose ribbon stack.
- Choreography: the actual five title glyphs are measured; their overlay copies leave the title grid, expand into a diagonal typographic field, cross-dissolve their letter identities, and resolve into the next title's measured positions. A paper-color wipe masks the composition exchange. Returning reverses the direction of the choreography.
- Hierarchy: the display word is the protagonist; the sculpture supports it; metadata and navigation are intentionally quiet. It is not a generic control demo.

## Run

Open `run/index.html` directly, or serve its folder with any local static server. The file is self-contained and works in an opaque-origin `sandbox="allow-scripts"` iframe. It does not access the parent, storage, cookies, network, or other project files.

Designed for a 1100 × 670 preview and a compact 360 × 240 viewport. A width/height media query keeps the lower editorial text, sculpture and real navigation available in compact mode. Browser rendering has not been verified in this environment; see QA below.

## Real interaction

- `button[data-go="1"]`: navigate from FORM to FLOW.
- `button[data-go="0"]`: navigate back from FLOW to FORM.
- Right arrow: FLOW. Left arrow or Escape: FORM.
- Keyboard activation uses native buttons; focus moves to the corresponding button after a button-initiated chapter change.
- Actual pointer movement tilts the sculpture very slightly. It takes over any enabled demonstration.
- Repeated/reversed requests cancel the in-flight effect to a coherent destination, then move to the requested chapter. No queued backlog of button actions is created.

## Reusable controls

CSS custom properties at the top of the file:

| Property | Default | Role |
| --- | --- | --- |
| `--paper` | `#f5f4ef` | Page stock |
| `--ink` | `#242523` | Display type and sculpture |
| `--accent` | `#4d5fea` | Chapter-one accent; chapter two overrides it |
| `--rule` | `#d4d4cb` | Fine editorial separators |
| `--pad` | `clamp(18px,4vw,56px)` | Outer gutters |
| `--title-size` | `min(24vw,38vh)` | Responsive display size |
| `--duration` | `1550ms` | Transition duration, expressed in milliseconds |

Content and sculpture markup are editable directly in the two `.page` sections. The glyph count currently matches across the two titles; preserve matching counts when changing the display words, or extend the pairing algorithm.

### Demonstration / lifecycle API

`window.MotionExample` exposes:

- `next()` / `previous()`: real chapter navigation.
- `demo()`: opt into an alternating visual demonstration with 2.7-second pauses.
- `stop()`: stop future demonstration timers.
- `reset()`: cancel active effects and return to FORM.
- `dispose()`: abort event listeners, cancel animations and timers, and remove transition nodes; idempotent.
- `state`: a read-only snapshot containing page, running, disposed, reducedMotion and demoEnabled.

`?demo=1` enables the same optional demonstration. It is off in the default standalone page. Real pointer or keyboard input yields control to the user. Leaving the stage permits an explicitly enabled demo to resume. No fake pointer IDs, synthetic clicks or business actions are used.

`prefers-reduced-motion: reduce` removes the transition and pointer tilt; the chapter changes immediately. Automatic demonstration stays off. `?motionIntent=hover` may be used only for an explicitly requested gallery hover, and never changes the operating system preference.

When the document becomes hidden, a transition settles to its intended destination and the demo timer is stopped. Visibility restoration may resume an explicitly enabled demo. Resize settles a transition to avoid stale measured coordinates. `pagehide` disposes resources. Removing the isolated iframe releases its realm; the public `dispose()` is available to hosts with direct access.

## QA and acceptance boundary

- Passed: inline JavaScript parses with Node's standard parser; static HTML/structure, dependency and disposal checks are recorded in the package QA reports.
- Not run: Chromium rendering, screenshots, pointer/keyboard browser execution, reduced-motion browser execution, sandbox runtime, video capture or user aesthetic acceptance. The parent's Chromium launch was blocked by an OS socket permission error. No alternate launch was attempted.
- This is pending material for Motion Vault. Technical integration does not imply user acceptance.

### Browser test flow for the integrating agent

1. Open at 1100 × 670; confirm a complete FORM composition, readable footer, and no console errors or external requests.
2. Click `[data-go="1"]`; inspect the mid-transition glyph field around 700 ms and the completed FLOW composition after 1750 ms.
3. Click `[data-go="0"]`, then rapidly press Right / Left; confirm a coherent final page, no stuck overlay, and usable focus.
4. Use Tab and Enter, then ArrowRight / ArrowLeft / Escape.
5. Repeat at 360 × 240 and in `sandbox="allow-scripts"` without `allow-same-origin`.
6. Emulate reduced motion; click navigation and verify immediate page change with no automatic demo.
7. Invoke `demo()`, take over with a real pointer, leave the stage, hide/restore the document, call `dispose()` twice, and verify timers/animations stop without errors.
