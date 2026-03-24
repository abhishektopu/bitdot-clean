// import package
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

// import component
import ViewBalance from './ViewBalance';

// import action
import { orderPlace } from '../../actions/spotTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { encryptObject } from '../../lib/cryptoJS'
import { toastAlert } from '../../lib/toastAlert';
import validation from './validation'

const initialFormValue = {
    'distance': "",
    'quantity': '',
}

const TrailingStopOrder = (props) => {
    const history = useHistory();

    // props
    const { orderType, buyorsell } = props;

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [loader, setLoader] = useState();

    const { distance, quantity } = formValue;

    // redux-state
    const tradePair = useSelector(state => state.tradePair);
    const { isAuth } = useSelector(state => state.auth);

    // function
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;

        if (!/^\d*\.?\d*$/.test(value)) {
            return
        }

        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
    }

    const handleSubmit = async (buyorsell) => {
        try {
            setLoader(true)
            let reqData = {
                distance,
                quantity,
                buyorsell: buyorsell,
                orderType,
                spotPairId: tradePair.pairId,
                'newdate': new Date()
            }

            const validateError = await validation(reqData, orderType, buyorsell)
            if (!isEmpty(validateError)) {
                toastAlert('error', validateError[Object.keys(validateError)[0]], 'trailingOrder');
                return
            }

            let encryptToken = {
                token: encryptObject(reqData)
            }

            let { status, loading, message, error, result } = await orderPlace(encryptToken);
            setLoader(loading)
            if (status == 'success') {
                setFormValue(initialFormValue);
                toastAlert('success', message, 'trailingOrder');
            } else {
                toastAlert('error', message, 'trailingOrder');
            }
        }
        catch (err) { }
    }

    return (
        <div className="placeOrderBox contact_form">
            <ViewBalance />
            <div className="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="btnType1">Distance</span>
                    </div>
                    <input type="text" class="form-control text-right borderZero"
                        name="distance"
                        value={distance}
                        onChange={handleChange}
                    />
                    <div class="input-group-append">
                        <span class="btnType1">{tradePair && tradePair.secondCurrencySymbol}</span>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="btnType1">Amount</span>
                    </div>
                    <input type="text" class="form-control text-right borderZero"
                        name="quantity"
                        value={quantity}
                        onChange={handleChange}
                    />
                    <div class="input-group-append">
                        <span class="btnType1">{tradePair && tradePair.firstCurrencySymbol}</span>
                    </div>
                </div>
            </div>

            {/* <div className="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="btnType1">Total</span>
                    </div>
                    <input type="text" class="form-control text-right borderZero" value="115.50 " />
                    <div class="input-group-append">
                        <span class="btnType1">{tradePair && tradePair.secondCurrencySymbol}</span>
                    </div>
                </div>
            </div> */}
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

export default TrailingStopOrder;