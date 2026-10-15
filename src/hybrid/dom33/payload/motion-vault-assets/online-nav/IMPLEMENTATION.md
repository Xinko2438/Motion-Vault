# 共享容器导航面板 · 实现定位

## 可运行入口

同目录 index.html；需要本地HTTP服务。entry.mjs 导出 mount(host, options)，返回 dispose() / paint(phase)。本包使用共享引擎，不以复制60份框架作为独立化。

```js
import {mount} from './entry.mjs';
const effect=mount(document.getElementById('preview'),{playbackRate:1});
// 卸载组件或隐藏后：
effect.dispose();
```

## 维护入口

实际维护 src/hybrid/modern-engine.js、src/hybrid/legacy-engine.js、src/hybrid/effect-styles.css 与 runtime-adapter.js；修改后运行 node scripts/build-hybrid.mjs build，再生成同版本预览并验收。共享的内容寻址 runtime 文件是构建产物，不应直接修改。当前源码目录是唯一修改入口。

## 核心源码摘录与原始定位

以下是准确摘录，供定位，不冒称这些片段单独即可运行。完整执行路径为 entry.mjs → shared/runtime.eb7967a461d0.mjs；布局样式在 shared/runtime.88444c38f1d6.css。

### src/hybrid/modern-engine.js:46-46

```js
 case'nav':html=`<div class="nav-demo"><nav class="nav-head" aria-label="示例产品导航">${['产品','资源','关于'].map((t,i)=>`<button data-menu="${i}" aria-expanded="${i===0}">${t} ⌄</button>`).join('')}</nav><div class="nav-panel"><div class="nav-content">${[['资料整理','为内容找到位置'],['编辑工作台','把想法变为作品'],['媒体浏览','观看与筛选'],['协作空间','让信息保持同步']].map(r=>`<button><strong>${r[0]}</strong><small>${r[1]}</small></button>`).join('')}</div></div></div><span class="nav-label">工作与创作的日常。</span><p class="nav-status" data-role="result">切换栏目，观察容器尺寸</p>`;break;
```

### src/hybrid/modern-engine.js:169-178

```js
 if(key==='nav'){
  const panel=q('.nav-panel'),content=q('.nav-content'),buttons=all('[data-menu]'),nav=q('.nav-demo');let active=0,timer=0;
  const groups=[[['资料整理','为内容找到位置'],['编辑工作台','把想法变为作品'],['媒体浏览','观看与筛选'],['协作空间','让信息保持同步']],[['使用指南','从一个小任务开始'],['交互笔记','记录每次发现'],['更新日志','最近的变化'],['案例研究','观察实际使用'],['组件说明','理解边界'],['社区交流','交换经验']],[['关于工作室','把日常做得更好'],['联系我们','分享问题和想法']]];
  function set(i){L.clear(timer);const prev=active;active=i;buttons.forEach((b,j)=>b.setAttribute('aria-expanded',String(i===j)));panel.hidden=i<0;root.dataset.menu=String(i);if(i<0)return;const max=nav.clientWidth;panel.style.width=(i===2?Math.min(max,300):max)+'px';panel.style.height=[178,230,111][i]+'px';content.innerHTML=groups[i].map(r=>`<button><strong>${r[0]}</strong><small>${r[1]}</small></button>`).join('');if(prev!==i)L.anim(content,[{opacity:0,transform:`translateX(${i>prev?15:-15}px)`},{opacity:1,transform:'translateX(0)'}],{duration:240,easing:'ease-out'});}
  root.__receivePoint=e=>{const i=buttons.findIndex(b=>{const r=b.getBoundingClientRect();return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom});if(i>=0)set(i);};L.cleaners.push(()=>delete root.__receivePoint);buttons.forEach((b,i)=>{on(b,'pointerenter',e=>{if(e.pointerType==='mouse')set(i);});on(b,'click',()=>set(i));on(b,'keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();let j=(i+(e.key==='ArrowRight'?1:-1)+3)%3;buttons[j].focus();set(j);}else if(e.key==='ArrowDown'){e.preventDefault();set(i);content.querySelector('button')?.focus();}});});on(nav,'pointerleave',()=>{L.clear(timer);timer=L.later(()=>{if(!nav.contains(document.activeElement))set(-1);},250);});on(panel,'pointerenter',()=>L.clear(timer));on(nav,'focusout',e=>{if(!nav.contains(e.relatedTarget)){L.clear(timer);timer=L.later(()=>set(-1),250);}});on(content,'click',e=>{let b=e.target.closest('button');if(b){q('[data-role=result]').textContent='已选择“'+b.querySelector('strong').textContent+'”，仅演示';set(-1);buttons[0].focus();}});on(nav,'keydown',e=>{if(e.key==='Escape'&&active>=0){e.preventDefault();e.stopPropagation();let old=active;set(-1);buttons[old].focus();}});set(0);
 }
 return L.cleanup;
}
// New studies share one deterministic timeline between hover and detail.
// Each source is documented in catalog.json; no third-party runtime is bundled.
```

### src/hybrid/modern-scenes.js:19-19

```js
 case 'nav':return `${eyebrow('FORMA®','INDEPENDENT DESIGN OFFICE')}<div class="ad-nav-hero"><h2>Ideas<br>made <i>visible.</i></h2><div class="ad-nav-object">${sceneArt(0)}</div></div><div class="nav-demo"><nav class="nav-head" aria-label="示例产品导航">${['产品','资源','关于'].map((t,i)=>`<button data-menu="${i}" aria-expanded="${i===0}">${t} ⌄</button>`).join('')}</nav><div class="nav-panel"><div class="nav-content">${[['资料整理','为内容找到位置'],['编辑工作台','把想法变为作品'],['媒体浏览','观看与筛选'],['协作空间','让信息保持同步']].map(r=>`<button><strong>${r[0]}</strong><small>${r[1]}</small></button>`).join('')}</div></div></div><p class="nav-status" data-role="result">切换栏目，观察容器尺寸</p>`;
```

## 依赖和资源

原生DOM、CSS、SVG、Pointer Events。现代效果通过统一生命周期释放监听、动画、计时器和ResizeObserver；媒体演示使用本地 preview.mp4。无运行时外部网站请求。资源采用本地系统字体，不分发字体文件。

## 当前参数

playbackRate（0.25–2）控制自动预览时间线；snapshot/phase供可重复封面生成。其他时序/几何常量请沿上述核心位置修改，再构建与验收。参数文件不声称代码未开放的配置已可直接生效。
