// 多档停靠手势面板
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-sheet","key":"sheet","title":"多档停靠手势面板","desc":"拖动把手可停在摘要、半屏和展开三档；正文滚动与把手拖动分开。","design_value":"地图信息、移动端详情、列表辅助面板。","avoid":"把手拖拽有按钮替代；不要让内容滚动误触关闭。此处是组件内模拟。","tech":"指针位移映射高度、最近停靠点、独立内容滚动。 作者文档提供停靠点和活动停靠点。本页是独立手势模型，不包含系统手势或原生键盘适配。","uses":[{"scene":"workspace","task":"panels","placement":"移动端地图或资料详情","goal":"以停靠档位保持底层上下文可见"}],"preview_mode":"drag","source_kind":"independent_code","source_name":"Vaul · Snap Points","source_url":"https://vaul.emilkowal.ski/snap-points","tags":["拖拽","停靠","滚动"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
