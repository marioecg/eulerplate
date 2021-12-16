const express = require('express')
const app = express()

const path = require('path')
const nunjucks = require('nunjucks')

const port = 3000

app.set('view engine', 'nunjucks')
app.set('views', path.join(__dirname, 'templates'))

nunjucks.configure('templates', {
  autoescape: true,
  express: app
})

app.get('/', (req, res) => {
  res.render('index.njk')
})

app.get('/about', (req, res) => {
  res.render('about.njk')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
