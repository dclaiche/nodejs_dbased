module.exports = function(){
    const express = require('express');
    const router = express.Router();

    //get all Games
    const getGames = async (mysql) => {
        return new Promise((resolve, reject) => {
            mysql.pool.query("SELECT * FROM Games;", (error, elements) => {
                if(error){
                    return reject(error)
                }
                return resolve(elements)
            })
        })
    }

    //get all games
    router.get('/', (req, res) => {
        const mysql = req.app.get('mysql');
        getGames(mysql)
            .then(games => {
                res.send(games)
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })
    return router;
}();
