// import package
import React, { useState } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import clsx from 'classnames';

// import component
import LimitOrder from './LimitOrder';
import MarketOrder from './MarketOrder';
import StopLimitOrder from './StopLimitOrder';
import StopMarketOrder from './StopMarketOrder';
import TrailingStopOrder from './TrailingStopOrder';

const OrderPlace = (props) => {
    const { t, i18n } = useTranslation();

    // props
    const { setExpandScreen, expandScreen } = props;

    // state
    const [orderType, setOrderType] = useState('limit')
    const [buyorsell, setBuyorsell] = useState('buy') // buy or sell
    const [orderTypeOption, setOrderTypeOption] = useState('stop_limit')

    return (
        <div className="tradeTableLeftSide darkBox orderBook">
            <div className="tableHead MyDragHandleClassName">
                <h4>Place Order</h4>
                <div className="inputGroup">
                    {
                        expandScreen == '' && <a href="#" className="zoomIcon" onClick={() => { setExpandScreen('orderPlace') }}><i class="bi bi-arrows-angle-expand"></i></a>
                    }
                    {
                        expandScreen == 'orderPlace' && <a href="#" className="zoomIcon" onClick={() => { setExpandScreen('') }}><i class="bi bi-arrows-angle-contract"></i></a>
                    }

                </div>
            </div>

            <div className="tradeFulltabbedTable">
                <nav className="place_order_nav_tabs">
                    <div className="nav nav-tabs nav-fill" id="nav-tab1" role="tablist">

                        <a
                            className={clsx("nav-item nav-link py-2", { "active": orderType == 'limit' })}
                            onClick={() => setOrderType('limit')}>
                            Limit
                        </a>
                        <a
                            className={clsx("nav-item nav-link py-2", { "active": orderType == 'market' })}
                            onClick={() => setOrderType('market')}
                        >
                            Market
                        </a>
                        <a
                            className={clsx("nav-item nav-link py-2", { "active": ['stop_limit', 'stop_market','trailing_stop'].includes(orderType) })}
                            onClick={(e) => setOrderType(orderTypeOption)}
                        >
                            {orderTypeOption == 'stop_limit' && t("STOP_LIMIT")}
                            {orderTypeOption == 'stop_market' && t("STOP_MARKET")}
                            {orderTypeOption == 'trailing_stop' && t("TRAILING_STOP")}
                        </a>
                        {/* <Select
                            name="type"
                            value={''}
                            className="dropSelect"
                            onChange={(e) => {
                                e.preventDefault();
                                const { name, value } = e.target;
                                setOrderType(value)
                                setOrderTypeOption(value)
                            }}
                        >
                            <MenuItem value={'stop_limit'}>{t("STOP_LIMIT")}</MenuItem>
                            <MenuItem value={'stop_market'}>{t("STOP_MARKET")}</MenuItem>
                            <MenuItem value={'trailing_stop'}>{t("TRAILING_STOP")}</MenuItem>
                        </Select> */}
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent1">

                    {
                        orderType == 'limit' && <LimitOrder
                            buyorsell={buyorsell}
                        />
                    }



                    {
                        orderType == 'market' && <MarketOrder
                            buyorsell={buyorsell}
                        />
                    }


                    {
                        orderType == 'stop_limit' && <StopLimitOrder
                            buyorsell={buyorsell}
                        />
                    }

                    {
                        orderType == 'stop_market' && <StopMarketOrder
                            buyorsell={buyorsell}
                        />
                    }

                    {
                        orderType == 'trailing_stop' && <TrailingStopOrder
                            buyorsell={buyorsell}
                            orderType={orderType}
                        />
                    }
                </div>
            </div>
        </div >
    )
}

export default OrderPlace;