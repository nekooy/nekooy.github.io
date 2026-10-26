import { BluredBackground } from './BluredBackground'
import { HeaderContent } from './HeaderContent'
import { SearchButton } from './SearchButton'
import { AnimatedLogo } from './AnimatedLogo'
import { HeaderMeta } from './HeaderMeta'
import { HeaderDrawer } from './HeaderDrawer'
import { MotionProvider } from '@/components/provider/MotionProvider'
import { useIsMobile } from './hooks'

// Header 是一个独立的 Astro island，LazyMotion 的 context 不会跨 island 传递，
// 所以这里在根节点包一层，覆盖内部所有 m.* 动效组件。
export function Header() {
  const isMobile = useIsMobile()

  return (
    <MotionProvider>
      <header className="fixed top-0 inset-x-0 h-[64px] z-10 overflow-hidden">
        <BluredBackground />
        <div className="max-w-[1100px] h-full md:px-4 mx-auto grid grid-cols-[64px_auto_64px]">
          <div className="flex items-center justify-center">
            {isMobile ? <HeaderDrawer /> : <AnimatedLogo />}
          </div>
          <div className="relative flex items-center justify-center">
            {isMobile ? <AnimatedLogo /> : <HeaderContent />}
            <HeaderMeta />
          </div>
          <div className="flex items-center justify-center">
            <SearchButton />
          </div>
        </div>
      </header>
    </MotionProvider>
  )
}
