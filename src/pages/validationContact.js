// import lib
import isEmpty from '../lib/isEmpty';

const validation = value => {
    let errors = {};
   
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;
    if (isEmpty(value.firstname)) {
        errors.firstname = "Firstname Required"
    }
    if (isEmpty(value.lastname)) {
        errors.lastname = "Lastname Required"
    }
    if (isEmpty(value.message)) {
        errors.message = "Message Required"
    }
    if (isEmpty(value.email)) {
        errors.email = "Email Required"
    }else if (!(emailRegex.test(value.email))) {
        errors.email = "Invalid email"
    }
    
    return errors;
}

export default validation;