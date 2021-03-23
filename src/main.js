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

// Define axios interceptor for 401 response code => redirect to login page
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        store.dispatch('account/logout').then(() => console.log('logout'))
        router.push({name: "login"}).then(() => console.log("invalid token"))
    } else {
        return Promise.reject(error);
    }
});

const app = createApp(App)
    .use(store)
    .use(router);

app.mount('#app');