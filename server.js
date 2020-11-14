const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/', (req, res, next) => {res.send('<p> socket.io server running. . . </p>')})

const server = app.listen(4000, () => {
    console.info(`listening for requests on port 4000`);
});

const io = socket(server, {
    cors: true,
    transports: ['polling'],
    origins: ['http://192.168.0.12:*', 'http://localhost:*', 'https://sazzle-server.herokuapp.com/*', 'https://sazzle-server.herokuapp.com/socket.io/'],
});

io.on('connection', (socket) => {
    console.info('socket connection successful', socket.id);

    // handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
});