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

    //add membership
    const addMembership = async (req, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO `Premium_Membership_Status` (membership_player_id, premium_status, next_payment) VALUES (?,?,?)"
            const values = [req.body.membership_player_id, req.body.premium_status, req.body.next_payment]
            mysql.pool.query(sql, values, (error, results, fields) => {
                if (error){
                    return reject(error)
                }
                return resolve(results)
            })
        })
    }

    //get one Membership
    const getOne = async (req, id, mysql) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Premium_Membership_Status where membership_player_id = ${id}`
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
            const sql = `UPDATE Premium_Membership_Status SET membership_player_id = ?, premium_status = ?, next_payment = ? WHERE membership_player_id = ${id}`
            const values = [id, req.body.premium_status, req.body.next_payment];
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
            const sql = `DELETE FROM Premium_Membership_Status WHERE membership_player_id = ${id}`
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
    router.post('/', (req, res) => {
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
