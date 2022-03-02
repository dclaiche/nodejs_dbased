const playerModel = require('./playerModel.js');
const express = require('express');
const mysql = require('./dbcon.js')
const app = express()
const PORT = 3000
app.use(express.json()).use(express.urlencoded({ extended: true })) 


//todo: create models for each table that have the functions needed for each

//create
app.post("/foo", (req, res) => {

})

//read
app.get("/players", (req, res) => {
    
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