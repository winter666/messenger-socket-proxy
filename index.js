require('dotenv').config();
// init web-sockets
const WebSocketModule = require('./modules/web-socket');
const wsModule = new WebSocketModule(3000);

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
    {
        name: 'set-user',
        handler: { controller: require('./web-socket/chat'), method: 'setUser' },
    },
]);
