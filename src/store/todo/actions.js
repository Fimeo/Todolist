import api from '@/api/api.js'

export function toggleTodo( { commit }, payload) {
    commit('TOGGLETODO', payload)
    api
        .post('/completeTodo/' + payload.todoId, null, {params: {name: payload.name, completed: +!payload.completed, todolist_id: payload.listId}})
        .catch(() => {
            payload.completed = +!payload.completed
            commit("TOGGLETODO", payload)
        })
}

export function getTodolists( { commit }) {
    api.get('/todolists')
        .then(response => {
            commit('SETLISTS', response.data)
        })
}

export function getTodos( { commit } , payload) {
    api.get('/todos/' + payload.listId)
        .then(response => {
            payload.data = response.data
            commit("SETTODOS", payload)
        })
        .catch((error) => {
            console.log(error.response);
        })
}

export function createTodo( { commit }, payload) {
    api
        .post('/todo', null, {params: {name: payload.text, completed:0, todolist_id:payload.listId}})
        .then(response => {
            commit('CREATETODO', response.data)
        })
        .catch(error => {
            console.log(error.response.data)
        })
}

export function createTodolist( { commit }, payload) {
    api
        .post('/todolist', null, {params: {name: payload.name}})
        .then(response => {
            commit("CREATETODOLIST", response.data)
        })
        .catch(error => {
            console.log(error.response)
        })
}

export function deleteTodolist( { commit }, payload) {
    api
        .delete('/todolist/' + payload.listId)
        .then(() => {
            commit("DELETELIST", payload)
        })
        .catch(error => {
            console.log(error.response.data)
        })
}

export function deleteTodo ({ commit }, payload) {
    api
        .delete('/todo/' + payload.todoId)
        .then(() => {
            commit("DELETETODO", payload)
        })
        .catch(error => {
            console.log(error.response.data)
        })
}

export function removeDone( { dispatch }, payload) {
    for (let todo of payload.todos) {
        dispatch('deleteTodo', {todoId: todo.id, listId: payload.listId})
    }
}

// When current list has been changed, reload todos from list
export function changeCurrentList( { commit, dispatch }, payload) {
    dispatch('getTodos', payload);
    commit("CHANGECURRENTLIST", payload);
}

export function changeTodoText( { commit }, payload) {
    api
        .patch('/todo/' + payload.todoId, null, {params: {name: payload.text, completed: +payload.completed, todolist_id: payload.listId}})
        .then(() => {
            commit("CHANGETODOTEXT", payload);
        })
        .catch(error => {
            console.log(error.response.data);
        });
}