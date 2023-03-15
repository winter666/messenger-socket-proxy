class Controller {
    /**
     * @type Server<ListenEvents,EmitEvents,ServerSideEvents,SocketData>
     */
    socket

    bindSocket(socket) {
        this.socket = socket;
        return this;
    }

}

module.exports = Controller;
