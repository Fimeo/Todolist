export default function () {
    return {
        token: localStorage.getItem('authToken') || "",
        user: {},
        errors: [],
        isLoading: false,
    }
}