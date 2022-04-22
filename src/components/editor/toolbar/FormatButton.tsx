import React from 'react'
import { Editor, Text } from 'slate'
import { useSlate } from 'slate-react'
import Button from '../../ui/button'

type FormatTypes = 'bold' | 'italic' | 'underline' | 'strikethrough'
type FormatButtonProps = {
  format: FormatTypes
}

function FormatButton({ format }: FormatButtonProps) {
  const editor = useSlate()
  const onClick = () => {
    toggleFormat(editor, format)
  }
  return (
    <Button
      icon={format}
      label={format}
      onClick={onClick}
      isActive={isFormatActive(editor, format)}></Button>
  )
}

const isFormatActive = (editor: Editor, format: FormatTypes) => {
  const [match] = Editor.nodes(editor, {
    match: n => (n as Text)[format] === true,
    mode: 'all',
  })
  return !!match
}

const toggleFormat = (editor: Editor, format: FormatTypes) => {
  const isActive = isFormatActive(editor, format)

  if (isActive) {
    editor.removeMark(format)
  } else {
    editor.addMark(format, true)
  }
}

export default FormatButton
