import axios from "axios";


const token = localStorage.getItem('authToken')
let headers = {Authorization: 'Bearer ' + token}

export function toggleTodo( { commit }, payload) {
    axios
        .post('http://138.68.74.39/api/completeTodo/' + payload.todoId, null, {headers:headers, params: {name: payload.name, completed: payload.completed ? "0" : "1", todolist_id: payload.listId}})
        .then((res) => {
            console.log(res.data)
        })
        .catch((error) => {
            console.error(error)
            commit('TOGGLETODO', payload);
        })
}

export function getTodolists( { commit }) {
    axios.get('http://138.68.74.39/api/todolists', {headers: headers})
        .then(response => {
            commit('SETLISTS', response.data)
        })
}

export function getTodos( { commit } , payload) {
    axios.get('http://138.68.74.39/api/todos/' + payload.listId, {headers: headers})
        .then(response => {
            console.log(response.data)
            payload.data = response.data
            commit("SETTODOS", payload)
        })
        .catch((error) => {
            console.log(error.response);
        })
}

export function createTodo( { commit }, payload) {
    axios
        .post('http://138.68.74.39/api/todo', null, {headers: headers, params: { name: payload.text, completed:0, todolist_id:payload.listId}})
        .then(response => {
            try {
                commit('CREATETODO', response.data)
            } catch (e) {
                console.log(e)
            }
        })
        .catch(error => {
            console.log(error.response.data)
        })
}

export function createTodolist( { commit }, payload) {
    axios
        .post('http://138.68.74.39/api/todolist', null, {headers: headers, params: { name: payload.name}})
        .then(response => {
            commit("CREATETODOLIST", response.data)
        })
        .catch(error => {
            console.log(error.response)
        })
}

export function deleteTodolist( { commit }, payload) {
    axios
        .delete('http://138.68.74.39/api/todolist/' + payload.listId, {headers: headers})
        .then(response => {
            console.log(response.data)
            commit("DELETELIST", payload.listId)
        })
        .catch(error => {
            console.log(error.response.data)
        })
}

export function deleteTodo ({ commit }, payload) {
    console.log(payload.todoId)
    axios
        .delete('http://138.68.74.39/api/todo/' + payload.todoId, {headers: headers})
        .then(response => {
            console.log(response.data)
            commit("DELETETODO", payload)
        })
        .catch(error => {
            console.log(error.response.data)
        })
}

export function removeDone( { commit }, payload) {
    commit("REMOVEDONE", payload);
}

export function changeCurrentList( { commit }, payload) {
    commit("CHANGECURRENTLIST", payload);
}

export function changeTodoText( { commit }, payload) {
    commit("CHANGETODOTEXT", payload);
}

export function changeListName( { commit }, payload) {
    commit("CHANGELISTNAME", payload);
}
