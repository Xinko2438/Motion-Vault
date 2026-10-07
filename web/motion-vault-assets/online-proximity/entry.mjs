// 文字笔画邻近响应
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-proximity","key":"proximity","title":"文字笔画邻近响应","desc":"距离越近的字笔画越饱满，邻字自然过渡。","design_value":"品牌标题、轻量文字探索。","avoid":"正文不使用；笔画厚度有上限，避免糊成一团。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 已读取作者VariableProximity源码的距离与轴插值实现。本例使用SVG笔画厚度替代外部可变字体；不是同一字体或源码复刻。","uses":[{"scene":"brand","task":"identity","placement":"可交互短标题","goal":"使邻近笔画随真实指针细微响应"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"React Bits · Variable Proximity","source_url":"https://reactbits.dev/text-animations/variable-proximity","tags":["文字笔画邻近响应"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
