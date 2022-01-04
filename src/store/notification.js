
 const notification = {

    state() {
        return {
            api_result: {},
            api_NotificationState: false,
            api_Notification_Message: ''
        }
    },
    mutations: {
        setNotificationState(state, isShow) {
            state.api_NotificationState = isShow
            console.log(isShow)
        }, setNotificationMessage(state, error) {
            state.api_Notification_Message = error
        }
    }, namespaced: true,
}

export default notification