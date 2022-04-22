import { Content } from './components/editor/types'
import { initDocument } from './data/initData'

export type EditedDocument = Content

interface Storage {
  get(): EditedDocument
  save(value: EditedDocument): void
}

function storageFactory(): Storage {
  return {
    get() {
      const state = localStorage.getItem('localstate')
      if (!state) {
        this.save(initDocument)
        return initDocument
      }
      return JSON.parse(state) as EditedDocument
    },
    save(state) {
      localStorage.setItem('localstate', JSON.stringify(state))
    },
  }
}

export default storageFactory
