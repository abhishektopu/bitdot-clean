// import package
import React from 'react';

// import component
import RecentTransaction from './RecentTransaction';
import UserLoginHistory from './UserLoginHistory';
import NotificationHistory from './NotificationHistory';

const History = () => {
    return (
        <div className="dashboard_box dashHistoryTable">
            <nav>
                <div class="nav nav-tabs primaryNav" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="nav-recentTransaction-tab" data-toggle="tab" href="#nav-recentTransaction" role="tab" aria-controls="nav-recentTransaction" aria-selected="true">Recent Transactions</a>
                    <a class="nav-item nav-link" id="nav-loginHistory-tab" data-toggle="tab" href="#nav-loginHistory" role="tab" aria-controls="nav-loginHistory" aria-selected="false">Login History</a>
                    <a class="nav-item nav-link" id="nav-notificationHistory-tab" data-toggle="tab" href="#nav-notificationHistory" role="tab" aria-controls="nav-notificationHistory" aria-selected="false">Notification History</a>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-recentTransaction" role="tabpanel" aria-labelledby="nav-recentTransaction-tab">
                    <RecentTransaction />
                </div>
                <div class="tab-pane fade" id="nav-loginHistory" role="tabpanel" aria-labelledby="nav-loginHistory-tab">
                    <UserLoginHistory />
                </div>
                <div class="tab-pane fade" id="nav-notificationHistory" role="tabpanel" aria-labelledby="nav-notificationHistory-tab">
                    <NotificationHistory />
                </div>
            </div>
        </div>
    )
}

export default History;