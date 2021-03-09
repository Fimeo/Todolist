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

export function changeTodoText( { commit }, [listId, todoId, text]) {
    commit("CHANGETODOTEXT", [listId, todoId, text])
}