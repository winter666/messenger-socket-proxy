const axios = require("axios");

class Request {

    constructor() {
        this.baseUrl = process.env.NODE_API_URL;
    }

    /**
     * @param params<{entity<string>, uri<string>, token<string>}>
     * @returns {Promise<AxiosResponse<any>>}
     */
    get(params) {
        return axios.get(this.baseUrl + params.entity + params.uri, {headers: {Authorization: params.token}});
    }

    post(params) {
        return axios.post(this.baseUrl + params.entity + params.uri, params.data, {headers: {Authorization: params.token}});
    }
}

module.exports = new Request();
