// 聚光遮罩双层显露
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-spot","key":"spot","title":"聚光遮罩双层显露","desc":"指针移动一个局部遮罩，让两种画面在同一位置衔接。","design_value":"视觉探索、品牌主视觉。","avoid":"不能把关键信息只藏在鼠标遮罩内。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 作者教程描述双层内容与跟随指针的CSS遮罩。本示例用原创图案和圆形裁切独立实现，不搬运原作。","uses":[{"scene":"brand","task":"hero","placement":"双层主视觉","goal":"以局部照明引导对比探索"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"Codrops · Michelle Barker","source_url":"https://tympanus.net/codrops/2021/05/04/dynamic-css-masks-with-custom-properties-and-gsap/","tags":["聚光遮罩双层显露"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
