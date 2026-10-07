// 数据滚动轮盘跳动
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":11,"title":"数据滚动轮盘跳动","desc":"汇报统计结果时（如群消息数 2,328 条），数字位像轮盘转动平稳停在终点。","design_value":"强化量化数据的权威感与出炉真实感，让枯燥数字成为视觉焦点。","avoid":"数字必须使用等宽字体（tabular-nums），否则跳动时会引起整行抖动。","tech":"font-variant-numeric: tabular-nums; translateY 序列位移","demo":"\u003cdiv style=\"font-size:24px; font-weight:800; font-variant-numeric:tabular-nums; color:#2563eb; font-family:monospace;\">2,328 \u003cspan style=\"font-size:12px; color:var(--text-muted); font-weight:400;\">条记录已核对\u003c/span>\u003c/div>","scene":"reading","uses":[{"scene":"editorial","task":"data","placement":"统计摘要","goal":"用数位变化强调数据到达终值"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"既有本地代码演示","source_url":null};
export function mount(host,options={}){return createRuntime(host,reference,options);}
