const express = require('express')
const app = express()
const dbConnection = require('./config/database')
dbConnection()

const dotenv = require('./config/config')
const cors = require('cors')
const ENV = process.env.NODE_ENV
app.use(cors())

const globalError = require('./middleware/errorMiddleware')

const userRoute = require('./routes/userRoute')



app.use('/api/v1/user', userRoute)

app.get('/', (req, res) => {
    res.send('<h1>Welcome</h1>')
})
app.all('*', (req, res, next) => {
    next(new ApiError(400, `Can't find this route ${req.originalUrl}`))
})

app.use(globalError)

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
