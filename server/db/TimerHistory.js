const db = require('./index')

const TABLE_NAME = 'timer_history'
async function createTimerTable(){
    try {
        const sql = `CREATE TABLE IF NOT EXISTS ${TABLE_NAME}(
            id serial,
            first_timer VARCHAR(50),
            second_timer VARCHAR(50),
            created_on timestamp,
            PRIMARY KEY(id)
        )`
        await db.query(sql)
    } catch (error) {
        console.log(error)
    }
}

module.exports = createTimerTable