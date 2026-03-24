// import package
import React from 'react';

// import component
import ViewBankDetail from './ViewBankDetail';
import EditBankDetail from './EditBankDetail';
import ListBankDetail from './ListBankDetail';


const BankAccount = () => {

    return (
        <div className="dashboard_box">
            <ListBankDetail />
            <EditBankDetail />
            <ViewBankDetail />
        </div>
    )
}

export default BankAccount;