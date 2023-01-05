import axios from 'axios';


axios.defaults.baseURL =  'http://localhost:3333';
// axios.defaults.withCredentials = false;

export const rest = axios;