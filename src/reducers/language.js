// import constant
import {
    SET_LANGUAGE_OPTION,
} from '../constant';

const initialState = [];

const language = (state = initialState, action) => {
    switch (action.type) {
        case SET_LANGUAGE_OPTION:
            return [
                ...state,
                ...action.data
            ];
        default:
            return state;
    }

}

export default language;