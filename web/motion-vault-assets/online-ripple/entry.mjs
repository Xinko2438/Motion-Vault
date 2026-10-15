// 水波折射切图
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime,runtimeDuration} from '../shared/runtime.eb7967a461d0.mjs';
export const reference={"id":"online-ripple","key":"ripple","title":"水波折射切图","desc":"两幅画面交替时产生短暂水波折射，波纹缓慢消退后恢复清晰。","design_value":"作品封面、品牌视觉和摄影故事切换。","avoid":"文字与重要控件放在滤镜外；不要给整页持续加滤镜。","tech":"SVG turbulence / displacement轻量近似；不是原作WebGL着色器。 原文通过WebGL位移纹理切换图片。本例独立用SVG滤镜近似波动，不宣称物理水波或原作还原。","uses":[{"scene":"portfolio","task":"sequence","placement":"摄影或视觉作品切换","goal":"利用折射感建立图像之间的过渡"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"Codrops · Robin Delaporte","source_url":"https://tympanus.net/codrops/2018/04/10/webgl-distortion-hover-effects/","tags":["折射","扭曲","交融"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
export const duration=()=>runtimeDuration(reference);
