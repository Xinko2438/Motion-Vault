// 鼠标悬停静音动效预览
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":16,"title":"鼠标悬停静音动效预览","desc":"鼠标划过卡片缩略图，静态封面立刻无缝溶解为静音循环切片，移开即停。","design_value":"不点进页面也能在 2 秒内摸清动效的手感与全貌，极大提高浏览效率。","avoid":"严禁发出任何声音！默认必须全静音（muted）。","tech":"hover video { opacity: 1; } hover img { opacity: 0; }","demo":"\u003cdiv style=\"width:160px; height:80px; border-radius:8px; background:var(--input-bg); border:1px solid var(--card-border); display:grid; place-items:center; font-size:11px; color:#2563eb;\">悬停自动静音循环\u003c/div>","scene":"media","uses":[{"scene":"editorial","task":"media","placement":"视频资料网格","goal":"不离开目录即可判断片段内容"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"既有本地代码演示","source_url":null};
export function mount(host,options={}){return createRuntime(host,reference,options);}
