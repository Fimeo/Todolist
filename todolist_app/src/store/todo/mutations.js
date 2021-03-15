export function TOGGLETODO(state, payload){
    let list = state.todolists.find(list => list.id === payload.listId)
    let todo = list.todos.find(todo => todo.id === payload.todoId)
    todo.completed = !todo.completed;
}

export function CHANGELISTNAME (state, payload) {
    state.todolists.find(list => list.id === payload.listId).list_name = payload.text;
}

export function DELETETODO (state, payload) {
    let list = state.todolists.find(list => list.id === payload.listId)
    for (let t of list.todos) {
        if (t.id === payload.todo.id) {
            list.todos.splice(list.todos.indexOf(payload.todo), 1);
            return;
        }
    }
}

export function CREATETODO (state, payload) {
    if (payload.text !== "" && payload.text !== undefined) {
        if (state.todolists.find(list => list.id === payload.listId)) {
            state.todolists.find(list => list.id === payload.listId).todos.push(
                {
                    id: state.cpt++,
                    name: payload.text,
                    completed: false
                }
            )
        }
    }
}

export function REMOVEDONE (state, payload) {
    let list = state.todolists.find(list => list.id === payload.listId)
    list.todos = list.todos.filter(item => !item.completed)
}

export function CREATELIST (state) {
    state.todolists.push({
        id: state.list_cpt,
        list_name: "list_" + state.list_cpt++,
        todos: []
    })
}

export function CHANGECURRENTLIST (state, payload) {
    state.currentListId = payload.listId;
}

export function CHANGETODOTEXT(state, payload) {
    state.todolists.find(list => list.id === payload.listId).todos.find(todo => todo.id === payload.todoId).name = payload.text;
}