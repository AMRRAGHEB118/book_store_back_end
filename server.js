const express = require('express')
const app = express()

const dotenv = require('dotenv')
const cors = require('cors')
const db_connection = require('./config/database')

dotenv.config()
const ENV = process.env.NODE_ENV

db_connection()

app.use(cors())

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(`Example app listening on port localhost:${PORT}`)
})

process.on('unhandledRejection', (err) => {
    console.log(`UnhandledRejection error : ${err}`)
    server.close(() => {
        console.error('shutting down.......')
        process.exit(1)
    })
})

