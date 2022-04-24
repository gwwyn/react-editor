import { Editor, Node as SlateNode, Path } from 'slate'
import { ReactEditor } from 'slate-react'
import { ColumnNode, RowNode } from '../types'

//const GRID_SIZE = settings.MAX_COL_SIZE
const GUTTER = 6
const MIN_DIST = 30

/*const isNatural = (n: number): boolean => {
  return Math.abs(n) === n && Math.floor(n) === n
}*/

/*export const getColumnWidth = (rowWidth: number, size: number): number => {
  if (!isNatural(size) || size === 0 || size > GRID_SIZE) {
    throw new Error(`column size "${size}" is not valid`)
  }
  const cellWidth = (rowWidth - GUTTER * (GRID_SIZE - 1)) / GRID_SIZE
  if (size === 12) {
    return rowWidth
  }
  return cellWidth * size + GUTTER * (size - 1)
}*/

export const isFirstColumn = (editor: Editor, element: ColumnNode): boolean => {
  const path = ReactEditor.findPath(editor, element)
  const parent = SlateNode.descendant(editor, Path.parent(path)) as RowNode
  const res = parent.children && parent.children.indexOf(element) === 0
  return res
}

export const getResizeVal = (dist: number, width: number, size: number) => {
  const cell = (width - GUTTER * (size - 1)) / size
  const minDist = Math.max(cell / 2, MIN_DIST)
  const reminder = dist % (cell + GUTTER)
  const res =
    Math.ceil((width - dist) / (cell + GUTTER)) - (reminder >= minDist ? 1 : 0)
  return res > 1 ? res : 1
}
