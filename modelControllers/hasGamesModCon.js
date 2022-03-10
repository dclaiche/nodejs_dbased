module.exports = function(){
    const express = require('express');
    const router = express.Router();

    //get all player has games relationships
    const getPlayerHasGames = async (mysql) => {
        return new Promise((resolve, reject) => {
            mysql.pool.query("SELECT * FROM Player_Has_Games;", (error, elements) => {
                if(error){
                    return reject(error)
                }
                return resolve(elements)
            })
        })
    }

    //add player
    const addPlayerHasGames = async (req, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO `Player_Has_Games` (players_player_id, games_game_id) VALUES (?,?)"
            const values = [req.body.players_player_id, req.body.games_game_id];
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

    //get all player has games relationships
    router.get('/', (req, res) => {
        const mysql = req.app.get('mysql');
        getPlayerHasGames(mysql)
            .then(playerHasGames => {
                res.send(playerHasGames)
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })

    //create new Player Has Games
    router.post('/', (req, res) => {
        const mysql = req.app.get('mysql');
        addPlayerHasGames(req, mysql)
        .then(response => {
            res.redirect('/playerhasgames')
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({error: "Request Failed"})
        })

    })

    return router;
}();
