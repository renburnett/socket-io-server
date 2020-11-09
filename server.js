const express = require('express');
const socket = require('socket.io');
const app = express();

const server = app.listen(4000, () => {
    console.log('listening for requests on port 4000,');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.info('socket connection successful', socket.id);

    // handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
});