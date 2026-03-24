// import package
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// import component
import OpenOrder from './OpenOrder';
import OrderHistory from './OrderHistory';
import TradeHistory from './TradeHistory';

const UserOrderList = () => {
    const { t, i18n } = useTranslation();

    // state
    const [openOrderCnt, setOpenOrderCnt] = useState(0);

    // function
    const handleCount = (count) => {
        setOpenOrderCnt(count)
    }

    return (
        <div className="darkBox tradeFulltabbedTable">
            <nav className="MyDragHandleClassName">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                        className="nav-item nav-link active py-2"
                        id="nav-positions-tab"
                        data-toggle="tab"
                        href="#nav-positions"
                        role="tab"
                        aria-controls="nav-positions"
                        aria-selected="true"
                    >
                        {t("OPEN_ORDER")}({openOrderCnt})
                    </a>
                    <a className="nav-item nav-link py-2" id="nav-closedPL-tab" data-toggle="tab" href="#nav-closedPL" role="tab" aria-controls="nav-closedPL" aria-selected="false">Order History</a>
                    <a className="nav-item nav-link py-2" id="nav-active0-tab" data-toggle="tab" href="#nav-active0" role="tab" aria-controls="nav-active0" aria-selected="false">Trade History</a>
                </div>
            </nav>
            <div className="tab-content px-xl-3" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-positions" role="tabpanel" aria-labelledby="nav-positions-tab">
                    <OpenOrder
                        handleCount={handleCount}
                    />
                </div>
                <div className="tab-pane fade" id="nav-closedPL" role="tabpanel" aria-labelledby="nav-closedPL-tab">
                    <OrderHistory />
                </div>
                <div className="tab-pane fade" id="nav-active0" role="tabpanel" aria-labelledby="nav-active0-tab">
                    <TradeHistory />
                </div>
            </div>
        </div>
    )
}

export default UserOrderList;