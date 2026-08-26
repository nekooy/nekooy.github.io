# AGENTS

## 工作边界

- 未经用户明确许可，不要执行 `git add` / `git commit` / `git push`。
- 只做文件修改与本地构建验证（`pnpm dev` / `pnpm build` / `pnpm preview`），改完等待用户确认后再谈提交。

## 项目

个人博客 nekooy.com，基于 Astro + React + Tailwind CSS。配置集中在 `src/config.json`，文章在 `src/content`。

- `pnpm dev` 本地开发，`pnpm build` 构建
- 提交前运行 `pnpm lint`（Prettier 格式化）

## 提交规范

- 用简体中文写提交信息。
- 主题格式：`两字动词：描述`，如 `重构：拆分CSS与JS文件`。
  - 动词为两个汉字，不限死：添加/更新/修复/优化/重构/移除/调整/清理/压缩/删除…，怎么贴切怎么来。
  - 冒号后紧跟描述；多事项用逗号连接；单行不超过 50 字。
  - 复杂改动在空行后补充正文（`-` 列表），正文不受上述限制。
- 反例：`清理冗余代码并缩小图片资源`（缺冒号）、`优化性能：压缩图片`（冒号前不是两字动词）。
