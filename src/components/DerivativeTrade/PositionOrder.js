// import package
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'classnames';

// import context
import SocketContext from '../Context/SocketContext';

// import component
import UnrealizedProfitLoss from './UnrealizedProfitLoss';

// import action
import { getPositionOrder } from '../../actions/perpetualTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { capitalize } from '../../lib/stringCase';
import { inversePositionMargin } from '../../lib/bybit';

const PositionOrder = () => {
    const socketContext = useContext(SocketContext);

    // state
    const [loader, setLoader] = useState(true)
    const [positionDetail, setPositionDetail] = useState({})

    // redux-state
    const tradePair = useSelector(state => state.tradePair);

    // function
    const fetchPositionOrder = async (reqData, pairId) => {
        try {
            const { status, loading, result } = await getPositionOrder(reqData, pairId);
            setLoader(loading)
            if (status == 'success') {
                setPositionDetail(result)
            }
        } catch (err) { }
    }

    useEffect(() => {
        if (!isEmpty(tradePair)) {
            fetchPositionOrder(tradePair.pairId)

            // socket
            socketContext.socket.on('perpetualPositionOrder', (result) => {
                if (result.pairId == tradePair.pairId) {
                    setPositionDetail(result.data)
                }
            })
        }
    }, [tradePair])

    return (
        <div className="table-responsive">
            <table id="active0Table" className="table table-striped">
                <thead>
                    <tr>
                        <th>Contracts</th>
                        <th>Qty</th>
                        <th>Value</th>
                        <th>Entry Price</th>
                        <th>Liq. Price</th>
                        <th>Position Margin</th>
                        <th>Unrealized P&L (%)</th>
                        <th>Daily Realized P&L</th>
                        <th>TP/SL</th>
                        <th>Trailing Stop</th>
                        <th>Close By</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        !loader && !isEmpty(positionDetail) && <tr>
                            <td className={
                                clsx({ "greenText": positionDetail.buyorsell == 'buy' }, { "pinkText": positionDetail.buyorsell == 'sell' })
                            }>
                                {positionDetail.firstCurrency}/{positionDetail.secondCurrency}
                            </td>
                            <td className={
                                clsx({ "greenText": positionDetail.buyorsell == 'buy' }, { "pinkText": positionDetail.buyorsell == 'sell' })
                            }>
                                {positionDetail.positionQuantity}
                            </td>
                            <td>{"-"}</td>
                            <td>{positionDetail.price}</td>
                            <td>{positionDetail.liquidityPrice}</td>
                            <td>{inversePositionMargin({
                                'price': positionDetail.price,
                                'quantity': positionDetail.positionQuantity,
                                'leverage': positionDetail.leverage,
                                'takerFee': positionDetail.taker_fees,
                                'buyorsell': positionDetail.buyorsell
                            })}</td>
                            <td>
                                <UnrealizedProfitLoss
                                    positionDetail={positionDetail}
                                />
                            </td>
                            <td>{positionDetail.positionMargin}</td>
                            <td>{positionDetail.initialMargin}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>


                    }

                    {
                        !loader && isEmpty(positionDetail) && <tr>
                            <td colspan="8" height="150" className="text-center">- No data Available -</td>
                        </tr>
                    }

                </tbody>
            </table>
        </div>
    )
}

export default PositionOrder;