// 链路信号分支流动
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-network","key":"network","title":"链路信号分支流动","desc":"多个信号沿固定链路前进，在节点处分支、汇合。","design_value":"数据流程、服务链路、信息流说明。","avoid":"仅示意传输，不伪装实时系统数据。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 规范提供沿路径距离取点方法。本例围绕多分支拓扑独立设计，没有声称采集某个生产系统。","uses":[{"scene":"product","task":"feature","placement":"协作与数据流讲解","goal":"通过线路传播解释输入到输出的关系"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"MDN · SVG Path Geometry","source_url":"https://developer.mozilla.org/en-US/docs/Web/API/SVGGeometryElement/getPointAtLength","tags":["链路信号分支流动"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
