import { modalStackAtom } from '@/store/modalStack'
import { useSetAtom } from 'jotai'
import * as Dialog from '@radix-ui/react-dialog'
import { m } from 'framer-motion'
import { MotionProvider } from '@/components/provider/MotionProvider'
import { CurrentModalContext } from './context'

export function Modal({
  children,
  index,
  id,
}: {
  index: number
  children: React.ReactNode
  id: string
}) {
  const baseZIndex = 1000
  const overlayZIndex = baseZIndex + index
  const contentZIndex = baseZIndex + index + 1
  const setModalStack = useSetAtom(modalStackAtom)

  const close = () => {
    setModalStack((stack) => stack.filter((modal) => modal.id !== id))
  }

  return (
    <MotionProvider>
      <Dialog.Root
        open
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            close()
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay asChild>
            <m.div
              className="fixed inset-0 bg-gray-800/40"
              style={{ zIndex: overlayZIndex }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0.1 } }}
            ></m.div>
          </Dialog.Overlay>

          <Dialog.Content
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: contentZIndex }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                close()
              }
            }}
          >
            <CurrentModalContext.Provider value={{ dismiss: close }}>
              {children}
            </CurrentModalContext.Provider>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </MotionProvider>
  )
}
