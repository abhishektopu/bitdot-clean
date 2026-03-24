// import lib
import isEmpty from '../../lib/isEmpty';

const validation = value => {
    let errors = {};
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
    let passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W).{6,18}/g;

    if (isEmpty(value.email)) {
        errors.email = "Required"
    } else if (!(emailRegex.test(value.email))) {
        errors.email = "Invalid email"
    }

    if (isEmpty(value.password)) {
        errors.password = "Required"
    } else if (!(passwordRegex.test(value.password))) {
        errors.password = "Password should contain atleast one uppercase, atleast one lowercase, atleast one number, atleast one special character and minimum 6 and maximum 18"
    } else if (value.password.length > 18) {
        errors.password = "Password should contain atleast one uppercase, atleast one lowercase, atleast one number, atleast one special character and minimum 6 and maximum 18"
    }

    if (isEmpty(value.confirmPassword)) {
        errors.confirmPassword = "Required"
    } else if (!(isEmpty(value.confirmPassword)) && value.password != value.confirmPassword) {
        errors.confirmPassword = "Passwords must match"
    }

    // if (isEmpty(value.reCaptcha)) {
    //     errors.reCaptcha = "Required"
    // }
    
    // if (!(value.isTerms == true)) {
    //     errors.isTerms = "Required"
    // }

    return errors;
}

export default validation;