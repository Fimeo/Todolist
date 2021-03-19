export function LOGIN (state, token) {
    state.token = token;
}

export function ERROR (state, error) {
    state.errors.push(error);
}

export function LOADING(state, bool) {
    state.isLoading = bool
}

export function DELETEERRORS(state) {
    state.errors = []
}

export function ADDERROR(state, msg) {
    state.errors.push(msg)
}

export function LOGOUT(state, rootState) {
    state.token = ""
    state.user = {}
    rootState.todo.currentListId = null;
    rootState.todo.todolists = []
    localStorage.removeItem('authToken');
}

export function SETUSER(state, payload) {
    state.user = payload;
}