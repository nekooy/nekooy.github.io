import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { TriggerButton } from './TriggerButton'

// 抽屉面板（含 Radix Dialog，约 13KB）只在移动端真正打开时才加载；
// 首屏之后在空闲时预取，点开时基本已是热的，动画不受影响。
const HeaderDrawerPanel = lazy(() =>
  import('./HeaderDrawerPanel').then((module) => ({ default: module.HeaderDrawerPanel })),
)

export function HeaderDrawer({ zIndex = 999 }: { zIndex?: number }) {
  const [isOpen, setIsOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (ready) return
    const prefetch = () => setReady(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    }
    const timer = setTimeout(prefetch, 1500)
    return () => clearTimeout(timer)
  }, [ready])

  return (
    <>
      <TriggerButton
        ref={triggerRef}
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      />
      {(ready || isOpen) && (
        <Suspense fallback={null}>
          <HeaderDrawerPanel
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            triggerRef={triggerRef}
            zIndex={zIndex}
          />
        </Suspense>
      )}
    </>
  )
}
