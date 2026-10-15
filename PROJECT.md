# PROJECT: design-reference-library

<!-- AI-NATIVE-PROJECT-CONTROL:BEGIN -->
{
  "schemaVersion": "ai-native.project-control.v2",
  "entityId": "project.design-reference-library",
  "stateRevision": "sha256:30be836ede5fc9ae733de671ade8651539b376b7852c861f8e8bf40a2bc3fe6d",
  "projectName": "design-reference-library",
  "projectGoal": "集中管理网页设计与动效参考、业务场景分类、可视预览、用户偏好和 Agent 复用入口，并与 AI Native Workspace 的设计参考能力受控集成",
  "lifecycleStatus": "active",
  "completionState": "open",
  "currentMilestone": {
    "id": "wechat-extraction",
    "title": "设计参考库正式抽离",
    "goal": "建立独立项目并完成页面、历史材料、集成入口和恢复映射迁移",
    "revision": "v1",
    "required": true,
    "technicalState": "technically_complete",
    "acceptanceState": "awaiting_user",
    "artifacts": [
      {
        "id": "artifact.design-reference-library.current-page",
        "title": "设计参考库当前页面",
        "revision": "sha256:d010a93830418a9658b1f2bc1dc2b412b56513cdacad3429d342fa53f1af392a",
        "evidenceRefs": [
          "lineage/migration-from-wechat-group-summary.json"
        ]
      },
      {
        "id": "artifact.design-reference-library.migration",
        "title": "设计参考库迁移与恢复映射",
        "revision": "sha256:52aa805cde05bdf077c1376d5017f12713eb9edaa31114baf128092dec58f314",
        "evidenceRefs": [
          "lineage/migration-from-wechat-group-summary.json"
        ]
      }
    ],
    "qualityGates": [
      {
        "id": "project-bootstrap",
        "title": "正式项目创建与登记",
        "status": "passed",
        "evidenceRefs": [
          "lineage/PROJECT-INIT-2026-09-14-v1.json"
        ]
      },
      {
        "id": "migration-integrity",
        "title": "源目标哈希与清理验证",
        "status": "passed",
        "evidenceRefs": [
          "lineage/migration-from-wechat-group-summary.json"
        ]
      },
      {
        "id": "page-static-capabilities",
        "title": "40项、六场景、Light、主题、详情、录制与4380标记",
        "status": "passed",
        "evidenceRefs": [
          "lineage/migration-from-wechat-group-summary.json"
        ]
      },
      {
        "id": "real-use",
        "title": "真实录制、回看、选定与生产复用",
        "status": "not_checked",
        "evidenceRefs": []
      }
    ]
  },
  "criticalBlockers": [],
  "nextAction": "请用户打开 web/index.html 验收页面；随后完成一次真实录制、选择和生产复用。",
  "updatedAt": "2026-09-14T18:23:40.8720176+08:00"
}
<!-- AI-NATIVE-PROJECT-CONTROL:END -->

## 当前状态

2026-10-15：已将准备完成的33项动效（13项本地DOM、20项在线来源独立实现）精确融合到原4380单页，更新源码、设计资料、33张封面和5段短片；修复固定旧样式的加载器。原导航、六类用途、三列风格、详情及策展操作保留。原个人Chrome全部Motion Vault存储逐字未变，刷新后仍为正式62／预选0／已下架52。正式静态70通过、0失败、1既有跳过；33项正式页专项130/130、开关31/31、同步15858次文件比对及13项HTTP通过。60/54仅为来源目录数。当前发布、回退及可复用构建/验收入口见lineage/current/RESULT.md；技术验收不替代用户审美接受。

2026-10-08：8项独立实现已在卡片及详情显式显示“独立实现 · 非原作者源码”；标识跨收录视图显示，来源与用户收录状态保持。验证及当前发布入口见lineage/current/RESULT.md。

2026-10-08：24项扩充预览已补齐；原4380单页当前54项候选均有真实本地封面与可播放视频。修复透镜React JSX及Windows构建路径缺陷，保留原代码身份、光学材质和用户收录状态。用户Chrome核验为正式71／预选25／已下架18，无灰色占位卡片。

实际浏览器默认悬停241/241、卡片/策展238/238、隔离运行54/54；静态67通过、0失败、1既有跳过。技术验证未产生用户视觉接受。当前证据和恢复入口见lineage/current/RESULT.md；录制/回归入口为scripts/capture-source-expansion.mjs。
