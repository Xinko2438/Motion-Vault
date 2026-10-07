// 二维色域实时拾色
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-color","key":"color","title":"二维色域实时拾色","desc":"横纵两个轴分别控制饱和度和亮度，选点与色值联动。","design_value":"设计工具、主题编辑。","avoid":"键盘必须能调节两个通道；不只靠颜色表达状态。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 官方文档说明二维色域与两个通道的调节。本例独立实现HSB色域和可读色值，不使用React Spectrum。","uses":[{"scene":"workspace","task":"precision","placement":"色彩与材质编辑","goal":"将二维位置和实际颜色一一对应"}],"preview_mode":"drag","source_kind":"independent_code","source_name":"Adobe · ColorArea","source_url":"https://react-spectrum.adobe.com/ColorArea","tags":["二维色域实时拾色"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
