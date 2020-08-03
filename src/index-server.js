import React from 'react'
import { renderToString } from 'react-dom/server'
import Home from './home'

const App = () => {
  return (
    <div>
      <Home />
    </div>
  )
}

export default renderToString(<App />)