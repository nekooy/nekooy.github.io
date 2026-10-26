import { useAtomValue } from 'jotai'
import { pageScrollLocationAtom } from '@/store/scrollInfo'
import { AnimatePresence, m } from 'framer-motion'
import { MotionProvider } from '@/components/provider/MotionProvider'

export function BackToTopFAB() {
  const scrollY = useAtomValue(pageScrollLocationAtom)
  const isShow = scrollY > 100

  return (
    <MotionProvider>
      <div className="fixed right-4 bottom-6 z-10">
        <AnimatePresence>{isShow && <BackToTop />}</AnimatePresence>
      </div>
    </MotionProvider>
  )
}

function BackToTop() {
  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <m.button
      className="size-10 rounded-full shadow-lg shadow-zinc-800/5 border border-primary bg-white/50 dark:bg-zinc-800/50 backdrop-blur"
      type="button"
      aria-label="Back to top"
      onClick={handleBackToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <i className="iconfont icon-rocket"></i>
    </m.button>
  )
}
