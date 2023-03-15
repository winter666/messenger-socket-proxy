const axios = require("axios");

class Request {

    constructor() {
        this.baseUrl = process.env.NODE_API_URL;
    }

    get(params) {
        return axios.get(this.baseUrl + params.entity + params.uri);
    }

    post(params) {
        return axios.post(this.baseUrl + params.entity + params.uri, params.data);
    }
}

module.exports = new Request();
