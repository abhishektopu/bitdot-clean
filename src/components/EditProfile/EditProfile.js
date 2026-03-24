//import package
import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { CountryDropdown } from 'react-country-region-selector';
import clsx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import action
import { editUserProfile } from '../../actions/users'
import * as form from '../../actions/formAction';

// import lib
import { toastAlert } from '../../lib/toastAlert';
import isEmpty from '../../lib/isEmpty';
import validation from './validation';

const initialFormValue = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'blockNo': '',
    'address': '',
    'country': '',
    'state': '',
    'city': '',
    'postalCode': ''
}

const useConstructor = (callBack = () => { }) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current = true;
}

const EditProfile = (props) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()

    // props
    const { callFrom, formDisable, formName, setHideForm } = props;

    useConstructor(() => {
        form.updateInitialization(formName, initialFormValue, dispatch)
    });

    // state
    const [loader, setLoader] = useState();

    // redux-state
    const accountData = useSelector(state => state.account);
    const { formValue, validateError } = useSelector(state => state.form[formName]);
    const { firstName, lastName, blockNo, address, country, state, city, postalCode } = formValue;

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        form.change(formName, name, value, dispatch)
        if (!isEmpty(validateError)) {
            form.validationError(formName, {}, dispatch)
        }
    }

    const handleCountry = (value) => {
        form.change(formName, 'country', value, dispatch)
        if (!isEmpty(validateError)) {
            form.validationError(formName, {}, dispatch)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let reqData = {
            firstName,
            lastName,
            blockNo,
            address,
            country,
            state,
            city,
            postalCode
        }
        let validationError = validation(reqData)
        if (!isEmpty(validationError)) {
            form.validationError(formName, validationError, dispatch)
            return
        }
        setLoader(true)
        try {
            const { status, loading, message, error } = await editUserProfile(reqData, dispatch)
            setLoader(loading)
            if (status == 'success') {
                form.initialization(formName, initialFormValue, dispatch)
                setHideForm(true)
                toastAlert('success', t(message), 'editProfile');
            } else {
                if (error) {
                    form.validationError(formName, error, dispatch)
                }
                toastAlert('error', t(message), 'editProfile');
            }
        } catch (err) { }
    }

    useEffect(() => {
        if (!isEmpty(accountData)) {
            if (/* callFrom == 'profile' && */ formDisable == false) {
                let formData = {
                    'firstName': accountData.firstName,
                    'lastName': accountData.lastName,
                    'blockNo': accountData.blockNo,
                    'address': accountData.address,
                    'country': accountData.country,
                    'state': accountData.state,
                    'city': accountData.city,
                    'postalCode': accountData.postalCode,
                }
                form.updateInitialization(formName, formData, dispatch)
            }
        }
    }, [accountData, formDisable])

    return (
        <form className={clsx("contact_form", { "disabledForm": formDisable }, "mb-0")}>
            <GridContainer>
                <GridItem xs={12} sm={6} md={6} lg={3}>
                    <div className="form-group">
                        <label>{t('FIRST_NAME')}<span className="textRed">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            name={"firstName"}
                            value={firstName}
                            onChange={handleChange}
                            disabled={formDisable}
                        />
                        {validateError.firstName && <p className="error-message">{t(validateError.firstName)}</p>}
                    </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={3}>
                    <div className="form-group">
                        <label>{t('LAST_NAME')}<span className="textRed">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            name={"lastName"}
                            value={lastName}
                            onChange={handleChange}
                            disabled={formDisable}
                        />
                        {validateError.lastName && <p className="error-message">{t(validateError.lastName)}</p>}
                    </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                    <div className="form-group">
                        <label>{t('ADDRESS')}<span className="textRed">*</span> <span>(Fill in your address as it appears on your proof of address document)</span></label>
                        <input
                            type="text"
                            className="form-control"
                            name={"address"}
                            value={address}
                            onChange={handleChange}
                            disabled={formDisable}
                        />
                        {validateError.address && <p className="error-message">{t(validateError.address)}</p>}
                    </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={3}>
                    <div className="form-group">
                        <label>{t("COUNTRY")}<span className="textRed">*</span></label>
                        <CountryDropdown
                            value={country}
                            onChange={handleCountry}
                            // onBlur={handleBlurCountry}
                            className="country_dropdown form-control"
                            disabled={formDisable}
                        />
                        {validateError.country && <p className="error-message">{t(validateError.country)}</p>}
                    </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={3}>
                    <div className="form-group">
                        <label>{t("STATE_PROVISION")}</label>
                        <input
                            type="text"
                            className="form-control"
                            name={"state"}
                            value={state}
                            onChange={handleChange}
                            disabled={formDisable}
                        />
                        {validateError.state && <p className="error-message">{t(validateError.state)}</p>}
                    </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={3}>
                    <div className="form-group">
                        <label>{t('CITY')}<span className="textRed">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            name={"city"}
                            value={city}
                            onChange={handleChange}
                            disabled={formDisable}
                        />
                        {validateError.city && <p className="error-message">{t(validateError.city)}</p>}
                    </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={3}>
                    <div className="form-group">
                        <label>{t('POSTAL_CODE')}<span className="textRed">*</span></label>
                        <input
                            type="text"
                            className="form-control"
                            name={"postalCode"}
                            value={postalCode}
                            onChange={handleChange}
                            disabled={formDisable}
                        />
                        {validateError.postalCode && <p className="error-message">{t(validateError.postalCode)}</p>}
                    </div>
                </GridItem>
                {
                    callFrom == 'profile' && <GridItem xs={12} sm={12} md={12} lg={12}>
                        {
                            !formDisable && <div className="form-group mb-0">
                                <button
                                    type="button"
                                    className="btn btn-primary text-uppercase py-2"
                                    onClick={handleFormSubmit}
                                >
                                    {loader && <i className="fas fa-spinner fa-spin"></i>} {t('SUBMIT')}
                                </button>
                            </div>
                        }
                    </GridItem>
                }
            </GridContainer>
        </form>
    )
}

EditProfile.propTypes = {
    callFrom: PropTypes.string.isRequired,
    formDisable: PropTypes.bool.isRequired,
    formName: PropTypes.string.isRequired,
    setHideForm: PropTypes.func
};

EditProfile.defaultProps = {
    callFrom: 'profile',
    formDisable: true,
    formName: 'editProfile'
};

export default EditProfile;