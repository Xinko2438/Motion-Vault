// 百叶切片逐片翻面
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-blinds","key":"blinds","title":"百叶切片逐片翻面","desc":"画面分成竖向切片，逐片翻面完成一整幅画面的切换。","design_value":"作品展示、主题图过渡。","avoid":"片数适中，避免高频闪烁与破碎感。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 作者原文说明两套切片的轮换显隐。本例用3D翻面与原创图形现代化重写；非原jQuery宽度动画复制。","uses":[{"scene":"portfolio","task":"sequence","placement":"系列图像展示","goal":"通过切片转动完成整幅画面交接"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"Codrops · Rotating Billboard","source_url":"https://tympanus.net/codrops/2009/12/16/creating-a-rotating-billboard-system-with-jquery-and-css/comment-page-2/","tags":["百叶切片逐片翻面"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
