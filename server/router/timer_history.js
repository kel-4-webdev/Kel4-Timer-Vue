const express = require('express')
const router = express.Router()
const db = require('../db/index')

router.get('/', async(req, res, next) => {
    try {
        const sqlText = `SELECT * FROM timer_history`;
        const result = (await db.query(sqlText)).rows
        res.json(result)
    } catch (error) {
        console.error(error)

        //response to client to end the lifecycle
        next(error) 

    }
})

router.get('/:id', async(req, res, next) =>{
    try {
        const sqlText = `SELECT * FROM timer_history WHERE id = $1`
        const sqlParams = [req.params.id]
        const result = (await db.query(sqlText, sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

router.post('/', async(req, res, next) => {
    try {
        const history_timer = req.body
        const sqlText = `INSERT INTO timer_history (first_timer, second_timer) VALUES ($1, $2)`
        const sqlParams = [history_timer.first_timer, history_timer.second_timer]
        const result = (await db.query(sqlText, sqlParams)).rows
        res.json(result)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

module.exports = router