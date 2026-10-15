// 邻近放大导航
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime,runtimeDuration} from '../shared/runtime.eb7967a461d0.mjs';
export const reference={"id":"online-dock","key":"dock","title":"邻近放大导航","desc":"鼠标靠近一个图标时，相邻图标一起按距离响应，保持连续的空间关系。","design_value":"功能入口较少的创作工具与个人工作台。","avoid":"不适合大量菜单；触屏保持直接点击；减少动态模式不放大。","tech":"距离衰减和阻尼插值；原创线性图标；支持方向键。 已核实作者仓库文档的放大倍率、距离与弹簧参数；官网本轮返回403。","uses":[{"scene":"workspace","task":"navigation","placement":"少量常驻工具入口","goal":"以相邻放大反馈清楚标识当前目标"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"Motion-Primitives · Dock","source_url":"https://github.com/ibelick/motion-primitives/blob/main/app/docs/dock/page.mdx","tags":["距离感应","阻尼"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
export const duration=()=>runtimeDuration(reference);
