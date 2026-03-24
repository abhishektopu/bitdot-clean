// import package
import React, { useEffect, useState } from 'react';
import { Slider } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import ViewBalance from './ViewBalance';

// import action
import { orderPlace } from '../../actions/spotTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { encryptObject } from '../../lib/cryptoJS'
import { toastAlert } from '../../lib/toastAlert';
import { toFixed } from '../../lib/roundOf';
import validation from './validation'

const marks = [
    {
        value: 0,
        label: '0%',
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
    'price': "",
    'quantity': '',
    'total': ''
}

const MarketOrder = (props) => {
    const history = useHistory();
    
    // props
    const { buyorsell } = props;

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [loader, setLoader] = useState();

    const { price, quantity, total } = formValue;

    // redux-state
    const tradePair = useSelector(state => state.tradePair);
    const { firstCurrency, secondCurrency } = useSelector(state => state.tradeAsset);
    const marketPriceData = useSelector(state => state.marketPrice);
    const { isAuth } = useSelector(state => state.auth);

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (!/^\d*\.?\d*$/.test(value)) {
            return
        }
        if(name=="quantity"){
            if (!/^(\d)*(\.)?([0-9]{0,4})?$/.test(value)) {
                return
            }
        }

        let formData = { ...formValue, ...{ [name]: value } }

        if (!isEmpty(formData.price) && !isEmpty(formData.quantity)) {
            let totalPrice = formData.price * formData.quantity
            totalPrice = parseFloat(totalPrice).toFixed(1)
            formData = { ...formData, ...{ ['total']: totalPrice } }
        }
        // console.log('formData123',formData)
        setFormValue(formData)
    }

    const handleTotal =(e)=>{
        e.preventDefault();
        const { name, value } = e.target;
        if (!/^\d*\.?\d*$/.test(value)) {
            return
        }
        let formData = { ...formValue, ...{ [name]: value } }
        if (!isEmpty(formData.price)&&!isEmpty(formData.total) ) {

            let totalPrice = formData.total / formData.price
            formData = { ...formData, ...{ ['quantity']: totalPrice } }
        }
        setFormValue(formData)

    }

    const handlePercentage = (e, percentage) => {
        let priceValue = 0, formData = {}
        if (!isEmpty(price) && !isNaN(price)) {
            priceValue = price;
        } else if (!isEmpty(marketPriceData.last) && !isNaN(marketPriceData.last)) {
            priceValue = marketPriceData.last;
            formData['price'] = marketPriceData.last;;
        }

        if (buyorsell == 'buy') {
            let userBalance = secondCurrency && secondCurrency.spotwallet > 0 ? secondCurrency.spotwallet : 0;
            formData['total'] = toFixed(userBalance * (percentage / 100), tradePair.secondFloatDigit);
            formData['quantity'] = toFixed(formData['total'] / priceValue, tradePair.firstFloatDigit);
        } else if (buyorsell == 'sell') {

            let userBalance = firstCurrency && firstCurrency.spotwallet > 0 ? firstCurrency.spotwallet : 0;
            formData['quantity'] = toFixed(userBalance * (percentage / 100), tradePair.firstFloatDigit);
            formData['total'] = toFixed(formData['quantity'] * priceValue, tradePair.secondFloatDigit);
            // console.log('ddddddddd',formData)
        }
        // console.log('formData',formData)

        setFormValue({ formValue, ...formData })
    }

    const handleSubmit = async (buyorsell) => {
        // console.log('buyorsell',buyorsell)
        try {
            let reqData = {
                quantity: quantity,
                buyorsell: buyorsell,
                orderType: 'market',
                spotPairId: tradePair.pairId,
                'newdate': new Date()
            }
// console.log('reqData',reqData)
            const validateError = await validation(reqData)
            if (!isEmpty(validateError)) {
                toastAlert('error', validateError[Object.keys(validateError)[0]], 'marketOrder');
                return
            }
            setLoader(true)

            let encryptToken = {
                token: encryptObject(reqData)
            }

            let { status, loading, message, error, result } = await orderPlace(encryptToken);
            setLoader(loading)
            if (status == 'success') {
                setFormValue(initialFormValue);
                toastAlert('success', message, 'marketOrder');
            } else {
                toastAlert('error', message, 'marketOrder');
            }
        }
        catch (err) { }
    }

    useEffect(() => {
        setFormValue({
            ...formValue,
            ...{
                'price': marketPriceData.last
            }
        })
    }, [marketPriceData])

    useEffect(() => {
        let formData = initialFormValue;
        if (!isEmpty(tradePair) && !isEmpty(marketPriceData)) {
            formData = { ...initialFormValue, ...{ 'price': marketPriceData.last } }
            setFormValue(formData)
        }
    }, [tradePair])

    return (
        <div className="placeOrderBox contact_form">
            <ViewBalance />
            <div className="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="btnType1">Amount</span>
                    </div>
                    <input type="text" class="form-control text-right borderZero" name="quantity"
                        value={quantity}
                        onChange={handleChange}
                    />
                    <div class="input-group-append">
                        <span class="btnType1">{tradePair && tradePair.firstCurrencySymbol}</span>
                    </div>
                </div>
            </div>
            {/* <div className="form-group px-3">
                <Slider
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider-custom"
                    step={1}
                    valueLabelDisplay="auto"
                    marks={marks}
                    defaultValue={0}
                    onChange={handlePercentage}
                    disabled={!isAuth}
                />
            </div> */}
            <div className="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="btnType1">Total</span>
                    </div>
                    <input type="text" class="form-control text-right borderZero" value={total} />
                    <div class="input-group-append">
                        <span class="btnType1">{tradePair && tradePair.secondCurrencySymbol}</span>
                    </div>
                </div>
            </div>
            {
                isAuth && <div className="ButtonFullWidth px-0">
                    <button className="btn BuyNavButton" onClick={() => handleSubmit('buy')}>Buy {tradePair && tradePair.firstCurrencySymbol}</button>
                    <button className="btn SellNavButton" onClick={() => handleSubmit('sell')} >Sell {tradePair && tradePair.firstCurrencySymbol}</button>
                </div>
            }

            {
                !isAuth && <div className="ButtonFullWidth px-0">
                    <button className="btn BuyNavButton" onClick={() => history.push('/login')}>Login</button>
                </div>
            }

        </div>
    )
}

export default MarketOrder;