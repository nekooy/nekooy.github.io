// 正文图片在点击时转换成这个结构，交给灯箱面板渲染
export interface PreviewImage {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
}
