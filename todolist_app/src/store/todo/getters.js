export const doneTodos = (state) => {
    return state.todos.filter(todo => todo.completed);
}

export const remainTodos = (state) => {
    return state.todos.filter(todo => !todo.completed);
}

export const remainTodosCount = () => {
    return remainTodos().count()
}

export const getTodoById = (state) => (id) => {
    return state.todos.find(todo => todo.id === id);
}

export const allTodos = (state) => {
    return state.todos;
}