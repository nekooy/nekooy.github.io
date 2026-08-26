# Nekooy小站

Nekooy小站（奈可伊）的个人博客，基于 [astro-gyoza](https://github.com/lxchapu/astro-gyoza) 主题搭建，使用 [Astro](https://astro.build/) + [React](https://reactjs.org/) + [Tailwind CSS](https://tailwindcss.com/)。

在线地址：[nekooy.com](https://nekooy.com)

## ✨ 特性

- SEO：规范的 URL、OpenGraph 信息、站点地图、RSS 订阅
- 夜间模式 / 特殊日期变灰
- 站内搜索（Pagefind）
- 代码高亮、LaTeX 支持
- 评论系统（Waline，需自行部署后启用）
- 简洁可爱的配色和主题

## 🧞 本地命令

```bash
pnpm install    # 安装依赖
pnpm dev        # 本地开发 http://localhost:4321
pnpm build      # 构建生产环境到 dist/
pnpm preview    # 本地预览构建产物
pnpm new-post   # 交互式创建新文章
```

## ⚙️ 配置

几乎所有配置都在 [`src/config.json`](src/config.json)：

| 字段                                                | 说明                                                                                         |
| --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `site.url`                                          | 站点域名（须为最终线上地址，用于 RSS / sitemap / canonical）                                 |
| `site.title` / `site.description` / `site.keywords` | 站点标题、描述、关键词                                                                       |
| `site.favicon` / `site.appleTouchIcon`              | 站点图标（`public/` 下替换同名文件即可）                                                     |
| `author.name` / `author.avatar`                     | 作者名与头像（`/logo.webp`）                                                                 |
| `hero.*`                                            | 首页横幅：名字、简介、社交链接                                                               |
| `menus`                                             | 顶部导航菜单                                                                                 |
| `footer.startTime`                                  | 建站时间（用于页脚「已运行天数」）                                                           |
| `waline.serverURL`                                  | 评论服务地址；留空则文章页不显示评论（需要时自部署 [Waline](https://waline.js.org/) 并填入） |
| `sponsor.wechat`                                    | 微信赞赏码图片地址；留空则隐藏文章页「赞赏」按钮                                             |
| `analytics`                                         | 统计（Umami / Google Analytics / Clarity），`enable: true` 后填写对应 ID                     |

品牌资源位于 `public/`：

- `logo.webp` — 站点 Logo（同时用于页头图标与首页头像）
- `favicon.ico` / `apple-touch-icon.png` — 站点图标
- `CNAME` — 自定义域名（构建后随站点发布，无需手动配置）

## 📝 写文章

直接在 `src/content/posts/` 下新建 `.md` 文件（或运行 `pnpm new-post`），Frontmatter 格式：

```md
---
title: 文章标题
date: 2026-08-26
summary: 摘要（用于首页卡片 / RSS / SEO）
category: 分类
tags: [标签一, 标签二]
cover: /cover.webp # 可选，封面图
comments: true # 是否开启评论（需配置 Waline）
draft: false # 草稿不发布
sticky: 1 # 置顶（数字越大越靠前）
---
```

友链在 `src/content/friends/*.yaml`，项目在 `src/content/projects/*.yaml`，维护方式见站点 `/friends` 与 `/projects` 页面。

## 📁 项目结构

```text
public/            # 静态资源（logo、图标、CNAME）
src/
├── components/    # 组件（React / Astro）
├── content/
│   ├── posts/     # 文章（Markdown）
│   ├── friends/   # 友链数据
│   ├── projects/  # 项目数据
│   └── spec/      # 关于 / 友链 / 项目 等固定页面
├── layouts/       # 页面布局
├── pages/         # 路由页面
├── styles/        # 全局样式
└── config.json    # 站点配置（先改这个）
```
