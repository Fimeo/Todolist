export const isLogged = (state) => {
    return state.token !== "";
}

export const isLoading = (state) => {
    return state.isLoading;
}

export const getErrors = (state) => {
    return state.errors;
}

export const getToken = (state) => {
    return state.token
}