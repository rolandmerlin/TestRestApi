import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import axios from 'axios'
window.axios = axios
axios.defaults.headers={'Content-type': 'application/json; charset=UTF-8'}

import './index.css'

createApp(App)
    .use(router)
    .use(store)
    .mount('body')
