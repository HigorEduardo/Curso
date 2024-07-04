const express = require('express')
require("dotenv").config()
const connectDB = require('./db')
const app = express()

connectDB()

app.get('/', function(req, res,){
    res.send('NOSSA API TA FUNCIONANDO')
})

app.listen(8000)
