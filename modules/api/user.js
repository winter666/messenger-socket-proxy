const request = require('./request');
const ApiEntity = require("./apiEntity");

class User extends ApiEntity {

    constructor() {
        super('user');
    }

    getInfo(user_id, token) {
        return request.get({
            entity: this.entity,
            uri: `/${user_id}`,
            token,
        });
    }
}

module.exports = new User();
