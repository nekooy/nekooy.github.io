import { m } from 'framer-motion'
import { MotionProvider } from '@/components/provider/MotionProvider'

export function HeadGradient() {
  return (
    <MotionProvider>
      <m.div
        className="absolute -z-1 top-0 inset-x-0 h-[350px] bg-gradient-to-r from-accent/5 to-accent/15"
        style={{
          maskImage: 'linear-gradient(black, transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      ></m.div>
    </MotionProvider>
  )
}
