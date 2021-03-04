export function DELETETODO (state, todo) {
    for (let t of state.todos) {
        if (t.id === todo.id) {
            state.todos.splice(state.todos.indexOf(todo), 1);
            return;
        }
    }
}

export function CREATETODO (state, name) {
    if (name !== "") {
        state.todos.push({id: state.cpt, name: name, completed: false});
        state.cpt++;
    }
}

export function REMOVEDONE (state) {
    state.todos = state.todos.filter(item => !item.completed)
}