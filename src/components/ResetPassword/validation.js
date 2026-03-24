// import lib
import isEmpty from '../../lib/isEmpty';

const validation = value => {
    let errors = {},
        passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,18}/g;
        
    if (isEmpty(value.password)) {
        errors.password = "Required"
    } else if (!(passwordRegex.test(value.password))) {
        errors.password = "Password should contain atleast one uppercase, atleast one lowercase, atleast one number, atleast one special character and minimum 6 and maximum 18"
    }

    if (isEmpty(value.confirmPassword)) {
        errors.confirmPassword = "Required"
    } else if (!(isEmpty(value.confirmPassword)) && value.password != value.confirmPassword) {
        errors.confirmPassword = "Passwords must match"
    }


    return errors;
}

export default validation;