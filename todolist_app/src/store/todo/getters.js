export const doneTodos = (state) => (listId) => {
    return (state.todolists.find(list => list.id === listId).todos).filter(todo => todo.completed);
}

export const remainTodos = (state) => (listId) => {
    return (state.todolists.find(list => list.id === listId).todos).filter(todo => !todo.completed);
}

export const allTodos = (state) => (listId) => {
    return state.todolists.find(list => list.id === listId).todos
}

export const getTodolists = (state) => {
    return state.todolists;
}

export const getListName = (state) => (id) => {
    return state.todolists.find(list => list.id === id).name
}

export const getCurrentListId = (state) => {
    return state.currentListId;
}