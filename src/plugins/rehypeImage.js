import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

export function rehypeImage() {
  return function (tree) {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'p' && node.children.length === 1) {
        const child = node.children[0]
        if (child.tagName === 'img') {
          parent.children[index] = buildFigure(child)
        }
      } else if (node.tagName === 'img') {
        parent.children[index] = buildImage(node)
      }
    })
  }
}

function buildImage(node) {
  const imgProps = node.properties

  // decoding="async" 让图片解码不阻塞主线程，视觉结果不变；
  // tabindex="0" 让键盘用户也能聚焦图片并用回车打开灯箱（见 ui/image-lightbox）。
  return h('img', { ...imgProps, loading: 'lazy', decoding: 'async', tabIndex: 0 })
}

function buildFigure(node) {
  let imgTitle = node.properties.title
  if (imgTitle) {
    imgTitle = imgTitle.trim()
  }

  return h('figure', null, [buildImage(node), imgTitle ? h('figcaption', imgTitle) : null])
}
