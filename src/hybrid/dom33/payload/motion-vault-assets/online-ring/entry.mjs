// 三维环形画廊
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime,runtimeDuration} from '../shared/runtime.eb7967a461d0.mjs';
export const reference={"id":"online-ring","key":"ring","title":"三维环形画廊","desc":"卡片沿同一圆环排列，旋转时前后层次和遮挡持续变化。","design_value":"精选作品、实体产品系列、展览浏览。","avoid":"不能代替普通列表；六张以内更清楚。","tech":"CSS perspective / preserve-3d；六张本地原创影像卡片。 原文是滚动驱动的三维轮播；这里改为水平旋转和可控时间轴，不复刻页面滚动编排。","uses":[{"scene":"product","task":"showroom","placement":"系列产品陈列","goal":"围绕同一观察中心展示不同对象"}],"preview_mode":"drag","source_kind":"independent_code","source_name":"Codrops · Manoela Ilic","source_url":"https://tympanus.net/codrops/2025/05/07/on-scroll-3d-carousel/","tags":["环绕","景深","旋转"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
export const duration=()=>runtimeDuration(reference);
