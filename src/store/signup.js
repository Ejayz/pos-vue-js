import axios from "axios"
const signup = {
    state() {
        return {
            signup_result: ''
        }
    },
    mutations: {
        setSignUpResult(state, result) {
            state.signup_result = result
        }
    },
    actions: {
        async createAccount(state, payload) {
            if (payload.validPassword === true && payload.sameRepeat === true && payload.emailcheck === true) {
                const datas = {
                    username: payload.username,
                    password: payload.password,
                    email: payload.email,
                    store_name: payload.businessname,
                    is_notification: payload.emailnotification,
                };
                const options = {
                    method: "POST",
                    url: "http://localhost:3080/signup",
                    headers: { "Content-Type": "application/json" },
                    data: datas,
                };


                axios.request(options).then(response => {
                    state.commit('notification/setNotificationState', true, { root: true })
                    state.commit('notification/setNotificationMessage', response.data, { root: true })
                    state.commit('setSignUpResult', response)
                })
                    .catch((error) => {
                        if (error.response) {
                            state.commit('notification/setNotificationState', true, { root: true })
                            state.commit('notification/setNotificationMessage', error.response.data, { root: true })
                            state.commit('setSignUpResult', error.response.data)
                        } else {
                            const returnError = {
                                message: 'Server refused to connect or not available. Please try again later.',
                                error: 500,
                                code: 'ERR_CONNECTION_REFUSED'
                            }
                            state.commit('notification/setNotificationState', true, { root: true })
                            state.commit('notification/setNotificationMessage', returnError, { root: true })
                            state.commit('setSignUpResult', returnError);
                        }




                    });
            } else {
                state.commit('notification/setNotificationState', true, { root: true })
                state.commit('notification/setNotificationMessage', { message: "Please fullfill the fields that are required", code: "INVALID_DATA" }, { root: true })
                state.commit("setSignUpResult", { message: "Please fullfill the fields that are required", code: "INVALID_DATA" })
            }
        }
    }, namespaced: true,
}

export default signup