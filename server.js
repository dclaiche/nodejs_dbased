const PlayerModel = require('./playerModel.js');
const express = require('express');
var bodyParser = require('body-parser');
const mysql = require('./dbcon.js')
const app = express()
const PORT = 3000

app.use(bodyParser.urlencoded({extended:true}));

//todo: create models for each table that have the functions needed for each

//create
app.post("/foo", (req, res) => {

})

//read
app.get("/players", (req, res) => {
    PlayerModel.getPlayers()
    .then(players => {
        res.send(players)
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({error: "Request Failed"})
    })
})

//update
app.put("/foo/:id", (req, res) => {

})

//delete
app.delete("/foo/:id", (req, res) => {

})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});