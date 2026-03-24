// import package
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { Modal } from 'react-bootstrap'

// import component
import GridItem from "components/Grid/GridItem.js";

// import action
import { editEmail } from '../../actions/users';
import { closeEmailModal } from '../../actions/modalAction';

// import lib
import { toastAlert } from "../../lib/toastAlert";
import isEmpty from '../../lib/isEmpty';
import validation from './validation';

const initialFormValue = {
    'newEmail': '',
}

const EmailChange = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [validateError, setValidateError] = useState({});
    const [loader, setLoader] = useState();

    const { newEmail } = formValue;

    // redux-state
    const accountData = useSelector(state => state.account);
    const { email } = accountData;
    const { isEmailModal } = useSelector(state => state.modal);

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoader(true)
            let reqData = {
                newEmail
            }
            let validationError = validation(reqData)
            if (!isEmpty(validationError)) {
                setValidateError(validationError)
                setLoader(false)
                return
            }

            let { status, loading, error, message } = await editEmail(reqData);
            setLoader(loading);
            if (status == "success") {
                setFormValue({
                    'newEmail': email
                })
                toastAlert('success', message, 'editEmail');
            } else {
                if (error) {
                    setValidateError(error);
                } else if (message) {
                    toastAlert('error', t(message), 'editEmail');
                }
            }
        }
        catch (err) {
        }
    }

    useEffect(() => {
        // if (email) {
        //     setFormValue({
        //         'newEmail': email
        //     })
        // }
    }, [email])


    return (

        <Modal show={isEmailModal} centered onHide={() => closeEmailModal(dispatch)}>
            <Modal.Header closeButton>
                <Modal.Title>Change Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <GridItem xs={12} sm={12} md={12} lg={12} className="px-0 contact_form">
                    <div className="form-group">
                        <label>New Email Address<span class="textRed">*</span></label>
                        <input
                            type="text"
                            name="newEmail"
                            value={newEmail}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {
                            validateError.newEmail && <p className="error-message">{validateError.newEmail}</p>
                        }
                    </div>
                    <div className="form-group">
                        <button
                            type="button" className="btn btn-primary text-uppercase py-2 my-0"
                            onClick={handleFormSubmit}
                            disabled={loader}
                        >
                            {loader && <i class="fas fa-spinner fa-spin"></i>}
                            Change Email
                        </button>
                    </div>
                </GridItem>

            </Modal.Body>
        </Modal>


    )
}
export default EmailChange;