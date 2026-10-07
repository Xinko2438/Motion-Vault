// 等高线柔波演化
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-contours","key":"contours","title":"等高线柔波演化","desc":"密度一致的曲线群逐渐变形，产生有层次的地形感。","design_value":"品牌背景、空间和材质研究。","avoid":"避开正文主阅读区，保持线条低对比和低速。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 已读取作者源码中的多层线距、时间与波形设置。本例为原创SVG曲线群，不复用Three.js着色器。","uses":[{"scene":"brand","task":"atmosphere","placement":"空间或科技主题底纹","goal":"用连续等高线维持流动感但不抢主视觉"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"React Bits · Floating Lines","source_url":"https://reactbits.dev/backgrounds/floating-lines","tags":["等高线柔波演化"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
