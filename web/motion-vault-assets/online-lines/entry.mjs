// 逐行遮罩文字入场
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-lines","key":"lines","title":"逐行遮罩文字入场","desc":"整行文字从裁切窗口中滑入，保留每行的完整阅读节奏。","design_value":"编辑型标题、品牌开场。","avoid":"不对长正文循环播放，不让用户读到一半被切走。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 官方文档说明分组错峰延迟。本例独立组合逐行裁切和平移，不引用外部文本或字体。","uses":[{"scene":"editorial","task":"typesetting","placement":"大标题与章节开头","goal":"用行级遮罩保持排版边界与阅读顺序"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"Motion · Stagger","source_url":"https://motion.dev/docs/stagger","tags":["逐行遮罩文字入场"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
