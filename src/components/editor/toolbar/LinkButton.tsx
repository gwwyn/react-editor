import React, { useRef, useState } from 'react'
import { BaseSelection, Editor, Range, Transforms } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import Button from '../../ui/button'
import { addLink, isTypeActive, removeLink } from '../helpers/format'
import ToolbarModal, { ToolbarModalRef } from './ToolbarModal'

const reSelect = (editor: Editor) => {
  const selection = editor.selection
  if (!selection) {
    return
  }

  Transforms.deselect(editor)

  setTimeout(() => {
    Transforms.select(editor, selection)
    ReactEditor.focus(editor)
  }, 10)
}

function LinkButton() {
  const editor = useSlate()
  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const isActive = isTypeActive(editor, 'link')
  const storedSelection = useRef<BaseSelection>(null)

  const ref = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<ToolbarModalRef>(null)

  const [data, setData] = useState({ url: '', text: '' })

  const open = () => {
    if (!selection || isCollapsed) {
      return
    }
    storedSelection.current = selection
    const text = Editor.string(editor, selection)
    setData({ ...data, text })
  }
  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!data.url) {
      return
    }
    addLink(editor, data.url, data.text)
    storedSelection.current = null
    popupRef.current?.toggle()
  }
  const close = () => {
    setData({ url: '', text: '' })
    if (storedSelection.current) {
      Transforms.select(editor, storedSelection.current)
      reSelect(editor)
    }
  }
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (isActive) {
      removeLink(editor)
      return
    }
    popupRef.current?.toggle()
  }

  return (
    <>
      <Button
        forwardedRef={ref}
        icon='link'
        label='add link'
        onClick={onClick}></Button>
      <Button
        forwardedRef={ref}
        icon='unlink'
        label='remove link'
        onClick={onClick}
        isActive={isActive}></Button>
      <ToolbarModal
        ref={popupRef}
        onOpen={open}
        onClose={close}
        controlRef={ref}>
        <form onSubmit={submit}>
          <label htmlFor='url_input'>Url:</label>
          <input
            type='text'
            id='url_input'
            name='url'
            value={data.url}
            onChange={e => setData({ ...data, url: e.target.value })}
            required
          />
          {isCollapsed && (
            <>
              <label htmlFor='text_input'>Link text:</label>
              <input
                type='text'
                id='text_input'
                name='text'
                value={data.text}
                onChange={e => setData({ ...data, text: e.target.value })}
                required
              />
            </>
          )}
          <button type='submit'>Add link</button>
        </form>
      </ToolbarModal>
    </>
  )
}

export default LinkButton
