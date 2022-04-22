import React, { useRef } from 'react'
import { ReactEditor, RenderElementProps, useSlateStatic } from 'slate-react'
import { isFirstColumn } from '../helpers/columnCalcs'
import { ColumnNode } from '../types'
import './Columns.scss'

export const HorizontalDivider = () => {
  return <div className='horizontal-divider'></div>
}

type DividerProps = {
  nodeKey: string
}
export const VerticalDivider = ({ nodeKey }: DividerProps) => {
  const ref = useRef<HTMLDivElement>(null)
  //const resize = useResizeColumn(ref)

  const onResizeStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    //resize.start(nodeKey)
  }

  return (
    <div
      className='vertical-divider'
      contentEditable='false'
      ref={ref}
      onMouseDown={onResizeStart}></div>
  )
}

export const RowElement = ({ children, attributes }: RenderElementProps) => {
  return (
    <div className='editor-row' {...attributes}>
      <div className='editor-row__content'>{children}</div>
    </div>
  )
}

export const ColumnElement = ({
  element,
  children,
  attributes,
}: RenderElementProps) => {
  const editor = useSlateStatic()
  const { size = 12 } = element as ColumnNode
  const key = ReactEditor.findKey(editor, element)
  const isFirst = isFirstColumn(editor, element as ColumnNode)
  const columnWidth =
    size === 12
      ? '100%'
      : `calc(${(100 / 12) * size}% - ${(6 * (size - 1)) / size}px)`

  return (
    <>
      {!isFirst && <VerticalDivider nodeKey={key.id} />}
      <div
        {...attributes}
        className='editor-column'
        style={{ width: columnWidth }}
        data-size={size}
        data-key={key.id}>
        <div className='editor-column__content'>{children}</div>
      </div>
    </>
  )
}
