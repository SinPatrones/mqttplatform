const http = require('http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const socketIO = require('socket.io');
const path = require('path');

require('dotenv').config();

const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});


const app = express();
const server = http.createServer(app);

const io = socketIO.listen(server);

// ------ SOCKETS ---------
require('./sockets/mainsocket')(io);
// ----- FIN SOCKETS --------

const port = process.env.PORT || 2999;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, '../mqttplatformfront/build')));

// RUTAS
app.use('/', require('./routes/index.routes'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../mqttplatformfront/build', 'index.html'));
});
server.listen(port, () => {
    console.log("Server on port " + port);
});


// MOSCA BROKER
const mosca = require('mosca');
const settings = {port: 3001};
const broker = new mosca.Server(settings);

broker.on('ready', ()=>{
    console.log('Broker is ready! ON PORT ' + settings.port);
});

broker.on('published', (packet)=>{
    message = packet.payload.toString();
    //console.log(packet);
    console.log(message);
    io.emit('datogeneral', {from: 'broker (' + packet.topic + ')', data: message});
});