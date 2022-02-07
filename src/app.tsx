import React from 'react'
import ReactDOM from 'react-dom'

import { CompA } from './cmp'

function App() {
  return (
    <h1>
      111
      <CompA />
    </h1>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
