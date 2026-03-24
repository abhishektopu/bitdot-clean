// import lib
import isEmpty from '../../lib/isEmpty';

const validation = value => {
    let errors = {};
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;

    if (isEmpty(value.newEmail)) {
        errors.newEmail = "Required"
    } else if (!(emailRegex.test(value.newEmail))) {
        errors.newEmail = "Invalid email"
    }

    return errors;
}

export default validation;