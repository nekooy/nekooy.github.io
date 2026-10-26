import { AnimatePresence, LazyMotion, m, domMax } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// 卡片 hover 高亮块：用 layoutId 在卡片之间「滑动」，需要 layout 特性（domMax）。
// 站点其余动效都只要 domAnimation，因此这里单独提供 domMax 特性集；
// 组件由 PostCard 以 client:only 挂载，走的是独立 island，
// 不会把自己的 layout 特性渗给其它组件，也不影响首屏。
export function PostCardHoverOverlay() {
  const ref = useRef<HTMLDivElement>(null)
  const [enter, setEnter] = useState(false)

  const handleMouseEnter = () => {
    setEnter(true)
  }
  const handleMouseLeave = () => {
    setEnter(false)
  }
  const handleFocus = () => {
    setEnter(true)
  }
  const handleBlur = () => {
    setEnter(false)
  }

  useEffect(() => {
    const $ref = ref.current
    if (!$ref) return
    const $parent = $ref.parentElement?.parentElement
    if (!$parent) return

    $parent.addEventListener('mouseenter', handleMouseEnter)
    $parent.addEventListener('mouseleave', handleMouseLeave)
    $parent.addEventListener('focus', handleFocus)
    $parent.addEventListener('blur', handleBlur)

    return () => {
      $parent.removeEventListener('mouseenter', handleMouseEnter)
      $parent.removeEventListener('mouseleave', handleMouseLeave)
      $parent.removeEventListener('focus', handleFocus)
      $parent.removeEventListener('blur', handleBlur)
    }
  }, [])

  return (
    <>
      <div ref={ref} className="hidden"></div>
      <LazyMotion features={domMax} strict>
        <AnimatePresence>
          {enter && (
            <m.div
              className="absolute inset-y-4 -inset-x-4 -z-1 bg-accent/10 rounded-lg"
              initial={{ opacity: 0.2, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
              layoutId="post-card-hover-overlay"
            ></m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </>
  )
}
