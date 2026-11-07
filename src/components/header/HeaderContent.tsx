import { useState } from 'react'
import { menus } from '@/config.json'
import { clsx } from 'clsx'
import { AnimatePresence, m } from 'framer-motion'
import {
  usePathName,
  useShouldAccessibleMenuShow,
  useShouldHeaderMenuBgShow,
  useShouldHeaderMetaShow,
} from './hooks'
import { RootPortal } from '@/components/RootPortal'

export function HeaderContent({ pathName }: { pathName: string }) {
  return (
    <>
      <AnimatedMenu pathName={pathName} />
      <AccessibleMenu pathName={pathName} />
    </>
  )
}

function AnimatedMenu({ pathName }: { pathName: string }) {
  const shouldBgShow = useShouldHeaderMenuBgShow()
  const shouldHeaderMetaShow = useShouldHeaderMetaShow()

  return (
    <AnimatePresence initial={false}>
      {!shouldHeaderMetaShow && (
        <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <HeaderMenu isBgShow={shouldBgShow} pathName={pathName} />
        </m.div>
      )}
    </AnimatePresence>
  )
}

function AccessibleMenu({ pathName }: { pathName: string }) {
  const shouldShow = useShouldAccessibleMenuShow()

  return (
    <RootPortal>
      <AnimatePresence initial={false}>
        {shouldShow && (
          <m.div
            className="fixed z-10 top-12 inset-x-0 flex justify-center pointer-events-none"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <HeaderMenu isBgShow pathName={pathName} />
          </m.div>
        )}
      </AnimatePresence>
    </RootPortal>
  )
}

function HeaderMenu({ isBgShow, pathName }: { isBgShow: boolean; pathName: string }) {
  const atomPathName = usePathName()
  // 首屏 SSR 时 Provider 尚未水合，atom 还是空串，用 Astro 传入的 pathName 兜底
  const currentPath = atomPathName || pathName
  const [mouseX, setMouseX] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const [radius, setRadius] = useState(0)

  const background = `radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, rgb(var(--color-accent) / 0.12) 0%, transparent 65%)`

  const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
    const bounds = currentTarget.getBoundingClientRect()
    setMouseX(clientX - bounds.left)
    setMouseY(clientY - bounds.top)
    setRadius(Math.sqrt(bounds.width ** 2 + bounds.height ** 2) / 2.5)
  }

  return (
    <nav
      className={clsx('relative rounded-full group pointer-events-auto duration-200', {
        'bg-gradient-to-b from-zinc-50/70 to-white/90 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10':
          isBgShow,
      })}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute -z-1 -inset-px rounded-full opacity-0 group-hover:opacity-100 duration-500"
        style={{ background }}
        aria-hidden
      ></div>
      <div className="text-sm px-4 flex">
        {menus.map((menu) => (
          <HeaderMenuItem
            key={menu.name}
            href={menu.link}
            title={menu.name}
            icon={menu.icon}
            isActive={currentPath === menu.link}
          />
        ))}
      </div>
    </nav>
  )
}

function HeaderMenuItem({
  href,
  isActive,
  title,
  icon,
}: {
  href: string
  isActive: boolean
  title: string
  icon: string
}) {
  return (
    <a
      className={clsx('relative block px-4 py-1.5', isActive ? 'text-accent' : 'hover:text-accent')}
      href={href}
    >
      <div className="flex space-x-2">
        {isActive && (
          <m.i
            className={clsx('iconfont', icon)}
            initial={false}
            animate={{ y: 0, opacity: 1 }}
          ></m.i>
        )}
        <span>{title}</span>
      </div>
      {isActive && (
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"></div>
      )}
    </a>
  )
}
