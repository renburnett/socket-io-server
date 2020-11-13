const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

const server = app.listen(4000, () => {
    console.info(`listening for requests on port ${PORT}`);
});

const io = socket(server, { log: false, origins: '*:*', transports: ['websocket', 'xhr-polling'] });

// io.configure(() => { 
//     io.set("transports", ["xhr-polling"]); 
//     io.set("polling duration", 10);
//   });

io.on('connection', (socket) => {
    console.info('socket connection successful', socket.id);

    // handle chat event
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    });
});