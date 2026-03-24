// import package
import React from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import clsx from 'classnames';
import { Link } from 'react-router-dom';

// import lib
import { emailFormat } from '../../lib/stringCase'
import { userStatus, kycStatus } from '../../lib/displayStatus';

const UserDetail = () => {
    const { t, i18n } = useTranslation();

    // redux-state
    const accountData = useSelector(state => state.account);
    const { idProof, addressProof } = useSelector(state => state.userKyc);

    const { userId, emailStatus, phoneStatus, phoneCode, phoneNo, type, email } = accountData;

    return (
        <div className="dashboard_box">
            <h5 className="dash_subtitle">User Details</h5>
            <div className="dashUserDetails">
                {/*                 <div className="dudLeft">
                    <img src={require("../../assets/images/dashUserPic.jpg")} alt="" className="img-fluid" />
                    <a href="#"><i class="fas fa-pencil-alt"></i></a>
                </div> */}
                <div className="dudRight">
                    <ul>
                        <li>
                            <label>User ID </label> <span>{userId}</span>
                        </li>
                        <li>
                            <label>KYC Verification </label> <span>{t(kycStatus(idProof.status))} <i className={clsx({ "fas fa-check-circle enableGreen": idProof.status == 'approved' }, { "fas fa-times-circle disabledRed": ['new', 'pending', 'rejected'].includes(idProof.status) })}></i></span>

                        </li>
                        <li>
                            <label>Email</label> <span>
                                <i class={clsx({ "fas fa-check-circle enableGreen": emailStatus == 'verified' }, { "fas fa-times-circle disabledRed": emailStatus == 'unverified' })}></i> {emailStatus} {emailFormat(email)}
                            </span>
                        </li>

                        <li>
                            <label>Mobile Phone</label> 
                            {
                                    phoneStatus == 'unverified' && <span><i class="fas fa-times-circle disabledRed"></i> Not Verified [ <Link to='/profile'>Verify Now</Link> ]</span>
                                }

                                {
                                    phoneStatus == 'verified' && <span>+{phoneCode}{phoneNo}</span>
                                }
                        </li>


                    </ul>
                </div>
            </div>
        </div>
    )
}

export default UserDetail;