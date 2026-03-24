// import package
import React from 'react';

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import StakingList from './StakingList';
import StakeHistory from './StakeHistory';
import OrderList from './OrderList'
import BalanceDetail from './BalanceDetail';


const Staking = () => {
    return (
        <>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8} lg={7}>
                    <BalanceDetail />
                </GridItem>
                <GridItem xs={12} sm={12} md={4} lg={5}>
                    <OrderList />
                </GridItem>
            </GridContainer>
            <StakingList />
            <StakeHistory />
        </>
    )
}

export default Staking;