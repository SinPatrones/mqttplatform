// MQTT publisher
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://34.95.151.168:3001/');
var topic = 'gps/d1';
var message = 'Pub 1 Holaaa(' + new Date() + ')';

const options = {
    qos: 2
};

client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic, message, options);
        //console.log('Message sent!', message);
    }, 5000);
});