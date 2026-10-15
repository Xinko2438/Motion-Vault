// 书页双面翻阅
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime,runtimeDuration} from '../shared/runtime.eb7967a461d0.mjs';
export const reference={"id":"online-book","key":"book","title":"书页双面翻阅","desc":"书页围绕中缝翻转，正反两面在转动时自然交接，背后页面逐步露出。","design_value":"作品册、电子画册和小篇幅故事。","avoid":"保留普通翻页入口；本演示只展示刚性页面，不模拟软纸卷曲。","tech":"CSS 3D、backface-visibility与独立正反页。 作者库支持软硬页和双面翻阅。本例为独立硬页铰链演示，不使用原库，不声称有软纸物理。","uses":[{"scene":"editorial","task":"chapter","placement":"电子刊物与出版物","goal":"用双面纸页解释前后页关系"}],"preview_mode":"drag","source_kind":"independent_code","source_name":"StPageFlip · Nodlik","source_url":"https://github.com/Nodlik/StPageFlip","tags":["翻页","双面","书脊"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
export const duration=()=>runtimeDuration(reference);
