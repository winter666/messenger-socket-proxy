const { Server } = require("socket.io");

class WebSocketModule {

    /**
     * @type Server<IncomingMessage, ServerResponse>
     */
    http = null

    /**
     * @type Server<ListenEvents,EmitEvents,ServerSideEvents,SocketData>
     */
    socket = null;

    constructor(http) {
        this.http = http;
        this.init();
    }

    init () {
        this.socket = new Server(this.http, {
            cors: {
                origin: process.env.NODE_ORIGIN_URL,
                methods: ["GET", "POST"],
            }
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
