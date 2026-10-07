// 打字停顿与回删
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-typewriter","key":"typewriter","title":"打字停顿与回删","desc":"以短句为单位输入、停留和回删，光标位置始终跟随文本末尾。","design_value":"短提示、输入示例。","avoid":"不使用长段落和过快闪烁，完整文本有静态替代。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 作者组件入口已核实；输入、删除与光标的示例在官方目录列出。本预览为独立的短句状态机，不复制实现。","uses":[{"scene":"brand","task":"identity","placement":"短循环品牌语句","goal":"用停顿与回删划清词组之间的节奏"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"React Bits · Text Type","source_url":"https://reactbits.dev/text-animations/text-type","tags":["打字停顿与回删"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
