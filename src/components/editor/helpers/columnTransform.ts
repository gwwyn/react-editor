import {
  Editor,
  Element as SlateElement,
  Node as SlateNode,
  Path,
  Transforms,
} from 'slate'
import { ReactEditor } from 'slate-react'
import { ColumnNode, RowNode } from '../types'

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

export const isSingleColumn = (editor: Editor): boolean => {
  const [match] = Editor.nodes(editor, {
    match: n => SlateElement.isElementType(n, 'row') && n.children.length > 1,
    mode: 'all',
  })

  return !!match
}
export const canRemoveColumn = isSingleColumn

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
  const [[node, path]] = Editor.nodes<ColumnNode>(editor, {
    match: n => SlateElement.isElementType(n, 'column'),
    mode: 'highest',
  })
  /*const entry = Editor.previous<ColumnNode>(editor, { at: path })
  if (!entry) {
    return
  }
  const [prevNode, prevPath] = entry
  Transforms.setNodes(
    editor,
    {
      size: (prevNode.size || 12) + (node.size || 12),
    },
    { at: prevPath }
  )*/

  Transforms.mergeNodes(editor, { at: path })
}

const getPrevIndex = (length: number, index: number): number => {
  if (length === 1 || index < 0) {
    return index
  }
  if (!index) {
    return length - 1
  }
  return index - 1
}

const getPrevColumn = (
  editor: Editor,
  row: RowNode,
  column: ColumnNode
): [ColumnNode, Path] | undefined => {
  const index = row.children.indexOf(column)
  let j = getPrevIndex(row.children.length, index)

  while (j !== index) {
    const node = row.children[j] as ColumnNode
    if (!node.size || node.size > 1) {
      return [node, ReactEditor.findPath(editor, node)]
    }

    j = getPrevIndex(row.children.length, j)
  }
}

type ChangeType = 'extend' | 'reduce'
const changeColumnSize = (editor: Editor, type: ChangeType) => {
  if (!isSingleColumn(editor)) {
    return
  }
  const [[column, columnPath]] = Editor.nodes<ColumnNode>(editor, {
    match: n => SlateElement.isElementType(n, 'column'),
    mode: 'highest',
  })
  if (type === 'reduce' && column.size && column.size <= 1) {
    return
  }
  const [[row]] = Editor.nodes<RowNode>(editor, {
    match: n => SlateElement.isElementType(n, 'row'),
    mode: 'highest',
  })

  const entry = getPrevColumn(editor, row, column)
  if (!entry) {
    return
  }
  const [prevNode, prevPath] = entry
  const coe = type === 'extend' ? 1 : -1

  Editor.withoutNormalizing(editor, () => {
    Transforms.setNodes(
      editor,
      { size: (prevNode.size || 12) - coe },
      { at: prevPath }
    )
    Transforms.setNodes(
      editor,
      { size: (column.size || 12) + coe },
      { at: columnPath }
    )
  })
}

export const extendColumn = (editor: Editor) =>
  changeColumnSize(editor, 'extend')

export const reduceColumn = (editor: Editor) =>
  changeColumnSize(editor, 'reduce')
