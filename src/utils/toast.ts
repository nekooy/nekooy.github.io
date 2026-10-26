import { createElement } from 'react'

// 提示条（react-toastify）约 15KB JS + 5KB CSS，只有点了「复制链接/分享」才可能出现。
// 这里把它整体推迟到第一次真正要弹提示时再加载：同时注入样式、挂载容器、再弹出提示，
// 因此首屏的 JS 与 CSS 里不再包含 react-toastify。

type ToastifyModule = typeof import('react-toastify')

let ready: Promise<ToastifyModule> | null = null

function ToastCloseButton({
  closeToast,
}: {
  closeToast: (event: React.MouseEvent<HTMLElement>) => void
}) {
  return createElement(
    'button',
    {
      type: 'button',
      'aria-label': 'Close Toast',
      className: 'text-lg opacity-50 hover:opacity-100',
      onClick: closeToast,
    },
    createElement('i', { className: 'iconfont icon-close' }),
  )
}

async function load() {
  const [mod, , { createRoot }] = await Promise.all([
    import('react-toastify'),
    import('react-toastify/dist/ReactToastify.css'),
    import('react-dom/client'),
  ])

  const host = document.createElement('div')
  host.id = 'toast-host'
  document.body.appendChild(host)

  createRoot(host).render(
    createElement(mod.ToastContainer, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: true,
      closeButton: ToastCloseButton,
      toastClassName: '!bg-primary !text-primary text-sm border border-primary',
    }),
  )

  return mod
}

async function showToast(type: 'success' | 'error', message: string) {
  const mod = ready ?? (ready = load())
  const { toast } = await mod
  toast[type](message)
}

export const toast = {
  success: (message: string) => showToast('success', message),
  error: (message: string) => showToast('error', message),
}
