import { AnimatePresence, m } from 'framer-motion'
import { useShouldHeaderMetaShow } from './hooks'

/** 桌面端固定在左上角的站点 Logo。 */
export function AnimatedLogo() {
  return <Logo />
}

/** 移动端居中的站点 Logo：文章页滚动后让位给标题信息。 */
export function MobileAnimatedLogo() {
  const shouldHeaderMetaShow = useShouldHeaderMetaShow()

  return (
    <AnimatePresence initial={false}>
      {!shouldHeaderMetaShow && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Logo />
        </m.div>
      )}
    </AnimatePresence>
  )
}

function Logo() {
  return (
    <a className="block" href="/" title="Nav to home">
      <img
        className="size-[40px] select-none object-cover rounded-2xl"
        src="/logo-thumb.webp"
        alt="Site owner avatar"
        width="40"
        height="40"
        decoding="async"
      />
    </a>
  )
}
