// 贴纸边角拖拽剥离
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-peel","key":"peel","title":"贴纸边角拖拽剥离","desc":"沿拖拽方向剥开贴纸，反面和阴影随揭开幅度变化。","design_value":"卡片揭晓、印刷与包装展示。","avoid":"需要明显的可拖拽角标及键盘替代。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 已读取作者源码中的拖拽、边界、旋转及剥离配置。本例独立实现二维斜向剥离与背面，不复用GSAP源码和外部贴图。","uses":[{"scene":"product","task":"detail","placement":"标签、包装或贴纸细节","goal":"通过翻起边缘展示表层与背面的关系"}],"preview_mode":"drag","source_kind":"independent_code","source_name":"React Bits · Sticker Peel","source_url":"https://reactbits.dev/animations/sticker-peel","tags":["贴纸边角拖拽剥离"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
