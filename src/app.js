import './style.scss'
import React from 'react'
import ReactDOM from 'react-dom'

if(module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
)

// const root = document.querySelector('#root')
// root.innerHTML = `<p>Hello webpack.</p>`
