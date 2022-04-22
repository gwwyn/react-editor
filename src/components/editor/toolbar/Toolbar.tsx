import React from 'react'
import Button from '../../ui/button'
import AlignButton from './AlignButton'
import FormatButton from './FormatButton'
import GridButtons from './GridButtons'
import LinkButton from './LinkButton'
import './Toolbar.scss'

export const ToolbarDivider = () => <div className='toolbar-line'></div>

function Toolbar() {
  return (
    <div className='toolbar'>
      <fieldset>
        <legend></legend>
        <FormatButton format='bold' />
        <FormatButton format='italic' />
        <FormatButton format='underline' />
        <FormatButton format='strikethrough' />
      </fieldset>
      <fieldset>
        <legend></legend>
        <ToolbarDivider />
        <Button icon='quote' label='quote' onClick={() => {}}></Button>
        <Button icon='more' label='more' onClick={() => {}}></Button>
      </fieldset>
      <fieldset>
        <legend></legend>
        <ToolbarDivider />
        <LinkButton />
        <Button icon='mention' label='mention' onClick={() => {}}></Button>
        <Button icon='image' label='image' onClick={() => {}}></Button>
        <Button icon='gallery' label='gallery' onClick={() => {}}></Button>
      </fieldset>
      <fieldset>
        <ToolbarDivider />
        <AlignButton format='left' />
        <AlignButton format='center' />
        <AlignButton format='right' />
      </fieldset>
      <fieldset>
        <ToolbarDivider />
        <GridButtons />
      </fieldset>
      <fieldset>
        <ToolbarDivider />
        <Button icon='help' label='help' onClick={() => {}}></Button>
      </fieldset>
    </div>
  )
}

export default Toolbar

/*
Bold
Italic
Underline
Strike

Quote
More

Link
Unlink
Mention
Image
Embed
Emoji

Show grid
Add row
Add column
Remove column
*/
