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
import { getOpenOrder } from '../../actions/perpetualTradeAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { capitalize } from '../../lib/stringCase';

const OpenOrder = (props) => {
    const socketContext = useContext(SocketContext)

    // props
    const { handleCount } = props

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
        fetchOpenOrder(reqData, tradePair.pairId)
    };

    useEffect(() => {
        if (!isEmpty(tradePair)) {
            let reqData = {
                page: nextPage,
                limit
            }
            fetchOpenOrder(reqData, tradePair.pairId)

            // socket
            socketContext.socket.on('perpetualOpenOrder', (result) => {
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
                <table id="positionsTable" className="table table-striped">
                    <thead>
                        <tr>
                            <th>Contracts</th>
                            <th>Qty</th>
                            <th>Order Price</th>
                            <th>Filled/Total</th>
                            <th>Trade Type</th>
                            <th>TP/SL</th>
                            <th>Order Type</th>
                            <th>Status</th>
                            <th>Order No.</th>
                            <th>Order Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !loader && data && data.length > 0 && data.map((item, key) => {
                                return (
                                    <tr key={key}>
                                        <td className={
                                            clsx({ "greenText": item.buyorsell == 'buy' }, { "pinkText": item.buyorsell == 'sell' })
                                        }>
                                            {item.firstCurrency}/{item.secondCurrency}
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>{item.quantity}/{item.filledQuantity}</td>
                                        <td className={clsx({ "greenText": item.buyorsell == 'buy' }, { "pinkText": item.buyorsell == 'sell' })}>{capitalize(item.buyorsell)}</td>
                                        <td>-</td>
                                        <td>{capitalize(item.orderType)}</td>
                                        <td>{item.status}</td>
                                        <td>{item._id}</td>
                                        <td>{item.orderDate}</td>
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