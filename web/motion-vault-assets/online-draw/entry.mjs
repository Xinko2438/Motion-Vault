// 线稿路径渐进绘制
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-draw","key":"draw","title":"线稿路径渐进绘制","desc":"让一条完整线稿按路径逐段出现，支持暂停和手动拖动进度，观察节奏。","design_value":"品牌图形入场、结构解释、简洁插图。","avoid":"线稿需要顺畅路径；不是文字书写识别，不用于伪造签名。","tech":"SVG stroke-dashoffset、路径归一化、可暂停时间轴；原创线稿。 官方文档解释描边长度的绘制控制。本页不用GSAP插件，以原生SVG实现。","uses":[{"scene":"brand","task":"identity","placement":"品牌线稿或签名出现","goal":"保留线条书写的先后节奏"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"GSAP · DrawSVG","source_url":"https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/","tags":["描边","播放","进度"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
