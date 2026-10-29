import captionsCssUrl from 'yet-another-react-lightbox/plugins/captions.css?url'
import counterCssUrl from 'yet-another-react-lightbox/plugins/counter.css?url'
import lightboxCssUrl from 'yet-another-react-lightbox/styles.css?url'
import panelCssUrl from './styles.css?url'

// 走 ?url 而不是直接 import：CSS 不会被打进页面样式表，而是等第一次打开灯箱时
// 再注入 <link>（和 Waline / KaTeX 的做法一致），首屏不必为它买单。
const stylesheetUrls = [lightboxCssUrl, captionsCssUrl, counterCssUrl, panelCssUrl]

function loadStylesheet(url: string) {
  return new Promise<void>((resolve) => {
    if (document.querySelector(`link[rel="stylesheet"][href="${url}"]`)) {
      resolve()
      return
    }

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    link.addEventListener('load', () => resolve())
    // 样式表加载失败也继续渲染：此时只是少一层美化，预览和关闭仍然可用
    link.addEventListener('error', () => resolve())
    document.head.append(link)
  })
}

/**
 * 注入灯箱样式并等它生效。
 *
 * 不能缓存「已加载」状态：swup 换页会同步替换 <head>，之前注入的 <link> 会被移除，
 * 所以每次打开都检查一遍（已存在时命中上面的判断，开销只是几次 querySelector）。
 */
export function loadImageLightboxStyles() {
  if (typeof document === 'undefined') return Promise.resolve()

  return Promise.all(stylesheetUrls.map(loadStylesheet)).then(() => undefined)
}
