// 图片工具：文章卡片的封面缩略图约定为 `<原名>-thumb.webp`，
// 由 `pnpm gen-thumbs`（scripts/gen-thumbnails.js）生成到 public/ 下。
// 缩略图缺失时退回原图，保证新增文章忘跑脚本也不会白板。

export function getCoverThumb(cover?: string) {
  if (!cover) return undefined
  const matched = cover.match(/^(.*)\.(jpe?g|png|webp|avif)$/i)
  if (!matched) return cover
  return `${matched[1]}-thumb.webp`
}
