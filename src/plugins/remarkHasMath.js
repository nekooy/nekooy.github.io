import { visit } from 'unist-util-visit'

// 标记该文章正文是否包含公式（remark-math 成功解析出的 math / inlineMath 节点）。
// 布局层据此决定是否引入 KaTeX 样式：绝大多数文章没有公式，
// 不必为了 8KB gzip 的 KaTeX CSS 买单；视觉上完全等价。
export function remarkHasMath() {
  return function (tree, { data }) {
    let found = false
    visit(tree, (node) => {
      if (node.type === 'math' || node.type === 'inlineMath') {
        found = true
        return false
      }
      return undefined
    })
    data.astro.frontmatter.hasMath = found
  }
}
