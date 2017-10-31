const initialState = {
    token: localStorage.getItem('token'),
    response: null,
    error: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_REJECTED':
            const {data} = action.payload.response || {};
            return {
                ...state,
                response: data,
                error: true
            };
        case 'LOGIN_FULFILLED':
            return {
                ...state,
                response: action.payload.data,
                token: action.payload.data.token,
                error: false
            };
        case 'LOGOUT':
            return {
                ...state,
                response: null,
                token: null,
                error: null
            };
        default:
            return state;
    }
};

export default userReducer;