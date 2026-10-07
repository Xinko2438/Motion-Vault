// 像素网格错峰转场
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-pixel","key":"pixel","title":"像素网格错峰转场","desc":"像素格按不同延迟覆盖画面，在完全遮住后切换内容，再依次揭开。","design_value":"创意作品切换、章节开场、风格化媒体页。","avoid":"不应用于高频操作；格子数量和动画层数受控；避免闪烁。","tech":"12×8单元、确定性延迟、两阶段遮罩；允许连续操作但不堆积动画。 原文说明像素网格与不同出入场时序。本页使用原创场景和独立遮罩实现。","uses":[{"scene":"portfolio","task":"handoff","placement":"项目封面切换","goal":"以错峰遮罩完成有秩序的视觉交接"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"Codrops · Pixel Transitions","source_url":"https://tympanus.net/codrops/2023/04/05/ideas-for-pixel-page-transitions/","tags":["网格","覆盖","揭示"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
