const express = require('express')
require('dotenv').config();
const http = require('http');
const app = express()
const port = 3000

// init server
const server = http.createServer(app);

// init web-sockets
const WebSocketModule = require('./modules/web-socket');
const wsModule = new WebSocketModule(server);

wsModule.handle([
    {
        name: 'get-user-chats',
        handler: { controller: require('./web-socket/chat'), method: 'getUserChats' },
    },
]);

// start server
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
