import { createApp } from 'vue'
import router from './router';
import App from './App.vue'

import store from '@/store/index.js'

const app = createApp(App)
    .use(store)
    .use(router);

app.mount('#app');