import axios from "axios";

export function toggleTodo( { commit }, payload) {
    commit('TOGGLETODO', payload)
    axios
        .post('http://138.68.74.39/api/completeTodo/' + payload.todoId, null, {headers:{Authorization: 'Bearer ' + localStorage.getItem('authToken')}, params: {name: payload.name, completed: +!payload.completed, todolist_id: payload.listId}})
        .catch(() => {
            commit("TOGGLETODO", payload)
        })
}

export function getTodolists( { commit }) {
    axios.get('http://138.68.74.39/api/todolists', {headers: {Authorization: 'Bearer ' + localStorage.getItem('authToken')}})
        .then(response => {
            commit('SETLISTS', response.data)
        })
}

export function getTodos( { commit } , payload) {
    axios.get('http://138.68.74.39/api/todos/' + payload.listId, {headers: {Authorization: 'Bearer ' + localStorage.getItem('authToken')}})
        .then(response => {
            payload.data = response.data
            commit("SETTODOS", payload)
        })
        .catch((error) => {
            console.log(error.response);
        })
}

export function createTodo( { commit }, payload) {
    axios
        .post('http://138.68.74.39/api/todo', null, {headers: {Authorization: 'Bearer ' + localStorage.getItem('authToken')}, params: { name: payload.text, completed:0, todolist_id:payload.listId}})
        .then(response => {
            commit('CREATETODO', response.data)
        })
        .catch(error => {
            console.log(error.response.data)
        })
}

export function createTodolist( { commit }, payload) {
    axios
        .post('http://138.68.74.39/api/todolist', null, {headers: {Authorization: 'Bearer ' + localStorage.getItem('authToken')}, params: { name: payload.name}})
        .then(response => {
            commit("CREATETODOLIST", response.data)
        })
        .catch(error => {
            console.log(error.response)
        })
}

export function deleteTodolist( { commit }, payload) {
    axios
        .delete('http://138.68.74.39/api/todolist/' + payload.listId, {headers: {Authorization: 'Bearer ' + localStorage.getItem('authToken')}})
        .then(() => {
            commit("DELETELIST", payload)
        })
        .catch(error => {
            console.log(error.response.data)
        })
}

export function deleteTodo ({ commit }, payload) {
    axios
        .delete('http://138.68.74.39/api/todo/' + payload.todoId, {headers: {Authorization: 'Bearer ' + localStorage.getItem('authToken')}})
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

export function changeCurrentList( { commit }, payload) {
    commit("CHANGECURRENTLIST", payload);
}

export function changeTodoText( { commit }, payload) {
    axios
        .patch('http://138.68.74.39/api/todo/' + payload.todoId, null, {headers: {Authorization: 'Bearer ' + localStorage.getItem('authToken')}, params: {name: payload.text, completed: +payload.completed, todolist_id: payload.listId}})
        .then(res => {
            console.log(res.data)
            commit("CHANGETODOTEXT", payload);
        })
        .catch(error => {
            console.log(error.response.data);
        });
}