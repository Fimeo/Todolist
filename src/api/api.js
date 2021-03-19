import axios from 'axios'
export default axios.create({
    baseURL: 'http://138.68.74.39/api/',
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
    }
})