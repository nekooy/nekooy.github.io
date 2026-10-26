import { menus } from '@/config.json'
import { createContext, useContext, type RefObject } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { m, AnimatePresence } from 'framer-motion'
import clsx from 'clsx'

// 移动端抽屉面板。独立成文件是为了让 @radix-ui/react-dialog（约 13KB）
// 只在真正打开抽屉时才加载，桌面端完全不下载。
//
// 动效参数与拆分前完全一致：整体 x 位移 0.2s easeOut + 子项错开 0.1s。

const contentVariants = {
  hidden: {
    x: '-100%',
    transition: {
      duration: 0.2,
      ease: 'easeOut',
    },
  },
  visible: {
    x: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
      duration: 0.2,
      ease: 'easeOut',
    },
  },
}

const menuItemVariants = {
  hidden: {
    opacity: 0,
    x: '-100%',
  },
  visible: {
    opacity: 1,
    x: 0,
  },
}

export function HeaderDrawerPanel({
  isOpen,
  setIsOpen,
  triggerRef,
  zIndex = 999,
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  triggerRef: RefObject<HTMLButtonElement>
  zIndex?: number
}) {
  const overlayZIndex = zIndex - 1
  const contentZIndex = zIndex

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {/* 真实触发按钮在面板外，这里只挂一个占位 Trigger 承接 Radix 的焦点管理，
          关闭时再把焦点还给真实按钮，行为与拆分前一致。 */}
      <Dialog.Trigger asChild>
        <span hidden aria-hidden />
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
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
              asChild
              onCloseAutoFocus={(event) => {
                event.preventDefault()
                triggerRef.current?.focus()
              }}
            >
              <m.div
                className="fixed left-0 inset-y-0 h-full bg-primary rounded-r-lg p-4 flex flex-col justify-center w-[260px] max-w-[80%]"
                style={{ zIndex: contentZIndex }}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <DrawerContext.Provider
                  value={{
                    dismiss() {
                      setIsOpen(false)
                    },
                  }}
                >
                  <DrawerContentImpl />
                </DrawerContext.Provider>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

function DrawerContentImpl() {
  const { dismiss } = useContext(DrawerContext)

  return (
    <ul className="mt-8 pb-8 overflow-y-auto overflow-x-hidden min-h-0">
      {menus.map((menu) => (
        <m.li key={menu.name} variants={menuItemVariants}>
          <a className="inline-flex p-2 space-x-4" href={menu.link} onClick={dismiss}>
            <i className={clsx('iconfont', menu.icon)}></i>
            <span>{menu.name}</span>
          </a>
        </m.li>
      ))}
    </ul>
  )
}

const DrawerContext = createContext<{ dismiss(): void }>(null!)
