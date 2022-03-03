module.exports = function(){
    const express = require('express');
    const router = express.Router();

    //get all Messages
    const getMessages = async (mysql) => {
        return new Promise((resolve, reject) => {
            mysql.pool.query("SELECT * FROM Messages;", (error, elements) => {
                if(error){
                    return reject(error)
                }
                return resolve(elements)
            })
        })
    }

    //add a game
    const addGame = async (req, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO `Messages` (chat_message, timestamp, players_player_id, games_game_id) VALUES (?,?,?,?);"
            const values = [req.body.chat_message, req.body.timestamp, req.body.players_player_id, req.body.games_game_id];
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

    //get all Messages
    router.get('/', (req, res) => {
        const mysql = req.app.get('mysql');
        getMessages(mysql)
            .then(messages => {
                res.send(messages)
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })

    //create a message
    router.post('/', (req, res) =>{
        const mysql = req.app.get('mysql');
        addMessage(req, mysql)
        .then(message => {
            res.redirect('/messages')
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({error: "Request Failed"})
        })
    })

    return router;
}();
