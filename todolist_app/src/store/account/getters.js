export const isLogged = (state) => {
    return state.token !== "";
}

export const isLoading = (state) => {
    return state.isLoading;
}

export const getErrorField = (state) => (field) => {
    if (state.error.errors[field] !== undefined)
    return state.error.errors[field][0];
}

export const getErrorMessage = (state) => {
    return state.error.message;
}

export const getToken = (state) => {
    return state.token
}