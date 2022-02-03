import { hot } from 'react-hot-loader/root'
import React from 'react'
import ReactDOM from 'react-dom'

const App = hot(() => <h1>Hi</h1>)

ReactDOM.render(<App />, document.getElementById('root'))
