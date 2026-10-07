// 快门遮罩圆形扩散
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":36,"title":"快门遮罩圆形扩散","desc":"点击后从鼠标点击处向外炸开一个圆形遮罩，完全展露下一层场景。","design_value":"以强烈的几何仪式感切入新作品或大案例，视觉冲击力极高。","avoid":"扩散时间不要超过 0.6 秒，否则会产生拖沓感。","tech":"clip-path: circle(0% at x y) -> circle(150%);","demo":"\u003cdiv style=\"width:160px; height:80px; border-radius:8px; background:linear-gradient(135deg,#0ea5e9,#2563eb); display:grid; place-items:center; font-size:11px; font-weight:700; color:#fff;\">圆形扩散快门\u003c/div>","scene":"creative","uses":[{"scene":"brand","task":"entrance","placement":"开场进入下一幕","goal":"从明确的视觉起点揭示新场景"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"既有本地代码演示","source_url":null};
export function mount(host,options={}){return createRuntime(host,reference,options);}
