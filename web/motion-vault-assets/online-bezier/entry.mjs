// 贝塞尔控制柄编辑
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-bezier","key":"bezier","title":"贝塞尔控制柄编辑","desc":"拖动控制点时，曲线切线与弯曲关系同步改变。","design_value":"矢量编辑、动效曲线理解。","avoid":"必须保留控制柄、端点与连线的区别。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 MDN说明三次贝塞尔的两个控制点与端点。本例是围绕该规范独立设计的可操作曲线编辑示意。","uses":[{"scene":"workspace","task":"precision","placement":"曲线与运动路径编辑","goal":"在拖拽控制点时给出连续几何反馈"}],"preview_mode":"drag","source_kind":"independent_code","source_name":"MDN · SVG Paths","source_url":"https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/d","tags":["贝塞尔控制柄编辑"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
