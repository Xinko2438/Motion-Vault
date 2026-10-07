# 玻璃圆环里的折射字形：独立实现资料

## 真实入口
source/scene.js 为完整可读实现；run/effect.js 为捆绑依赖的运行入口，run/index.html 为独立页面。SourceDemo.paint(t) 可在同一场景上设置时间；实际鼠标、拖拽、滑杆继续可用。

## 如何迁移
调节ior控制折射，rotation控制观察角，文字采用系统字体绘制Canvas纹理；运行中只调整旋转与材质，不反复建立场景。

## 来源边界
未取得原作者失效仓库中的实现。本地使用Three.js物理透射，不声称与原作TransmissionMaterial多次采样或字形排布一致。
原作者公布的源码仓库现返回404；独立实现透明圆环、折射与环形排字，保留原文章作为设计依据。
不需要访问原站，也不要根据视频逆向猜测已有源码。

## 环境
Three.js0.182.0、WebGL2与本地HDR。离开页面释放几何、纹理、渲染器；系统字体不需要分发字库。


## 当前完整源码与适配
实际执行入口：run/index.html → run/effect.js。
可读源文件：
- source/scene.js（original_source）

source-map.json列出全部已核实的源码定位；source/保留作者源文件或独立实现，adapter/保存与原始源码不同的本地适配文本。不要把捆绑依赖的effect.js当作唯一阅读入口。

## 迁移设计
透明体、内部环形字带和背景文字形成三个有前后关系的层。
替换短品牌词时同时检查alpha裁切、折射和字带半径；背景文字不能与透明物体处于同一深度。

## 预览关联
poster.jpg与preview.mp4来自本地代码在隔离浏览器中的实际执行，implementationVersion=34d07324a3894dd3。视频没有取代源码。
