const express = require('express')
const app = express()
const fs = require('fs')
const LEX = require('letsencrypt-express')

// 以下の2行は環境に合わせて変更して下さい！
const DOMAIN = 'archives.kcs18.net'
const EMAIL = 'tmy1997530@gmail.com'

var lex = LEX.create({
  configDir: require('os').homedir() + '/letsencrypt/etc'
  , approveRegistration: function (hostname, approve) {
    if (hostname === DOMAIN) { // Or check a database or list of allowed domains
      approve(null, {
        domains: [DOMAIN],
        email: EMAIL,
        agreeTos: true
      })
    }
  }
})

const currdir = process.cwd()
const fl = fs.readdirSync(currdir + '/assets')
const server = app.listen(80, function () {
  console.log('Node.js is listening to PORT:' + server.address().port)
})

app.get('/', (req, res, next) => {
  res.json({assets: fl})
})

lex.onRequest = app

lex.listen([80], [443, 5001], function () {
  var protocol = ('requestCert' in this) ? 'https' : 'http'
  console.log('Listening at ' + protocol + '://localhost:' + this.address().port)
})
