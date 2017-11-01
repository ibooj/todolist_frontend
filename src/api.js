import axios from 'axios';
import {history, todoStore} from './store/index';
import {logoutUser} from './actions/user';


const urls = {
    login: '/api-token-auth/',
    taskList: '/task/',
    subTask: '/subtask/',
};

const rest_api = () => {
    const instance = axios.create({
        baseURL: process.env.NODE_ENV === 'production' ? 'https://ibooj.pythonanywhere.com' : 'http://127.0.0.1:8000'
    });
    const {token} = todoStore.getState().userReducer;
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Token ${token}`;
    }
    instance.interceptors.response.use(null, error => {
        if (error.response.status === 401 || error.response.status === 403) {
            todoStore.dispatch(logoutUser());
            history.push('/login');
        }
        return Promise.reject(error);
    });
    return instance
};


export {urls, rest_api};