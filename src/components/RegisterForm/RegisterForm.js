// import package
import React, { createRef, useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import Checkbox from 'rc-checkbox';
import clsx from 'classnames';
import { useTranslation } from 'react-i18next';
import { GoogleReCaptchaProvider, GoogleReCaptcha } from 'react-google-recaptcha-v3';

// import config
import config from '../../config';

// import action
import { createUser } from '../../actions/users';

// import lib
import validation from './validation';
import isEmpty from '../../lib/isEmpty';
import { toastAlert } from '../../lib/toastAlert';
import { getLang } from '../../lib/localStorage';

const initialFormValue = {
    'email': '',
    'password': '',
    'confirmPassword': '',
    'isTerms': false,
    'showPassword': false,
    'showConfirmPassword': false
}

const RegisterForm = () => {
    const { t, i18n } = useTranslation();

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [toched, setToched] = useState({});
    const [validateError, setValidateError] = useState({});
    const [loader, setLoader] = useState();
    const [reCaptcha, setReCaptcha] = useState('');

    const { email, password, confirmPassword, isTerms, showPassword, showConfirmPassword } = formValue;

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

    const handleCheckBox = (e) => {
        const { name, checked } = e.target
        let formData = { ...formValue, ...{ [name]: checked } }
        setFormValue(formData)
        setValidateError(validation(formData))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!(isTerms == true)) {
            setValidateError({ 'isTerms': 'ACCEPT_TERMS_MESSAGE' })
            return
        } else if (isEmpty(reCaptcha)) {
            toastAlert('error', 'Invalid ReCaptcha', 'signup', 'TOP_CENTER');
            return
        }

        setLoader(true)

        let reqData = {
            email,
            password,
            confirmPassword,
            reCaptcha,
            isTerms,
            langCode: getLang()
        }
        let { status, loading, message, error } = await createUser(reqData);
        setLoader(loading);
        setReCaptcha('')
        if (status == 'success') {
            setFormValue(initialFormValue)
            setToched({})
            toastAlert('success', message, 'signup', 'TOP_CENTER');
        } else {
            if (error) {
                setValidateError(error);
            }
            toastAlert('error', message, 'signup', 'TOP_CENTER');
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
        <GoogleReCaptchaProvider reCaptchaKey={config.RECAPTCHA_SITE_KEY}>
            <form className="login_form p-4 mb-4" data-aos="fade-up">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email address"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {toched.email && validateError.email && <p className="error-message">{validateError.email}</p>}
                </div>
                <div className="form-group">
                    <div className="input-group regGroupInput">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div className="input-group-append">
                            <Link onClick={(e) => {
                                e.preventDefault();
                                setFormValue((el => {
                                    return { ...el, ...{ showPassword: !el.showPassword } }
                                }))
                            }}>
                                <i className={clsx("fa", { "fa-eye": showPassword }, { "fa-eye-slash": !showPassword })} aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                    <p className="hintText"><small>Password must include at least one UPPERCASE, one lowercase, one number and one special character and be minimum 6 characters long. Eg. Trade7!x</small></p>
                    {toched.password && validateError.password && <p className="error-message">{validateError.password}</p>}
                </div>

                <div className="form-group">
                    <div className="input-group regGroupInput">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            className="form-control"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        <div className="input-group-append">
                            <Link onClick={(e) => {
                                e.preventDefault();
                                setFormValue((el => {
                                    return { ...el, ...{ showConfirmPassword: !el.showConfirmPassword } }
                                }))
                            }}>
                                <i className={clsx("fa", { "fa-eye": showConfirmPassword }, { "fa-eye-slash": !showConfirmPassword })} aria-hidden="true"></i>
                            </Link>
                        </div>
                    </div>
                    {toched.confirmPassword && validateError.confirmPassword && <p className="error-message">{validateError.confirmPassword}</p>}
                </div>


                {/* <div className="form-group text-center">
                <ReCAPTCHA
                    ref={el => { recaptchaRef = el; }}
                    grecaptcha={grecaptchaObject}
                    sitekey={config.RECAPTCHA_SITE_KEY}
                    onChange={handleRecaptcha}
                />
                {validateError.reCaptcha != "" && <p className="error-message">{validateError.reCaptcha}</p>}
            </div> */}

                <div className="form-group">
                    <div className="form-check">
                        <Checkbox
                            name="isTerms"
                            onChange={handleCheckBox}
                            checked={isTerms}
                        />

                        {/* <input
                        type="checkbox"
                        id="flexCheckDefault"
                        name="isTerms"
                        checked={true}
                        // value=""
                        onChange={handleChange}
                    /> */}
                        <label className="form-check-label" for="flexCheckDefault">
                            I accept and agree to the <Link to="/terms">Terms & Conditions</Link>
                        </label>
                        {validateError.isTerms && <p className="error-message">{t(validateError.isTerms)}</p>}
                    </div>
                </div>
                <div className="form-group">
                    <Button
                        onClick={handleFormSubmit}
                        disabled={!isEmpty(validateError) || loader}
                    >
                        {loader && <i class="fas fa-spinner fa-spin"></i>} Submit
                    </Button>
                </div>
                <div className="d-flex">
                    {/* <Link to="/recover-password" className="mr-auto">Forgot password?</Link> */}
                    <Link to="/login" className="ml-auto">Already have an account?</Link>
                </div>
            </form>
            <GoogleReCaptcha
                onVerify={handleReCaptcha}
            />
        </GoogleReCaptchaProvider>
    )
}

export default RegisterForm;