import * as dashboardActions from '../actions/dashboardActions';

const initSate = {
    username: ''
}

const reducer = (state = initSate, action) => {
    switch (action.type) {
        case dashboardActions.DASHBOARD_SET_USERNAME:
            return {
                ...state,
                username: action.use
            };
            default:
                return state;
    }
};

export default reducer;