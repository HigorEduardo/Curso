const express = require('express')

const app = express()

app.get('/', function(req, res,){
    res.send('NOSSA API TA FUNCIONANDO')
})

app.listen(8000)
