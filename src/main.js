import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './assets/font.css'
import './assets/background.css'
import store from './store/store'
import VueCookies from 'vue3-cookies'


createApp(App).use(store).use(VueCookies).use(router).mount('#app')

