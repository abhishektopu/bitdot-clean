// import package
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// import context
import SocketContext from '../Context/SocketContext';

// import action
import { getPairList, setPairList,setTradePair, setMarketPrice } from '../../actions/perpetualTradeAction';
import {
    getAssetByCurrency,
    setUserFirstCurrency,
    setUserSecondCurrency
} from '../../actions/walletAction';

// import lib
import isEmpty from '../../lib/isEmpty';
import { toFixed } from '../../lib/roundOf';
import isLogin from '../../lib/isLogin';

const PairList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { tikerRoot } = useParams();
    const socketContext = useContext(SocketContext);

    // state
    const [pairLists, setPairLists] = useState([]);

    // redux-state
    const tickerData = useSelector(state => state.marketPrice);
    const pairData = useSelector(state => state.tradePair);
    const pairListData = useSelector(state => state.pairList);
    // const { isAuth } = useSelector(state => state.auth);

    // function
    const fetchAssetByCurrency = async (spotPairId, type) => {
        try {
            if (!isLogin()) {
                return true
            }
            const { status, loading, error, result } = await getAssetByCurrency(spotPairId);
            if (status == 'success') {
                if (type == 'firstCurrency') {
                    setUserFirstCurrency(result, dispatch)
                } else if (type == 'secondCurrency') {
                    setUserSecondCurrency(result, dispatch)
                }
            } else { }
            return true
        } catch (err) { }
    }

    const fetchPairList = async () => {
        try {
            const { status, loading, result } = await getPairList();
            if (status == 'success') {
                setPairList(result, dispatch)
                if (result && result.length > 0) {
                    if (isEmpty(tikerRoot)) {
                        let pair = `${result[0].firstCurrencySymbol}_${result[0].secondCurrencySymbol}`
                        history.replace('/derivative/' + pair)
                        // history.push('/spot/' + pair)
                        await fetchAssetByCurrency(result[0].firstCurrencyId, 'firstCurrency')
                        await fetchAssetByCurrency(result[0].secondCurrencyId, 'secondCurrency')
                        await setMarketPrice(result[0], dispatch)
                        await setTradePair(result[0], dispatch)
                        // getMarketPrice(result[0]._id, dispatch);
                    } else {
                        let currency = tikerRoot.split('_');
                        let pairDetail = result.find((el => el.firstCurrencySymbol == currency[0] && el.secondCurrencySymbol == currency[1]))
                        await fetchAssetByCurrency(pairDetail.firstCurrencyId, 'firstCurrency')
                        await fetchAssetByCurrency(pairDetail.secondCurrencyId, 'secondCurrency')
                        // getMarketPrice(pairDetail._id, dispatch);
                        await setMarketPrice(pairDetail, dispatch)
                        await setTradePair(pairDetail, dispatch)
                    }
                }
            } else { }
        }
        catch (err) { }
    }

    const handlePairChange = async (pairData) => {
        let pair = `${pairData.firstCurrencySymbol}_${pairData.secondCurrencySymbol}`
        history.push('/derivative/' + pair)
        if (tikerRoot != pair) {
            await fetchAssetByCurrency(pairData.firstCurrencyId, 'firstCurrency')
            await fetchAssetByCurrency(pairData.secondCurrencyId, 'secondCurrency')
            await setMarketPrice(pairData, dispatch)
            await setTradePair(pairData, dispatch)
            socketContext.socket.off("marketPrice");
            socketContext.socket.off("orderBook");
            socketContext.socket.off("recentTrade");
        }
    }

    useEffect(() => {
        if (pairListData && pairListData.length > 0) {
            setPairLists(pairListData)
        }
    }, [pairListData])

    useEffect(() => {
        if (!isEmpty(pairData)) {
            // socket
            socketContext.socket.on('perpetualMarketPrice', (result) => {
                if (result.pairId == pairData.pairId) {
                    setMarketPrice(result.data, dispatch)
                    let tempPairList = pairLists;
                    let pairIndex = tempPairList.findIndex((el => el._id == result.pairId))
                    if (pairIndex >= 0) {
                        tempPairList[pairIndex] = {
                            ...tempPairList[pairIndex],
                            ...{
                                'markPrice': result.data.markPrice,
                                'change': result.data.change
                            }
                        }
                        setPairLists(tempPairList)
                    }
                }
            })
        }
    }, [pairData])

    useEffect(() => {
        fetchPairList();
        return () => {
            socketContext.socket.off("perpetualMarketPrice");
            socketContext.socket.off("orderBook");
            socketContext.socket.off("recentTrade");
        }
    }, [])

    return (
        <div className="selectCoinType">
            <img src={require("../../assets/images/btcIcon.png")} alt="" className="img-fluid" />
            <div className="btn-group my-0">
                <button type="button"
                    className="selectPair dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {pairData && pairData.firstCurrencySymbol}/{pairData && pairData.secondCurrencySymbol}
                </button>
                <ul className="dropdown-menu">
                    <div className="deopdown_menu clss_789table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Price</th>
                                    <th>Latest Price</th>
                                    <th>change</th>
                                    {/* <th>24h Volume</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    pairLists && pairLists.length > 0 && pairLists.map((item, key) => {
                                        return (
                                            <tr key={key} onClick={() => handlePairChange(item)}>
                                                <td>
                                                    <p>{/* <i class="fas fa-star"></i> */}{item.firstCurrencySymbol}<span>/{item.secondCurrencySymbol}</span></p></td>
                                                <td className="balance_amt_detail">
                                                    <p><span className="price_increase">{item.markPrice}</span>{/* <span>/$314.5</span> */}</p>
                                                </td>
                                                <td><span className="span_menu_gerrn">{item.change}</span></td>
                                                {/* <td className="buy_button_op">0</td> */}
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </ul>

            </div>
            <div className="hoPriceConversion">
                <h3 className="tradeGreenText">{toFixed(tickerData.markPrice, pairData.secondFloatDigit)}</h3>
            </div>
        </div>
    )
}

export default PairList;