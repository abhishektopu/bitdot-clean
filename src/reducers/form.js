// import constant
import {
    SET_INITIAL_FORM,
    UPDATE_INITIAL_FORM,
    CHANGE_FORM_VALUE,
    FORM_VALIDATION_ERROR
} from '../constant';

const initialValue = {}

const form = (state = initialValue, action) => {
    switch (action.type) {
        case SET_INITIAL_FORM:
            return {
                ...state,
                [action.formName]: {
                    formValue: action.initialValue,
                    validateError: {}
                }
            }
        case UPDATE_INITIAL_FORM:
            let preFormValue = state[action.formName] && state[action.formName]['formValue'] ? state[action.formName]['formValue'] : {};
            return {
                ...state,
                [action.formName]: {
                    formValue: {
                        ...preFormValue,
                        ...action.formValue
                    },
                    validateError: {}
                }
            }
        case CHANGE_FORM_VALUE:
            return {
                ...state,
                [action.formName]: {
                    ...state[action.formName],
                    'formValue': {
                        ...state[action.formName]['formValue'],
                        [action.name]: action.value
                    }
                },
            }
        case FORM_VALIDATION_ERROR:
            return {
                ...state,
                [action.formName]: {
                    ...state[action.formName],
                    'validateError': action.error
                },
            }

        default:
            return state;
    }
}

export default form;