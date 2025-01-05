const express = require('express')
const cors = require('cors')
const controllers = require('./controllers/controllers')
const jwt = require('jsonwebtoken')

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message:"Welcome to the API"
    })
})

app.get('/api/usernames', controllers.getUsernames)

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: 'Post created...',
                authData,

            })
        }
    })
})

app.post('/api/login', (req,res) => {
    //Mock user
    const user = {
        id: 1,
        username: "brad",
        email: "brad@gmail.com"
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        })
    })
})

//verifyToken
function verifyToken(req, res, next) {
    //Get Auth Header Value
    const bearerHeader = req.headers['authorization']
    //Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
        //Split at the space
        const bearer = bearerHeader.split(' ') 

        const bearerToken = bearer[1]

        req.token = bearerToken
        next();
    } else {
        //Forbidden
        res.sendStatus(403)
    }
}

app.listen(5000, () => console.log('Server started on port 5000'))