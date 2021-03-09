export const isLogged = (state) => {
    return state.token !== "";
}

export const isLoading = (state) => {
    return state.isLoading;
}

export const getError = (state) => {
    return state.error;
}