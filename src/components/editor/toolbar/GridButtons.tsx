import React from 'react'
import { useSlate } from 'slate-react'
import Button from '../../ui/button'
import {
  addColumn,
  canAddColumn,
  canRemoveColumn,
  removeColumn,
} from '../helpers/columnTransform'
import { useSettings } from '../hooks/useSettings'

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
