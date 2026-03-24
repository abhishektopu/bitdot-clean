// import package
import React from 'react';
import { useSelector } from 'react-redux';

// import lib
import { unrealizedPnLPercentage } from '../../lib/bybit';

const UnrealizedProfitLoss = (props) => {
    const { positionDetail } = props;

    // redux-state
    const tickerData = useSelector(state => state.marketPrice);

    return (
        <>
            {unrealizedPnLPercentage({
                'price': positionDetail.price,
                'quantity': positionDetail.positionQuantity,
                'lastPrice': tickerData.markPrice,
                'leverage': positionDetail.leverage,
                'takerFee': positionDetail.taker_fees,
                'buyorsell': positionDetail.buyorsell
            })}
        </>
    )
}

export default UnrealizedProfitLoss