const express = require('express')
const app = express()
const PORT = 3000 

app.get('/', async(req,res)=>{
    res.send("COBAIN 1")
})

app.listen(PORT, () => {
    console.log('LISTEN TO PORT 3000')
})