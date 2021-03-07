import axios from 'axios';

export function getTodolists({ commit }) {
    axios
        .get('http://138.68.74.39/api/todolists ')
        .then(response => {
            commit("GETTODOLISTS", response.data)
        })
        .catch(error => console.log(error))
}

export function deleteItem ({ commit }, [listId, item]) {
    commit('DELETETODO', [listId, item]);
}

export function addTodo ({ commit }, [listId, text]) {
    commit('CREATETODO', [listId, text]);
}

export function removeDone( { commit }, listId) {
    commit("REMOVEDONE", listId);
}

export function createList( { commit }) {
    commit("CREATELIST");
}

export function changeCurrentList( { commit }, listId) {
    commit("CHANGECURRENTLIST", listId);
}