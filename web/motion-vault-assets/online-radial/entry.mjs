// 扇形快捷操作菜单
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-radial","key":"radial","title":"扇形快捷操作菜单","desc":"从中心按钮沿扇形依次展开少量操作，选中后收拢并给出反馈。","design_value":"画布工具、标注工具、少量常用操作。","avoid":"不替代大量或层级很深的菜单；名称要可见，键盘可遍历。","tech":"极坐标定位、错峰过渡、焦点与隐藏项管理。 官方页面公开描述扇形布局和错峰弹簧。付费示例源码未读取、未复制。","uses":[{"scene":"workspace","task":"context","placement":"画布附近的快捷工具","goal":"悬停展开局部操作，缩短视线与指针移动"}],"preview_mode":"click","source_kind":"independent_code","source_name":"Motion · Radial Menu","source_url":"https://motion.dev/examples/react-radial-menu","tags":["展开","扇形布局","键盘"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
