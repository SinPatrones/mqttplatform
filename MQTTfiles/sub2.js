// MQTT subscriber
var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:3001');
var topic = 'gps/#';

client.on('message', (topic, message)=>{
    message = message.toString();
    console.log('SUB 2)' + message);
});

client.on('connect', ()=>{
    client.subscribe(topic);
});