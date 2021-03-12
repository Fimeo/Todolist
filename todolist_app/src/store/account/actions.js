import axios from 'axios';

/**
 * Les actions gèrent les opérations non synchrones, l'utilisation de axios
 * se fait donc dans les actions. Les mutations sont appelées pour modifier le state
 *
 * */

export function login ( { commit }, [email, password]) {
    commit('LOADING', true)
    axios
        .post('http://138.68.74.39/api/login', null,{ params: { email: email, password: password}})
        .then(response => {
            commit("LOGIN", response.data.token)
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

export function register ( { commit }, [email, password, name]) {
    commit('LOADING', true)
    axios
        .post('http://138.68.74.39/api/register', null, { params: { email: email, password: password, name: name}})
        .then(response => {
            // Response code : 200 = "OK"
            // Store token
            commit("LOGIN", response.data.token)
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

export function deleteErrors( { commit } ) {
    commit("DELETEERRORS");
}

export function addError ( { commit }, msg) {
    commit('ADDERROR', msg)
}