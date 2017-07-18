'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import './style.scss'

// Import Components
import App from './components/App.jsx'

if(module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
