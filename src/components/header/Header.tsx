import { BluredBackground } from './BluredBackground'
import { HeaderContent } from './HeaderContent'
import { SearchButton } from './SearchButton'
import { AnimatedLogo, MobileAnimatedLogo } from './AnimatedLogo'
import { HeaderMeta } from './HeaderMeta'
import { HeaderDrawer } from './HeaderDrawer'
import { MotionProvider } from '@/components/provider/MotionProvider'

// Header 是首屏元素，必须由 Astro 在构建时输出完整 HTML（client:load），
// 不能再用 client:only 等 React 下载并水合后才出现。
// 桌面/移动布局用 CSS 断点切换，避免依赖只能在浏览器里判断的视口状态。
export function Header({ pathName }: { pathName: string }) {
  const currentPath = pathName !== '/' ? pathName.replace(/\/$/, '') : '/'

  return (
    <MotionProvider>
      <header className="fixed top-0 inset-x-0 h-[64px] z-10 overflow-hidden">
        <BluredBackground />
        <div className="max-w-[1100px] h-full md:px-4 mx-auto grid grid-cols-[64px_auto_64px]">
          <div className="flex items-center justify-center">
            <div className="md:hidden">
              <HeaderDrawer />
            </div>
            <div className="hidden md:block">
              <AnimatedLogo />
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="md:hidden">
              <MobileAnimatedLogo />
            </div>
            <div className="hidden md:block">
              <HeaderContent pathName={currentPath} />
            </div>
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
