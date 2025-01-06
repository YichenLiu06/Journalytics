const path = require('node:path')
const express = require('express')
const { Router } = require('express')
const pool = require('../db/pool.js')
const passport = require ('passport')
require("dotenv").config();

const userRouter = Router()

userRouter.use(express.urlencoded({ extended: true }));
userRouter.use(express.json());

userRouter.get("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const users = (await pool.query("SELECT * FROM users;")).rows
        console.log(users)
        return res.json(users)
    }
    catch {
        return res.sendStatus(500)
    }
})


//route parameters: id (Integer)
userRouter.get("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const user = (await pool.query("SELECT * FROM users WHERE id=$1;", [req.params.id])).rows[0]
        if(!user){
            return res.status(400).json({message : "User With This ID Does Not Exist"})
        }
        return res.json(user)
    }
    catch {
        return res.sendStatus(500)
    }
})



module.exports = userRouter;

