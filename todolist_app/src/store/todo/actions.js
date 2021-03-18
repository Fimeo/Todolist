import axios from "axios";


const token = localStorage.getItem('authToken')
let headers = {Authorization: 'Bearer ' + token}

export function toggleTodo( { commit }, payload) {
    let config = {
        headers,
        params: {
            name: payload.name,
            completed: payload.completed,
            todolist_id: payload.listId
        }
    };
    axios
        .post('http://138.68.74.39/api/completeTodo/' + payload.todoId, null, config)
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
            console.log(response.data)
            console.log(response)
            commit('CREATETODO', payload)
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
/*
export function deleteTodolist( { commit }, payload) {
    axios
        .delete('http://138.68.74.39/api/todolist/' + payload.listId, {headers: headers})
        .then(response => {
            console.log(response)
            commit("DELETELIST", response)
        })
        .catch(error => {

        })
}
*/
export function deleteItem ({ commit }, payload) {
    commit('DELETETODO', payload);
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
