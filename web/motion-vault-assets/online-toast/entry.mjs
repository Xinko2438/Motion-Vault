// 可展开通知堆叠
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime,runtimeDuration} from '../shared/runtime.eb7967a461d0.mjs';
export const reference={"id":"online-toast","key":"toast","title":"可展开通知堆叠","desc":"几条反馈默认叠放，悬停或点击可展开；每条都能独立撤销而不是刷屏。","design_value":"批量保存、导出队列、非阻断式操作反馈。","avoid":"重要错误不能只靠短暂通知；此示例不会后台上传或处理真实文件。","tech":"堆叠层级、展开布局、独立撤销状态；只保留最多三条。 官网提供通知类型、展开和可见数量控制。本例不用Sonner，不自动消失以便评审。","uses":[{"scene":"journey","task":"status","placement":"后台任务反馈","goal":"压缩次要通知并按需展开"}],"preview_mode":"click","source_kind":"independent_code","source_name":"Sonner","source_url":"https://sonner.emilkowal.ski/","tags":["堆叠","展开","撤销"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
export const duration=()=>runtimeDuration(reference);
