// 圆周文字环流
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-orbit","key":"orbit","title":"圆周文字环流","desc":"字形沿圆周排列，两层文字以不同速度旋转，中心标题保持稳定。","design_value":"活动标识、品牌介绍、专辑与海报式入口。","avoid":"重要句子不能只藏在旋转圆环内。","tech":"SVG textPath、同心路径与反向旋转。 作者文章探索圆形SVG文字和缩放动画。本例为双环旋转，没有复刻原作入场。","uses":[{"scene":"brand","task":"identity","placement":"活动标识与环形排字","goal":"在环绕运动中保持中心标识稳定"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"Codrops · Manoela Ilic","source_url":"https://tympanus.net/codrops/2021/03/03/circular-svg-text-animation/","tags":["环形排版","旋转"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
