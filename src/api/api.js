import axios from 'axios'

/**
 * Define api endpoint base URL when user is logged
 * Add header bearer token for authentication
 */

export default axios.create({
    baseURL: 'http://138.68.74.39/api/',
    timeout: 5000,
    headers: {Authorization: 'Bearer ' + localStorage.getItem('authToken')}
})