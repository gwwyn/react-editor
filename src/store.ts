import { useMemo, useState } from 'react'
import localStorage, { EditedDocument } from './localstorage'

function useLocalStorage(): [EditedDocument, (value: EditedDocument) => void] {
  const storage = useMemo(() => localStorage(), [])
  const [doc, setDoc] = useState<EditedDocument>(storage.get())

  const updateState = (value: EditedDocument) => {
    setDoc(value)
    storage.save(value)
  }

  return [doc, updateState]
}

export default useLocalStorage
