// 弹性曲线回弹
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime,runtimeDuration} from '../shared/runtime.eb7967a461d0.mjs';
export const reference={"id":"online-string","key":"string","title":"弹性曲线回弹","desc":"线条被拖离原位，松手后按阻尼逐渐恢复，附近线条保留更轻的响应。","design_value":"分区边界、创意导航、触控反馈研究。","avoid":"高频业务操作应收敛回弹时间；不用于精准数据曲线。","tech":"二次贝塞尔控制点、阻尼正弦与拖拽释放。 作者文章探索SVG弹性组件。本例单独研究曲线控制点牵引和回弹，不复制菜单或按钮。","uses":[{"scene":"brand","task":"hero","placement":"互动线性视觉","goal":"让张力与回弹回应一次直接操作"}],"preview_mode":"drag","source_kind":"independent_code","source_name":"Codrops · Elastic SVG Elements","source_url":"https://tympanus.net/codrops/2014/12/15/elastic-svg-elements/","tags":["牵引","弹性","衰减"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
export const duration=()=>runtimeDuration(reference);
