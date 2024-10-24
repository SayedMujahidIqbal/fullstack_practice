const config = require('./utils/config.js')
const express = require('express')
require('express-async-handler')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/notes.js')
const middleware = require('./utils/middleware.js')
const logger = require('./utils/logger.js')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

logger.info('connection to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/notes', notesRouter)
app.use(middleware.unKnownEndPoint)
app.use(middleware.errorHandler)

module.exports = app
