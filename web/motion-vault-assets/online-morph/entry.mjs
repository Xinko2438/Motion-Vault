// 连续轮廓形变
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime,runtimeDuration} from '../shared/runtime.eb7967a461d0.mjs';
export const reference={"id":"online-morph","key":"morph","title":"连续轮廓形变","desc":"一个轮廓连续变成另一个轮廓，而不是淡出一张图后再淡入另一张。","design_value":"品牌符号、形态研究、轻量的状态表达。","avoid":"只演示三种同采样轮廓的转换，不声称支持任意复杂SVG形变。","tech":"等角采样、顶点插值、平滑封闭曲线；动画可中断。 来源说明SVG形状转换。本页使用自写采样与插值，不加载或复制插件。","uses":[{"scene":"brand","task":"identity","placement":"响应式动态图形","goal":"在不同轮廓之间保持形态连续"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"GSAP · MorphSVG","source_url":"https://gsap.com/docs/v3/Plugins/MorphSVGPlugin/","tags":["路径插值","连续形态"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
export const duration=()=>runtimeDuration(reference);
