
import axios from "axios";
const login = {
    state() {
        return {
            token: null
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        }
    }
    , actions: {
        async UserLogin(state, payload) {

            const datas = {
                username: payload.username,
                password: payload.password,
                keepmelogin: payload.checked
            }
            const options = {
                method: 'POST',
                url: 'http://localhost:3080/login',
                headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' },
                data: datas
            };

            axios.request(options).then(function (response) {
                state.commit('notification/setNotificationState', true, { root: true })
                state.commit('notification/setNotificationMessage', response.data, { root: true })
                state.commit('setToken', response.data.token)
            }).catch(function (error) {
                if (error.response) {
                    state.commit('notification/setNotificationState', true, { root: true })
                    state.commit('notification/setNotificationMessage', error.response.data, { root: true })
                } else {
                    state.commit('notification/setNotificationState', true, { root: true })
                    state.commit('notification/setNotificationMessage', { error: "SERVER_TIMEOUT", message: "Server time out.Check internet or comeback later" }, { root: true })
                }
            });
        
        }
    },
    namespaced: true
}
export default login