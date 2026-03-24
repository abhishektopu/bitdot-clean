// import package
import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import clsx from 'classnames';

// import lib
import { capitalize } from '../../lib/stringCase'


const Security = () => {

    // redux-state
    const accountData = useSelector(state => state.account);
    const { twoFAStatus } = accountData;

    return (
        <div className="dashboard_box dashSecurityTable">
            <h5 class="dash_subtitle">Security</h5>
            <div class="table-responsive">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>2 Factor Authentication <a data-tip data-for='clickme' data-event='click' className="ml-2"><i class="fas fa-info-circle"></i></a>
                                <ReactTooltip id='clickme' place='right' effect='solid' clickable={true}>In order to withdraw funds,<br />please enable 2 Factor Authentication</ReactTooltip>
                            </td>
                            <td className="text-right">
                                <i class={clsx({ "fas fa-check-circle enableGreen": twoFAStatus == 'enabled' }, { "fas fa-times-circle disabledRed": twoFAStatus == 'disabled' })}></i>
                                {capitalize(twoFAStatus)} [ <Link to="/settings">{twoFAStatus == 'disabled' ? "Enable Now" : "Disable Now"}</Link> ]
                            </td>
                            <td>You can enable 2FA for enhanced account security</td>
                        </tr>
                        <tr>
                            <td>Login Password</td>
                            <td className="text-right">[ <Link to="/settings"> Update</Link> ]</td>
                            <td>Change your login password</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Security;