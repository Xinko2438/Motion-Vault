// 链接旁实时图像浮现
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-linkimage","key":"linkimage","title":"链接旁实时图像浮现","desc":"标题保持固定，相关图像在指针旁出现并跟随。","design_value":"作品索引、编辑推荐、内容导航。","avoid":"移动端提供文字和明确点击入口，图像不能挡住目标。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 原文介绍链接悬停时显露缩略图。本例使用原创几何图和单个跟随层，不搬运原作照片。","uses":[{"scene":"portfolio","task":"discovery","placement":"文字作品目录","goal":"将项目名称与图像预览直接对应"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"Codrops · Image Reveal","source_url":"https://tympanus.net/codrops/2018/11/27/image-reveal-hover-effects/","tags":["链接旁实时图像浮现"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
