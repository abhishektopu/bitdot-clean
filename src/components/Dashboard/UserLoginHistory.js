// import package
import React, { useState, useEffect } from 'react';

// import action
import { getLoginHistory } from '../../actions/dashboardAction';

// import lib
import { dateTimeFormat } from '../../lib/dateTimeHelper';

const UserLoginHistory = () => {
    // state
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);

    // function
    const fetchLoginHistory = async () => {
        try {
            const { status, loading, result } = await getLoginHistory();
            setLoader(loading)
            if (status == 'success') {
                setData(result)
            }
        } catch (err) { }
    }
    useEffect(() => {
        fetchLoginHistory()
    }, [])

    return (

        <div className="table-responsive">
            <table className="table mb-0">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>IP Address</th>
                        <th>Location</th>
                        <th>Device</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loader && <div>Loading...</div>
                    }
                    {
                        !loader && data && data.length > 0 && data.map((item, key) => {
                            return (
                                <tr key={key}>
                                    <td>{dateTimeFormat(item.createdDate, 'YYYY-MM-DD HH:mm')}</td>
                                    <td>{item.ipaddress}</td>
                                    <td>{item.regionName}, {item.countryName}</td>
                                    <td>{item.broswername}, {item.os}</td>
                                    <td>{item.status}</td>
                                </tr>
                            )
                        })
                    }
                    {
                        !loader && data && data.length <= 0 && <div>
                            No record
                            </div>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserLoginHistory;