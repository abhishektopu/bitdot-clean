// import package
import React, { useCallback, useState, useEffect } from 'react';
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

// import config
import config from '../../config';

// import action
import { forgotPassword } from '../../actions/users';

// import lib
import validation from './validation';
import isEmpty from '../../lib/isEmpty';
import { toastAlert } from '../../lib/toastAlert';

const initialFormValue = {
    'email': '',
}

const ForgotPassword = () => {
    const { t, i18n } = useTranslation();

    // states
    const [formValue, setFormValue] = useState(initialFormValue);
    const [reCaptcha, setReCaptcha] = useState('');
    const [toched, setToched] = useState({});
    const [validateError, setValidateError] = useState({});
    const [loader, setLoader] = useState();

    const { email } = formValue;

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
        setValidateError(validation(formData))
    }

    const handleBlur = (e) => {
        const { name } = e.target;
        setToched({ ...toched, ...{ [name]: true } })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (isEmpty(reCaptcha)) {
            toastAlert('error', 'Invalid ReCaptcha', 'forgotPassword');
            return
        }

        setLoader(true)
        let reqData = {
            email,
            reCaptcha
        }
        let { status, loading, error, message } = await forgotPassword(reqData);
        setLoader(loading);
        setReCaptcha('')
        if (status == "success") {
            setFormValue(initialFormValue)
            setToched({})
            setValidateError(validation(initialFormValue))
            toastAlert('success', message, 'forgotPassword');
        } else {
            if (error) {
                setValidateError(error);
            }
            toastAlert('error', message, 'forgotPassword');

        }
    }

    const handleReCaptcha = useCallback((token) => {
        if (isEmpty(reCaptcha)) {
            setReCaptcha(token)
        }
    }, [reCaptcha])

    useEffect(() => {
        setValidateError(validation(formValue))
    }, [])

    return (
        <div className="login_container">
            <h2 className="text-center mb-md-4 pb-3" data-aos="fade-up">Forgot Password</h2>
            <div className="row w-100">
                <div className="col-lg-4 col-md-6 m-auto">
                    <GoogleReCaptchaProvider reCaptchaKey={config.RECAPTCHA_SITE_KEY}>
                        <form className="login_form p-4 mb-4" data-aos="fade-up">
                            <p className="paraLabel text-center mb-3">{t("RECOVERY_PASSWORD_TITLE")}</p>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    placeholder="Email address"
                                    name="email"
                                    value={email}
                                    type="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {
                                    toched.email && validateError.email && <p className="error-message">{t(validateError.email)}</p>
                                }

                            </div>
                            {/* <div className="form-group text-center">
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                grecaptcha={grecaptchaObject}
                                sitekey={config.RECAPTCHA_SITE_KEY}
                                onChange={handleRecaptcha}
                            />
                            {validateError.reCaptcha != "" && <p className="error-message">{validateError.reCaptcha}</p>}
                        </div> */}

                            <div className="form-group">
                                <Button
                                    onClick={handleFormSubmit}
                                    disabled={!isEmpty(validateError) || loader}
                                >
                                    {loader && <i class="fas fa-spinner fa-spin"></i>} Submit
                                </Button>
                            </div>
                            <div className="d-flex">
                                <Link to="/home" className="mr-auto">Home</Link>
                                <Link to="/login" className="ml-auto">Login</Link>
                            </div>
                        </form>
                        <GoogleReCaptcha
                            onVerify={handleReCaptcha}
                        />
                    </GoogleReCaptchaProvider>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword;