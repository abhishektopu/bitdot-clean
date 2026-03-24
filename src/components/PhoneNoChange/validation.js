// import lib
import isEmpty from '../../lib/isEmpty';

const validation = (value, type) => {
    let errors = {};

    if (type == 'mobileSubmit') {
        if (isEmpty(value.newPhoneCode)) {
            errors.newPhoneCode = "Required"
        }

        if (isEmpty(value.newPhoneNo)) {
            errors.newPhoneNo = "Required"
        }
    }

    if (type == 'otpSubmit') {
        if (isEmpty(value.otp)) {
            errors.otp = "Required"
        }
    }

    return errors;
}

export default validation;