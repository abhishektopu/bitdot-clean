// import packages
import axios from 'axios';

// import lib
import config from './index';
import { getAuthToken } from '../lib/localStorage'

axios.defaults.baseURL = config.API_URL;
axios.defaults.headers.common['Authorization'] = getAuthToken();

export const setAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = token;
}

export const removeAuthorization = () => {
    delete axios.defaults.headers.common["Authorization"];
}

export default axios;