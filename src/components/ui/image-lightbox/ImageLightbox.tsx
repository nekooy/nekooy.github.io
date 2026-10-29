import { lazy, Suspense, useEffect, useState } from 'react'
import { loadImageLightboxStyles } from './styles'
import type { PreviewImage } from './types'

// yet-another-react-lightbox（含插件与样式）体积不小，只在第一次点开图片时才下载。
const PreviewPanel = lazy(() => import('./PreviewPanel'))

const PREVIEW_SELECTOR = '.markdown img'

function isPreviewable(image: HTMLImageElement) {
  // 被链接包裹的图片交给链接本身（例如跳转原图），不参与灯箱；
  // data-no-preview 留给以后不想被预览的图片。
  return !image.closest('a') && !image.hasAttribute('data-no-preview')
}

function collectImages(image: HTMLImageElement) {
  const container = image.closest('.markdown')
  if (!container) return []

  return Array.from(container.querySelectorAll<HTMLImageElement>('img')).filter(isPreviewable)
}

function toPreviewImage(image: HTMLImageElement): PreviewImage {
  return {
    src: image.currentSrc || image.src,
    alt: image.alt,
    width: image.naturalWidth || undefined,
    height: image.naturalHeight || undefined,
    caption: image.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || undefined,
  }
}

/**
 * 图片灯箱的挂载点：在 document 上做事件委托，因此 swup 换页替换 main 之后依然有效；
 * 页面级状态只保存当前要预览的图片列表，真正的灯箱组件按需加载。
 */
export function ImageLightbox() {
  const [preview, setPreview] = useState<{ images: PreviewImage[]; index: number } | null>(null)

  useEffect(() => {
    document.documentElement.classList.add('image-lightbox-ready')

    const open = (image: HTMLImageElement) => {
      if (!isPreviewable(image)) return false

      const images = collectImages(image)
      const index = images.indexOf(image)
      if (index === -1) return false

      const nextPreview = { images: images.map(toPreviewImage), index }

      // 面板代码和样式表并行加载，等样式生效后再渲染，避免第一次打开时闪一帧没样式的遮罩
      void import('./PreviewPanel').catch(() => {})
      loadImageLightboxStyles().then(() => setPreview(nextPreview))

      return true
    }

    const onClick = (event: MouseEvent) => {
      // 只响应干净的左键点击，避免干扰新标签页打开等浏览器行为
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }

      const target = event.target
      if (!(target instanceof Element)) return

      const image = target.closest<HTMLImageElement>('img')
      if (image?.matches(PREVIEW_SELECTOR)) {
        open(image)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return

      const target = event.target
      if (!(target instanceof HTMLImageElement) || !target.matches(PREVIEW_SELECTOR)) return

      if (open(target)) {
        event.preventDefault()
      }
    }

    // swup 换页后关掉残留的灯箱，避免新页面被遮罩压住
    const onContentReplace = () => setPreview(null)

    document.addEventListener('click', onClick)
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('swup:content:replace', onContentReplace)

    return () => {
      document.documentElement.classList.remove('image-lightbox-ready')
      document.removeEventListener('click', onClick)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('swup:content:replace', onContentReplace)
    }
  }, [])

  if (!preview) return null

  return (
    <Suspense fallback={null}>
      <PreviewPanel
        images={preview.images}
        index={preview.index}
        onClose={() => setPreview(null)}
      />
    </Suspense>
  )
}
