import {
  Descendant,
  Editor,
  Element as SlateElement,
  Node as SlateNode,
  Transforms,
} from 'slate'
import isUrl from 'is-url'
import { ColumnNode, CustomEditor, CustomElement, RowNode } from './types'
import { addLink } from './helpers/format'

const INLINE_TYPES = ['mention', 'link']
const VOID_TYPES = ['mention', 'image']

function withEditor(editor: CustomEditor) {
  const { isInline, isVoid, insertText, insertData, normalizeNode } = editor

  editor.isInline = element => {
    return INLINE_TYPES.includes(element.type) ? true : isInline(element)
  }

  editor.isVoid = element => {
    return VOID_TYPES.includes(element.type) ? true : isVoid(element)
  }

  editor.insertText = text => {
    // TODO: replace is-url with custom check
    if (text && isUrl(text)) {
      addLink(editor, text)
    } else {
      insertText(text)
    }
  }

  // TODO: find out why both insertText and insertData may be needed
  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      addLink(editor, text)
    } else {
      insertData(data)
    }
  }

  editor.normalizeNode = entry => {
    const [node, path] = entry

    // 1. ROWS/COLUMNS
    // 1.1 Top level structure is RowNode[]
    if (Editor.isEditor(node)) {
      for (const [child, childPath] of SlateNode.children(editor, path)) {
        if (SlateElement.isElement(child) && child.type !== 'row') {
          const row: RowNode = { type: 'row', children: [] }
          Transforms.wrapNodes(editor, row, { at: childPath, split: true })
          return
        }
      }
    }

    // 1.2 Rows must contain columns
    if (SlateElement.isElement(node) && node.type === 'row') {
      for (const [child, childPath] of SlateNode.children(editor, path)) {
        if (!SlateElement.isElement(child) || child.type !== 'column') {
          const column = { type: 'column', children: [child] }
          Transforms.wrapNodes(editor, column as CustomElement, {
            at: childPath,
          })
          return
        }
      }
    }

    // 1.3 Two adjacent single-column rows should be merged
    if (Editor.isEditor(node)) {
      let prevChild: Descendant | null = null
      for (const [child, childPath] of SlateNode.children(editor, path)) {
        if (
          SlateElement.isElement(child) &&
          child.type === 'row' &&
          child.children.length === 1 &&
          prevChild !== null &&
          SlateElement.isElement(prevChild) &&
          prevChild.type === 'row' &&
          prevChild.children.length === 1
        ) {
          Editor.withoutNormalizing(editor, () => {
            for (const [col, colPath] of SlateNode.children(
              editor,
              childPath
            )) {
              const newCol = { ...col, merge: true }
              Transforms.setNodes(editor, newCol as ColumnNode, { at: colPath })
            }
            Transforms.mergeNodes(editor, { at: childPath })
          })

          return
        }
        prevChild = child
      }
    }

    if (!SlateElement.isElement(node)) {
      // If Editor or Text
      normalizeNode(entry)
      return
    }

    // 1.3.1 Merge columns if rows was merged
    if (node.type === 'column' && node.merge) {
      Transforms.mergeNodes(editor, { at: path })
      return
    }

    // 1.4 No nested rows/columns are allowed
    for (const [child, childPath] of SlateNode.children(editor, path)) {
      const hasNestedRow = SlateElement.isElement(child) && child.type === 'row'
      const hasNestedColumn =
        SlateElement.isElement(child) &&
        node.type !== 'row' &&
        child.type === 'column'
      if (hasNestedRow || hasNestedColumn) {
        Transforms.unwrapNodes(editor, { at: childPath })
        return
      }
    }

    // 1.5 Remove redundant columns (max: 6)
    /*if (node.type === 'row' && node.children.length > settings.COLUMN_AMMOUNT) {
      // TODO: find less buggy solution
      HistoryEditor.withoutSaving(editor, () => {
        const firstChild = SlateNode.child(node, settings.COLUMN_AMMOUNT)
        const lastChild = SlateNode.child(node, node.children.length - 1)
        const firstPath = ReactEditor.findPath(editor, firstChild)
        const lastPath = ReactEditor.findPath(editor, lastChild)
        const range = Editor.range(editor, firstPath, lastPath)
        Transforms.mergeNodes(editor, { at: range })
      })
      return
    }*/

    // 1.5 Calculate column size
    /*if (node.type === 'row') {
      if (node.children.length === 1) {
        for (const [child, childPath] of SlateNode.children(editor, path)) {
          if (
            SlateElement.isElement(child) &&
            child.type === 'column' &&
            child.size !== undefined
          ) {
            const column: ColumnNode = {
              type: 'column',
              children: child.children,
            }
            Transforms.setNodes(editor, column, { at: childPath })
          }
        }
        return
      }
      const voidColumns: NodeEntry<ColumnNode>[] = []
      let sum = 0
      for (const [child, childPath] of SlateNode.children(editor, path)) {
        if (!SlateElement.isElement(child) || child.type !== 'column') {
          return
        }
        sum += child.size || 0
        if (!child.size) {
          voidColumns.push([child, childPath])
        }
      }
      sum += voidColumns.length
      Editor.withoutNormalizing(editor, () => {
        while (voidColumns.length > 0) {
          const [col, colPath] = voidColumns.pop() as NodeEntry<ColumnNode>
          Transforms.setNodes(editor, { ...col, size: 1 }, { at: colPath })
        }
        const max = settings.MAX_COL_SIZE
        if (sum !== max) {
          const sign = Math.sign(max - sum)
          let tail = Math.abs(max - sum)
          const add = Math.ceil(tail / node.children.length)
          let i = 0
          while (tail > 0) {
            const a = Math.min(tail, add)
            const child = SlateNode.child(node, i)
            if (
              !SlateElement.isElement(child) ||
              child.type !== 'column' ||
              !child.size
            ) {
              continue
            }
            const childPath = ReactEditor.findPath(editor, child)
            const column = { ...child, size: child.size + a * sign }
            Transforms.setNodes(editor, column, { at: childPath })
            tail -= a
            i++
          }
        }
        if (sum > max) {
        }
      })
      return
    }*/

    normalizeNode(entry)
  }

  return editor
}

export default withEditor

/*

      // TODO:
      // remove extra columns (max: 6)
      // fix column width
    }

    // 1.5 Calculate column width
      const voidColumns = []
      let sum = 0
      for (const [child, childPath] of SlateNode.children(editor, path)) {
        if (!SlateElement.isElement(child) || child.type !== 'column') {
          return
        }

        const size: number = child.size ? child.size : 0
        sum += size
        if (!size) {
          voidColumns.push()
        }
      }
    }
    */
