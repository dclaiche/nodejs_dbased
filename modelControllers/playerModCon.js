module.exports = function(){
    const express = require('express');
    const router = express.Router();

    //get all Players
    const getPlayers = async (mysql) => {
        return new Promise((resolve, reject) => {
            mysql.pool.query("SELECT * FROM Players;", (error, elements) => {
                if(error){
                    return reject(error)
                }
                return resolve(elements)
            })
        })
    }

    //add player
    const addPlayer = async (req, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO `Players` (email, password, games, wins, losses) VALUES (?,?,?,?,?)"
            const values = [req.body.email, req.body.password, req.body.games, req.body.wins, req.body.losses];
            mysql.pool.query(sql, values, (error, results, fields) => {
                if (error){
                    return reject(error)
                }
                return resolve(results)
            })
        })
    }

    /*
    ----------Routes----------
    */

    //get all players
    router.get('/', (req, res) => {
        const mysql = req.app.get('mysql');
        getPlayers(mysql)
            .then(players => {
                res.send(players)
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })

    //create new Player
    router.post('/', (req, res) => {
        const mysql = req.app.get('mysql');
        addPlayer(req, mysql)
        .then(response => {
            res.redirect('/players')
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({error: "Request Failed"})
        })

    })
    return router;
}();
