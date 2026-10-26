import { AnimatePresence, m } from 'framer-motion'
import { useShouldHeaderMetaShow, useIsMobile } from './hooks'

export function AnimatedLogo() {
  const isMobile = useIsMobile()
  const shouldHeaderMetaShow = useShouldHeaderMetaShow()

  if (!isMobile) {
    return <Logo />
  }

  return (
    <AnimatePresence>
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
