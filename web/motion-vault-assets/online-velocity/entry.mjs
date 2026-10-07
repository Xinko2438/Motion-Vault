// 速度感应弹性光标
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-velocity","key":"velocity","title":"速度感应弹性光标","desc":"光标随速度改变长宽比，并在停下后收回。","design_value":"轻量创意交互、局部装饰。","avoid":"不替代系统光标，不覆盖真实可点击区域。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 官方示例公开说明速度映射与弹簧平滑。这里独立编写椭圆伸缩，不使用其付费源码或图片。","uses":[{"scene":"brand","task":"hero","placement":"鼠标导向的展示页","goal":"用速度相关形变增加指针的材质感"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"Motion · Cursor velocity","source_url":"https://motion.dev/examples/react-cursor-hover-follow","tags":["速度感应弹性光标"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
