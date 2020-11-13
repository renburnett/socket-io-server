const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

const server = app.listen(4000, () => {
    console.info(`listening for requests on port ${PORT}`);
});

const io = socket(server, {
    cors: true,
    transports: ['polling'],
    origins: ["http://localhost:4000", "https://sazzle-server.herokuapp.com"],
   });

io.on('connection', (socket) => {
    console.info('socket connection successful', socket.id);

    // handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
});