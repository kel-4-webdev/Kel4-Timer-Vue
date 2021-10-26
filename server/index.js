const express = require('express')
const app = express()
const PORT = 8080 
const createTimerTable = require('./db/TimerHistory')


app.use(express.json())



app.listen(PORT, async() => {
    try {
        await createTimerTable()
        console.log(`LISTEN TI PORT ${PORT}`)
    } catch (error) {
        console.error(error)
    }
})