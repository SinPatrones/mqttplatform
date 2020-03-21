module.exports = function (io){

    io.on('connection', socket => {
        console.log('Nuevo Socket Conectado: ' + socket.id);
        // AQUI SE CREAN LOS SOCKETS QUE RECIBIRA EL SERVIDOR

        // -----------------------------------
        socket.on('dato', data => {
            io.emit('datogeneral', data);
            console.log("datos de cliente socket:", data);
        });

        socket.on('disconnect', reason => {
            console.log("Socket Desconectado");
        });
    });


};