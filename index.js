const express = require('express')
require('dotenv').config();
const app = express()
const port = 3000

// init web-sockets
const WebSocketModule = require('./modules/web-socket');
const wsModule = new WebSocketModule(port);

wsModule.handle([
    {
        name: 'get-user-chats',
        handler: { controller: require('./web-socket/chat'), method: 'getUserChats' },
    },
    {
        name: 'get-chat',
        handler: { controller: require('./web-socket/chat'), method: 'getChat' },
    },
    {
        name: 'send-message',
        handler: { controller: require('./web-socket/chat'), method: 'sendMessage' },
    },
]);
