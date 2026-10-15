// 粒子散开与重新聚字
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime,runtimeDuration} from '../shared/runtime.eb7967a461d0.mjs';
export const reference={"id":"online-particles","key":"particles","title":"粒子散开与重新聚字","desc":"点状字形散成轻微漂移的粒子，再沿可追踪的路径回到同一字形。","design_value":"主题开场、实验性品牌视觉、短时等待展示。","avoid":"保留普通文本替代；不代表真实加载进度。","tech":"确定性点阵与SVG粒子插值；不依赖WebGPU。 作者教程以WebGPU实现文字消散与花瓣粒子。本例只研究字形与粒子的聚散关系，无花瓣、光效或原作着色器。","uses":[{"scene":"brand","task":"entrance","placement":"开场与品牌揭示","goal":"用聚散关系将氛围收束到文字"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"Codrops · Thibault Introvigne","source_url":"https://tympanus.net/codrops/2026/01/28/webgpu-gommage-effect-dissolving-msdf-text-into-dust-and-petals-with-three-js-tsl/","tags":["粒子","聚合","消散"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
export const duration=()=>runtimeDuration(reference);
