const express = require('express')
const app = express()

const cors = require('cors')

const userRoutes = require('../routes/user.route')
const questionRoutes = require('../routes/question.route')
const tagRoutes = require('../routes/tag.route')

require('dotenv').config()
require('../models/db/connection')

app.use( cors() )
app.use( express.urlencoded( { extended:true } ) )
app.use( express.json() )

app.use('/user', userRoutes)
app.use('/questions', questionRoutes)
app.use('/tags', tagRoutes)



module.exports = app