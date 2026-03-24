// import package
import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import context
import SocketContext from '../Context/SocketContext';

// import action
import { setMarketPrice } from '../../actions/perpetualTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { toFixed } from '../../lib/roundOf';


const MarketPrice = () => {
    const socketContext = useContext(SocketContext);
    const dispatch = useDispatch();

    // redux-state
    const pairData = useSelector(state => state.tradePair);
    const tickerData = useSelector(state => state.marketPrice);

    useEffect(() => {
        if (!isEmpty(pairData)) {
            // socket
            socketContext.socket.on('perpetualMarketPrice', (result) => {
                if (result.pairId == pairData.pairId) {
                    setMarketPrice(result.data, dispatch)
                }
            })
        }
    }, [pairData])

    useEffect(() => {
        return () => {
            socketContext.socket.off("perpetualMarketPrice");
        }
    }, [])

    return (
        <div className="headerOverviewGroup">
          

            <div className="headerOverviewStatus">
                <h5><small>24h Change</small><span className="tradeRedText">{tickerData.changePrice} {tickerData.change}%</span></h5>
            </div>

            <div className="headerOverviewStatus">
                <h5><small>24h High</small>{tickerData.high}</h5>
            </div>
            <div className="headerOverviewStatus">
                <h5><small>24h Low</small>{tickerData.low}</h5>
            </div>
            <div className="headerOverviewStatus">
                <h5><small>24h Volume({pairData && pairData.firstCurrencySymbol})</small>{tickerData.firstVolume}</h5>
            </div>
            <div className="headerOverviewStatus">
                <h5><small>24h Volume({pairData && pairData.secondCurrencySymbol})</small>{tickerData.secondVolume}</h5>
            </div>
        </div>
    )
}

export default MarketPrice;