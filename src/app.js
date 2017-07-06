import './style.scss'

if(module.hot) {
  module.hot.accept()
}

const root = document.querySelector('#root')
root.innerHTML = `<p>Hello webpack.</p>`
