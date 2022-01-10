import { createStore } from 'vuex'
import signup from './signup.js'
import notification from './notification.js'
import login from './login.js'
import menu_handler from './menu_handler.js'
import qr_code from './qr_code.js'
import search_item from './search_item.js'
const store = createStore({
    strict: true,
    modules: {
        signup,
        notification,
        login,
        menu_handler,
        qr_code,
        search_item
    }
})
export default store