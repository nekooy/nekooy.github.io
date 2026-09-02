# AGENTS.md

Nekooy小站（[nekooy.com](https://nekooy.com)）个人博客仓库，基于 [astro-gyoza](https://github.com/lxchapu/astro-gyoza) 主题改造，技术栈为 Astro 4 + React 18 + TypeScript（strict）+ Tailwind CSS 3。包管理只用 **pnpm**（`packageManager` 已固定），CI 使用 Node 24；无 ESLint，格式化仅靠 Prettier。

## 常用命令

| 命令                                                     | 说明                                                                                                        |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `pnpm install`                                           | 安装依赖（锁文件 `pnpm-lock.yaml`，勿手改）                                                                 |
| `pnpm dev`                                               | 本地开发，默认 http://localhost:4321                                                                        |
| `pnpm build`                                             | 质量门禁：`astro check`（类型检查）→ `astro build` → `pagefind --site dist`（站内搜索索引），产物在 `dist/` |
| `pnpm preview`                                           | 本地预览构建产物                                                                                            |
| `pnpm lint`                                              | `prettier --write .` 全库格式化（提交前运行）                                                               |
| `pnpm new-post` / `pnpm new-friend` / `pnpm new-project` | 交互式新建文章 / 友链 / 项目                                                                                |

改动完成后的标准验证：`pnpm build` + `pnpm lint`。`dist/`、`.astro/`、`node_modules/` 均为生成物，禁止手改或提交。

## 目录结构与关键文件

```text
public/               静态资源：logo.webp、favicon、CNAME（自定义域名，随构建发布）
scripts/              生成脚本：new-post.js / new-friend.js / new-project.js
src/
  config.json         全站配置，绝大多数站点改动先改这里（详见下节）
  content/            内容集合，zod 校验位于 content/config.ts
    posts/*.md        文章（content 集合）
    friends/*.yaml    友链（data 集合，每文件一条）
    projects/*.yaml   项目（data 集合，每文件一条）
    spec/*.md         固定页面（关于 / 友链 / 项目），由 pages/[spec].astro 渲染
  pages/              路由：posts/[...slug].astro、[spec].astro、[...page].astro（分页）、
                      archives、categories/、tags/、rss.xml.ts、robots.txt.ts、404.astro
  components/         React（.tsx）与 Astro（.astro）组件；feature 子目录：comment/、
                      header/、post/、hero/、provider/、ui/modal/ 等
  layouts/            Layout.astro、PageLayout.astro、MarkdownLayout.astro
  plugins/            自定义 remark / rehype 管道插件（决定文章 Markdown 写法）
  store/              Jotai atoms：theme、viewport、scrollInfo、metaInfo、modalStack
  utils/              content.ts（文章/分类/标签查询）、theme.ts、date.ts、clipboard.ts
  styles/             global.css、markdown.css、shiki.css、swup.css、iconfont.css
astro.config.js       Astro 配置：集成（react / tailwind / sitemap / swup）+ Markdown 插件管道
tailwind.config.ts    Tailwind 配置；深色模式为 `[data-theme='dark']` 选择器
```

路径别名 `@/*` → `src/*`（见 `tsconfig.json`）。

### src/config.json 要点

- `site.url` 必须是最终线上地址——影响 RSS / sitemap / canonical。
- `waline.serverURL` 留空则不渲染评论（`components/comment/Comments.astro` 据此判断）；`analytics.enable: false` 时全部统计不加载。
- `color.accent` 为主题色（浅色/深色两套），经 `AccentColorInjector` 注入 CSS 变量 `--color-accent`。
- 特殊日期置灰：给 `<html>` 加 `gray` class（见 `global.css` 的 `html.gray`）。

## 内容写法

新建内容优先用 `pnpm new-post` 等脚本；手写时必须遵守：

- 文件名匹配 `^[a-z0-9]+(-[a-z0-9]+)*$`（小写字母、数字、连字符，**不能有**点号、空格、大写）。
- 文章 frontmatter 严格对照 `src/content/config.ts` 的 zod schema：`title`、`date`、`lastMod?`、`summary?`、`cover?`、`category?`、`tags[]`（默认空）、`comments`（默认 true）、`draft`（默认 false，生产构建才剔除）、`sticky`（数字越大越靠前）；日期用 ISO 格式。
- `readingMinutes` / `words` 由 `remarkReadingTime` 自动注入正文 frontmatter，不要手写。
- 正文支持的自定义语法：
  - 剧透：`||内容||`
  - 视频嵌入：`::youtube{id=...}` / `::bilibili{id=...}` / `::codepen{id=... author=...}`
  - LaTeX：`$...$` / `$$...$$`（remark-math + rehype-katex）
  - 代码高亮由 `rehypeCodeBlock` / `rehypeCodeHighlight`（Shiki）处理，`astro.config.js` 中 `syntaxHighlight: false`，不要依赖 Astro 内置高亮。
  - 脚注标签固定为「参考」/「返回正文」。
- spec 页面：标题、描述、是否评论写在 frontmatter；正文留空时只渲染列表组件（slug 为 `friends` / `projects` 时页面结构特殊，见 `pages/[spec].astro`）。

## 代码约定

- TypeScript strict：禁止 `any`，未知类型用 `unknown` 收窄；`strictNullChecks` 已开启。
- 格式遵循 `.prettierrc`：无分号、单引号、printWidth 100；写完后用 `pnpm lint` 统一，勿手工纠结空格。
- 组织方式：路由在 `pages/`，区块组件在 `components/`（React 用 `.tsx`，Astro 用 `.astro`）；交互状态放 `store/`（Jotai），提供者在 `components/provider/`。
- 客户端交互注意 SWUP：导航会整块替换 `main` 容器并 morph `[component-export="Provider"]` 组件，`client:idle` / `client:visible` 组件会重新挂载；不要在模块顶层持有页面级 DOM 引用，用 Provider / Jotai 传递状态。
- 主题：`data-theme='dark'` 属性 + CSS 变量；主题初始化走 `utils/theme.ts` 与 `ThemeLoader`，避免闪烁。
- 文案与注释用简体中文。
- 本项目为静态构建：所有数据在构建期收集（`getCollection` 等），触及 collection schema、布局或 Markdown 管道后必须重新 `pnpm build` 验证；Pagefind 搜索索引仅在 build 时生成，搜索相关改动无法仅靠 dev 验证。

## 工作边界

- 未经用户明确许可，不要执行 `git add` / `git commit` / `git push`。
- 只做文件修改与本地构建验证（`pnpm dev` / `pnpm build` / `pnpm preview`），改完等待用户确认后再谈提交。

## 提交规范

- 用简体中文写提交信息。
- 主题格式：`两字动词：描述`，如 `重构：拆分CSS与JS文件`。
  - 动词为两个汉字，不限死：添加/更新/修复/优化/重构/移除/调整/清理/压缩/删除…，怎么贴切怎么来。
  - 冒号后紧跟描述；多事项用逗号连接；单行不超过 50 字。
  - 复杂改动在空行后补充正文（`-` 列表），正文不受上述限制。
- 反例：`清理冗余代码并缩小图片资源`（缺冒号）、`优化性能：压缩图片`（冒号前不是两字动词）。
