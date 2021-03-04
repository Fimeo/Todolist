export function deleteItem ({ commit }, item) {
    commit('DELETETODO', item);
}

export function addTodo ({ commit }, text ) {
    commit('CREATETODO', text);
}
