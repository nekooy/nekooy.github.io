---
title: 如何在本站写文章并发布
date: 2026-08-26
summary: 第一篇教程：从创建文章、编写 Markdown 到推送发布，手把手带你走一遍完整流程。
category: 教程
tags: [教程, 站点]
---

欢迎来到 **Nekooy小站**。这是一篇「教程」，告诉你如何写好一篇文章并把它发布出来。整个过程只有四个步骤：**创建 → 写作 → 预览 → 推送**。

## 第一步：创建文章

文章存放在 `src/content/posts/` 目录，有两种创建方式：

1. **交互式创建（推荐）**：在项目根目录运行 `pnpm new-post`，按提示输入文件名和标题，脚本会自动生成带 Frontmatter 的文件。
2. **手动创建**：直接在 `src/content/posts/` 下新建 `xxx.md`。

文件名只能包含小写字母、数字和连字符，例如 `hello-world.md`。它同时也是文章的链接地址：`/posts/hello-world`。

## 第二步：填写 Frontmatter

Frontmatter 是文件顶部用 `---` 包裹的配置区：

```yaml
---
title: 文章标题
date: 2026-08-26
summary: 一句话摘要，会显示在首页卡片、RSS 与 SEO 里
category: 分类名
tags: [标签一, 标签二]
cover: /cover.webp # 可选，封面图
comments: true # 可选，是否开启评论
draft: false # 可选，草稿不会在生产环境发布
sticky: 0 # 可选，置顶权重，数字越大越靠前
---
```

常用字段：

| 字段       | 说明                        |
| ---------- | --------------------------- |
| `title`    | 文章标题                    |
| `date`     | 发布日期，格式 `YYYY-MM-DD` |
| `summary`  | 摘要（可选）                |
| `category` | 分类（可选）                |
| `tags`     | 标签数组                    |
| `cover`    | 封面图路径（可选）          |
| `draft`    | 草稿模式，生产构建不会包含  |
| `sticky`   | 置顶权重                    |

## 第三步：写作

正文是标准 Markdown，向下兼容所有常用语法，本站额外支持以下特性：

### 代码块

```js
console.log('hello, world')
```

代码块会自动高亮并显示语言标签。

### 图片

图片放到 `public/` 目录，写作时引用：

```md
![图片描述](/path/to/image.png '图片标题')
```

链接标题会渲染成图片说明文字。

### 数学公式

支持 LaTeX 公式，比如这里是行内公式 $E = mc^2$；块级公式这样写：

$$
\int_{-\infty}^{\infty} e^{-x^2} \, dx = \sqrt{\pi}
$$

### 嵌入视频

支持 Bilibili、YouTube 和 CodePen：

```md
::bilibili{id=BVxxxxxxxx}
::youtube{id=xxxxxxxxxxx}
::codepen{author=xxx id=xxx}
```

### 剧透

用 `||` 包裹内容即可隐藏，鼠标悬停才会显示，例如 ||这里是剧透内容||。

### 脚注

```md
这是一个脚注[^1]。

[^1]: 脚注说明文字。
```

## 第四步：本地预览

```bash
pnpm dev    # 开发服务器，默认 http://localhost:4321
pnpm build  # 类型检查 + 生产构建，发布前建议跑一遍
```

打开 `http://localhost:4321` 检查排版和效果，确认没问题就可以发布了。

## 第五步：推送发布

本站通过 GitHub Actions 自动部署：把代码推送到 `main` 分支，就会自动构建并发布到 [nekooy.com](https://nekooy.com)。

```bash
git add .
git commit -m "添加：发布教程《如何在本站写文章并发布》"
git push
```

提交信息请遵循站规（详见仓库根目录 `AGENTS.md`）：

- 用简体中文写提交信息；
- 主题格式为 `两字动词：描述`，如 `重构：拆分CSS与JS文件`；
- 冒号后紧跟描述，多事项用逗号连接，单行不超过 50 字；
- 复杂改动空一行后补 `-` 列表正文。

推送后，在 GitHub 仓库的 **Actions** 页面可以看到构建进度，通常一两分钟内完成。等它变成绿色勾，刷新 [nekooy.com](https://nekooy.com) 就能看到你的文章啦 🎉

## 写完啦

流程就是这么多：**创建 → 写作 → 预览 → 推送**。去写你的第一篇吧！
