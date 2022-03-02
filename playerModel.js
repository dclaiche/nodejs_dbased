const mysql = require('./dbcon.js')

//get
const getPlayers = async () => {
    return new Promise((resolve, reject) => {
        mysql.pool.query("SELECT * FROM Players;", (error, elements) => {
            if(error){
                return reject(error)
            }
            return resolve(elements)
        })
    })
}


module.exports = {getPlayers};