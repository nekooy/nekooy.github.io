import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * 把子节点渲染到指定容器（默认 body）。
 * 默认容器只能在挂载后读取 document，否则 SSR 阶段会直接抛错；
 * 因此首帧先渲染 null，水合后再建立 portal。
 */
export function RootPortal({ to, children }: { to?: HTMLElement; children: React.ReactNode }) {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setContainer(to ?? document.body)
  }, [to])

  if (!container) return null

  return createPortal(children, container)
}
