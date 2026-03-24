// import constant
import {
    OPEN_PHONE_NO_MODAL,
    CLOSE_PHONE_NO_MODAL,
    OPEN_EMAIL_MODAL,
    CLOSE_EMAIL_MODAL
} from '../constant';

const initialState = {
    isPhoneNoModal: false,
    isEmailModal: false
};

const modal = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_PHONE_NO_MODAL:
            return {
                ...state,
                isPhoneNoModal: action.isPhoneNoModal
            };
        case CLOSE_PHONE_NO_MODAL:
            return {
                ...state,
                isPhoneNoModal: action.isPhoneNoModal
            };
        case OPEN_EMAIL_MODAL:
            return {
                ...state,
                isEmailModal: action.isEmailModal
            };
        case CLOSE_EMAIL_MODAL:
            return {
                ...state,
                isEmailModal: action.isEmailModal
            };
        default:
            return state;
    }

}

export default modal;