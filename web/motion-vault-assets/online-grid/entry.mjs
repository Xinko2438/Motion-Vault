// 二维拖拽画廊
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-grid","key":"grid","title":"二维拖拽画廊","desc":"整个浏览空间可以二维移动，松手后逐渐停下。不同于小范围的鼠标视差。","design_value":"作品集、视觉资料探索、情绪板。","avoid":"必须保留搜索和线性列表入口；触屏拖动区域不要覆盖整个页面。","tech":"Pointer Events、循环坐标、速度衰减；原创矢量图。 原文描述无缝平铺、拖拽与视差。本演示实现二维循环和惯性，不复刻原站视差与入场。","uses":[{"scene":"portfolio","task":"overview","placement":"作品集总览","goal":"在二维空间探索一组视觉作品"}],"preview_mode":"drag","source_kind":"independent_code","source_name":"Codrops · Jorge Toloza","source_url":"https://tympanus.net/codrops/2025/06/11/building-an-infinite-parallax-grid-with-gsap-and-seamless-tiling/","tags":["拖拽","惯性","循环"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
