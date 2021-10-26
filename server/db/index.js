const { query } = require('express')
const {Pool} = require('pg')
require('dotenv').config()

const pool = new Pool({
    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT
})

module.exports = {
    async query(text, params){
        const result = await pool.query(text, params)
        return result
    }
}