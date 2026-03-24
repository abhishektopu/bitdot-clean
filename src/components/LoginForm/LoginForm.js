// import package
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Button } from "@material-ui/core";
import browser from 'browser-detect';
import Checkbox from 'rc-checkbox';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

// import action
import { getGeoInfoData, login } from '../../actions/users';

// import lib
import validation from './validation';
import isEmpty from '../../lib/isEmpty';
import { toastAlert } from '../../lib/toastAlert';
import { getLang } from '../../lib/localStorage';

const initialFormValue = {
    'email': '',
    'password': '',
    'twoFACode': '',
    'isTerms': false
}

const LoginForm = () => {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [toched, setToched] = useState({});
    const [validateError, setValidateError] = useState({});
    const [loader, setLoader] = useState();
    const [loginHistory, setLoginHistory] = useState({});
    const [showTwoFA, setShowTowFA] = useState(false)

    const { email, password, isTerms, twoFACode } = formValue;

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (name == 'twoFACode') {
            if (!(value == '' || (/^[0-9\b]+$/.test(value) && value.length <= 6))) {
                return
            }
        }

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

    const getGeoInfo = async () => {
        try {
            let { result } = await getGeoInfoData();
            const browserResult = browser();
            setLoginHistory({
                countryName: result.country_name,
                countryCode: result.country_calling_code,
                ipaddress: result.ip,
                region: result.region,
                broswername: browserResult.name,
                ismobile: browserResult.mobile,
                os: browserResult.os,
            })
        }
        catch (err) {
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        let reqData = {
            email,
            password,
            isTerms,
            twoFACode,
            loginHistory,
            langCode: getLang()
        }
        let { status, loading, message, error } = await login(reqData, dispatch);
        setLoader(loading);
        if (status == 'success') {
            setFormValue(initialFormValue)
            toastAlert('success', message, 'login');
            history.push('/profile')
        } else if (status == 'TWO_FA') {
            setShowTowFA(true)
            toastAlert('success', message, 'login');
        } else {
            if (error) {
                setValidateError(error);
            }
            toastAlert('error', message, 'login');
        }
    }

    useEffect(() => {
        getGeoInfo()
        setValidateError(validation(formValue))
    }, [])

    return (
        <form className="login_form p-4 mb-4" data-aos="fade-up">
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder={t('EMAIL_PLACEHOLDER')}
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {toched.email && validateError.email && <p className="error-message">{t(validateError.email)}</p>}
            </div>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    placeholder={t('PASSWORD_PLACEHOLDER')}
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {toched.password && validateError.password && <p className="error-message">{t(validateError.password)}</p>}
            </div>

            {
                showTwoFA && <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder={t('ENTER_TWO_FA_CODE')}
                        name="twoFACode"
                        value={twoFACode}
                        onChange={handleChange}
                    />
                    {validateError.twoFACode && <p className="error-message">{t(validateError.twoFACode)}</p>}
                </div>
            }



            <div className="form-group">
                <div className="form-check">
                    <Checkbox
                        name="isTerms"
                        onChange={handleCheckBox}
                        checked={isTerms}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                        {t('KEEP_SIGN_COMPUTER')}
                    </label>
                </div>
            </div>
            <div className="form-group">
                
                <Button
                    onClick={handleFormSubmit}
                    disabled={!isEmpty(validateError) || loader}
                >
                    {loader && <i class="fas fa-spinner fa-spin"></i>} {t('SIGN_IN_BUTTON')}
                </Button>
            </div>
            <div className="d-flex">
                <Link to="/recover-password" className="mr-auto">
                    {t('FORGOT_PASSWORD')}?
                </Link>
                <Link to="/register" className="ml-auto">
                    {t("DON'T_HAVE_ACCOUNT")}?
                </Link>
            </div>
        </form>
    )
}

export default LoginForm;