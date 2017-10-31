import {applyMiddleware, createStore} from 'redux';
import createHistory from 'history/createBrowserHistory'
import {routerMiddleware} from 'react-router-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import promise from 'redux-promise-middleware';
import todoReducer from '../reducers/index';


const history = createHistory();


const todoStore = createStore(
    todoReducer,
    composeWithDevTools(applyMiddleware(
        promise(),
        thunk,
        routerMiddleware(history)
    ))
);

export {todoStore, history};
