const fs = require('fs')
const path = require('path')
const express = require('express')
const SSR_HTML = require('../dist/main-server')
const template = fs.readFileSync(path.join(__dirname, '../dist-client/index.html'), 'utf-8')
const data = require('./data.json')

const server = port => {
  const app = express()

  app.get('/', (req, res) => {
    const html = renderMarkup(SSR_HTML)
    res.status(200).send(html)
  })

  app.get('/index', (req, res) => {
    const html = renderMarkup(SSR_HTML)
    res.status(200).send(html)
  })

  app.use(express.static(path.join(__dirname, '../dist-client')))

  app.listen(port, () => {
    console.log(`Server is runing on port ${port}`)
  })
}

const renderMarkup = str => {
  const dataStr = JSON.stringify(data)
  console.log('-------str--------', str)
  return template.replace('<!--HTML_PLACEHOLDER-->', str)
    .replace('<!--INITIAL_DATA_PLACEHOLDER-->', `<script>window.__initial_data=${dataStr}</script>`);
}

server(process.env.PORT || 3000)