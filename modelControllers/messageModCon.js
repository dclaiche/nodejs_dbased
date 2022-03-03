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
    return router;
}();
