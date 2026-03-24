// import package
import React, { useState, useEffect, useContext } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from 'react-redux';
import clsx from 'classnames';

// import context
import SocketContext from '../Context/SocketContext';

// import action
import { getTradeHistory } from '../../actions/spotTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { capitalize } from '../../lib/stringCase';

const initialOrderForm = {
    currentPage: 1,
    nextPage: true,
    limit: 10,
    count: 0,
    data: []
}

const TradeHistory = () => {
    const socketContext = useContext(SocketContext);

    // state
    const [loader, setLoader] = useState(true)
    const [orderData, setOrderData] = useState(initialOrderForm)

    const { currentPage, nextPage, limit, count, data } = orderData

    // redux-state
    const tradePair = useSelector(state => state.tradePair);
    const { isAuth } = useSelector(state => state.auth);

    // function
    const fetchTradeHistory = async (reqData, pairId) => {
        try {
            const { status, loading, result } = await getTradeHistory(reqData, pairId);
            setLoader(loading)
            if (status == 'success') {
                setOrderData({
                    'currentPage': result.currentPage,
                    'nextPage': result.nextPage,
                    'limit': result.limit,
                    'count': result.count,
                    'data': [...data, ...result.data],
                })
            } else {
                setOrderData({
                    ...orderData,
                    ...{ 'nextPage': false }
                })
            }
        } catch (err) { }
    }

    const fetchMoreData = () => {
        if (data.length == count) {
            setOrderData({
                ...orderData,
                ...{ 'nextPage': false }
            })
            return;
        }

        let reqData = {
            page: currentPage + 1,
            limit
        }
        fetchTradeHistory(reqData, tradePair.pairId)
    };

    useEffect(() => {
        if (!isEmpty(tradePair) && isAuth) {
            let reqData = {
                page: currentPage,
                limit
            }
            fetchTradeHistory(reqData, tradePair.pairId)
            setOrderData(initialOrderForm)

            // socket
            socketContext.socket.on('tradeHistory', (result) => {
                if (result.pairId == tradePair.pairId) {
                    setOrderData({
                        'currentPage': result.currentPage,
                        'nextPage': result.nextPage,
                        'limit': result.limit,
                        'count': result.count,
                        'data': result.data,
                    })
                }
            })
        }
    }, [tradePair, isAuth])

    return (
        <div className="table-responsive">
            <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={nextPage}
                loader={<h4>Loading...</h4>}
                height={250}
            >
                <table id="active0Table" className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Pair</th>
                            <th>Side</th>
                            <th>Price</th>
                            <th>Executed</th>
                            <th>Fee</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            !loader && data && data.length > 0 && data.map((item, key) => {
                                console.log('item123',item)
                                return (
                                    <tr key={key}>
                                        <td>{item.createdAt}</td>
                                        <td>{item.firstCurrency}/{item.secondCurrency}</td>
                                        <td className={
                                            clsx(
                                                { "greenText": item.buyorsell == 'buy' },
                                                { "pinkText": item.buyorsell == 'sell' })}
                                        >
                                            {capitalize(item.buyorsell)}
                                        </td>
                                        <td>{item.price}</td>
                                        <td>{item.filledQuantity}</td>
                                        <td>{parseFloat(item.Fees).toFixed(8)} {item.buyorsell == 'buy' ? item.firstCurrency : item.secondCurrency}</td>
                                        <td>{parseFloat(item.orderValue).toFixed(8)} {item.secondCurrency}</td>
                                    </tr>
                                )
                            })
                        }
                        {
                            !loader && data && data.length == 0 && <tr>
                                <td colspan="8" height="150" className="text-center">- No data Available -</td>
                            </tr>
                        }
                    </tbody>
                </table>

            </InfiniteScroll>
        </div>
    )
}

export default TradeHistory;