const express = require('express')
const app = express()
const fs = require('fs')

const currdir = process.cwd()
const fl = fs.readdirSync(currdir + '/assets')
const server = app.listen(3000, function () {
  console.log('Node.js is listening to PORT:' + server.address().port)
})

app.get('/', (req, res, next) => {
  res.json({assets: fl})
})
