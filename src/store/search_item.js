import axios from "axios";
const search_item = {
    state() {
        return {
            api_result: {},
            api_message: "",
            api_code: ''
        }
    }, mutations: {
        setApiResult(state, result) {
            state.api_result = result
        },
        setApiMessage(state, message) {
            state.api_message = message
        }, setApiCode(state, code) {
            state.api_code = code
        }
    }, actions: {
        async getSearchData(state, payload) {

            const data = payload.data
            const token = payload.token
            const options = {
                method: 'GET',
                url: 'http://127.0.0.1:3080/search_item/',
                params: { keyword: data },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            axios.request(options).then(function (response) {
                console.log(response.data);
            }).catch(function (error) {
                console.error(error);
            });
        }
    }, getters: {
        getResult: (state) => () => {
            return state.api_result;
        }
    }
    ,namespaced:true
}

export default search_item