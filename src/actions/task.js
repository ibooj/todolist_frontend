import {rest_api, urls} from '../api';


export const loadTasks = () => {
    return dispatch => {
        return dispatch({
            type: 'LOAD_TASKS',
            payload: rest_api().get(urls.taskList)
        });
    };
};

export const addTask = (name) => {
    return dispatch => {
        return dispatch({
            type: 'ADD_TASK',
            payload: rest_api().post(urls.taskList, {name})
        });
    }
};

export const deleteTask = (id) => {
    return dispatch => {
        return dispatch({
            type: 'DELETE_TASK',
            payload: rest_api().delete(`${urls.taskList}${id}/`)
        });
    }
};

export const updateTask = (id, name) => {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_TASK',
            payload: rest_api().put(`${urls.taskList}${id}/`, {name})
        });
    }
};

export const addSubTask = (name, task) => {
    return dispatch => {
        return dispatch({
            type: 'ADD_SUB_TASK',
            payload: rest_api().post(urls.subTask, {name, task})
        });
    }
};

export const deleteSubTask = o => {
    return dispatch => {
        return dispatch({
            type: 'DELETE_SUB_TASK',
            payload: rest_api().delete(`${urls.subTask}${o.id}/`, {deletingObject: o})
        });
    }
};

export const updateSubTask = o => {
    return dispatch => {
        return dispatch({
            type: 'UPDATE_SUB_TASK',
            payload: rest_api().patch(`${urls.subTask}${o.id}/`, o)
        });
    }
};