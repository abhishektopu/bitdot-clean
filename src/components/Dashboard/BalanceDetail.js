// import package
import React from 'react';

// import component
import UserBalance from './UserBalance';
import BalanceChart from './BalanceChart';
import BalanceList from './BalanceList';

const BalanceDetail = () => {
    return (
        <div className="dashboard_box">
            <h5 className="dash_subtitle">Balance Details</h5>
            <div className="balance_details_panel">
                <UserBalance />
                <BalanceChart />

            </div>
            {/* <div className="table-responsive">
                <BalanceList />
            </div> */}
        </div>
    )
}

export default BalanceDetail;