/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Waline 的样式表只有 CSS 入口、没有类型声明，这里补一个模块声明
declare module '@waline/client/style'
declare module '@waline/client/style?url' {
  const url: string
  export default url
}

// KaTeX 样式表以 URL 形式引入（只在含公式的页面）
declare module 'katex/dist/katex.min.css?url' {
  const url: string
  export default url
}
