// 数据切换连续过渡
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-chart","key":"chart","title":"数据切换连续过渡","desc":"在两组演示数据间切换，柱体、数值与折线连续变化，类别位置保持稳定。","design_value":"分析面板、比较报告、数据筛选后的状态更新。","avoid":"不混淆类别与刻度；演示数据不代表真实业务。","tech":"固定刻度的SVG柱图、折线与数值插值。 官方文档说明属性过渡和自定义插值。本例为原创固定数据图表，未使用D3代码。","uses":[{"scene":"editorial","task":"data","placement":"同指标不同时间切换","goal":"保留图形对象对应关系便于比较"}],"preview_mode":"click","source_kind":"independent_code","source_name":"D3 · Transition / Interpolate","source_url":"https://d3js.org/d3-transition/modifying","tags":["数据","插值","比较"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
