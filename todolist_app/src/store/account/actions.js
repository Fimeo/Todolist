import axios from 'axios';

/**
 * Les actions gèrent les opérations non synchrones, l'utilisation de axios
 * se fait donc dans les actions. Les mutations sont appelées pour modifier le state
 *
 * */

export function login ( {commit}, [email, password]) {
    commit('LOADING', true)
    axios
        .post('http://138.68.74.39/api/login', null,{ params: { email: email, password: password}})
        .then(response => {
            commit("LOGIN", response.data)
        })
        .catch(error => {
            commit("LOGINERROR", error.response.data.error)
        })
        .finally(() => commit('LOADING', false))
}