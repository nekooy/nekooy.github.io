import type { ReactNode } from 'react'
import { LazyMotion, domAnimation } from 'framer-motion'

// framer-motion 的默认入口（motion.*）会把手势、drag、layout 全部打进首屏。
// 改成 LazyMotion + m.* 之后首屏只保留动画核心（domAnimation）；
// 唯一需要 layout 动画的 PostCardHoverOverlay 自己再套一层 domMax。
//
// 注意：LazyMotion 的特性是 React context，不会跨 Astro island 传递，
// 因此每个会渲染 m.* 的 island 根部都要各包一层。
//
// 所有动效参数（duration / ease / spring / stagger）保持原样，视觉零差异。

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}
