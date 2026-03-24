// import package
import React, { useState, useEffect } from 'react';

// import action
import { getNotificationHistory } from '../../actions/dashboardAction';

// import lib
import { dateTimeFormat } from '../../lib/dateTimeHelper';

const NotificationHistory = () => {

    // state
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);

    // function
    const fetchNotificationHistory = async () => {
        try {
            const { status, loading, result } = await getNotificationHistory();
            setLoader(loading)
            if (status == 'success') {
                setData(result)
            }
        } catch (err) { }
    }
    useEffect(() => {
        fetchNotificationHistory()
    }, [])

    return (
        <div className="table-responsive">
            <table className="table mb-0">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Fiat/Crypto</th>
                        <th>Amount</th>
                        <th>Transaction Ref.</th>
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
                                    <td>{dateTimeFormat(item.createdAt)}</td>
                                    <td className="textDepositGreen">{item.paymentType}</td>  {/* textWithdrawRed */}
                                    <td>{item.currencySymbol}</td>
                                    <td>{item.amount}</td>
                                    <td>{item.trxId}</td>
                                    <td className="textStatusOrange">{item.status}</td>  {/* textStatusGreen */}
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

export default NotificationHistory;