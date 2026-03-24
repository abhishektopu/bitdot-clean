// import package
import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'classnames';

//Scrollbar
import { Scrollbars } from 'react-custom-scrollbars-2';

// import context
import SocketContext from '../Context/SocketContext';

// import action
import { getRecentTrade } from '../../actions/spotTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { currencyFormat, toFixed } from '../../lib/roundOf'

const RecentTrade = (props) => {
    const socketContext = useContext(SocketContext);

    // props
    const { setExpandScreen, expandScreen } = props;

    // state
    const [tradeData, setTradeData] = useState([])

    // redux-state
    const tradePair = useSelector(state => state.tradePair);

    // function
    const fetchRecentTrade = async (pairId) => {
        try {
            const { status, loading, result } = await getRecentTrade(pairId);
            if (status == 'success') {
                console.log(result,'result')
                setTradeData(result)
                fetchRecentTradeWs(result)
            }
        } catch (err) { }
    }

    const fetchRecentTradeWs = (result) => {

        // socket
        if (result.pairId == tradePair.pairId) {
            console.log(result,'resultws')
            setTradeData(prevMessages => {
                let data = prevMessages
                data.pop()
                return [...result.data, ...prevMessages]
            });
        }

    }

    useEffect(() => {
        if (!isEmpty(tradePair)) {
            fetchRecentTrade(tradePair.pairId)
        }

        socketContext.socket.on('recentTrade', fetchRecentTradeWs)

    }, [tradePair])

    return (
        <div className="tradeTableLeftSide darkBox recentTrades">
            <div className="tableHead MyDragHandleClassName">
                <h4>Recent Trades</h4>
                <div className="inputGroup">
                    {
                        expandScreen == '' && <a href="#" className="zoomIcon" onClick={() => { setExpandScreen('recentTrade') }}><i class="bi bi-arrows-angle-expand"></i></a>
                    }
                    {
                        expandScreen == 'recentTrade' && <a href="#" className="zoomIcon" onClick={() => { setExpandScreen('') }}><i class="bi bi-arrows-angle-contract"></i></a>
                    }
                </div>
            </div>
            <div className="tradeTableTitle row w-100 mx-auto">
                <span className="col-4">Price({tradePair && tradePair.secondCurrencySymbol})</span>
                <span className="col-4 text-right text-right">Amount({tradePair && tradePair.firstCurrencySymbol})</span>
                <span className="col-4 text-right text-right">Time</span>
            </div>

            <div className="tradeTableBody customScroll">


                {
                    tradeData && tradeData.length > 0 && tradeData.map((item, key) => {
                        let dataTime = new Date(item.createdAt);
                        let time = dataTime.getHours() + ':' + dataTime.getMinutes() + ':' + dataTime.getSeconds();

                        return (
                            <div className="tradeTableBodyRow odd row mx-auto">
                                <span className={clsx("col-4",
                                    { ['greenText']: item.Type == 'buy' },
                                    { ['pinkText']: item.Type == 'sell' })}
                                >
                                    {currencyFormat(toFixed(item.price, tradePair.secondFloatDigit))}
                                </span>
                                <span className="col-4 text-right">{toFixed(item.filledQuantity, 8)}</span>
                                <span className="col-4 text-right">{time}</span>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default RecentTrade;