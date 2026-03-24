
// import lib
import isEmpty from '../../lib/isEmpty';

const validation = value => {
    let errors = {};
    let imageFormat = /\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF)$/;

    if (isEmpty(value.firstName)) {
        errors.firstName = "REQUIRED"
    }
    if (isEmpty(value.lastName)) {
        errors.lastName = "REQUIRED"
    }

    if (isEmpty(value.address)) {
        errors.address = "REQUIRED"
    }
    if (isEmpty(value.country)) {
        errors.country = "REQUIRED"
    }

    if (isEmpty(value.city)) {
        errors.city = "REQUIRED"
    }
    if (isEmpty(value.postalCode)) {
        errors.postalCode = "REQUIRED"
    }

    if (isEmpty(value.type)) {
        errors.type = "REQUIRED";
    }

    if (isEmpty(value.proofNumber)) {
        errors.proofNumber = "REQUIRED";
    }

    if (value.frontImage && value.frontImage.size) {
        if (value.frontImage.size > 10000000) {  // 10 MB
            errors.frontImage = "TOO_LARGE"
        } else if (!imageFormat.test(value.frontImage.name)) {
            errors.frontImage = "INVALID_IMAGE"
        }
    } else {
        errors.frontImage = "REQUIRED";
    }

    if (!isEmpty(value.type) && value.type != 'passport') {
        if (value.backImage && value.backImage.size) {
            if (value.backImage.size > 10000000) {   // 10 MB
                errors.backImage = "TOO_LARGE"
            } else if (!imageFormat.test(value.backImage.name)) {
                errors.backImage = "INVALID_IMAGE"
            }
        } else {
            errors.backImage = "REQUIRED";
        }
    }

    if (value.selfiImage && value.selfiImage.size) {
        if (value.selfiImage.size > 10000000) {  // 10 MB
            errors.selfiImage = "TOO_LARGE"
        } else if (!imageFormat.test(value.selfiImage.name)) {
            errors.selfiImage = "INVALID_IMAGE"
        }
    } else {
        errors.selfiImage = "REQUIRED";
    }


    if (isEmpty(value.typeAddress)) {
        errors.typeAddress = "REQUIRED";
    }

    if (value.frontImageAddress && value.frontImageAddress.size) {
        if (value.frontImageAddress.size > 10000000) {   // 10 MB
            errors.frontImageAddress = "TOO_LARGE"
        } else if (!imageFormat.test(value.frontImageAddress.name)) {
            errors.frontImageAddress = "INVALID_IMAGE"
        }
    } else {
        errors.frontImageAddress = "REQUIRED";
    }


    return errors;
}

export default validation;




