import React, { useCallback, useMemo } from 'react'
import { createEditor, Descendant } from 'slate'
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from 'slate-react'
import { withHistory } from 'slate-history'
import { Content } from './types'
import withEditor from './withEditor'
import Toolbar from './toolbar/Toolbar'
import Leaf from './nodes/Leaf'
import Element from './nodes/Element'
import { SettingsProvider, useSettings } from './hooks/useSettings'
import { altKeys } from './helpers/keystrokes'

type EditorProps = {
  value: Content
  onSave: (value: Content) => void
}

function Editor({ value, onSave }: EditorProps) {
  const editor = useMemo(
    () => withEditor(withReact(withHistory(createEditor()))),
    []
  )
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  )
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  )
  const [settings] = useSettings()

  const onChange = (val: Descendant[]) => {
    onSave(val as Content)
  }
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.altKey) {
      event.preventDefault()
      altKeys(editor, event.key)
    }
  }

  // From https://github.com/ianstormtaylor/slate/issues/3465
  /*useEffect(() => {
    editor.children = value
    SlateEditor.normalize(editor, { force: true })
    setSlateValue(editor.children as Content)
  }, [editor])*/

  return (
    <div className={`editor-container${settings.showGrid ? ' show-grid' : ''}`}>
      <Slate editor={editor} value={value} onChange={onChange}>
        <Toolbar />
        <Editable
          className='editor-content'
          onKeyDown={onKeyDown}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          spellCheck={settings.spellCheck}
          autoFocus
        />
      </Slate>
      {JSON.stringify(value)}
    </div>
  )
}

function Scene(props: EditorProps) {
  return (
    <SettingsProvider>
      <Editor {...props} />
    </SettingsProvider>
  )
}
export default Scene
