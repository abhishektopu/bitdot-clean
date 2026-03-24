// import package
import React, { useState, useEffect, useContext } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from 'react-redux';
import clsx from 'classnames';

// import context
import SocketContext from '../Context/SocketContext';

// import action
import { getOrderHistory } from '../../actions/spotTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { capitalize } from '../../lib/stringCase';
import { triggerCondition } from '../../lib/displayStatus'

const initialOrderForm = {
    currentPage: 1,
    nextPage: true,
    limit: 10,
    count: 0,
    data: []
}

const OrderHistory = () => {
    const socketContext = useContext(SocketContext)

    // state
    const [loader, setLoader] = useState(true)
    const [orderData, setOrderData] = useState(initialOrderForm)

    const { currentPage, nextPage, limit, count, data } = orderData

    // redux-state
    const tradePair = useSelector(state => state.tradePair);
    const { isAuth } = useSelector(state => state.auth);

    // function
    const fetchOrderHistory = async (reqData, pairId) => {
        try {
            const { status, loading, result } = await getOrderHistory(reqData, pairId);
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
        fetchOrderHistory(reqData, tradePair.pairId)
    };

    useEffect(() => {
        if (!isEmpty(tradePair) && isAuth) {
            let reqData = {
                page: currentPage,
                limit
            }
            fetchOrderHistory(reqData, tradePair.pairId)
            setOrderData(initialOrderForm)

            // socket
            socketContext.socket.on('orderHistory', (result) => {
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
                <table id="closedPLTable" className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Pair</th>
                            <th>Type</th>
                            <th>Side</th>
                            <th>Average</th>
                            <th>Price</th>
                            <th>Executed</th>
                            <th>Amount</th>
                            <th>Total</th>
                            <th>Trigger Conditions</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data && data.length > 0 && data.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.orderDate}</td>
                                        <td>{item.firstCurrency}/{item.secondCurrency}</td>
                                        <td>{capitalize(item.orderType)}</td>
                                        <td className={clsx({ "greenText": item.buyorsell == 'buy' }, { "pinkText": item.buyorsell == 'sell' })}>{capitalize(item.buyorsell)}</td>
                                        <td>{item.averagePrice}</td>
                                        <td>{item.price}</td>
                                        <td>{item.filledQuantity}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price * item.quantity}</td>
                                        <td>{triggerCondition(item.conditionalType)}{(triggerCondition(item.conditionalType)==">="||triggerCondition(item.conditionalType)=="<=")?item.stopPrice:""}</td>                    
                                                            <td>{item.status}</td>
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

export default OrderHistory;