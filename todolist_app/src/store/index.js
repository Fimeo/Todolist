import { createStore } from 'vuex'

import todo from './todo'
import account from './account'

//TODO: add lazy loading for user store
export default createStore({
    modules: {
        todo,
        account
    },
})