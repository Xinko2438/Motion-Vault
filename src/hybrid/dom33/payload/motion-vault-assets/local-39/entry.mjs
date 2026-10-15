// 字符三维错落翻转
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime,runtimeDuration} from '../shared/runtime.eb7967a461d0.mjs';
export const reference={"id":39,"title":"字符三维错落翻转","desc":"进入视口时每个字母独立拆开，带有 0.03s 微弱时延从三维下方翻转归位。","design_value":"诗意、优雅的排版进场，为重要引言或产品名称注入灵魂。","avoid":"严禁在大段长句使用，只适用于 2~4 个单词的超大展示字。","tech":"transform: rotateX(90deg) -> rotateX(0deg); stagger: 0.03s;","demo":"\u003cdiv style=\"font-size:20px; font-weight:800; color:#2563eb; letter-spacing:0.08em;\">MOTION\u003c/div>","scene":"creative","uses":[{"scene":"brand","task":"identity","placement":"首屏标题入场","goal":"通过字符错峰建立文字出现的节奏"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"既有本地代码演示","source_url":null};
export function mount(host,options={}){return createRuntime(host,reference,options);}
export const duration=()=>runtimeDuration(reference);
