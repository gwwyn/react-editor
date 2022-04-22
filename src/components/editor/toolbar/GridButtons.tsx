import React from 'react'
import { Editor, Element as SlateElement, Path, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import Button from '../../ui/button'
import { useSettings } from '../hooks/useSettings'

const MAX_COLUMN_SIZE = 6

const canAddColumn = (editor: Editor): boolean => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      SlateElement.isElement(n) &&
      n.type === 'row' &&
      n.children.length < MAX_COLUMN_SIZE,
    mode: 'all',
  })
  return !!match
}

const canRemoveColumn = (editor: Editor): boolean => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      SlateElement.isElement(n) && n.type === 'row' && n.children.length > 1,
    mode: 'all',
  })
  /*const [node] = Editor.nodes(editor, {
    match: n => SlateElement.isElement(n) && n.type === 'column',
    mode: 'all',
  })

  return !!match && node && !isFirstColumn(editor, node[0] as ColumnNode)*/
  return !!match
}

const addColumn = (editor: Editor) => {
  const [[_, path]] = Editor.nodes(editor, {
    match: n => SlateElement.isElement(n) && n.type === 'column',
    mode: 'highest',
  })
  const nextPath = Path.next(path)
  Transforms.insertNodes(
    editor,
    {
      type: 'column',
      children: [
        {
          type: 'paragraph',
          children: [],
        },
      ],
    },
    { at: nextPath }
  )
}

const removeColumn = (editor: Editor) => {
  const [[_, path]] = Editor.nodes(editor, {
    match: n => SlateElement.isElement(n) && n.type === 'column',
    mode: 'highest',
  })
  Transforms.mergeNodes(editor, { at: path })
}

function GridButtons() {
  const editor = useSlate()
  const [settings, setSettings] = useSettings()

  return (
    <>
      <Button
        icon='table'
        label='show table grid'
        isActive={settings.showGrid}
        onClick={() =>
          setSettings({
            ...settings,
            showGrid: !settings.showGrid,
          })
        }></Button>
      <Button
        icon='remove-column'
        label='remove column'
        isActive={canRemoveColumn(editor)}
        onClick={() => removeColumn(editor)}></Button>
      <Button
        icon='add-column'
        label='add column'
        isActive={canAddColumn(editor)}
        onClick={() => addColumn(editor)}></Button>
    </>
  )
}

export default GridButtons
