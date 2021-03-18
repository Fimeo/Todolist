export function SETLISTS(state, payload) {
    state.todolists = payload;
    for (let list of state.todolists) {
        state.currentListId = list.id;
        break;
    }
}

export function SETTODOS(state, payload) {
    state.todolists.find(list => list.id === payload.listId).todos = payload.data
}

export function CREATETODOLIST(state, payload) {
    payload.todos = []
    state.todolists.push(payload);
    state.currentListId = payload.id;
}

export function TOGGLETODO(state, payload){
    let list = state.todolists.find(list => list.id === payload.listId)
    let todo = list.todos.find(todo => todo.id === payload.todoId)
    todo.completed = !todo.completed;
}

export function CHANGELISTNAME (state, payload) {
    state.todolists.find(list => list.id === payload.listId).name = payload.text;
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

export function CHANGECURRENTLIST (state, payload) {
    state.currentListId = payload.listId;
}

export function CHANGETODOTEXT(state, payload) {
    state.todolists.find(list => list.id === payload.listId).todos.find(todo => todo.id === payload.todoId).name = payload.text;
}