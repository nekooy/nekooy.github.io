---
title: Nekooy小站写作部署流程备忘
date: 2026-08-26
lastMod: 2026-08-27T11:55:28+08:00
summary: 本站第一篇文章：记录一篇新文章从创建、写作、预览到发布的完整流程，方便日后查阅。
category: 教程
tags: [教程, 站点]
---

欢迎来到 **Nekooy小站**。这是本站的第一篇文章，同时把「一篇新文章如何从创建到发布上线」的完整流程记录在这里，方便日后查阅，也让大家了解这个站点是怎么运作的。整个流程只有四步：**创建 → 写作 → 预览 → 推送**。

## 第一步：创建文章

文章以 Markdown 文件的形式存放在 `src/content/posts/` 目录，有两种创建方式：

1. **交互式创建（推荐）**：在项目根目录运行 `pnpm new-post`，按提示输入文件名和标题，脚本会自动生成带 Frontmatter 的文件。
2. **手动创建**：直接在 `src/content/posts/` 下新建 `xxx.md`。

文件名只能包含小写字母、数字和连字符，例如 `my-first-post.md`。它同时也是文章的链接地址：`/posts/my-first-post`。

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
console.log('欢迎来到 Nekooy小站')
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

在浏览器打开 `http://localhost:4321` 检查排版和效果，确认没问题就可以发布了。

## 第五步：推送发布

本站通过 GitHub Actions 自动部署：把代码推送到 `main` 分支，就会自动构建并发布到 [nekooy.com](https://nekooy.com)。

```bash
git add .
git commit -m "添加：发布流程记录"
git push
```

提交信息用简体中文，格式为「两字动词：描述」，例如 `添加：发布流程记录`。

推送后，在 GitHub 仓库的 **Actions** 页面可以看到构建进度，通常一两分钟内完成。等它变成绿色勾，刷新 [nekooy.com](https://nekooy.com) 就能看到新文章啦 🎉

## 结语

流程就是这么多：**创建 → 写作 → 预览 → 推送**。如果以后流程有变化，会继续更新这篇记录。
