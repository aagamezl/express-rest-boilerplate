const express = require('express')
const CONFIG = require('config')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

const { routes } = require('./api/v1.0')

/**
* Express instance
* @public
*/
const app = express()

// request logging. dev: console | production: file
app.use(morgan(CONFIG.get('morgan.logger')))

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// mount api v1 routes
app.use('/v1.0', routes)

// console.table(getRoutesMap(app))

module.exports = app
