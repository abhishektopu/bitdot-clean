// import constant
import {
    OPEN_PHONE_NO_MODAL,
    CLOSE_PHONE_NO_MODAL,
    OPEN_EMAIL_MODAL,
    CLOSE_EMAIL_MODAL
} from '../constant';

export const openPhoneModal = (dispatch) => {
    dispatch({
        type: OPEN_PHONE_NO_MODAL,
        isPhoneNoModal: true
    })
    return true
}

export const closePhoneModal = (dispatch) => {
    dispatch({
        type: CLOSE_PHONE_NO_MODAL,
        isPhoneNoModal: false
    })
    return true
}

export const openEmailModal = (dispatch) => {
    dispatch({
        type: OPEN_EMAIL_MODAL,
        isEmailModal: true
    })
    return true
}

export const closeEmailModal = (dispatch) => {
    dispatch({
        type: CLOSE_EMAIL_MODAL,
        isEmailModal: false
    })
    return true
}