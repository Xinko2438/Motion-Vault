// 快捷键组合触发确认
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":7,"title":"快捷键组合触发确认","desc":"敲下快捷键时，角落亮起微型徽章并在 0.5s 内淡出。","design_value":"专为键盘操作设计，无需移开视线找鼠标按钮即可确信已生效。","avoid":"严禁在屏幕中心遮挡大面积输入光标。","tech":"transform: scale(0.9)->scale(1); opacity: 1->0; transition: 0.4s;","demo":"\u003cdiv style=\"padding:6px 12px; border-radius:6px; background:var(--input-bg); border:1px solid var(--card-border); font-size:11px; font-family:monospace; color:var(--text-sub);\">⌘ + S · 已保存\u003c/div>","scene":"workplace","uses":[{"scene":"journey","task":"status","placement":"键盘操作反馈","goal":"在视线附近确认动作而不遮挡内容"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"既有本地代码演示","source_url":null};
export function mount(host,options={}){return createRuntime(host,reference,options);}
