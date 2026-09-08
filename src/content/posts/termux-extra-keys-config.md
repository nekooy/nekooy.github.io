---
title: Termux 额外按键（Extra Keys）配置分享：适配pi / opencode
date: 2026-07-11
lastMod: 2026-09-08T21:04:48+08:00
summary: 手机上用 Termux 跑 pi / opencode 这类终端 AI，最缺的就是 ESC、方向键和 /new 这些命令。分享我的三行额外按键布局，附效果截图与可直接复制的 termux.properties 配置。
category: 分享
tags: [Termux, Android, 效率, AI, 分享]
---

在手机上用 Termux 跑 [pi](https://pi.dev) / [opencode](https://opencode.ai) 这类终端 AI，最大的痛点是输入法没有 ESC、TAB、方向键，敲 `/new`、`/session` 这类命令又慢又容易错。Termux 的**额外按键（Extra Keys）**——底部那排可以完全自定义的按键，正好解决这个问题。下面是我的布局和配置。

## 一、效果预览

![Termux 额外按键效果预览](/termux-extra-keys-preview.jpg)

## 二、布局说明

### 第 1 行：系统键 + 模型切换

| 按键 | 功能                                                                                |
| ---- | ----------------------------------------------------------------------------------- |
| ≡    | **DRAWER**：打开会话抽屉，切换或新建会话                                            |
| ↺    | **ESC**：退出 TUI、中断当前操作（pi 里按 Escape 可中止 AI 并把排队消息取回输入框）  |
| ↕    | **SCROLL**：锁定/恢复「自动滚到底部」。输出刷屏时按一下，屏幕就不跟着滚了，方便回看 |
| ⌂    | **HOME**：跳转行首或首页                                                            |
| ▲    | **UP**：上方向键（长按连发）                                                        |
| ⤵    | **END**：跳转行尾或文末                                                             |
| ⬆    | **PGUP**：向上翻页（长按连发）                                                      |
| @    | 一键输入 `/model`——pi / opencode 里切换模型                                         |

### 第 2 行：修饰键 + 方向键 + 预留位

| 按键 | 功能                                                                        |
| ---- | --------------------------------------------------------------------------- |
| T    | **TAB**：触发补全 / 缩进                                                    |
| ^    | **CTRL**：粘滞修饰键，先点它再点字母组成快捷键（如 Ctrl+C 中断）            |
| A    | **ALT**：粘滞修饰键                                                         |
| ◀    | **LEFT**：左方向键                                                          |
| ▼    | **DOWN**：下方向键                                                          |
| ▶    | **RIGHT**：右方向键                                                         |
| ⬇    | **PGDN**：向下翻页（长按连发）                                              |
| #    | **AI 指令预留位**：给以后想加的斜杠命令或宏留的位置，随时替换，不用重新排布 |

### 第 3 行：高频文本输入

| 按键 | 功能                                                          |
| ---- | ------------------------------------------------------------- |
| /    | 输入 `/`，斜杠命令的开头                                      |
| /N   | 一键输入 `/new`——新开会话                                     |
| /S   | 一键输入 `/session`——查看会话信息（路径、消息数、token 用量） |
| Π    | 一键输入 `pi` 并回车——直接在 shell 里启动 pi                  |
| O    | 一键输入 `opencode` 并回车——直接在 shell 里启动 opencode      |
| ⏎    | **ENTER**：发送回车键码                                       |
| ↲    | 输入换行符 `\n`，多数程序里和 ↵ 效果相同                      |
| ⌨    | **KEYBOARD**：收起键盘                                        |

## 三、原理

核心就一句：**除系统键名外，任何字符串都会被原样输入终端**，所以 `/new`、`pi`、`opencode` 都能做成按键；`{key:'/new', display:'/N'}` 让按钮显示短标签，`{macro:'CTRL t', display:'#'}` 把组合键打包成一键。

## 四、配置方法

1. 编辑配置文件（不存在就新建）：

   ```bash
   nano ~/.termux/termux.properties
   ```

2. 粘贴以下配置：

   ```properties
   extra-keys = [ \
   [{key:'DRAWER',display:'≡'},{key:'ESC',display:'↺'},{key:'SCROLL',display:'↕'},{key:'HOME',display:'⌂'},{key:'UP',display:'▲'},{key:'END',display:'⤵'},{key:'PGUP',display:'⬆'},{key:'/model',display:'@'}], \
   [{key:'TAB',display:'T'},{key:'CTRL',display:'^'},{key:'ALT',display:'A'},{key:'LEFT',display:'◀'},{key:'DOWN',display:'▼'},{key:'RIGHT',display:'▶'},{key:'PGDN',display:'⬇'},{macro:'CTRL t',display:'#'}], \
   ['/',{key:'/new',display:'/N'},{key:'/session',display:'/S'},{key:'pi\n',display:'Π'},{key:'opencode\n',display:'O'},{key:'ENTER',display:'⏎'},{key:'\n',display:'↲'},{key:'KEYBOARD',display:'⌨'}] \
   ]
   ```

3. 保存并重载（nano 里 Ctrl+O 保存、Ctrl+X 退出）：

   ```bash
   termux-reload-settings
   ```

4. 之后用 **音量加 + Q** 随时显示/隐藏按键栏。

## 五、无 AI 简洁版

如果不玩终端 AI，把 `@`、`/N`、`/S`、`Π`、`O`、`#` 这些 AI 键删掉就好，系统键和图标样式全部保留：

```properties
extra-keys = [ \
[{key:'DRAWER',display:'≡'},{key:'ESC',display:'↺'},{key:'SCROLL',display:'↕'},{key:'HOME',display:'⌂'},{key:'UP',display:'▲'},{key:'END',display:'⤵'},{key:'PGUP',display:'⬆'}], \
[{key:'TAB',display:'T'},{key:'CTRL',display:'^'},{key:'ALT',display:'A'},{key:'LEFT',display:'◀'},{key:'DOWN',display:'▼'},{key:'RIGHT',display:'▶'},{key:'PGDN',display:'⬇'}], \
['/', '-',{key:'ENTER',display:'⏎'},{key:'\n',display:'↲'},{key:'KEYBOARD',display:'⌨'}] \
]
```

所有键都绑了 `display`，想换成自己的图标或文字，改 `display:` 后面的内容即可；嫌注释式的写法太长，也可以把 `{key:'TAB',display:'T'}` 简化成 `'TAB'`，但那样图标会退回默认样式。

## 六、常见问题

- 旧版本不支持 `display`：把 `{key:'X',display:'Y'}` 整个写成 `'X'`（如 `{key:'/new',display:'/N'}` → `'/new'`），功能不变，图标退回默认样式。
- 按键点了没反应：CTRL / ALT / SHIFT / FN 每个**只能放一枚**，多放会失效（已知限制）。
- 屏幕太窄嫌挤：直接切到上面的「无 AI 简洁版」，或者砍掉 `#`、`O` 重新排一下。

配置永远是自己的最好用，`#` 里想塞哪条 AI 指令、`O` 要不要换成别的命令，都随你——欢迎在评论区分享你的布局。

参考：[Termux Wiki · Touch Keyboard](https://wiki.termux.dev/wiki/Touch_Keyboard)、[termux-app · ExtraKeys 源码](https://github.com/termux/termux-app/blob/master/termux-shared/src/main/java/com/termux/shared/termux/extrakeys/ExtraKeysInfo.java)
