// 旋钮刻度吸附
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-dial","key":"dial","title":"旋钮刻度吸附","desc":"旋钮沿弧线转动，数值与刻度同步更新，松手后落在最近的整数刻度。","design_value":"音量、强度、时间和创作工具参数。","avoid":"同时提供键盘及滑杆入口；旋转范围不暗示无限取值。","tech":"Pointer Events、角度映射、边界与整数吸附。 官方文档支持rotation模式、边界与拖拽。本例独立计算角度，不调用插件。","uses":[{"scene":"workspace","task":"precision","placement":"音视频或材质参数","goal":"在连续调节与明确刻度之间建立手感"}],"preview_mode":"drag","source_kind":"independent_code","source_name":"GSAP · Draggable","source_url":"https://gsap.com/docs/v3/Plugins/Draggable/","tags":["旋转","刻度","吸附"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
