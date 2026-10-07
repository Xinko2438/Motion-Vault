// 粒点排斥与归位
// Runnable entry backed by the shared local engine; see IMPLEMENTATION.md for the exact core locations.
import {createRuntime} from '../shared/runtime.31fd3f9a83f9.mjs';
export const reference={"id":"online-repel","key":"repel","title":"粒点排斥与归位","desc":"粒点从指针附近退开，离开后回到原来的位置。","design_value":"实验背景、交互海报。","avoid":"限制粒子数量和位移幅度，不妨碍内容阅读。","tech":"原生 HTML / CSS / SVG / Pointer Events；独立实现。 已读取作者源码中的磁场半径与指针位置处理。本例为二维规则点阵的独立避让模型，不复刻Three.js三维粒子。","uses":[{"scene":"brand","task":"atmosphere","placement":"轻量空间粒点背景","goal":"在局部位移后恢复有序构图"}],"preview_mode":"pointer","source_kind":"independent_code","source_name":"React Bits · Antigravity","source_url":"https://reactbits.dev/animations/antigravity","tags":["粒点排斥与归位"]};
export function mount(host,options={}){return createRuntime(host,reference,options);}
