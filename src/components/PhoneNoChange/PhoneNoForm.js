// import package
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2'
import { useDispatch, useSelector } from 'react-redux';
// import 'react-phone-input-2/lib/style.css'

// import component
import GridItem from "components/Grid/GridItem.js";

// import action
import { changeNewPhone, verifyNewPhone } from '../../actions/users';
import * as form from '../../actions/formAction';

// import lib
import { toastAlert } from "../../lib/toastAlert";
import isEmpty from '../../lib/isEmpty';
import validation from './validation';

const initialFormValue = {
    'newPhoneCode': '',
    'newPhoneNo': '',
    'otp': ''
}

const mobileInitialValue = {
    isLoading: false,
    type: 'send',  // send or resend,
    timer: 120, //sec,
    isDisable: false,
    timerStart: false
}

const useConstructor = (callBack = () => { }) => {
    const hasBeenCalled = useRef(false);
    if (hasBeenCalled.current) return;
    callBack();
    hasBeenCalled.current = true;
}

const PhoneNoForm = (props) => {
    const dispatch = useDispatch()

    // props
    const { formName } = props;

    useConstructor(() => {
        form.initialization(formName, initialFormValue, dispatch)
    });

    // state
    const [loader, setLoader] = useState();
    const [mobileDetail, setMobileDetail] = useState(mobileInitialValue);

    // redux-state
    const { formValue, validateError } = useSelector(state => state.form[formName]);
    const { newPhoneCode, newPhoneNo, otp } = formValue;

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (!(value == '' || (/^[0-9\b]+$/.test(value) && value.length <= 6))) {
            return
        }
        form.change(formName, name, value, dispatch)
        if (!isEmpty(validateError)) {
            form.validationError(formName, {}, dispatch)
        }
    }

    const handlePhoneNumber = (value, country) => {
    
        const { dialCode } = country;
        let newPhoneNo = value;
        if (dialCode) {
            form.change(formName, 'newPhoneCode', dialCode, dispatch)
            form.change(formName, 'newPhoneNo', newPhoneNo.slice(dialCode.length), dispatch)
        } else if (value) {
            form.change(formName, 'newPhoneNo', newPhoneNo, dispatch)
        }
        if (!isEmpty(validateError)) {
            form.validationError(formName, {}, dispatch)
        }
    }

    const handleMobileSubmit = async (e) => {
        let reqData = {
            newPhoneCode,
            newPhoneNo
        }

        let validationError = validation(reqData, 'mobileSubmit')
        if (!isEmpty(validationError.newPhoneCode) || !isEmpty(validateError.newPhoneNo)) {
            form.validationError(formName, validationError, dispatch)
            return
        }
        setMobileDetail({ ...mobileDetail, ...{ 'isLoading': true, 'isDisable': true } })

        try {
            let { status, loading, error, message } = await changeNewPhone(reqData);

            if (status == "success") {
                setMobileDetail({
                    ...mobileDetail, ...{
                        'isLoading': false,
                        'isDisable': true,
                        'timer': mobileDetail.timer - 1,
                        'timerStart': true,
                        'type': 'resend'
                    }
                })
                toastAlert('success', message, 'editPhoneNumber');
            } else {
                setMobileDetail({
                    ...mobileDetail, ...{
                        'isLoading': false,
                        'isDisable': false
                    }
                })
                if (!isEmpty(error)) {
                    form.validationError(formName, error, dispatch)
                    return
                }
                toastAlert('error', message, 'editPhoneNumber');
            }
        } catch (err) { }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {

            let reqData = {
                otp
            }
            let validationError = validation(reqData, 'otpSubmit')
            if (!isEmpty(validationError)) {
                form.validationError(formName, validationError, dispatch)
                return
            }

            setLoader(true)
            let { status, loading, error, message, result } = await verifyNewPhone(reqData, dispatch);
            setLoader(loading)
            if (status == "success") {
                form.initialization(formName, initialFormValue, dispatch)
                setMobileDetail(mobileInitialValue)
                toastAlert('success', message, 'editPhoneNumber');
            } else {
                if (!isEmpty(error)) {
                    form.validationError(formName, error, dispatch)
                    return
                }
            }
        }
        catch (err) {
        }
    }

    useEffect(() => {
        if (mobileDetail.timer > 0 && mobileDetail.timerStart == true) {
            const intervalId = setInterval(() => {
                setMobileDetail({ ...mobileDetail, ...{ 'timer': mobileDetail.timer - 1 } })
            }, 1000);

            return () => clearInterval(intervalId);
        } else if (mobileDetail.timer == 0 && mobileDetail.timerStart == true) {
            setMobileDetail({
                ...mobileDetail, ...{
                    'timer': 120,
                    'timerStart': false,
                    'isDisable': false
                }
            })
        }
    }, [mobileDetail.timer])

    return (
        <GridItem xs={12} sm={12} md={12} lg={12}>
            <div className="flexForm">
                <div className="form-group">
                    <label>Phone Number<span class="textRed">*</span></label>
                    <div class="input-group mb-3">
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={newPhoneCode + newPhoneNo}
                            onChange={handlePhoneNumber}
                            placeholder={'Eg +44 777 555 444'}
                            specialLabel={false}
                        />
                        <div class="input-group-append">
                            <button
                                type="button"
                                className="btn btn-primary text-uppercase py-2 my-0"
                                disabled={mobileDetail.isDisable || !isEmpty(validateError.newPhoneCode) || !isEmpty(validateError.newPhoneNo)}
                                onClick={handleMobileSubmit}
                            >
                                {mobileDetail.isLoading && <i class="fas fa-spinner fa-spin"></i>}
                                {mobileDetail.type == 'send' ? "Send Verification SMS" : "Resend OTP"}
                            </button>
                        </div>
                    </div>
                    <p>
                        <small>
                            {validateError.newPhoneNo && <span className="error-message">{validateError.newPhoneNo}</span>}
                        </small>
                    </p>
                </div>
                <div className="form-group">
                    <label>Verification Code<span class="textRed">*</span></label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            name="otp"
                            value={otp}
                            onChange={handleChange}
                            pattern="[0-9]*"
                        />
                        <div class="input-group-append">
                            <button
                                type="button"
                                className="btn btn-primary text-uppercase py-2 my-0"
                                disabled={!mobileDetail.isDisable || !isEmpty(validateError.otp)}
                                onClick={handleFormSubmit}
                            >
                                {loader && <i class="fas fa-spinner fa-spin"></i>}
                                Verify Phone Number
                            </button>
                        </div>
                    </div>
                    <p>
                        <small>
                            {
                                validateError.otp && <span className="error-message">{validateError.otp}</span>
                            }
                        </small>
                    </p>

                </div>
            </div>
        </GridItem>
    )
}

PhoneNoForm.propTypes = {
    formName: PropTypes.string
};

PhoneNoForm.defaultProps = {
    formName: 'editPhoneNo'
};

export default PhoneNoForm;