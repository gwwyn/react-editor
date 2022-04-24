import { Editor } from 'slate'
import { extendColumn, reduceColumn } from './columnTransform'

export const altKeys = (editor: Editor, key: string) => {
  switch (key) {
    case '-':
      reduceColumn(editor)
      break
    case '=':
      extendColumn(editor)
      break
  }
}
