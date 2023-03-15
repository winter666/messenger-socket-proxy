const Controller = require('../modules/web-socket/controller');

class ChatController extends Controller {

    async getUserChats(arg) {
        const userReq = require('../modules/api/user');
        const {data} = await userReq.getInfo(arg.user_id);
        const chats = data.item.chats;
        this.emit('get-user-chats', chats);
        this.broadcast.emit('get-user-chats', chats)
    }

    async getChat(arg) {
        const chatReq = require('../modules/api/chat');
        const {data} = await chatReq.getChat(arg.chat_id);
        const chat = data.item;
        this.emit('get-chat', chat);
    }

    async sendMessage(arg) {
        const chatReq = require('../modules/api/chat');
        const {data} = await chatReq.sendMessage(arg.content, arg.chat_id, arg.user_id);
        const chat = data.item;
        this.emit('send-message', chat);
        this.broadcast.emit('send-message', chat)
    }
}

module.exports = ChatController;
