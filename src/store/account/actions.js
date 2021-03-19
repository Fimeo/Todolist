import axios from 'axios';
import router from "@/router";

export function login ( { commit }, payload) {
    commit('LOADING', true)
    return axios
        .post('http://138.68.74.39/api/login', null,{ params: { email: payload.email, password: payload.password}})
        .then(response => {
            commit("LOGIN", response.data.token)
            localStorage.setItem('authToken', response.data.token)
            router.push({name: 'Home'}).then(() => console.log("login success"))
        })
        .catch(error => {
            if (error.response.status === 401) {
                commit("ERROR", "Login or password is invalid")
            } else {
                commit("ERROR", "A error was occurred")
            }
        })
        .finally(() => commit('LOADING', false))
}

export function register ( { commit }, payload) {
    commit('LOADING', true)
    return axios
        .post('http://138.68.74.39/api/register', null, { params: { email: payload.email, password: payload.password, name: payload.name}})
        .then(response => {
            // Response code : 200 = "OK"
            // Store token
            commit("LOGIN", response.data.token)
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
        })
        .finally(() => commit('LOADING', false))
}

export function getUserAccount( { commit }) {
    commit('LOADING', true)
    axios
        .get('http://138.68.74.39/api/user', {headers: {'Authorization': `Bearer ${localStorage.getItem('authToken')}`}
        })
        .then((res) => {
            commit("SETUSER", res.data)
        })
        .catch((error) => {
            console.error(error)
        })
        .finally(() => commit('LOADING', false))
}

export function logout( { commit }) {
    commit('LOGOUT')
    router.push({name: 'login'}).then(() => console.log("Signin"))
}

export function deleteErrors( { commit } ) {
    commit("DELETEERRORS");
}

export function addError ( { commit }, msg) {
    commit('ADDERROR', msg)
}