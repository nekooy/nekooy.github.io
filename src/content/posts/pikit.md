---
title: PiKit 发布：把 pi 与 Termux 封进一个 APK 的 Android AI Agent
date: 2026-09-23
lastMod: 2026-09-23T13:09:11+08:00
summary: 一直想要一个开箱即用、又简洁美观的手机 AI Agent——试过一圈都不够顺手，于是自己做了 PiKit。介绍它是什么、为什么做，以及怎么装到手机上。
category: 分享
tags: [PiKit, Android, AI, pi, Termux, 分享]
cover: /pikit-preview.webp
---

手机上不缺会聊天的 AI，缺的是**开箱即用、又简洁美观的专业 Agent**。为了这么一个东西，我试过不少 App，也折腾过 Termux + [pi](https://pi.dev)，最后决定自己动手——项目叫 **[PiKit](https://github.com/nekooy/PiKit)**，上游 pi 与 Termux，装进同一个 APK 的简洁安卓 AI agent。

## 一、PiKit 是什么

一句话：**一个开箱即用、界面干净的 Android AI Agent。**

装好 APK 就能直接用：Termux 环境、Node.js、`ripgrep`、`fd` 和 `pi` 命令行都烘焙在包里，首次启动时解包即可，不必再配软件源。提问仍要送到模型供应商，所以唯一需要的网络是「能连上那家供应商」。

界面用 Kotlin 与 Jetpack Compose 写成，架在一个引入的 Termux 终端之上，**任何地方都没有 WebView**。目前有英文、简体中文和日文三套文案。

## 二、为什么做这个

手机上其实不缺「能聊天的 AI」，缺的是**真正专业的 AI Agent**。为了找一个顺手的，我一路试下来：

1. **Rikkahub、Kelivo**：一开始体验的就是这两个。功能不可谓不多，但本质上仍是聊天软件——和豆包、DeepSeek 没有拉开差距，模型会说、会写，却很难真正帮你改文件、跑命令、把一件工具性的事做完。
2. **Operit**：再往后是它。功能确实强大，但 bug 偏多；界面复杂臃肿，也不够美观。每次上手都在「好用的潜力」和「被卡住的烦躁」之间摇摆。
3. **OpenMini**：美观一些，但略显粗糙，自定义功能也偏弱。好看是好看，深度用起来还是差一口气。

一路体验下来的结论很朴素：**市面上缺一个既专业、又干净、还能自己掌控的手机端 Agent。** 与其继续将就，不如自己做一个——这才有了 PiKit。

除了「没有对的产品」，自己折腾 Termux + pi 的那条路本身也不轻松：

- 环境搭建步骤多，换机、重装就来一遍；
- 网络环境一差，`pkg install` 就开始漫长的重试；
- 好不容易跑起来，输入法缺 ESC / TAB / 方向键，体验也别扭。

PiKit 想把第一类问题直接消掉：**运行时是 APK 的一部分**，首次启动解包（约 285 MB）即可用。第二类交给原生界面：对话、终端、文件、设置四个标签页，模型与思考等级做成输入框上方的开关，不重启 Agent 就生效。

设计上也有几条刻意的克制——不少是被上面那些 App「教育」出来的：

- 对话只加了 `!command` 和七条斜杠命令：`/new`、`/compact`、`/stop`、`/clone`、`/export`、`/model`、`/clear`，不往里堆功能；
- 没有账号体系，没有遥测；
- 有意不上架 Google Play，从 [Releases](https://github.com/nekooy/PiKit/releases/latest) 直接发 APK。

## 三、主要特色

| 方面   | 说明                                                                               |
| ------ | ---------------------------------------------------------------------------------- |
| 对话   | 走 pi 的 RPC 协议；回合结束折叠成一行（如 `Worked 47s · 5 steps`），点一下重新展开 |
| 控制   | 思考等级、模型、上下文占用、缓存命中都是输入框上方的按钮，即时生效                 |
| 终端   | 切换标签页后仍在运行的 PTY 会话，以及手机键盘没有的按键                            |
| 文件   | `$HOME` 的只读视图，方便快速翻看工作区                                             |
| 供应商 | 按 pi 的密钥表支持 32 家，外加自定义端点；模型能力读自 pi 的目录                   |
| 安全   | 存储按文件夹授权；运行时内置守卫，拒绝 `$HOME/workspace` 之外的递归删除            |

## 四、界面一览

![PiKit 0.2.0 界面预览：对话、终端、文件、设置四个标签页](/pikit-preview.webp)

对话页把完整回合收成一行，需要回看时再展开；终端与文件页服务「Agent 改完东西，人要确认一眼」的场景；设置里管模型、供应商、共享存储与更新检查。

## 五、怎么装

从 [releases 页面](https://github.com/nekooy/PiKit/releases/latest) 下载对应架构的 APK（约 107 MB）：

| 设备            | 文件                        |
| --------------- | --------------------------- |
| 手机、平板      | `PiKit-<version>-arm64.apk` |
| `x86_64` 模拟器 | `PiKit-<version>-x64.apk`   |

不确定架构可以用 `adb shell getprop ro.product.cpu.abi` 查看；装错也无妨，应用会提示该包没有本机运行时镜像，而不是启动后才失败。建议用 `sha256sum -c SHA256SUMS` 校验后再安装。

首次启动请给一点耐心：它会解包运行时，然后询问通知权限和「所有文件访问」（只有 **设置 → 手机存储** 需要后者）。接着在 **设置 → 模型与供应商** 填 API Key，或有订阅时到终端页执行 `pi /login`。

更新也是手动的：**关于 PiKit → 检查更新** 只在点击时才请求 GitHub，新 APK 覆盖安装即可保留数据。

## 六、构建与开源

源码在 [nekooy/PiKit](https://github.com/nekooy/PiKit)，许可证是 **GPLv3**——因为 APK 分发了 Termux 运行环境与终端模拟器（均为 GPLv3），分发构建必须一并提供对应源码；pi Agent 本身是 MIT。

本地构建需要 Android 8.0+、JDK 17–23、带 NDK r29 的 Android SDK、Python 3.10+ 与 Node.js：

```bash
python tools/build-apks.py    # 检查、测试，然后打出全部 APK
```

运行时镜像按生成物处理（每个 ABI 约 100 MB 归档），上述命令会在需要时自动组装。设计细节、约束与被否掉的方案都写在仓库的 [docs/ARCHITECTURE.md](https://github.com/nekooy/PiKit/blob/main/docs/ARCHITECTURE.md) 里，有兴趣可以当设计笔记读。

## 七、写在最后

PiKit 不打算做成「万能手机 IDE」，只想回答一个问题：**怎样做一个开箱即用、又简洁美观的手机 AI Agent。** 如果你也想要这么一个工具，欢迎去 [Releases](https://github.com/nekooy/PiKit/releases/latest) 试玩，或到 [Issues](https://github.com/nekooy/PiKit/issues) 提建议。
