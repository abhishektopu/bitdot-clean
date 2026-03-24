// import package
import React, { useState, useEffect } from 'react';
import { Switch } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'

// import action
import { editNotif } from '../../actions/dashboardAction';

// import lib
import isEmpty from '../../lib/isEmpty';

const initialFormValue = {
    "twoFA": false,
    "passwordChange": false,
    "siteNotification": false,
}

const Notification = () => {
    const dispatch = useDispatch();

    // state
    const [formValue, setFormValue] = useState(initialFormValue);

    const { twoFA, passwordChange, siteNotification } = formValue;

    // redux-state
    const userSetting = useSelector(state => state.userSetting)

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, checked } = e.target;
        setFormValue({ ...formValue, ...{ [name]: checked } })
        editNotif({
            name,
            checked
        }, dispatch)
    }

    useEffect(() => {
        console.log('userSetting',userSetting)
        if (!isEmpty(userSetting)) {
            setFormValue({
                'twoFA': userSetting.twoFA,
                'passwordChange': userSetting.passwordChange,
                'siteNotification': userSetting.siteNotification,
            })
        }
    }, [userSetting])

    return (
        <div className="dashboard_box dashAlertNotification">
            <h5 class="dash_subtitle mb-0">Alert and Notifications</h5>
            <ul>
                {/* <li>
                    <label>When enable / disable 2FA</label>
                    <Switch
                        checked={twoFA}
                        onChange={handleChange}
                        color="primary"
                        name="twoFA"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </li> */}
                <li>
                    <label>When password is changed</label>
                    <Switch
                        checked={passwordChange}
                        onChange={handleChange}
                        color="primary"
                        name="passwordChange"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </li>
                {/* <li>
                    <label>BitDot notifications</label>
                    <Switch
                        checked={siteNotification}
                        onChange={handleChange}
                        color="primary"
                        name="siteNotification"
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </li> */}
            </ul>
        </div>
    )
}

export default Notification;