import {rest_api, urls} from '../api';
import {push} from 'react-router-redux';


export const loginUser = (username, password, next = '/') => {
    return dispatch => {
        return dispatch({
            type: 'LOGIN',
            payload: rest_api().post(urls.login, {username, password})
        }).then(({value, action}) => {
            if (action.type === 'LOGIN_FULFILLED') {
                localStorage.setItem('token', value.data.token);
                dispatch(push(next));
            }
        });
    };
};

export const logoutUser = () => {
    return dispatch => {
        localStorage.removeItem('token');
        return dispatch({type: 'LOGOUT'});
    }
};