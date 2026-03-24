//import package
import React, { useState, forwardRef, useImperativeHandle } from "react";
import { useTranslation } from 'react-i18next';
import { CountryDropdown } from 'react-country-region-selector';
import clsx from 'classnames';
import { useDispatch } from 'react-redux';

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import action
import { editUserProfile } from '../../actions/users'

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

const EditDetail = forwardRef((props, ref) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch()

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [validateError, setValidateError] = useState({});
    const [loader, setLoader] = useState();
    const [editForm, setEditForm] = useState(true);

    const { firstName, lastName, email, blockNo, address, country, state, city, postalCode } = formValue;

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
        if (!isEmpty(validateError)) {
            setValidateError({})
        }
    }

    const handleCountry = (value) => {
        let formData = { ...formValue, ...{ 'country': value } }
        setFormValue(formData)
        if (!isEmpty(validateError)) {
            setValidateError({})
        }
        // setValidateError(validation(formData))
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
            setValidateError(validationError)
            return
        }
        setLoader(true)
        try {
            const { status, loading, message, error } = await editUserProfile(reqData, dispatch)
            setLoader(loading)
            if (status == 'success') {
                setEditForm(true)
                setFormValue(initialFormValue)
                toastAlert('success', t(message), 'editProfile');
            } else {
                if (error) {
                    setValidateError(error)
                }
                toastAlert('error', t(message), 'editProfile');
            }
        } catch (err) { }
    }

    useImperativeHandle(
        ref,
        () => ({
            editForm(data) {
                setEditForm(false)
                let formData = {
                    'firstName': data.firstName,
                    'lastName': data.lastName,
                    'email': data.email,
                    'blockNo': data.blockNo,
                    'address': data.address,
                    'country': data.country,
                    'state': data.state,
                    'city': data.city,
                    'postalCode': data.postalCode,
                }
                setFormValue(formData)
            }
        }),
    )

    return (
        <form className={clsx("contact_form", { "disabledForm": editForm }, "mb-0")}>
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
                            disabled={editForm}
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
                            disabled={editForm}
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
                            disabled={editForm}
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
                            disabled={editForm}
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
                            disabled={editForm}
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
                            disabled={editForm}
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
                            disabled={editForm}
                        />
                        {validateError.postalCode && <p className="error-message">{t(validateError.postalCode)}</p>}
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={12}>
                    {
                        !editForm && <div className="form-group mb-0">
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
            </GridContainer>
        </form>
    )
})

export default EditDetail;