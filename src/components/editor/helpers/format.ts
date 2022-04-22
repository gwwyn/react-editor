import {
  Editor,
  Element as SlateElement,
  Range as SlateRange,
  Transforms,
} from 'slate'
import { LinkNode } from '../types'

export const isTypeActive = (editor: Editor, type: string): boolean => {
  const { selection } = editor
  if (!selection) {
    return false
  }
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n => SlateElement.isElementType(n, type),
    })
  )
  return !!match
}

export const addLink = (editor: Editor, url: string, text?: string) => {
  const { selection } = editor
  if (!selection) {
    return
  }
  const isCollapsed = SlateRange.isCollapsed(selection)
  const link: LinkNode = {
    type: 'link',
    url,
    children: !isCollapsed ? [] : !text ? [{ text: url }] : [{ text: text }],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

export const removeLink = (editor: Editor) => {
  const { selection } = editor
  if (!selection) {
    return
  }
  if (isTypeActive(editor, 'link')) {
    Transforms.unwrapNodes(editor, {
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
  }
}
