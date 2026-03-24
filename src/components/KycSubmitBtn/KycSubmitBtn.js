// import package
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

// import action
import { updateKyc } from '../../actions/userKyc';
import * as form from '../../actions/formAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { toastAlert } from '../../lib/toastAlert';
import validation from './validation';

const KycSubmitBtn = (props) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    // props
    const { formName } = props;

    // state
    const [loader, setLoader] = useState();

    // redux-state
    const accountData = useSelector(state => state.account);
    const { idProof, addressProof } = useSelector(state => state.userKyc);
    const { phoneStatus } = accountData;
    const { formValue, validateError } = useSelector(state => state.form[formName]);

    // function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
      console.log('phoneStatus',phoneStatus)
        if(phoneStatus != 'verified'){
            toastAlert('error', 'Kindly verify the mobile phone number', 'kycBtn')
            setLoader(false)
            return
        }

        let validationError = validation(formValue)
        if (!isEmpty(validationError)) {
            form.validationError(formName, validationError, dispatch)
            setLoader(false)
            return
        }
        try {
            const formData = new FormData();

            formData.append('firstName', formValue.firstName);
            formData.append('lastName', formValue.lastName);
            formData.append('address', formValue.address);
            formData.append('country', formValue.country);
            formData.append('state', formValue.state);
            formData.append('city', formValue.city);
            formData.append('postalCode', formValue.postalCode);
            formData.append('type', formValue.type);
            formData.append('proofNumber', formValue.proofNumber);
            formData.append('frontImage', formValue.frontImage);
            formData.append('backImage', formValue.backImage);
            formData.append('selfiImage', formValue.selfiImage);
            formData.append('typeAddress', formValue.typeAddress);
            formData.append('frontImageAddress', formValue.frontImageAddress);

            const { status, loading, message, error } = await updateKyc(formData, dispatch);
            setLoader(loading)
            if (status == 'success') {
                toastAlert('success', t(message), 'kycBtn')
            } else {
                if (error) {
                    form.validationError(formName, error, dispatch)
                    return
                }
                toastAlert('error', t(message), 'kycBtn')
            }
        } catch (err) { }
    }

    return (
        <div className="form-group mb-0">
            {
                idProof && ['new', 'rejected'].includes(idProof.status) && addressProof && ['new', 'rejected'].includes(addressProof.status) && <button
                    className="btn btn-primary text-uppercase py-2 m-0"
                    disabled={loader}
                    onClick={handleSubmit}
                >
                    {loader && <i class="fas fa-spinner fa-spin"></i>}
                    {t("KYC_SUBMIT")}
                </button>
            }
        </div>
    )
}

KycSubmitBtn.propTypes = {
    formName: PropTypes.string.isRequired,
};

KycSubmitBtn.defaultProps = {
    formName: 'kyc'
};

export default KycSubmitBtn;