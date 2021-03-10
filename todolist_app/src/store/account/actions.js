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
            commit("ERROR", {message: error.response.data.error, errors: {}})
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
            // error.response.statusText !== "OK"
            let data = {
                message: error.response.statusText,
                errors: {}
            }
            if (error.response.status === 422) {
                data.message = error.response.data.message;
                data.errors = error.response.data.errors;
            }
            commit("ERROR", data)
        })
        .finally(() => commit('LOADING', false))
}

export function deleteErrors( { commit } ) {
    commit("DELETEERRORS");
}

export function addError ( { commit }, [fieldName, msg]) {
    commit('ADDERROR', [fieldName, msg])
}