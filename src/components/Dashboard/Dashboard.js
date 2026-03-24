// import package
import React from 'react';

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import History from './History';
import Notification from './Notification';
import BalanceDetail from './BalanceDetail';
import UserDetail from './UserDetail';
import Security from './Security';
import Announcement from '../Announcement';


const Dashboard = () => {

    return (
        <div className="dashboardContent userPages">
            <div className="container">
                <GridContainer>
                    <GridItem xs={12} sm={12} md={5} lg={5}>
                        <h3 className="dash_title">Dashboard</h3>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7} lg={7}>
                        <Announcement />
                    </GridItem>
                </GridContainer>

                <GridContainer>
                    <GridItem xs={12} sm={12} md={8} lg={8}>
                        <BalanceDetail />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4} lg={4}>
                        <UserDetail />
                    </GridItem>
                </GridContainer>
                <History />
                <Security />
                <Notification />

            </div>
        </div>
    )
}

export default Dashboard;