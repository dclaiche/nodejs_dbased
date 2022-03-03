module.exports = function(){
    const express = require('express');
    const router = express.Router();

    //get all Memberships
    const getMemberships = async (mysql) => {
        return new Promise((resolve, reject) => {
            mysql.pool.query("SELECT * FROM Premium_Membership_Status;", (error, elements) => {
                if(error){
                    return reject(error)
                }
                return resolve(elements)
            })
        })
    }

    //get all Memberships
    router.get('/', (req, res) => {
        const mysql = req.app.get('mysql');
        getMemberships(mysql)
            .then(memberships => {
                res.send(memberships)
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })
    return router;
}();
