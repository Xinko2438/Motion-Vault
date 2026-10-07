// 按住蓄力与取消
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-hold","key":"hold","title":"按住蓄力与取消","desc":"按住时积累进度，松开立即停止；完成后明确反馈。","design_value":"需要有意确认的轻量操作。","avoid":"不能作为付款或危险操作的唯一保护。此处不执行真实动作。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 规范说明按压期间事件捕获。本例独立设计长按进度与取消状态机，仅改变演示反馈。","uses":[{"scene":"journey","task":"recovery","placement":"需要明确意图的操作","goal":"通过持续按压进度给出可取消的确认过程"}],"preview_mode":"click","source_kind":"independent_code","source_name":"MDN · Pointer Capture","source_url":"https://developer.mozilla.org/en-US/docs/Web/API/Element/setPointerCapture","tags":["按住蓄力与取消"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
