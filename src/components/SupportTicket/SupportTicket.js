// import package
import React from 'react';

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Announcement from '../Announcement';
import CreateTicket from './CreateTicket';
import TicketList from './TicketList';

const SupportTicket = () => {
    return (
        <div className="container">
            <GridContainer>
                <GridItem xs={12} sm={12} md={5} lg={5}>
                    <h3 className="dash_title">Create Support Ticket</h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={7} lg={7}>
                    <Announcement />
                </GridItem>
            </GridContainer>
            <div className="dashboard_box">
                <CreateTicket />
            </div>


            <div class="row align-items-center">
                <div class="col-lg-12">
                    <h3 class="dash_title mb-3">Support Details</h3>
                </div>
            </div>
            <TicketList />

        </div>
    )
}

export default SupportTicket;