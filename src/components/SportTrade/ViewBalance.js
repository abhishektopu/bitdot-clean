// import package
import React from 'react';
import { useSelector } from 'react-redux';

// import lib
import isEmpty from '../../lib/isEmpty';

const ViewBalance = () => {
    // redux-state
    const tradePair = useSelector(state => state.tradePair);


    const { firstCurrency, secondCurrency } = useSelector(state => state.tradeAsset);
    console.log('firstCurrency',firstCurrency)
    console.log('secondCurrency',secondCurrency)
    return (
        <h3>
            <small>Balance</small>
            {
                !isEmpty(tradePair) && !isEmpty(firstCurrency) && <p className="balance_flex"><span>{tradePair.firstCurrencySymbol}:</span><span>{firstCurrency && firstCurrency.spotBal}</span> </p>
            }
            {
                !isEmpty(tradePair) && !isEmpty(secondCurrency) && <p  className="balance_flex"><span>{tradePair.secondCurrencySymbol}:</span> <span>{firstCurrency && secondCurrency.spotBal}</span> </p>
            }
        </h3>
    )
}

export default ViewBalance;