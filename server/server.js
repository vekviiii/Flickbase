const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const bodyParser = require('body-parser')

const { xss } = require('express-xss-sanitizer')
const mongoSanitize = require('express-mongo-sanitize')

const routes = require('./routes')

const passport = require('passport')
const { jwtStrategy } = require('./middleware/passport')
const { handleError, convertToApiError} = require('./middleware/apiError')

const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority&appName=Flickbase` 

mongoose.connect(mongoUri)

//Parsing
app.use(bodyParser.json())

//Sanitize
app.use(xss())
app.use(mongoSanitize())

//Passport
app.use(passport.initialize())
passport.use('jwt',jwtStrategy)

//Routes
app.use('/api', routes)

//Error Handling
app.use(convertToApiError)
app.use((err,req,res,next)=>{
    handleError(err,res)
})

app.use(express.static('client/build'))
if(process.env.NODE_ENV === 'production')
{
    const path = require('path')

    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
    })
}

const port = process.env.PORT || 3001
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})