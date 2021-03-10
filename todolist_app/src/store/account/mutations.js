export function LOGIN (state, data) {
    state.token = data.token;
}

export function ERROR (state, error) {
    state.error = error;
}

export function LOADING(state, bool) {
    state.isLoading = bool
}

export function DELETEERRORS(state) {
    state.error.message = ""
    state.error.errors = {}
}

export function ADDERROR(state, [fieldName, msg]) {
    state.error.errors[fieldName] = [msg]
}