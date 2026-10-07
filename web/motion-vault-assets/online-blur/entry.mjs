// 逐词模糊显影
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-blur","key":"blur","title":"逐词模糊显影","desc":"一句话从轻微模糊中逐词清晰出现，行高不变，读者能顺着节奏读完。","design_value":"欢迎页、介绍文案、章节开场。","avoid":"不能让主体正文长期模糊；减少动态模式直接显示全文。","tech":"独立分词、opacity、blur与微小位移。 公开文档提供按词动画与fade-in-blur预设。本例独立实现中文词组分段，不使用组件源码。","uses":[{"scene":"editorial","task":"typesetting","placement":"短句或章节题词","goal":"通过清晰度变化建立阅读先后"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"Motion-Primitives · Text Effect","source_url":"https://motion-primitives.com/docs/text-effect","tags":["文字","模糊","递进"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
