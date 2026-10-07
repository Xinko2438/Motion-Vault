// 环形分区依次展开
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-donut","key":"donut","title":"环形分区依次展开","desc":"各扇区按固定顺序生长，角度与总占比保持一致。","design_value":"占比图、统计概览。","avoid":"演示数据明确标注，不把过渡中间值当作新统计。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 官方弧生成器文档说明起止角和内外半径。本例独立计算SVG环形扇区，不打包D3。","uses":[{"scene":"editorial","task":"data","placement":"组成比例的解释","goal":"按分区次序建立比例整体"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"D3 · Arc","source_url":"https://d3js.org/d3-shape/arc","tags":["环形分区依次展开"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
