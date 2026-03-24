// import package
import React, { useState } from 'react';
import clsx from 'classnames';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {
    Slider,
    Checkbox,
    MenuItem,
    Select,
    Radio,
    RadioGroup,
    FormControlLabel
} from '@material-ui/core';

// import component
import LimitOrder from './LimitOrder';
import MarketOrder from './MarketOrder';

const OrderPlace = (props) => {


    // props
    const { setExpandScreen, expandScreen } = props;

    // state
    const [orderType, setOrderType] = useState('limit')
    const [buyorsell, setBuyorsell] = useState('buy') // buy or sell

    const [value, setValue] = React.useState('ioc');
    const handleCheckChange = (event) => {
        setValue(event.target.value);
    };


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


            {/* <div className="derivativeCalC">
                <div className="calCBtnGroup">
                    <button className="btn greyBtn py-2 px-4">Cross</button>
                    <button className="btn greyBtn py-2 px-4">20X</button>
                </div>
                <div className="calcIcon"><a href="#"><i class="fas fa-calculator"></i></a></div>
            </div> */}
            {/* <div className="ButtonFullWidth">
                <button className="btn placeOrderButton">Open</button>
                <button className="btn placeOrderButton">Close</button>
            </div> */}
            <div className="tradeFulltabbedTable">
                <nav>
                    <div className="nav nav-tabs nav-fill" id="nav-tab1" role="tablist">
                        <a className={clsx("nav-item nav-link py-2", { "active": orderType == 'limit' })}
                            onClick={() => setOrderType('limit')}
                        >
                            Limit
                        </a>
                        <a
                            className={clsx("nav-item nav-link py-2", { "active": orderType == 'market' })}
                            onClick={() => setOrderType('market')}
                        >
                            Market
                        </a>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent1">
                    {/* <div className="tab-pane fade show active" id="nav-limit" role="tabpanel" aria-labelledby="nav-limit-tab"> */}
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
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

export default OrderPlace;