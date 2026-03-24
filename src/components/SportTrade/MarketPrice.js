// import package
import React, { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import context
import SocketContext from '../Context/SocketContext';

// import action
import { setMarketPrice } from '../../actions/spotTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { toFixed } from '../../lib/roundOf';

const MarketPrice = () => {
    const dispatch = useDispatch();
    const socketContext = useContext(SocketContext);

    // state
    const [pairLists, setPairLists] = useState([]);

    // redux-state
    const tickerData = useSelector(state => state.marketPrice);
    const pairData = useSelector(state => state.tradePair);
    const pairListData = useSelector(state => state.pairList);

    // function
    useEffect(() => {
        if (!isEmpty(pairData)) {
            // socket
            socketContext.socket.on('marketPrice', (result) => {
                if (result.pairId == pairData.pairId) {
                    setMarketPrice(result.data, dispatch)
                }
            })
        }
    }, [pairData])

    useEffect(() => {
        return () => {
            socketContext.socket.off("marketPrice");
            socketContext.socket.off("orderBook");
            socketContext.socket.off("recentTrade");
        }
    }, [])

    return (
        <div className="headerOverviewGroup">
            <div className="headerOverviewStatus">
                <h5><small>24h Change</small><span className="tradeRedText">{toFixed(tickerData.changePrice, 2)} ({toFixed(tickerData.change, 2)}%)</span></h5>
            </div>
            <div className="headerOverviewStatus">
                <h5 className="pinkText"><small>24h High</small>{toFixed(tickerData.high, pairData.secondFloatDigit)}</h5>
            </div>
            <div className="headerOverviewStatus">
                <h5><small>24h Low</small>{toFixed(tickerData.low, pairData.secondFloatDigit)}</h5>
            </div>
            <div className="headerOverviewStatus">
                <h5><small>24h Vol ({pairData && pairData.firstCurrencySymbol})</small>{toFixed(tickerData.firstVolume, pairData.secondFloatDigit)}</h5>
            </div>

            <div className="headerOverviewStatus">
                <h5><small>24h Vol ({pairData && pairData.secondCurrencySymbol})</small>{toFixed(tickerData.secondVolume, pairData.secondFloatDigit)}</h5>
            </div>
        </div>
    )
}

export default MarketPrice;