const initialState = {
    tasks: [],
    response: null,
    error: null
};

const taskReducer = (state = initialState, action) => {
    const {tasks} = state;
    let t = null;
    switch (action.type) {
        case 'LOAD_TASKS_FULFILLED':
            return {...state, tasks: action.payload.data};
        case 'ADD_TASK_FULFILLED':
            tasks.push(action.payload.data);
            return {...state, tasks, error: false};
        case 'ADD_TASK_REJECTED':
            return {...state, response: action.payload.response.data, error: true};
        case 'UPDATE_TASK_FULFILLED':
            const {data: update_task_data} = action.payload;
            t = tasks.find(task => task.id === update_task_data.id);
            t.name = update_task_data.name;
            return {...state, tasks, error: false};
        case 'UPDATE_TASK_REJECTED':
            return {...state, response: action.payload.response.data, error: true};
        case 'ADD_SUB_TASK_FULFILLED':
            const sub_task = action.payload.data;
            tasks[tasks.findIndex(task => task.id === sub_task.task.id)].sub_tasks.push(sub_task);
            return {...state, tasks, error: false};
        case 'ADD_SUB_TASK_REJECTED':
            return {...state, response: action.payload.response.data, error: true};
        case 'DELETE_SUB_TASK_FULFILLED':
            const {deletingObject} = action.payload.config;
            t = tasks.find(task => task.id === deletingObject.task.id);
            t.sub_tasks = t.sub_tasks.filter(o => o.id !== deletingObject.id);
            return {...state, tasks, error: false};
        case 'UPDATE_SUB_TASK_FULFILLED':
            const {data: update_sub_task_data} = action.payload;
            t = tasks.find(task => task.id === update_sub_task_data.task.id);
            let subTask = t.sub_tasks.find(task => task.id === update_sub_task_data.id);
            subTask.name = update_sub_task_data.name;
            subTask.status = update_sub_task_data.status;
            return {...state, tasks, error: false};
        case 'UPDATE_SUB_TASK_REJECTED':
            return {...state, response: action.payload.response.data, error: true};
        default:
            return state;
    }
};

export default taskReducer;
