const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
const { Server } = require("socket.io");
const http = require('http');

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.NODE_ORIGIN_URL,
        methods: ["GET", "POST"],
    }
});

io.on('connection', (socket) => {
    console.log('connected', socket.id);
   socket.on(socket.id, (arg) => {
       socket.emit(socket.id, `[${socket.id}]: ${arg}`)
       socket.broadcast.emit(socket.id, `[${socket.id}]: ${arg}`)
   });
});

server.listen(port, () => {
    console.log('Server working on port ' + port);
})


