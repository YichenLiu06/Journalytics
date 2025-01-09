const path = require('node:path')
const express = require('express')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const JWTStrategy  = require("passport-jwt").Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt;
const pool = require("./db/pool.js")
const entryRouter = require("./routes/entryRouter.js")
const userRouter = require ("./routes/userRouter.js")
require("dotenv").config();

const app = express();

app.use(cors())

app.use("/users", userRouter);
app.use("/entries", entryRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

passportOptions = {
    secretOrKey: process.env.PASSPORT_SECRET,
    audience: process.env.CLIENT,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}

passport.use(new JWTStrategy(passportOptions, async (jwt_payload, done) => {
        try {
            console.log(jwt_payload.sub)
            const user = (await pool.query("SELECT * FROM users WHERE id=$1;", [jwt_payload.sub])).rows[0]
            console.log(user)
            if (user) {
                return done(null, user);
            }
                return done(null, false);
        } 
        catch(err) {
            return done(err);
        }
    })
)

app.post('/sign-up', async (req,res) => {
    try {
        const user = (await pool.query("SELECT * FROM users WHERE username=$1;", [req.body.username])).rows[0]
        if(user){
            return res.status(409).json({message: `User ${req.body.username} already exists`})
        }
        else{
            await pool.query("INSERT INTO users (username, password) VALUES ($1, $2);", [req.body.username, req.body.password])
            return res.sendStatus(200)
        }
    } catch(err) {
        return res.sendStatus(500)
    }
})

app.post('/login', async (req, res) => { 
    try {
        let { username, password } = req.body;
        console.log(username, password)
        const user = (await pool.query("SELECT * FROM users WHERE username=$1;", [username])).rows[0]
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
    catch(err) {
        return res.status(500).json(err)
    }
});

app.get("/protected", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send("YAY! this is a protected Route")
})

app.listen(5000, () => console.log('Server started on port 5000'))