

export function LOGIN (state, data) {
    state.token = data.token;
}

export function LOGINERROR (state, errorMsg) {
    state.error = errorMsg;
}

export function LOADING(state, bool) {
    state.isLoading = bool
}