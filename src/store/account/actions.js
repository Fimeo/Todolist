import axios from 'axios';
import router from "@/router";

export function login ( { commit }, payload) {
    commit('LOADING', true)
    axios
        .post('/login', null,{ params: { email: payload.email, password: payload.password}})
        .then(response => {
            commit("LOGIN", response.data.token)
            // Set token in localstorage for auto authentication
            localStorage.setItem('authToken', response.data.token)
            // Update API default token
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            // Redirect to home page when logged
            router.push({name: 'Home'}).then(() => console.log("login success"))
        })
        .catch(error => {
            if (error.response.status === 401) {
                commit("ERROR", "Login or password is invalid")
            } else {
                commit("ERROR", "A error was occurred")
            }
            localStorage.removeItem('authToken')
        })
        .finally(() => commit('LOADING', false))
}

export function register ( { commit }, payload) {
    commit('LOADING', true)
    axios
        .post('/register', null, { params: { email: payload.email, password: payload.password, name: payload.name}})
        .then(response => {
            commit("LOGIN", response.data.token)
            // Set token in localstorage for auto authentication
            localStorage.setItem('authToken', response.data.token)
            //Update API default token
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            // Redirect to home when register then logged
            router.push({name: "Home"}).then(() => console.log("register success"))
        })
        .catch(error => {
            if (error.response.status === 409) {
                console.log(error.response)
                commit("ERROR", error.response.data.message)
            } else {
                for (let e of error.response.data.errors) {
                    commit("ERROR", e)
                }
            }
            localStorage.removeItem('authToken')
        })
        .finally(() => commit('LOADING', false))
}

export function getUserAccount( { commit }) {
    commit('LOADING', true)
    axios
        .get('/user')
        .then((res) => {
            commit("SETUSER", res.data)
        })
        .catch((error) => {
            console.error(error.response)
        })
        .finally(() => commit('LOADING', false))
}

export function logout( { commit, rootState }) {
    commit('LOGOUT', rootState)
    // Remove default axios header for authentication
    localStorage.removeItem('authToken')
    // Remove localStorage token
    delete axios.defaults.headers.common['Authorization']
    // Redirect to login page
    router.push({name: 'login'}).then(() => console.log("Signin"))
}

export function deleteErrors( { commit } ) {
    commit("DELETEERRORS");
}

export function addError ( { commit }, msg) {
    commit('ADDERROR', msg)
}
