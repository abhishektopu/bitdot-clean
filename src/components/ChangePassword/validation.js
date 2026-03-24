// import lib
import isEmpty from '../../lib/isEmpty';

const validation = value => {
    let errors = {};
    let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,18}/g;

    if (isEmpty(value.oldPassword)) {
        errors.oldPassword = "REQUIRED"
    }

    if (isEmpty(value.password)) {
        errors.password = "REQUIRED"
    } else if (!(passwordRegex.test(value.password))) {
        errors.password = "PASSWORD_MIN_MAX"
    }

    if (isEmpty(value.confirmPassword)) {
        errors.confirmPassword = "REQUIRED"
    } else if (!(isEmpty(value.confirmPassword)) && value.password != value.confirmPassword) {
        errors.confirmPassword = "CONFIRM_PASSWORD_MISMATCH"
    }

    return errors;
}

export default validation;