const mongoose = require('mongoose')
const dotenv = require('./config')

const dbConnection = () => {
    mongoose.connect(process.env.DB_URL).then((con) => {
        console.log(`db connected : ${con.connection.host}`)
    })
}

module.exports = dbConnection