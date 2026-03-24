// import constant
import {
    SET_INITIAL_FORM,
    UPDATE_INITIAL_FORM,
    CHANGE_FORM_VALUE,
    FORM_VALIDATION_ERROR
} from '../constant';

export const initialization = (formName, initialValue = {}, dispatch) => {
    dispatch({
        type: SET_INITIAL_FORM,
        formName,
        initialValue
    })
    return true
}

export const updateInitialization = (formName, formValue = {}, dispatch) => {
    dispatch({
        type: UPDATE_INITIAL_FORM,
        formName,
        formValue
    })
    return true
}

export const change = (formName, name, value, dispatch) => {
    dispatch({
        type: CHANGE_FORM_VALUE,
        formName,
        name,
        value
    })
    return true
}

export const validationError = (formName, error = {}, dispatch) => {
    dispatch({
        type: FORM_VALIDATION_ERROR,
        formName,
        error,
    })
    return true
}