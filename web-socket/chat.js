const Controller = require('../modules/web-socket/controller');

class ChatController extends Controller {

    async getUserChats(arg) {
        const user = require('../modules/api/user');
        const {data} = await user.getInfo(arg.user_id);
        const chats = data.item.chats;
        this.emit('get-user-chats', chats);
    }
}

module.exports = ChatController;
