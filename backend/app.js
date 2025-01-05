const path = require('node:path')
const express = require('express')
const db = require('./db/queries.js')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const controllers = require('./controllers/controllers')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const JWTStrategy  = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.json({
        message:"Welcome to the API"
    })
})

console.log(process.env.PASSPORT_SECRET)

passportOptions = {
    secretOrKey: process.env.PASSPORT_SECRET,
    audience: process.env.CLIENT,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}

passport.use(new JWTStrategy(passportOptions, async (jwt_payload, done) => {
        try {
            console.log(jwt_payload.sub)
            const user = await db.getUserByID(jwt_payload.sub)
            console.log(user)
            if (user) {
                return done(null, true);
            }
                return done(null, false);
        } 
        catch(err) {
            return done(err);
        }
    })
)

app.post('/api/register', async (req,res) => {
    try {
        console.log(req.body.username)
        await db.insertUser(req.body.username, req.body.password)
        res.status(200)
        res.send()
    } catch(err) {
        res.status(500)
        res.send()
    }
})

app.post('/api/login', async (req, res) => { 
    try {
        let { username, password } = req.body;
        const user = await db.getUserByUsername(username)

        if(!user){
            return res.status(401).json({message : "Incorrect Username"})
        }
        if(user.password !== password) {
            return res.status(401).json({message : "Incorrect Password"})
        }
        const secret = process.env.PASSPORT_SECRET
        const token = jwt.sign({sub : user.id}, secret)
        return res.status(200).json({message : "Authenticated", token})
    }  
    catch {
        return res.status(500).json({message : "Server Error"})
    }
});

app.get("/api/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send("YAY! this is a protected Route")
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