function setDefaultCurrentList(state){
    state.currentListId = null;
    for (let list of state.todolists) {
        state.currentListId = list.id;
        break;
    }
}

export function SETLISTS(state, payload) {
    state.todolists = payload;
    setDefaultCurrentList(state)
}

export function SETTODOS(state, payload) {
    state.todolists.find(list => list.id === payload.listId).todos = payload.data
}

export function CREATETODOLIST(state, payload) {
    payload.todos = []
    state.todolists.push(payload);
    state.currentListId = payload.id;
}


//TODO : revoir la suppression dans le state car ne supprime pas la bonne liste
export function DELETELIST(state, payload){
    let list = state.todolists.find(list => list.id === payload.listId)
    state.todolists.splice(state.todolists.indexOf(list), 1)
    setDefaultCurrentList(state)
}

export function TOGGLETODO(state, payload){
    let list = state.todolists.find(list => list.id === payload.listId)
    let todo = list.todos.find(todo => todo.id === payload.todoId)
    todo.completed = +!payload.completed;
}

export function DELETETODO (state, payload) {
    let list = state.todolists.find(list => list.id === payload.listId)
    for (let t of list.todos) {
        if (t.id === payload.todoId) {
            list.todos.splice(list.todos.indexOf(t), 1);
            return;
        }
    }
}

export function CREATETODO (state, payload) {
    let list = state.todolists.find(list => list.id === payload.todolist_id)
    payload.completed = 0
    list.todos.push(payload)
}

export function CHANGECURRENTLIST (state, payload) {
    state.currentListId = payload.listId;
}

export function CHANGETODOTEXT(state, payload) {
    state.todolists.find(list => list.id === payload.listId).todos.find(todo => todo.id === payload.todoId).name = payload.text;
}

