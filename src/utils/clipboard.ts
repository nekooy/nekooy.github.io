/**
 * 复制文本到剪贴板。
 *
 * 优先使用 Clipboard API；在非安全上下文（如通过局域网 IP 访问 dev server）
 * 或 API 不可用 / 被拒绝时，降级为 textarea + execCommand 方案。
 *
 * @returns 是否复制成功
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // 权限被拒等情况，继续尝试降级方案
    }
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  // 避免影响页面布局与出现闪烁
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.opacity = '0'
  textarea.style.pointerEvents = 'none'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()

  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    document.body.removeChild(textarea)
  }
}
