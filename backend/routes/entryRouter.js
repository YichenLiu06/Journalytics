const path = require('node:path')
const express = require('express')
const { Router } = require('express')
const pool = require('../db/pool.js')
const passport = require('passport')
const controllers = require('../controllers/controllers.js')
require("dotenv").config();

const entryRouter = Router()

entryRouter.use(express.urlencoded({ extended: true }));
entryRouter.use(express.json());

//query parameters: created_after (Date), limit (Integer), offset (Integer)
entryRouter.get("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const entries = (await pool.query("SELECT * FROM entries WHERE created_at > $1 LIMIT $2 OFFSET $3;", [req.query.created_after || new Date(0,0,0,0,0,0,0).toISOString(), req.query.limit, req.query.offset])).rows
        return res.json(entries)
    }
    catch(err) {
        console.log(new Date(0,0,0,0,0,0,Date.now()).toISOString())
        console.log(err)
        return res.status(500).json({message : err})
    }
})

entryRouter.post("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await pool.query("INSERT INTO entries (author_id, created_at, content) VALUES ($1, $2, $3)", [req.user.id, new Date(Date.now()).toISOString(), req.body.content])
        console.log(new Date(Date.now()))
        return res.sendStatus(200)
    }
    catch {
        return res.sendStatus(500)
    }
})

//route parameters: id (Integer)
entryRouter.get("/:id", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const entry = (await pool.query("SELECT * FROM entries WHERE id=$1;", [req.params.id])).rows[0]
        if(!entry){
            return res.status(400).json({message : "Entry With This ID Does Not Exist"})
        }
        return res.json(entry)
    }
    catch {
        return res.sendStatus(500)
    }
})

entryRouter.get("/:id/insights", passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const entry = (await pool.query("SELECT * FROM entries WHERE id=$1;", [req.params.id])).rows[0]
        if(!entry){
            return res.status(400).json({message : "Entry With This ID Does Not Exist"})
        }
        return res.json(entry)
    }
    catch {
        return res.sendStatus(500)
    }
})


module.exports = entryRouter;