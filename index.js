const express = require('express')
const http = require('http');
const app = express()
const port = 3000

// init server
const server = http.createServer(app);

// init web-sockets
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8081",
        methods: ["GET", "POST"],
    }
});

// handle web-socket events
io.on('connection', (socket) => {
    console.log('a user connected');
});

// start server
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
