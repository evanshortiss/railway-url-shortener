'use strict'

const log = require('barelog')
const config = require('./config')(process.env)
const app = require('./app')(config)

const { HOST, PORT } = config

app.listen(PORT, HOST, () => {
  log(`🚀 listening on ${HOST}:${PORT}`)
})