import React from 'react'
import Editor from './components/editor/Editor'
import Article from './components/ui/article/Article'
import useLocalStorage from './store'

const App = () => {
  const [doc, updateState] = useLocalStorage()

  return (
    <div className='editor-container'>
      <Article />
      <Editor value={doc} onSave={updateState} />
    </div>
  )
}

export default App
