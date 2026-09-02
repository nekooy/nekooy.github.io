import { motion, useReducedMotion } from 'framer-motion'

const jellySpring = { type: 'spring', stiffness: 360, damping: 14, mass: 0.6 } as const

/**
 * 首页头像：点击时果冻按压（scale 0.88 + spring 回弹）。
 * 尊重 prefers-reduced-motion，降级为无动效。
 */
export function HeroAvatar() {
  const reduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      aria-label="Site owner avatar"
      className="size-[200px] lg:size-[300px] cursor-pointer select-none touch-manipulation rounded-full border border-primary bg-zinc-100 p-0 dark:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:rgb(var(--color-accent))]"
      style={{ WebkitTapHighlightColor: 'transparent' }}
      whileTap={reduceMotion ? undefined : { scale: 0.88 }}
      transition={jellySpring}
    >
      <img
        className="size-full overflow-hidden rounded-full"
        src="/hero-avatar.webp"
        alt="Site owner avatar"
        loading="lazy"
      />
    </motion.button>
  )
}
