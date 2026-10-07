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

核实时间：2026-10-07T09:37:24.208Z。原Motion Vault单页已统一为正式／预选／已下架；预选可提拔、所有正式条目可移回预选或下架、下架后可明确恢复到正式或预选。保持原源码身份、现有数据、预览／实时交互及圆角图标。原候选地址仅兼容跳转。

策展专项stage/live各39/39、预览切换stage/live各27/27；候选功能166/166、本地隔离30/30、正式悬停193/193在当前暂存通过，原址结构18/18、项目测试27/27。当前结果和发布身份见lineage/current/RESULT.md及curation-workflow/。

收录状态使用当前浏览器已有记录保存，不把来源目录当作当前用户批准，不声称跨设备同步。静态目录、来源身份和受管PROJECT区保持不变；原有审美接受状态不改。
