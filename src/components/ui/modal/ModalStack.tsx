import { useAtomValue } from 'jotai'
import { lazy, Suspense } from 'react'
import { modalStackAtom } from '@/store/modalStack'
import { AnimatePresence } from 'framer-motion'

// @radix-ui/react-dialog 约 13KB，只在真的打开弹窗（搜索 / 分享）时才需要，
// 因此整块 Modal 实现（含 Radix）都改成按需加载；栈为空时不渲染任何东西。
const Modal = lazy(() => import('./Modal').then((module) => ({ default: module.Modal })))

export function ModalStack() {
  const modalStack = useAtomValue(modalStackAtom)

  if (modalStack.length === 0) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <AnimatePresence>
        {modalStack.map((modal, index) => (
          <Modal key={modal.id} index={index} id={modal.id}>
            {modal.content}
          </Modal>
        ))}
      </AnimatePresence>
    </Suspense>
  )
}
