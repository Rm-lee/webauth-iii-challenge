const express = require('express')
const authRouter = require("./auth-router.js")
const configureMiddleware = require('./middleware-conf.js')

const server = express()
configureMiddleware(server)

server.use('/api', authRouter)

module.exports = server