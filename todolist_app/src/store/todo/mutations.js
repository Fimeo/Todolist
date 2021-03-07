export function DELETETODO (state, [listId, todo]) {
    let list = state.todolists.find(list => list.id === listId)
    for (let t of list.todos) {
        if (t.id === todo.id) {
            list.todos.splice(list.todos.indexOf(todo), 1);
            return;
        }
    }
}

export function CREATETODO (state, [listId, text]) {
    if (text !== "" && text !== undefined) {
        if (state.todolists.find(list => list.id === listId)) {
            state.todolists.find(list => list.id === listId).todos.push(
                {
                    id: state.cpt++,
                    name: text,
                    completed: false
                }
            )
        }
    }
}

export function REMOVEDONE (state, listId) {
    let list = state.todolists.find(list => list.id === listId)
    list.todos = list.todos.filter(item => !item.completed)
}

export function CREATELIST (state) {
    state.todolists.push({
        id: state.list_cpt,
        list_name: state.list_cpt++,
        todos: []
    })
}

export function CHANGECURRENTLIST (state, listId) {
    state.currentListId = listId;
}