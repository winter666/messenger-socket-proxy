const { Server } = require("socket.io");

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
        this.socket = new Server({
            cors: {
                origin: process.env.NODE_ORIGIN_URL,
                methods: ["GET", "POST"],
            }
        }).listen(this.port);
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
