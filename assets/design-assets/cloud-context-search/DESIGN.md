# 工具条展开为可输入的检索上下文

紧凑工具条在原位置扩展为搜索输入与结果面板，真实匹配本地示例笔记，并提供无结果、选择和返回反馈。

# Context-expanding search toolbar

An original, dependency-free editorial collection interface. A compact search control grows into the same inline command surface; nearby controls yield their space, and a result panel rises from the toolbar. Six substantial local notes make search, selection, saving, filtering and sorting meaningful.

## Run and reuse
Open `run/index.html` directly or serve it from any static server. All styles, scripts, artwork and data are inline. No network, fonts, storage, frameworks or build step are needed. Designed for an `allow-scripts` sandbox without same-origin permissions; browser execution remains unverified.

Replace the `notes` array and theme variables to embed it in another library. The illustration thumbnails are original CSS geometry. `--bar-closed`, `--bar-open`, `--radius`, `--duration` and `--ease` control the transformation; `--paper`, `--ink`, `--accent`, `--soft`, `--line` and `--surface` control the palette.

## Interaction
- Click Search or press `/`; type words found in titles, topics, summaries or full note bodies.
- Empty input displays recent notes. Multiword queries require every word. No-match search provides concrete suggestions.
- Arrow keys select results; Enter opens the actual note. Escape closes search or the note and restores focus.
- All notes / Saved filters the collection. The sort icon toggles alphabetical / original recent order. Detail view has a working save toggle with feedback.
- Pointer outside dismisses search; a modal note traps focus, makes the background inert, and closes from its backdrop or close control.
- Reduced motion removes transitions. Compact responsive rules target 360×240 (not browser verified); result lists and note details scroll when needed.

## Scope and limitations
Sample data is intentionally local. Saved state lasts only for the current document lifetime. Dates are editorial sample labels, not current date claims. A production search service would need async status, failures, debouncing and cancellation. No autoplay or synthetic input runs by default.

## Provenance
Independently authored HTML/CSS/JavaScript and CSS artwork for Motion Vault. Concept reference only: [ibelick / motion-primitives — dynamic toolbar](https://github.com/ibelick/motion-primitives/blob/main/components/core/toolbar-dynamic.tsx). No upstream implementation, artwork, dependencies or brand assets are copied. This study is not an upstream adaptation or a visual-parity claim.
