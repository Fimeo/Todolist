//import axios from "axios";

export function toggleTodo ({ commit }, payload ){
    commit('TOGGLETODO', payload);
}

export function deleteItem ({ commit }, payload) {
    commit('DELETETODO', payload);
}

export function addTodo ({ commit }, payload) {
    commit('CREATETODO', payload);
}

export function removeDone( { commit }, payload) {
    commit("REMOVEDONE", payload);
}

export function createList( { commit }) {
    commit("CREATELIST");
}

export function changeCurrentList( { commit }, payload) {
    commit("CHANGECURRENTLIST", payload);
}

export function changeTodoText( { commit }, payload) {
    commit("CHANGETODOTEXT", payload);
}

export function changeListName( { commit }, payload) {
    commit("CHANGELISTNAME", payload);
}
