class WebSocketModule {

    /**
     * @type Server<ListenEvents,EmitEvents,ServerSideEvents,SocketData>
     */
    socket = null;

    constructor(port) {
        this.port = port;
        this.init();
    }

    init () {
        const express = require('express');
        const app = express();
        const http = require('http').createServer(app);

        this.socket = require("socket.io")(http, {
            cors: {
                origin: [process.env.NODE_ORIGIN_URL, "http://192.168.100.223:8081"],
                methods: ["GET", "POST"],
                credentials: false,
                withCredentials: false,
            },
        }).listen(3000, function (io) {
        });
    }

    /**
     *
     * @param { array } arrayEvents
     */
    handle(arrayEvents) {
        this.socket.on('connection', (socket) => {
            // handle web-socket events
            arrayEvents.forEach(data => {
                const controller = (new data.handler.controller()).bindSocket(this.socket);
                socket.on(data.name, controller[data.handler.method]);
            });
        });
    }
}

module.exports = WebSocketModule;
