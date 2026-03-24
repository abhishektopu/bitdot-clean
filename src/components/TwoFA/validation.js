// import lib
import isEmpty from '../../lib/isEmpty';

const validation = (value) => {
    let errors = {};

    if (isEmpty(value.secret)) {
        errors.secret= "REQUIRED"
    }

    if (isEmpty(value.uri)) {
        errors.uri = "REQUIRED"
    }

    if (isEmpty(value.code)) {
        errors.code = "REQUIRED"
    } else if (isNaN(value.code) || value.code.length > 6) {
        errors.code = "INVALID_CODE"
    }

    return errors;
}

export default validation;