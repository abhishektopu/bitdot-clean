// import package
import React, { useState, useEffect, useContext } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from 'react-redux';
import clsx from 'classnames';

// import context
import SocketContext from '../Context/SocketContext';

// import action
import { getTradeHistory } from '../../actions/perpetualTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { capitalize } from '../../lib/stringCase';

const TradeHistory = () => {
    const socketContext = useContext(SocketContext);

    // state
    const [hasMore, setHasMore] = useState(true)
    const [loader, setLoader] = useState(true)
    const [orderData, setOrderData] = useState({
        currentPage: 1,
        nextPage: 1,
        limit: 10,
        count: 0,
        data: []
    })

    const { currentPage, nextPage, limit, count, data } = orderData

    // redux-state
    const tradePair = useSelector(state => state.tradePair);

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
            }
        } catch (err) { }
    }

    const fetchMoreData = () => {
        if (data.length == count) {
            setHasMore(false)
            return;
        }

        let reqData = {
            page: nextPage,
            limit
        }
        fetchTradeHistory(reqData, tradePair.pairId)
    };

    useEffect(() => {
        if (!isEmpty(tradePair)) {
            let reqData = {
                page: nextPage,
                limit
            }
            fetchTradeHistory(reqData, tradePair.pairId)

            // socket
            socketContext.socket.on('perpetualTradeHistory', (result) => {
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
    }, [tradePair])

    return (
        <div className="table-responsive">
            <InfiniteScroll
                dataLength={data.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                height={250}
            >


                <table id="active0Table" className="table table-striped">
                    <thead>
                        <tr>
                            <th>Contracts</th>
                            <th>Filled/Total</th>
                            <th>Order Price</th>
                            {/* <th>Trigger Price</th> */}
                            <th>Trade Type</th>
                            <th>Order Type</th>
                            <th>Status</th>
                            <th>Order No.</th>
                            <th>Order Time</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            !loader && data && data.length > 0 && data.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td className={
                                            clsx(
                                                { "greenText": item.buyorsell == 'buy' },
                                                { "pinkText": item.buyorsell == 'sell' })}
                                        >
                                            {item.firstCurrency}/{item.secondCurrency}
                                        </td>
                                        <td>{item.filledQuantity}/{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td className={
                                            clsx(
                                                { "greenText": item.buyorsell == 'buy' },
                                                { "pinkText": item.buyorsell == 'sell' })}
                                        >
                                            {item.buyorsell}
                                        </td>
                                        <td>{capitalize(item.orderType)}</td>
                                        <td>{capitalize(item.status)}</td>
                                        <td>{item._id}</td>
                                        <td>{item.orderDate}</td>
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