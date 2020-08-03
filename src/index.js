import { add } from './math'
import header from './header'
import _ from 'lodash'
import '@babel/polyfill'
import './index.less'

import React from 'react'
import { render } from 'react-dom'


import getComponent from './async.js'


// console.log(_.join(['a', 'b', 'c'], '***'))


getComponent().then(element => {
  document.body.appendChild(element)
})

document.addEventListener('click', () => {
  getComponent()
})


// header()

// add(1, 2)

const App = () => {
  return (
    <div>
      hello,React!!!
    </div>
  )
}

render(<App />, document.getElementById('root'))