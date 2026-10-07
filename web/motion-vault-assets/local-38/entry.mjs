// 流体胶囊弹性拉伸
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":38,"title":"流体胶囊弹性拉伸","desc":"药丸形状在状态变更时带有真实的表面张力拉长变形，犹如一滴水银。","design_value":"营造有生命力的有机交互（Organic UI），让控件具有生物弹性手感。","avoid":"变形幅度不能失控变形成怪异多边形。","tech":"SVG feGaussianBlur + feColorMatrix 粘滞融合滤镜","demo":"\u003cdiv style=\"width:110px; height:30px; border-radius:999px; background:#ef4444; color:#fff; display:grid; place-items:center; font-size:11px; font-weight:700; box-shadow:0 0 15px rgba(239,68,68,0.4);\">灵动胶囊\u003c/div>","scene":"creative","uses":[{"scene":"brand","task":"identity","placement":"动态图形标识","goal":"用连接和分离表现组成关系"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"既有本地代码演示","source_url":null};
export function mount(host,options={}){return createRuntime(host,reference,options);}
