import {
  Editor,
  Element as SlateElement,
  Node as SlateNode,
  Path,
  Transforms,
} from 'slate'
import { ColumnNode } from '../types'

const MAX_COLUMN_SIZE = 6
const MIN_SIZE = 2

export const canAddColumn = (editor: Editor): boolean => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      SlateElement.isElementType(n, 'row') &&
      n.children.length < MAX_COLUMN_SIZE,
    mode: 'all',
  })
  return !!match
}

export const canRemoveColumn = (editor: Editor): boolean => {
  const [match] = Editor.nodes(editor, {
    match: n => SlateElement.isElementType(n, 'row') && n.children.length > 1,
    mode: 'all',
  })

  return !!match
}

export const addColumn = (editor: Editor) => {
  const [[node, path]] = Editor.nodes(editor, {
    match: n =>
      SlateElement.isElementType(n, 'row') &&
      n.children.length < MAX_COLUMN_SIZE,
    mode: 'highest',
  })
  if (!node) {
    return
  }
  Editor.withoutNormalizing(editor, () => {
    for (const [child, childPath] of SlateNode.children(editor, path, {
      reverse: true,
    })) {
      const col = child as ColumnNode
      if (!col.size || col.size > MIN_SIZE) {
        Transforms.setNodes(
          editor,
          { ...col, size: col.size ? col.size - 1 : 11 },
          { at: childPath }
        )
        const nextPath = Path.next(childPath)
        const column: ColumnNode = { type: 'column', size: 1, children: [] }
        Transforms.insertNodes(editor, column, { at: nextPath })
        return
      }
    }
  })
}

export const removeColumn = (editor: Editor) => {
  const [[_, path]] = Editor.nodes(editor, {
    match: n => SlateElement.isElement(n) && n.type === 'column',
    mode: 'highest',
  })
  Transforms.mergeNodes(editor, { at: path })
}

export const extendColumn = (editor: Editor) => { }

export const reduceColumn = (editor: Editor, node: ColumnNode) => { }
