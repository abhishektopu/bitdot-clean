// import constant
import {
    SET_USER_ACCOUNT,
    UPDATE_USER_ACCOUNT
} from '../constant';

const initialValue = {
    isAuthenticated: false
}
const account = (state = initialValue, action) => {
    switch (action.type) {
        case SET_USER_ACCOUNT:
            return {
                ...state,
                ...action.data
            };
        case UPDATE_USER_ACCOUNT:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }
}

export default account;