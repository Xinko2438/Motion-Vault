// 磁性文字光晕横扫
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":25,"title":"磁性文字光晕横扫","desc":"大标题文字本体为低饱和度冷灰，一道柔和的纯白流光如水波一般缓缓横扫而过。","design_value":"用纯粹的光影美感替代一切廉价插图装饰，突出品牌宣言。","avoid":"扫描周期控制在 4~6 秒一次，太快会让人眩晕。","tech":"background: linear-gradient(110deg, #64748b 35%, #fff 50%, #64748b 65%); -webkit-background-clip: text;","demo":"\u003cdiv class=\"shimmer-text\">LIGHT SHIMMER\u003c/div>","scene":"brand","uses":[{"scene":"brand","task":"identity","placement":"品牌标题","goal":"用一次受控扫光强调文字材质"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"既有本地代码演示","source_url":null};
export function mount(host,options={}){return createRuntime(host,reference,options);}
