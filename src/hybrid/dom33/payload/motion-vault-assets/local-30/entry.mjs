// 校验错误微震颤警示
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime,runtimeDuration} from '../shared/runtime.eb7967a461d0.mjs';
export const reference={"id":30,"title":"校验错误微震颤警示","desc":"当必填项遗漏时，输入框轻轻左右摆动 3 次，边框短时泛红后恢复正常。","design_value":"以人类身体本能的否定信号提醒填写错误，比冷冰冰的红字报错更亲切。","avoid":"幅度严禁超过 6px，只能微摆，过大晃动会显得粗糙滑稽。","tech":"animation: shake 0.3s ease-in-out;","demo":"\u003cdiv class=\"legacy-canvas legacy-30\">\u003cspan>Open Studio · 本地邮箱校验演示\u003c/span>\u003c/div>","scene":"flow","uses":[{"scene":"journey","task":"recovery","placement":"校验失败的输入项","goal":"将错误定位到具体操作而非整屏警告"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"既有本地代码演示","source_url":null};
export function mount(host,options={}){return createRuntime(host,reference,options);}
export const duration=()=>runtimeDuration(reference);
