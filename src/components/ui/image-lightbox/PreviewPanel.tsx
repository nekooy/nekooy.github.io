import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import Counter from 'yet-another-react-lightbox/plugins/counter'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import type { PreviewImage } from './types'

const labels = {
  Close: '关闭',
  Previous: '上一张',
  Next: '下一张',
  Slide: '图片',
  Carousel: '图片列表',
  Lightbox: '图片预览',
  'Photo gallery': '图片预览',
  'Zoom in': '放大',
  'Zoom out': '缩小',
  '{index} of {total}': '{index} / {total}',
}

export default function PreviewPanel({
  images,
  index,
  onClose,
}: {
  images: PreviewImage[]
  index: number
  onClose: () => void
}) {
  const slides = images.map((image) => ({
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    description: image.caption,
  }))

  return (
    <Lightbox
      open
      close={onClose}
      index={index}
      slides={slides}
      className="image-lightbox"
      plugins={images.length > 1 ? [Captions, Counter, Zoom] : [Captions, Zoom]}
      labels={labels}
      // 单图时藏掉左右切换按钮，只保留放大与关闭；3% 留白在窄屏也不会挤
      render={images.length > 1 ? undefined : { buttonPrev: () => null, buttonNext: () => null }}
      carousel={{ finite: true, preload: 1, padding: '3%' }}
      controller={{ closeOnBackdropClick: true }}
      captions={{ descriptionTextAlign: 'center' }}
    />
  )
}
