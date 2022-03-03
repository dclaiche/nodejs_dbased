module.exports = function(){
    const express = require('express');
    const router = express.Router();
    const url = require('url');

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

    //add player has games
    const addPlayerHasGames = async (req, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO `Player_Has_Games` (players_player_id, games_game_id) VALUES (?,?)"
            const values = [req.body.players_player_id, null];
            mysql.pool.query(sql, values, (error, results, fields) => {
                if (error){
                    return reject(error)
                }
                return resolve(results)
            })
        })
    }

    //get premium players
    const getPremiumPlayers = async (req, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT player_id, email, password, games, wins, losses FROM Players INNER JOIN Premium_Membership_Status ON premium_status = 1 AND membership_player_id = player_id;"
            mysql.pool.query(sql, (error, elements) => {
                if(error){
                    return reject(error)
                }
                return resolve(elements)
            })
        })
    }

    //get premium players
    const getPlayerGames = async (req,num, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT player_id, email, password, games, wins, losses FROM Players WHERE games = ${num}`
            mysql.pool.query(sql, (error, elements) => {
                if(error){
                    return reject(error)
                }
                return resolve(elements)
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

    //get players who have played x amount of games
    router.get('/games/:num', (req, res) => {
        const mysql = req.app.get('mysql');
        getPlayerGames(req, req.params.num, mysql)
            .then(playerGames => {
                res.send(playerGames)
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })


    //get all premium players
    router.get('/premiumplayers', (req, res) => {
        const mysql = req.app.get('mysql');
        getPremiumPlayers(req, mysql)
            .then(premiumPlayers => {
                res.send(premiumPlayers)
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })

    return router;
}();
