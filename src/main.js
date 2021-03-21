import { createApp } from 'vue'
import router from './router';
import App from './App.vue'
import axios from "axios";

import store from '@/store/index.js'


// Use the local authentication token if exist as default bearer token header
const token = localStorage.getItem('authToken')
if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

// Define default api endpoint url
axios.defaults.baseURL = "http://138.68.74.39/api"

const app = createApp(App)
    .use(store)
    .use(router);

app.mount('#app');