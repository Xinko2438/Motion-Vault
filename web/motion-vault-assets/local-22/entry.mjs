// 3D 悬浮视差与表面反光
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":22,"title":"3D 悬浮视差与表面反光","desc":"卡片根据鼠标光标产生立体微倾斜，表面滑过一道极柔和的环境高光。","design_value":"打造如拿在手里的高端物理实体晶片般的交互溢价。","avoid":"倾斜角度严格控制在 ±8° 以内，过大角度会导致文字模糊变形。","tech":"transform: perspective(800px) rotateX(...) rotateY(...);","demo":"\u003cdiv class=\"tilt-box\">实体晶片质感\u003c/div>","scene":"brand","uses":[{"scene":"product","task":"detail","placement":"产品重点展示卡","goal":"以深度与反光建立表面质感"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"既有本地代码演示","source_url":null};
export function mount(host,options={}){return createRuntime(host,reference,options);}
