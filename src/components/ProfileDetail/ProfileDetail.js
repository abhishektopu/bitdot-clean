// import package
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import EditProfile from '../EditProfile';

// import action
import { openPhoneModal, openEmailModal } from '../../actions/modalAction'

const ProfileDetail = (props) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    // state
    const [isHideForm, setHideForm] = useState(true)

    // redux-state
    const accountData = useSelector(state => state.account);
    const { firstName, lastName, email, phoneCode, phoneNo, phoneStatus, blockNo, address, state, city, postalCode, country } = accountData;

    return (
        <div className="dashboard_box">
            <div className="profileDetailView">
                <div class="alert alert-info" role="alert">
                    Your personal details should be introduced strictly as indicated in your official Identification Document and your Proof of Address.
                </div>
                <GridContainer>

                    <GridItem xs={12} sm={12} md={6} lg={6}>

                        <h4>{t("PERSONAL_DETAILS")}</h4>

                        <ul>
                            <li>
                                <label>{t("FULL_NAME")}</label>
                                <span>{firstName}{' '}{lastName}</span>
                            </li>
                            <li>
                                <label>{t("EMAIL_PLACEHOLDER")}</label>
                                <span>{email}</span> <a href="#" onClick={() => openEmailModal(dispatch)} className="ml-2 changeLink">Change email</a>
                            </li>
                            <li>
                                <label>Phone Number</label>
                                {
                                    phoneStatus == 'verified' && <span>+{phoneCode} {phoneNo} <a href="#" onClick={() => openPhoneModal(dispatch)} className="ml-2 changeLink">Change mobile number</a> </span>
                                }

                                {
                                    phoneStatus == 'unverified' && <span>Please verify <i className="fas fa-times-circle disabledRed"></i> </span>
                                }

                            </li>
                        </ul>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                        <h4>{t("RESIDENTIAL_ADDRESS")}</h4>
                        <ul>
                            <li>
                                <label>{t("ADDRESS")}</label>
                                <span>{address}</span>
                            </li>
                            <li>
                                <label>{t("STATE_PROVISION")}</label>
                                <span>{state}</span>
                            </li>
                            <li>
                                <label>{t("CITY")} & {t("POSTAL_CODE")}</label>
                                <span>{city}{' '}{postalCode}</span>
                            </li>
                            <li>
                                <label>{t("COUNTRY")}</label>
                                <span>{country}</span>
                            </li>
                        </ul>
                    </GridItem>
                </GridContainer>
                <div className="form-group">
                    <button
                        className="btn btn-primary text-uppercase py-2"
                        onClick={() => {
                            setHideForm(false)
                        }}
                    >
                        {t("EDIT_PROFILE")}
                    </button>
                </div>
            </div>

            <EditProfile
                callFrom={'profile'}
                formDisable={isHideForm}
                setHideForm={setHideForm}
                formName={"editProfile"}
            />
        </div>
    )
}

export default ProfileDetail;