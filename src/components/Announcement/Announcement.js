// import package
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'

// import lib
import { dateTimeFormat } from '../../lib/dateTimeHelper'
import isEmpty from '../../lib/isEmpty';

const Announcement = () => {

    // redux-state
    const accountData = useSelector(state => state.account);
    const anncData = useSelector(state => state.announcement);

    const { loginHistory } = accountData;

    return (
        <ul className="profile_dash">

            {
                anncData && anncData.length > 0 && !isEmpty(anncData[0]) && <li>{anncData[0].content} - <span>Admin Announcement</span></li>
            }

            {
                !isEmpty(loginHistory) && <li>{dateTimeFormat(loginHistory.createdDate, 'DD-MM-YYYY HH:mm')}, {loginHistory.broswername}, {loginHistory.ipaddress}  - <span>Last login</span></li>
            }

        </ul>

    )
}

export default Announcement;