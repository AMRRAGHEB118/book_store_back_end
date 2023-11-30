const express = require('express')
const app = express()
const dbConnection = require('./config/database')
dbConnection()

const cors = require('cors')
app.use(cors())

const globalError = require('./middleware/errorMiddleware')

const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')



app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)

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
