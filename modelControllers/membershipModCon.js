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

    const addMembership = async (req, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO `Premium_Membership_Status` (players_player_id, premium_status, next_payment) VALUES (?,?,?)"
            const values = [req.body.players_player_id, req.body.premium_status, req.body.nex_payment]
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

    //add a membership
    router.get('/', (req, res) => {
        const mysql = req.app.get('mysql');
        addMembership(req, mysql)
            .then(membership => {
                res.redirect('/memberships')
            })
            .catch(error => {
                console.log(error)
                res.status(500).send({error: "Request Failed"})
            })
    })


    return router;
}();
