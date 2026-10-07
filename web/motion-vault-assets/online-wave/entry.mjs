// 距离波纹点阵
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-wave","key":"wave","title":"距离波纹点阵","desc":"波峰从起点向周围扩散，点阵按距离依次抬升，再回到原来的秩序。","design_value":"交互背景、品牌开场与触点反馈。","avoid":"维持低对比；避免在正文后反复运行。","tech":"按点到起点的距离计算波形、位移与大小。 官方文档提供网格、from与距离分配延迟。本例用解析波形实现点阵响应。","uses":[{"scene":"brand","task":"atmosphere","placement":"交互式品牌底纹","goal":"让点阵围绕真实指针形成局部反馈"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"GSAP · Staggers","source_url":"https://gsap.com/resources/getting-started/Staggers/","tags":["距离","波阵","延迟"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
