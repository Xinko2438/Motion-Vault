// 侧滑显露上下文操作
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-swipe","key":"swipe","title":"侧滑显露上下文操作","desc":"侧滑进度决定隐藏操作区的显露，松开后吸附到开或关。","design_value":"消息列表、任务列表。","avoid":"不执行真实删除；动作需要明确标签与可点击替代。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 已核实官方公开的侧滑进度说明。本例独立实现一条演示记录的侧滑吸附，不使用付费源码。","uses":[{"scene":"workspace","task":"context","placement":"移动端列表辅助操作","goal":"按需显露操作而不占满行内空间"}],"preview_mode":"drag","source_kind":"independent_code","source_name":"Motion · Swipe Actions","source_url":"https://motion.dev/examples/react-swipe-actions","tags":["侧滑显露上下文操作"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
