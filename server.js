// const PlayerModel = require('./playerModel.js');
const mysql = require('./dbcon.js')
const express = require('express');
const app = express();
const cors = require('cors');
const corsConfig = {
    origin: '*',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsConfig))
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

app.use((req,res) => {
    res.status(404).send({error: "Not Found"});
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});