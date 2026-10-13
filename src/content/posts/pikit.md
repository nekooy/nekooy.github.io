---
title: PiKit 发布：一个基于 pi 和 Termux 的简洁安卓 AI Agent
date: 2026-09-23
lastMod: 2026-10-13T11:18:12+08:00
summary: 一直想要一个开箱即用、又简洁美观的手机 AI Agent——试过一圈都不够顺手，于是自己做了 PiKit。介绍它是什么、为什么做，以及怎么装到手机上。
category: 分享
tags: [PiKit, Android, AI, pi, Termux, 分享]
cover: /pikit-preview.webp
---

手机上不缺会聊天的 AI，缺的是**开箱即用、又简洁美观的专业 Agent**。为了这么一个东西，我试过不少 App，也折腾过 Termux + [pi](https://pi.dev)，最后决定自己动手——项目叫 **[PiKit](https://github.com/nekooy/PiKit)**，一个基于 pi 和 Termux 的简洁安卓 AI Agent。

## 一、PiKit 是什么

一句话：**一个简洁、开箱即用的 Android AI Agent。**

装好 APK 就能直接用：Termux 环境、Node.js 与 `pi` 命令行都打包在包里，首次启动解包即用，不必再配软件源或额外下载。提问仍要送到模型供应商，所以唯一需要的网络是「能连上那家供应商」。

界面用 Kotlin 与 Jetpack Compose 写成，按 **Material 3 Expressive（MD3E）** 设计语言绘制，架在一个引入的 Termux 终端之上，**任何地方都没有 WebView**。目前有英文、简体中文和日文三套文案。

## 二、为什么做这个

手机上其实不缺「能聊天的 AI」，缺的是**真正专业的 AI Agent**。一路试下来：

1. **Rikkahub、Kelivo**：功能不可谓不多，本质上仍是聊天软件——模型会说、会写，却很难真正帮你改文件、跑命令、把一件工具性的事做完。
2. **Operit**：功能确实强大，但 bug 偏多；界面复杂臃肿，也不够美观。
3. **OpenMinis**：美观一些，但略显粗糙，自定义功能也偏弱。

结论很朴素：**市面上缺一个既专业、又干净、还能自己掌控的手机端 Agent。**

自己折腾 Termux + pi 那条路也不轻松：环境搭建步骤多，换机、重装就来一遍；网络环境一差，`pkg install` 就开始漫长重试；好不容易跑起来，输入法还缺 ESC / TAB / 方向键。PiKit 把第一类问题直接消掉——**运行时是 APK 的一部分**，首次启动解包（约 285 MB，几秒即可）就能用；第二类交给原生界面：对话、终端、文件、设置四个标签页，模型与思考等级做成输入框上方的开关，不重启 Agent 就生效。

设计上也有几条刻意的克制，不少是被上面那些 App「教育」出来的：不往里堆功能；没有账号，也没有遥测；有意不上架 Google Play，只从 [Releases](https://github.com/nekooy/PiKit/releases/latest) 直接发 APK。

## 三、主要特色

| 方面   | 说明                                                                                                                                |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| 界面   | Kotlin + Jetpack Compose，按 Material 3 Expressive（MD3E）绘制；四个标签页，没有 WebView                                            |
| 对话   | 走 pi 的 RPC 协议；回合结束折叠成一行（如 `Worked 47s · 5 steps`），点一下重新展开                                                  |
| 控制   | 思考等级、模型、上下文占用、缓存命中都是输入框上方的按钮，不重启 Agent 就生效                                                       |
| 终端   | 切换标签页也不中断的 PTY 会话，以及手机键盘没有的按键                                                                               |
| 文件   | `$HOME` 的只读视图，方便快速翻看工作区                                                                                              |
| 供应商 | pi 密钥表认识的 32 家，外加自定义端点；上下文窗口、输出上限、思考等级与图片支持读自 pi 的目录                                       |
| 安全   | 存储授权默认为空、按文件夹逐个开启；删除只在应用数据内生效；安全守卫拒绝 `$HOME/workspace` 之外的递归删除，也拒绝改写 pi 自己的文件 |

## 四、界面一览

![PiKit 0.5.0 界面预览：对话、终端、文件、设置四个标签页](/pikit-preview.webp)

对话页把完整回合收成一行，需要回看时再展开；终端与文件页服务「Agent 改完东西，人要确认一眼」的场景；设置里管模型与供应商、手机存储、备份与更新检查。

## 五、怎么装

手机、平板直接下这个 arm64 包即可（`app-arm64-release.apk`，约 110 MB）：

**[下载 PiKit APK](https://github.com/nekooy/PiKit/releases/latest/download/app-arm64-release.apk)**

其他架构和校验文件见 [releases 页面](https://github.com/nekooy/PiKit/releases/latest)；不确定架构可以用 `adb shell getprop ro.product.cpu.abi` 查看。装错也无妨，应用会提示该包没有本机运行时镜像，而不是启动后才失败。建议用 `sha256sum -c SHA256SUMS` 校验后再安装。

首次启动只要几秒：它会解包运行时，然后就能用了。到 **设置 → 模型与供应商** 填 API Key，或有订阅时到终端页执行 `pi /login`。

更新时覆盖安装即可保留数据——需要时点 **关于 PiKit → 检查更新**，它只在点击时才请求 GitHub。

## 六、开源与许可

源码在 [nekooy/PiKit](https://github.com/nekooy/PiKit)，许可证是 **GPLv3**——因为 APK 分发了 Termux 运行环境与终端模拟器（均为 GPLv3），分发构建必须一并提供对应源码；pi Agent 本身是 MIT。想自己构建的话，前置条件与流程见 [docs/BUILDING.md](https://github.com/nekooy/PiKit/blob/main/docs/BUILDING.md)。

## 七、写在最后

PiKit 不打算做成「万能手机 IDE」，只想回答一个问题：**怎样做一个开箱即用、又简洁美观的手机 AI Agent。** 如果你也想要这么一个工具，欢迎去 [Releases](https://github.com/nekooy/PiKit/releases/latest) 试玩，或到 [Issues](https://github.com/nekooy/PiKit/issues) 提建议。
