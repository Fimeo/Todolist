import { createStore } from 'vuex'

import todo from './todo'
import user from './account'

export default createStore({
    modules: {
        todo,
        user
    },
})