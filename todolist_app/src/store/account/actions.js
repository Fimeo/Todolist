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
            commit("LOGIN", response.data)
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
            commit("REGISTER", response.data)
        })
        .catch(error => {
            commit("ERROR", error.response.data)
        })
        .finally(() => commit('LOADING', false))
}

export function deleteErrors( { commit } ) {
    commit("DELETEERRORS");
}

export function addError ( { commit }, [fieldName, msg]) {
    commit('ADDERROR', [fieldName, msg])
}