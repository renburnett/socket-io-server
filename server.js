const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

app.get('/', (req, res, next) => {res.send('<p> socket.io server running. . . </p>')})

const server = app.listen(PORT, () => {
    console.info(`listening for requests on port ${PORT}`);
});

const io = socket(server, {
    cors: true,
    transports: ['polling'],
    origins: [ 'http://localhost:*', 'https://sazzle-server.herokuapp.com/*', 'https://sazzle-server.herokuapp.com/socket.io/'],
});

io.on('connection', (socket) => {
    console.info('socket connection successful', socket.id);

    // handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
});