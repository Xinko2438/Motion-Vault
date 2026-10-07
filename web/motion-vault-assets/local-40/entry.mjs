// 全景重力视差空间
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":40,"title":"全景重力视差空间","desc":"鼠标在全景空间游走时，周围散落的卡片根据距离中心远近产生多维倾角漂浮。","design_value":"展示海量素材库、作品集或品牌宇宙的全景探索体验。","avoid":"必须限制移动边界，不能让卡片漂出屏幕可见范围之外。","tech":"requestAnimationFrame + 惯性插值 lerp","demo":"\u003cdiv style=\"width:150px; height:70px; border-radius:8px; background:radial-gradient(circle,#1e293b,#090a0d); display:grid; place-items:center; font-size:10px; color:#94a3b8; border:1px dashed var(--card-border);\">无界空间\u003c/div>","scene":"creative","uses":[{"scene":"brand","task":"hero","placement":"交互主视觉","goal":"用不同深度层的响应建立空间层次"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"既有本地代码演示","source_url":null};
export function mount(host,options={}){return createRuntime(host,reference,options);}
