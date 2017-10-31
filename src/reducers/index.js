import {combineReducers} from 'redux';
import userReducer from './user';
import taskReducer from './task';
import {routerReducer} from 'react-router-redux';

const todoReducer = combineReducers({
    userReducer,
    taskReducer,
    routing: routerReducer
});

export default todoReducer;
