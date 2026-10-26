// 生成文章卡片用的封面缩略图：文章卡片只显示 80×80，原图动辄 1200–1920px，
// 直接引用会让首页多下载上百 KB。这里按 240×240（3 倍屏）居中裁切出 *-thumb.webp。
//
// 用法：pnpm gen-thumbs（pnpm build 会自动执行）
// 缩略图比原图新时跳过，因此重复构建不会反复重编码。

import sharp from 'sharp'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { basename, extname, join } from 'node:path'

const PUBLIC_DIR = join(process.cwd(), 'public')
const POSTS_DIR = join(process.cwd(), 'src', 'content', 'posts')
const SIZE = 240

function collectCovers() {
  const covers = new Set()
  for (const file of readdirSync(POSTS_DIR)) {
    if (!file.endsWith('.md')) continue
    const content = readFileSync(join(POSTS_DIR, file), 'utf8')
    const matched = content.match(/^cover:\s*(\S+)\s*$/m)
    if (matched) covers.add(matched[1])
  }
  return covers
}

function thumbName(cover) {
  const ext = extname(cover)
  return `${basename(cover, ext)}-thumb.webp`
}

let generated = 0
let skipped = 0

for (const cover of collectCovers()) {
  const source = join(PUBLIC_DIR, cover.replace(/^\//, ''))
  if (!existsSync(source)) {
    console.warn(`跳过：找不到封面原图 ${cover}`)
    continue
  }

  const target = join(PUBLIC_DIR, thumbName(cover))
  if (existsSync(target) && statSync(target).mtimeMs >= statSync(source).mtimeMs) {
    skipped += 1
    continue
  }

  await sharp(source)
    .resize(SIZE, SIZE, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toFile(target)
  console.log(`${cover} → ${thumbName(cover)}  ${(statSync(target).size / 1024).toFixed(1)}KB`)
  generated += 1
}

console.log(`缩略图：新生成 ${generated} 张，已是最新 ${skipped} 张`)
