// MQTT publisher
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://localhost:3001');
const topic = 'gps/d2';
const message = 'Pub 2 SALUDO';

const options = {
    qos: 2
};

client.on('connect', ()=>{
    setInterval(()=>{
        client.publish(topic, message + ' :: ' + (new Date().getSeconds()), options);
        console.log('Message sent!', message + ' :: ' + (new Date().getSeconds()));
    }, 5000);
});