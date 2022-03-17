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

    //get players based on amount of games
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

    //get Games Won
    const getGamesWon = async (req, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT player_id, game_id FROM Players INNER JOIN Player_Has_Games ON Players.player_id = Player_Has_Games.players_player_id INNER JOIN Games ON Games.game_id = Player_Has_Games.games_game_id WHERE winner = player_id;'
            mysql.pool.query(sql, (error, elements) => {
                if(error){
                    return reject(error)
                }
                return resolve(elements)
            })
        })
    }

    //get one player
    const getOne = async (req, id, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Players where player_id = ${id}`
            mysql.pool.query(sql, (error, elements) => {
                if(error){
                    return reject(error)
                }
                return resolve(elements)
            })
        })
    }

    //update one
    const updateOne = async (req, id, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE Players SET player_id = ?, email = ?, password = ?, games = ?, wins = ?, losses = ? WHERE player_id = ${id}`
            const values = [id, req.body.email, req.body.password, req.body.games, req.body.wins, req.body.losses];
            mysql.pool.query(sql, values, (error, results, fields) => {
                if (error){
                    return reject(error)
                }
                return resolve(results)
            })
        })
    }

    //delete one
    const deleteOne = async (req, id, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM Players WHERE player_id = ${id}`
            mysql.pool.query(sql, (error, results, fields) => {
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

    //get all winners and their games
    router.get('/gameswon', (req, res) => {
        const mysql = req.app.get('mysql');
        getGamesWon(req, mysql)
            .then(gamesWon => {
                res.send(gamesWon)
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })

    //get one
    router.get('/:id', (req, res) => {
        const mysql = req.app.get('mysql');
        getOne(req, req.params.id, mysql)
            .then(one => {
                res.send(one)
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })

    //update one
    router.put('/:id', (req, res) => {
        const mysql = req.app.get('mysql');
        updateOne(req, req.params.id, mysql)
            .then(one => {
                res.send(one)
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })

    //delete one
    router.delete('/:id', (req, res) => {
        const mysql = req.app.get('mysql');
        deleteOne(req, req.params.id, mysql)
            .then(one => {
                res.send(one)
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })



    return router;
}();
