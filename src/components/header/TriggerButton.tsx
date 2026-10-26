import { forwardRef, type ButtonHTMLAttributes } from 'react'

// 抽屉的触发按钮。刻意与 HeaderDrawerPanel 分开：这里不引入 @radix-ui/react-dialog，
// 保证桌面端（永不渲染抽屉）不会把这个依赖打进首屏 chunk。
export const TriggerButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  (props, ref) => {
    return (
      <button
        ref={ref}
        className="size-9 rounded-full shadow-lg shadow-zinc-800/5 border border-primary bg-white/50 dark:bg-zinc-800/50 backdrop-blur"
        type="button"
        aria-label="Open menu"
        {...props}
      >
        <i className="iconfont icon-menu"></i>
      </button>
    )
  },
)
