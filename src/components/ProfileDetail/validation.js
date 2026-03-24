// import lib
import isEmpty from '../../lib/isEmpty';

const validation = value => {
    let errors = {};

    if (isEmpty(value.firstName)) {
        errors.firstName = "REQUIRED"
    }
    if (isEmpty(value.lastName)) {
        errors.lastName = "REQUIRED"
    }
    // if (isEmpty(value.blockNo)) {
    //     errors.blockNo = "REQUIRED"
    // }
    if (isEmpty(value.address)) {
        errors.address = "REQUIRED"
    }
    if (isEmpty(value.country)) {
        errors.country = "REQUIRED"
    }
    // if (isEmpty(value.state)) {
    //     errors.state = "REQUIRED"
    // }
    if (isEmpty(value.city)) {
        errors.city = "REQUIRED"
    }
    if (isEmpty(value.postalCode)) {
        errors.postalCode = "REQUIRED"
    }

    return errors;
}

export default validation;