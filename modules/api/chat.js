const request = require('./request');
const ApiEntity = require("./apiEntity");

class Chat extends ApiEntity{
    constructor() {
        super('chat');
    }

    sendMessage(content, chat_id, user_id, token) {
        return request.post({
            entity: this.entity,
            uri: `/${chat_id}/message/push`,
            data: { user_id, content },
            token,
        });
    }

    getChat(id, token) {
        return request.get({
            entity: this.entity,
            uri: `/${id}`,
            token,
        });
    }
}

module.exports = new Chat();
