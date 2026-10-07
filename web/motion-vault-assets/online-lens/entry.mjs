// 跟随式局部放大镜
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-lens","key":"lens","title":"跟随式局部放大镜","desc":"整体图像保持不动，圆形镜片跟随指针，只放大所指细节。","design_value":"产品材质、图稿校对、地图细节浏览。","avoid":"保留完整图像与缩放替代入口；触屏支持拖动。","tech":"SVG圆形裁切、坐标映射和2.2倍局部缩放。 作者文档包含引导镜片和局部放大。这里为独立SVG圆形镜片，不运行React组件。","uses":[{"scene":"product","task":"detail","placement":"工艺与纹理查看","goal":"保持全貌的同时放大局部信息"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"react-image-magnify","source_url":"https://github.com/ethanselzer/react-image-magnify","tags":["局部","放大","跟随"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
