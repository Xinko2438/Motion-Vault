// 共享容器导航面板
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-nav","key":"nav","title":"共享容器导航面板","desc":"切换导航项时，内容在同一个容器内过渡，容器随内容调整宽高，不重复弹出窗口。","design_value":"产品官网、功能较多的桌面导航。","avoid":"同时支持点击与键盘；移出后稍作等待，避免跨越间隙时误关。","tech":"共享容器、不同内容尺寸、进入/退出意图和键盘返回。 官方文档公开子菜单、键盘导航与动画CSS变量。本例只模拟组件机制，不运行Radix。","uses":[{"scene":"workspace","task":"navigation","placement":"产品与资源主导航","goal":"用共享容器消除栏目切换的突变"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"Radix · Navigation Menu","source_url":"https://www.radix-ui.com/primitives/docs/components/navigation-menu","tags":["面板换页","尺寸过渡"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
