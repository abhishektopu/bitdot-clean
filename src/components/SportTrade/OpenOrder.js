// import package
import React, { useState, useEffect, useContext } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from 'react-redux';
import clsx from 'classnames';

// import context
import SocketContext from '../Context/SocketContext';

// import component
import CancelOrder from './CancelOrder';

// import action
import { getOpenOrder } from '../../actions/spotTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { capitalize } from '../../lib/stringCase';
import { triggerCondition } from '../../lib/displayStatus'
import { dateTimeFormat } from '../../lib/dateTimeHelper'
import moment from 'moment';

import { toFixed } from '../../lib/roundOf';
const initialOrderForm = {
    currentPage: 1,
    nextPage: true,
    limit: 10,
    count: 0,
    data: []
}

const OpenOrder = (props) => {
    const socketContext = useContext(SocketContext)

    // props
    const { handleCount } = props

    // state
    const [loader, setLoader] = useState(true)
    const [orderData, setOrderData] = useState(initialOrderForm)

    const { currentPage, nextPage, limit, count, data } = orderData

    // redux-state
    const tradePair = useSelector(state => state.tradePair);
    const { isAuth } = useSelector(state => state.auth);

    // function
    const fetchOpenOrder = async (reqData, pairId) => {
        try {
            const { status, loading, result } = await getOpenOrder(reqData, pairId);
            setLoader(loading)
            if (status == 'success') {
                handleCount(result.count)
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
        fetchOpenOrder(reqData, tradePair.pairId)
    };

    useEffect(() => {
        if (!isEmpty(tradePair) && isAuth) {
            let reqData = {
                page: currentPage,
                limit
            }
            fetchOpenOrder(reqData, tradePair.pairId)
            setOrderData(initialOrderForm)

            // socket
            socketContext.socket.on('openOrder', (result) => {
                if (result.pairId == tradePair.pairId) {
                    handleCount(result.count)
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
                <table id="positionsTable" className="table table-striped">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Pair</th>
                            <th>Type</th>
                            <th>Side</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Filled</th>
                            <th>Total</th>
                            <th>Trigger Conditions</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !loader && data && data.length > 0 && data.map((item, key) => {
                                console.log('item',item);
                                return (
                                    <tr key={key}>
                            {/* <td>{moment(item.orderDate).format('MMMM,Do YYYY, hh:mm A')}</td> */}
                                        <td>{dateTimeFormat(item.orderDate, 'YYYY-MM-DD HH:mm')}</td>
                                        <td>{item.firstCurrency}/{item.secondCurrency}</td>
                                        <td>{capitalize(item.orderType)}</td>
                                        <td className={clsx({ "greenText": item.buyorsell == 'buy' }, { "pinkText": item.buyorsell == 'sell' })}>{capitalize(item.buyorsell)}</td>
                                        <td>{toFixed(item.price, 2)}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.filledQuantity}</td>
                                        <td>{toFixed(item.orderValue, 2)}</td>
                                        <td>{triggerCondition(item.conditionalType)}{(triggerCondition(item.conditionalType)==">="||triggerCondition(item.conditionalType)=="<=")?item.stopPrice:""}</td>
                                        <td>
                                            <CancelOrder
                                                orderId={item._id}
                                            />
                                        </td>
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
export default OpenOrder;