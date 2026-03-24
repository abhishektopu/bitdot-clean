// import package
import React, { useState } from 'react';
import {
    Slider,
    Checkbox,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom'

// import action
import { orderPlace } from '../../actions/perpetualTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { encryptObject } from '../../lib/cryptoJS'
import { toastAlert } from '../../lib/toastAlert';
import { toFixed } from '../../lib/roundOf';
import { inverseOrderCost } from '../../lib/bybit';

const marks = [
    {
        value: 1,
        label: '1%',
    },
    {
        value: 25,
        label: '25%',
    },
    {
        value: 50,
        label: '50%',
    },
    {
        value: 75,
        label: '75%',
    },
    {
        value: 100,
        label: '100%',
    },
];

function valuetext(value) {
    return `${value}%`;
}

const initialFormValue = {
    'quantity': '',
    'total': '',
    'leverage': 1,
    'buyOrderCost': '',
    'sellOrderCost': '',
    'takeProfit': '',
    'stopLoss': '',
    'isProfitLoss': false,
    'orderType': 'market'
}

const MarketOrder = (props) => {
    const { t, i18n } = useTranslation();
    const history = useHistory();

    // props
    const { buyorsell } = props;

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [loader, setLoader] = useState();
    const { quantity, total, leverage, buyOrderCost, sellOrderCost, takeProfit, stopLoss, isProfitLoss, orderType } = formValue;

    // redux-state
    const tradePair = useSelector(state => state.tradePair);
    const marketPriceData = useSelector(state => state.marketPrice);
    const { isAuth } = useSelector(state => state.auth);
    const { firstCurrency, secondCurrency } = useSelector(state => state.tradeAsset);

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (!/^\d*\.?\d*$/.test(value)) {
            return
        }
        let formData = { ...formValue, ...{ [name]: value } }

        setFormValue(formData)
        calculateOrderCost(marketPriceData.markPrice, formData.quantity, formData.leverage, formData)
    }

    const calculateOrderCost = (price, quantity, leverage, formData) => {
        if (!isEmpty(price) && !isEmpty(quantity) && !isEmpty(leverage) && !isEmpty(tradePair)) {
            let buyOrderCost = inverseOrderCost({
                price: marketPriceData.markPrice,
                quantity,
                leverage,
                takerFee: tradePair.taker_fees,
                buyorsell: 'buy'
            })

            let sellOrderCost = inverseOrderCost({
                price: marketPriceData.markPrice,
                quantity,
                leverage,
                takerFee: tradePair.taker_fees,
                buyorsell: 'sell'
            })

            setFormValue({
                ...formData, ...{
                    // 'total': orderValue,
                    'leverage': leverage,
                    'buyOrderCost': buyOrderCost,
                    'sellOrderCost': sellOrderCost
                }
            })
        }
    }

    const handlePercentage = (e, percentage) => {
        calculateOrderCost(marketPriceData.markPrice, quantity, percentage, formValue)
    }

    const handleProfitLossCheck = (e) => {
        e.preventDefault();
        const { name, checked } = e.target;
        setFormValue({ ...formValue, ...{ [name]: checked } })
    }

    const handleSubmit = async (buyorsell) => {
        try {
            // const validateError = await validation(formValue, orderType, buyorsell)
            // if (!isEmpty(validateError)) {
            //     toastAlert('error', validateError[Object.keys(validateError)[0]], 'spotOrder');
            //     return
            // }
            setLoader(true)
            let reqData = {
                quantity: quantity,
                buyorsell: buyorsell,
                orderType: orderType,
                pairId: tradePair.pairId,
                leverage: leverage,
                'newdate': new Date()
            }

            let encryptToken = {
                token: encryptObject(reqData)
            }


            let { status, loading, message, error, result } = await orderPlace(encryptToken);
            setLoader(loading)
            if (status == 'success') {
                setFormValue(initialFormValue);
                toastAlert('success', message, 'marketOrder');

                toastAlert('success', message, 'marketOrder');
            } else {
                toastAlert('error', message, 'marketOrder');
            }
        }
        catch (err) { }
    }

    return (
        <div className="placeOrderBox contact_form settingsSelect">
            <div className="flexTitle">
                {
                    <h3><small>{t("BALANCE")}</small> <span>{firstCurrency && toFixed(firstCurrency.derivativeWallet, tradePair.firstFloatDigit)} {tradePair && tradePair.firstCurrencySymbol}</span></h3>
                }

                <a href="#" className="exchangeIcon"><i class="fas fa-exchange-alt"></i></a>
            </div>

            <div className="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="btnType1">Size</span>
                    </div>
                    <input
                        type="text"
                        class="form-control text-right borderZero"
                        name="quantity"
                        value={quantity}
                        onChange={handleChange}
                    />
                    <div class="input-group-append">
                        <span class="btnType1">{tradePair && tradePair.secondCurrencySymbol}</span>
                    </div>
                </div>
            </div>
            <div className="form-group px-2 mb-0">
                <Slider
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="auto"
                    marks={marks}
                    value={leverage}
                    onChange={handlePercentage}
                    min={1}
                    disabled={!isAuth}
                />
            </div>
            <div className="form-group">
                <div className="form-check mb-0">
                    <Checkbox
                        color="primary"
                        className="pl-0"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                        onChange={handleProfitLossCheck}
                        name="isProfitLoss"
                        checked={isProfitLoss}
                    />
                    <label className="form-check-label pl-0" for="flexCheckDefault">
                        TP/SL
                    </label>
                </div>
            </div>

            {
                isProfitLoss && <div className="form-group">
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            name="takeProfit"
                            value={takeProfit}
                            placeholder="Taker Profit"
                            onChange={handleChange}
                        />
                        <div class="input-group-append">
                            {/* <Select value={10}>
                                <MenuItem value={10}>Mark</MenuItem>
                                <MenuItem value={20}>Limit</MenuItem>
                                <MenuItem value={30}>Stop</MenuItem>
                            </Select> */}
                        </div>
                    </div>
                </div>
            }

            {
                isProfitLoss && <div className="form-group">
                    <div class="input-group">
                        <input
                            type="text"
                            class="form-control"
                            name="stopLoss"
                            value={stopLoss}
                            placeholder="Stop Loss"
                            onChange={handleChange}
                        />
                        <div class="input-group-append">
                            {/* <Select value={10}>
                                <MenuItem value={10}>Mark</MenuItem>
                                <MenuItem value={20}>Limit</MenuItem>
                                <MenuItem value={30}>Stop</MenuItem>
                            </Select> */}
                        </div>
                    </div>
                </div>
            }

            {
                isAuth && <div className="ButtonFullWidth">
                    <button
                        className="btn BuyNavButton"
                        onClick={() => handleSubmit('buy')}
                    >
                        Long
                    </button>
                    <button
                        className="btn SellNavButton"
                        onClick={() => handleSubmit('sell')}
                    >
                        Short
                    </button>
                </div>
            }

            {
                !isAuth && <div className="ButtonFullWidth px-0">
                    <button className="btn BuyNavButton" onClick={() => history.push('/login')}>Login</button>
                </div>
            }

            <ul className="poList">
                <li>
                    <label><small>Cost</small> {toFixed(buyOrderCost, tradePair.firstFloatDigit)} {tradePair && tradePair.firstCurrencySymbol}</label>
                    <span><small>Cost</small> {toFixed(sellOrderCost, tradePair.firstFloatDigit)} {tradePair && tradePair.firstCurrencySymbol}</span>
                </li>
                {/* <li><label><small>Max</small> 0.0000 USDT</label> <span><small>Max</small> 0.0000 USDT</span></li> */}

            </ul>
            {/* <div className="poContentFlex">
                <h2>Margin Ratio<span>0.00%</span></h2>
                <div className="pocfRight">
                    <p><small>Maintenance Margin</small> 0.0000 USDT</p>
                    <p><small>Margin Balance</small> 0.0000 USDT</p>
                </div>
            </div> */}
        </div>
    )
}

export default MarketOrder;