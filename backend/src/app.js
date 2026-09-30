// src/app.js
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const authRoutes = require('./routes/auth')
const sessionRoutes = require('./routes/sessions')
const registrationRoutes = require('./routes/registrations')
const errorHandler = require('./middleware/errorHandler')

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api', registrationRoutes) // defines /sessions/:id/register itself

app.use(errorHandler) // always last

module.exports = app