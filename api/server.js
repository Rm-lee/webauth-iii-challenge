const express = require('express')
const authRouter = require("./auth-router.js")
const configureMiddleware = require('./middleware-conf.js')

const server = express()
configureMiddleware(server)

server.use('/api/auth', authRouter)
server.get('/api', (req,res) => {
    res.status(200).json({message:"working"})
})
module.exports = server