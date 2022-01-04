import { createStore } from 'vuex'
import signup from './signup.js'
import notification from './notification.js'
import login from './login.js'
import menu_handler from './menu_handler.js'
import qr_code from './qr_code.js'
const store = createStore({
    strict: true,
    modules: {
        signup,
        notification,
        login,
        menu_handler,
        qr_code
    }
})
export default store