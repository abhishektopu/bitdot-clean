// import lib
import isEmpty from '../../lib/isEmpty';


export const limitOrderValidate = (value) => {
    let errors = {};

    if (isEmpty(value.price)) {
        errors.price = "Price field is Required"
        return errors;
    } else if (isNaN(value.price)) {
        errors.price = "Price only numeric value"
        return errors;
    }else if (value.price<=0) {
        errors.price = "Price should be greater than 0"
        return errors;
    }

    if (isEmpty(value.quantity)) {
        errors.quantity = "Quantity field is Required"
        return errors;
    } else if (isNaN(value.quantity)) {
        errors.quantity = "Quantity only numeric value"
        return errors;
    }
    else if (value.quantity<=0) {
        errors.quantity = "Quantity should be greater than 0"
        return errors;
    }

    if (isEmpty(value.buyorsell)) {
        errors.buyorsell = "Side field is Required"
        return errors;
    } else if (!['buy', 'sell'].includes(value.buyorsell)) {
        errors.value = "Invalid side"
        return errors;
    }

    if (isEmpty(value.spotPairId)) {
        errors.spotPairId = "Pair field is Required"
        return errors;
    }
}

export const marketOrderValidate = (value) => {
    let errors = {};

    if (isEmpty(value.quantity)) {
        errors.quantity = "Quantity field is Required"
        return errors;
    } else if (isNaN(value.quantity)) {
        errors.quantity = "Quantity only numeric value"
        return errors;
    }else if (value.quantity<=0) {
        errors.quantity = "Quantity should be greater than 0"
        return errors;
    }

    if (isEmpty(value.buyorsell)) {
        errors.buyorsell = "Side field is Required"
        return errors;
    } else if (!['buy', 'sell'].includes(value.buyorsell)) {
        errors.value = "Invalid side"
        return errors;
    }

    if (isEmpty(value.spotPairId)) {
        errors.spotPairId = "Pair field is Required"
        return errors;
    }
}

export const trailingOrderValidate = (value) => {
    let errors = {};

    if (isEmpty(value.distance)) {
        errors.distance = "Distance field is Required"
        return errors;
    } else if (isNaN(value.distance)) {
        errors.distance = "Distance only numeric value"
        return errors;
    }

    if (isEmpty(value.quantity)) {
        errors.quantity = "Quantity field is Required"
        return errors;
    } else if (isNaN(value.quantity)) {
        errors.quantity = "Quantity only numeric value"
        return errors;
    }else if (value.quantity<=0) {
        errors.quantity = "Quantity should be greater than 0"
        return errors;
    }
    
    if (isEmpty(value.buyorsell)) {
        errors.buyorsell = "Side field is Required"
        return errors;
    } else if (!['buy', 'sell'].includes(value.buyorsell)) {
        errors.value = "Invalid side"
        return errors;
    }

    if (isEmpty(value.spotPairId)) {
        errors.spotPairId = "Pair field is Required"
        return errors;
    }
}

const validation = (value) => {
    if (value.orderType == 'limit') {
        return limitOrderValidate(value)
    } else if (value.orderType == 'market') {
        return marketOrderValidate(value)
    } else if (value.orderType == 'trailing_stop') {
        return trailingOrderValidate(value)
    }
}

export default validation;