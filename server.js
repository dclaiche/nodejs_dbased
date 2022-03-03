// const PlayerModel = require('./playerModel.js');
const mysql = require('./dbcon.js')
const express = require('express');
const app = express()
const PORT = 3000
app.set('port', PORT);
app.set('mysql', mysql)
app.use(express.json());

//todo: create models for each table that have the functions needed for each
app.use('/players', require('./modelControllers/playerModCon.js'));
app.use('/games', require('./modelControllers/gameModCon.js'));
app.use('/messages', require('./modelControllers/messageModCon.js'));
app.use('/memberships', require('./modelControllers/membershipModCon.js'));
app.use('/playerhasgames', require('./modelControllers/hasGamesModCon.js'))

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});