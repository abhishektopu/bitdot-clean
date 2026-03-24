// import package
import React from 'react'
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
// import 'react-phone-input-2/lib/style.css'

// import component
import GridContainer from "components/Grid/GridContainer.js";
import PhoneNoForm from './PhoneNoForm';

// import action
import { openPhoneModal } from '../../actions/modalAction'

const PhoneNoChange = (props) => {
    const dispatch = useDispatch()

    // props
    const { callFrom } = props;

    // redux-state
    const accountData = useSelector(state => state.account);
    const { phoneCode, phoneNo, phoneStatus } = accountData;

    return (
        <div className="dashboard_box profileDetailView">
            <div class="alert alert-info" role="alert">Introduce your mobile format (Example: +44 77 555 444) in international format and click send verification code. You will receive a sms verification code.</div>
            <div className="contact_form">
                {
                    phoneStatus == 'unverified' && <GridContainer>
                        <PhoneNoForm />
                    </GridContainer>
                }

                {
                    callFrom == 'profile' && phoneStatus == 'verified' && <div className="profileDetailView">
                        <ul>
                            <li><label>Your verified mobile phone is: </label> <span>+{phoneCode} {phoneNo}</span>  <a href="#"
                                onClick={() => openPhoneModal(dispatch)}
                                className="ml-2 changeLink">Change mobile number</a></li>
                        </ul>
                    </div>
                }

                {
                    callFrom == 'kyc' && phoneStatus == 'verified' && <div className="profileDetailView">
                        <ul>
                            <li className="d-flex align-items-center"><label>Your verified mobile phone is: </label> <span>+{phoneCode} {phoneNo}</span>  <i className="fas fa-check-circle enableGreen ml-2"></i></li>
                        </ul>
                    </div>
                }

            </div>
        </div>
    )
}

PhoneNoChange.propTypes = {
    callFrom: PropTypes.string.isRequired,
};

PhoneNoChange.defaultProps = {
    callFrom: 'profile',
};

export default PhoneNoChange;