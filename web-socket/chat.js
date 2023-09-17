const Controller = require('../modules/web-socket/controller');

class ChatController extends Controller {

    async getUserChats(arg) {
        const userReq = require('../modules/api/user');
        try {
            const {data} = await userReq.getInfo(arg.user_id, arg._token);
            const chats = data.item.chats;
            this.emit('get-user-chats', chats);
        } catch (e) {
            console.log(e);
            this.emit('error-msg', {message: "connection with api is refused"});
        }
    }

    async getChat(arg) {
        const chatReq = require('../modules/api/chat');
        try {
            const {data} = await chatReq.getChat(arg.chat_id, arg._token);
            const chat = data.item;
            this.to(chat.id).emit('get-chat', chat);
        } catch (e) {
            console.log(e);
            this.emit('error-msg', {message: "connection with api is refused"});
        }
    }

    async sendMessage(arg) {
        const chatReq = require('../modules/api/chat');
        try {
            const {data} = await chatReq.sendMessage(arg.content, arg.chat_id, arg.user_id, arg._token);
            const chat = data.item;
            this.emit('send-message', chat); // send for current user
            this.to(chat.id).emit('send-message', chat); // sent for another user(s) in room
        } catch (e) {
            console.log(e);
            this.emit('error-msg', {message: "connection with api is refused"});
        }
    }

    async setUser(arg) {
        const userReq = require('../modules/api/user');
        try {
            const {data} = await userReq.getInfo(arg.user_id, arg._token);
            const chats = data.item.chats;

            chats.forEach(chat => {
                this.join(chat.id);
                // console.log(`User ${arg.user_id} connected to chat ${chat.id}`);
            });

        } catch (e) {
            console.log(e);
            this.emit('error-msg', {message: "connection with api is refused"});
        }
    }
}

module.exports = ChatController;
