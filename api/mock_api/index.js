var express = require('express')
var app = express()
var cors = require('cors')
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var exerciseGet = require('./exercise-get.json') 

app.use(bodyParser.json())
app.use(cors())

app.post('/login', function (req, res) {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    var token = jwt.sign({ email, exp: Math.floor(Date.now() / 1000) + (60 * 60)}, 'shhhhh');
    res.status(200).json({ token });
})

app.post('/check', function (req, res) {
    try{
        const token = req.body.token;
        var decoded = jwt.verify(token, 'shhhhh');
        res.json(decoded.email)
    }catch{
        res.status(401).json({error: "invalid token"})
    }
  })

app.get('/exercises', function (req, res) {
    try{
        const token = req.headers.authorization
        var decoded = jwt.verify(token.replace('Bearer ', ''), 'shhhhh');
    
        if(decoded){
            res.json(exerciseGet)
        }
    }catch(e){
        res.status(401).json({error: "invalid token"})
    }
})

app.post('/workout', function (req, res) {
    res.json(exerciseGet)
})

app.listen(3000)