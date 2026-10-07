// 段尾下一章隐喻浮现
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":12,"title":"段尾下一章隐喻浮现","desc":"读完当前长段末尾时，底部边缘露出下一章的一小角标题并带有向下微指示。","design_value":"给读者明确的“顺畅继续”提示，让翻页变成一件自然而然的动作。","avoid":"不能把下一章正文一下子全堆出来，只露标题。","tech":"opacity: clamp(0, scrollProgress, 1); transform: translateY(0);","demo":"\u003cdiv style=\"width:200px; padding:8px 12px; border:1px dashed var(--card-border); border-radius:6px; font-size:11px; color:var(--text-sub); display:flex; justify-content:space-between;\">\u003cspan>下一章 · 交付与机会\u003c/span>\u003cspan>↓\u003c/span>\u003c/div>","scene":"reading","uses":[{"scene":"editorial","task":"chapter","placement":"文章结尾","goal":"提供自然衔接下一章的提示"}],"preview_mode":"scroll","source_kind":"independent_code","source_name":"既有本地代码演示","source_url":null};
export function mount(host,options={}){return createRuntime(host,reference,options);}
