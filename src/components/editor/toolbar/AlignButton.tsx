import React from 'react'
import { Editor, Element as SlateElement, Transforms } from 'slate'
import { useSlate } from 'slate-react'
import Button from '../../ui/button'
import { AlignTypes } from '../types'

type AlignButtonProps = {
  format: AlignTypes
  children?: string
}
function AlignButton({ format, children }: AlignButtonProps) {
  const editor = useSlate()
  const onClick = () => {
    toggleAlign(editor, format)
  }
  return (
    <Button
      icon={format}
      label={format}
      onClick={onClick}
      isActive={isFormatActive(editor, format)}>
      {children}
    </Button>
  )
}

const toggleAlign = (editor: Editor, format: AlignTypes) => {
  const { selection } = editor
  if (!selection) {
    return false
  }
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === 'paragraph' &&
        ((format !== 'left' && n.align !== format) ||
          (format === 'left' && !!n.align)),
    })
  )
  if (!match) {
    return
  }
  const [node, nodePath] = match
  Transforms.setNodes(
    editor,
    {
      ...node,
      align: format === 'left' ? undefined : format,
    },
    { at: nodePath }
  )
}

const isFormatActive = (editor: Editor, format: AlignTypes): boolean => {
  const { selection } = editor
  if (!selection) {
    return false
  }
  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        n.type === 'paragraph' &&
        (n.align === format || (format === 'left' && !n.align)),
    })
  )
  return !!match
}

export default AlignButton
