// 卡片抽离与归位
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-stack","key":"stack","title":"卡片抽离与归位","desc":"顶部卡片抽离并转向，后方卡片顺位浮上来，离开的卡片重新落入底部。","design_value":"一组精选作品、逐项浏览、轻量内容挑选。","avoid":"不能用动画暗示已经收藏或删除；演示不会修改筛选记录。","tech":"CSS独立卡片位姿与时间轴；无业务状态变更。 作者演示卡叠的不同移除方式。本例为抽离后回到底部的独立循环，不映射接受/拒绝操作。","uses":[{"scene":"portfolio","task":"sequence","placement":"系列作品卡组","goal":"抽出当前内容后仍保留集合的空间关系"}],"preview_mode":"auto","source_kind":"independent_code","source_name":"Codrops · Card Stack Effects","source_url":"https://tympanus.net/Development/CardStackEffects/","tags":["卡叠","抽取","归位"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
