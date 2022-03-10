const express = require("express");
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const { logger } = require('./utils')
const config = require('config')


// IMPORT MIDDLEWARE
const { useMorgan, passport } = require('./middleware')


const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// USE MIDDLEWARE
useMorgan(app)
app.use(cors())
passport(app)


if (config.env === 'production') {
    app.use(express.static(path.join(__dirname, '../', 'client', 'build')))
    app.use(express.static(path.join(__dirname, '../', 'public')))
}


const setRoute = require("./routers");
setRoute(app)


const PORT = process.env.PORT || 4000


// SERVER LISTEN 
let server = app.listen(PORT, () => {
    let port = server.address().port
    logger.info(`Listening on port ${port} & env ${config.env}`)
});


// DATABASE CONNECTION 
mongoose.connect(`${config.get('DB_CONNECTION')}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        logger.info(`${config.env === 'production' ? 'Live' : 'Local'} Database Connected... =${config.get('DB_CONNECTION')}`)
    }
)
