import { useEffect, useRef } from 'react'
import walineCssUrl from '@waline/client/style?url'

type WalineInstance = { destroy?: () => void }

// 评论样式单独作为资源文件（?url 不会被打进页面 CSS），滚动到评论区时才注入 <link>，
// 这样所有页面的首屏 CSS 里都不再带 Waline 那 19KB。
let cssLoaded = false
function loadCss() {
  if (cssLoaded || typeof document === 'undefined') return
  cssLoaded = true
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = walineCssUrl
  document.head.appendChild(link)
}

/**
 * 评论组件：Waline 只在滚动到评论区时才真正加载（client:visible），
 * 组件内部再动态 import 逻辑与样式，避免它们进入首屏依赖。
 */
export function Waline({ serverURL }: { serverURL: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let destroyed = false
    let instance: WalineInstance | null = null

    async function mount() {
      loadCss()
      const module = await import('@waline/client')
      if (destroyed || !ref.current) return
      instance = module.init({
        el: ref.current,
        serverURL,
        dark: "[data-theme='dark']",
        login: 'force',
        imageUploader: false,
        search: false,
        locale: {
          placeholder: '发条友善的评论吧（支持 Markdown 语法）…',
        },
        emoji: ['//unpkg.com/@waline/emojis@1.1.0/bilibili'],
      })
    }

    mount()

    return () => {
      destroyed = true
      instance?.destroy?.()
    }
  }, [serverURL])

  return <div ref={ref}></div>
}
