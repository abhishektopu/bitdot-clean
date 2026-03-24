// import lib
import isEmpty from '../../lib/isEmpty';

export const validation = value => {
    let errors = {};
    let imageFormat = /\.(jpg|JPG|jpeg|JPEG|png|PNG|pdf|PDF|docx|doc)$/;

    if (isEmpty(value.type)) {
        errors.type = "Document Type Required";
    }
    if (isEmpty(value.proofNumber)) {
        errors.proofNumber = "Document Number Required";
    }
    if(!imageFormat.test(value.frontImage.name)) {
        errors.frontImage = "Select only allowed File Formats"
    }
    if (value.frontImage && value.frontImage.size) {
        if (value.frontImage.size > 1000000) {
            errors.frontImage = "TOO_LARGE"
        }
        
    } else {
        errors.frontImage = "Frontside Image Requried";
    }
    if (!imageFormat.test(value.backImage.name)) {
        errors.backImage = "Select only allowed File Formats"
    }
    if (value.backImage && value.backImage.size) {
        if (value.backImage.size > 1000000) {
            errors.backImage = "TOO_LARGE"
        }
    } else {
        errors.backImage = "Backside Image Required";
    }
    if (!imageFormat.test(value.selfiImage.name)) {
        errors.selfiImage = "Select only allowed File Formats"
    }
    if (value.selfiImage && value.selfiImage.size) {
        if (value.selfiImage.size > 1000000) {
            errors.selfiImage = "TOO_LARGE"
        } 
    } else {
        errors.selfiImage = "Selfi Image Required";
    }

    return errors;
}

export default validation;