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

核实时间：2026-10-07T07:55:06.005Z。已在原画廊补回“预览 / 实时交互”开关：工具栏控制卡片、详情内可单独来回切换；实时模式直接操作本地源码，保留真实鼠标hover/点击/拖拽。标签图标SVG与ICO统一圆角。当前结果见lineage/current/RESULT.md。

唯一完整入口：http://127.0.0.1:4380/app/assets/motion-vault.html；保持原60项正式与30项候选、三种内容状态，未改用户收藏、收录、下架或私人备注。上方受管区和用户接受状态不变。

本轮stage/live专项各27项通过，新增浏览166项、本地隔离30项、正式预览193项在暂存构建通过，原址结构18项和项目测试20项通过。实际发布与HTTP副本核对完成。历史帧率及故障记录仍保留，不将UI修复表述为所有效果在所有设备稳定60fps。

源码、构建、查询与发布仍沿用README.md和AGENTS.md中的原路径。圆角ICO用scripts/build-icon.mjs生成；专项回归用scripts/verify-interaction-switch.mjs。
