const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000
//const createTimerTable = require('./db/TimerHistory')
const timer = require('./router/timer_history')

app.use(cors())
app.use(express.json())
app.use('/pevn/history', timer)


app.listen(PORT, async() => {
    try {
        //await createTimerTable()
        console.log(`LISTEN TI PORT ${PORT}`)
    } catch (error) {
        console.error(error)
    }
})