import axios from 'axios';
import { API_URL } from '../config';



const instance = axios.create({
    baseURL: `${API_URL}`,
    timeout: 1000 * 50,
    headers: {
        "Content-Type": "application/json",
    }
});




export const setAuthToken = async (token = null) => {
    instance.defaults.headers.common['Authorization'] = token || ''
}


export default instance;