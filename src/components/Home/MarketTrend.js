// import package
import React, { useState, useEffect, useContext } from 'react';
import { Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { useParams, useHistory, Link } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";

import clsx from 'classnames'

// import context
import SocketContext from '../Context/SocketContext';

// import action
import { getMarketTrend } from '../../actions/homeAction'
import { getPairList, setPairList, setTradePair, getMarketPrice, setMarketPrice } from '../../actions/spotTradeAction';

import { toFixed } from '../../lib/roundOf';

const MarketTrend = () => {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();

    const socketContext = useContext(SocketContext);
    const routeMatch = useRouteMatch();


    // state
    // const [pairData, setPairData] = useState([])

    const [pairLists, setPairLists] = useState([]);
    const pairData = useSelector(state => state.tradePair);

    const pairListData = useSelector(state => state.pairList);
    const [duppairlists, setduppairlists] = useState([]);

    // function
    // const fetchMarketTrend = async () => {
    //     try {
    //         const { status, loading, result } = await getMarketTrend();
    //         if (status == 'success') {
    //             console.log('result',result)
    //             setPairData(result)
    //         }
    //     } catch (err) { }
    // }
    const Navigate = (pairData) => {
        let pair = `${pairData.firstCurrencySymbol}_${pairData.secondCurrencySymbol}`
        history.push('/spot/' + pair)
        window.location.reload(false)
        }


    useEffect(() => {
        if (pairListData && pairListData.length > 0) {
            setPairLists(pairListData)
            // setduppairlists(pairListData)

            var newarray = [ ]
            for(var i=0;i<pairListData.length;i++){
                if(pairListData[i].secondCurrencySymbol=="INR"){
                    newarray.push(pairListData[i])
                }
            }
            setduppairlists(newarray)
        }
    }, [pairListData])


    useEffect(() => {
        fetchPairList();
        return () => {
            socketContext.socket.off("marketPrice");
        }
    }, [])

    
    const fetchPairList = async () => {
        try {
            const { status, loading, result } = await getPairList();
            if (status == 'success') {
                setPairList(result, dispatch)
            
            } else { }
        }
        catch (err) { }
    }

    useEffect(() => {
 

        socketContext.socket.on('marketPrice', (result) => {
                setduppairlists((el) => {
                let pairList = [];
                el.map(item => {
                    if (item._id == result.pairId) {
                        pairList.push({
                            ...item,
                            ...{
                                "markPrice": result.data.markPrice,
                                "change":  result.data.change,
                                // "volume":  result.volume
                            }
                        })
                    } else {
                        pairList.push(item)
                    }
                })
                // let pairIndex = pairList.findIndex((item => item._id == result.pairId))
                // if (pairIndex >= 0) {
                //     pairList[pairIndex].markPrice = result.data.markPrice
                //     pairList[pairIndex].change = result.data.change
                // }
                return pairList
            })
            })
    }, [pairData])
    // useEffect(() => {
    //     fetchMarketTrend();

    //     // socketContext.socket.on('marketPrice', (result) => {
    //     //     setPairData((el) => {
    //     //         let pairList = [];
    //     //         el.map(item => {
    //     //             if (item._id == result.pairId) {
    //     //                 pairList.push({
    //     //                     ...item,
    //     //                     ...{
    //     //                         "markPrice": toFixed(result.data.markPrice, 2),
    //     //                         "change": toFixed(result.data.change, 2)
    //     //                     }
    //     //                 })
    //     //             } else {
    //     //                 pairList.push(item)
    //     //             }
    //     //         })
    //     //         return pairList
    //     //     })
    //     // })

    //     return () => {
    //         socketContext.socket.off("marketPrice");
    //     }
    // }, [])


    return (
        <div className="explore_section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-center content-container">
                        <h1 className="mb-4 heading-title" data-aos="fade-up" data-aos-duration="2000">Trading  <span>Pairs</span></h1>
                        <div className="home_trade_pair_panel" data-aos="fade-up" data-aos-duration="2000">
                            {/* <nav>
                                <div class="nav nav-tabs home_trade_pair_tabs" id="nav-tab" role="tablist">
                                    <a class="nav-link active" id="trade_pair_01-tab" data-toggle="tab" href="#trade_pair_01" role="tab" aria-controls="trade_pair_01" aria-selected="true">
                                        <img src={require("../../assets/images/cryptoicons/btc.svg")} alt="Icon"/>Bitcoin
                                    </a>
                                    <a class="nav-link" id="trade_pair_02-tab" data-toggle="tab" href="#trade_pair_02" role="tab" aria-controls="trade_pair_02" aria-selected="false">
                                        <img src={require("../../assets/images/cryptoicons/eth.svg")} alt="Icon"/>Ethereum 
                                    </a>
                                    <a class="nav-link" id="trade_pair_03-tab" data-toggle="tab" href="#trade_pair_03" role="tab" aria-controls="trade_pair_03" aria-selected="false">
                                        <img src={require("../../assets/images/cryptoicons/usdt.svg")} alt="Icon"/>USDT
                                    </a>
                                    <a class="nav-link" id="trade_pair_04-tab" data-toggle="tab" href="#trade_pair_04" role="tab" aria-controls="trade_pair_04" aria-selected="false">
                                        <img src={require("../../assets/images/cryptoicons/xrp.svg")} alt="Icon"/>Ripple
                                    </a>
                                    <a class="nav-link" id="trade_pair_05-tab" data-toggle="tab" href="#trade_pair_05" role="tab" aria-controls="trade_pair_05" aria-selected="false">
                                        <img src={require("../../assets/images/cryptoicons/ltc.svg")} alt="Icon"/>LiteCoin
                                    </a>
                                </div>
                            </nav> */}
                            <div class="tab-content" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="trade_pair_01" role="tabpanel" aria-labelledby="trade_pair_01-tab">
                                    <div className="table-responsive">
                                        <table className="common-table">
                                            <thead>
                                                <tr>
                                                    <th>Pair</th>
                                                    <th>Last Price</th>
                                                    <th>24H change</th>
                                                    <th>Volume</th>
                                                    <th>Market</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                        duppairlists.length>0&&duppairlists.map((item,i)=>{
                                            return (
                                                // <tr key={key}>
                                                <tr>
                                                    <td>
                                                        <img
                                                            src={item.firstCurrencyImage}
                                                            className="coin_logo mr-2"
                                                            alt=""
                                                        />
                                                        {/* <label>{item.firstCurrencyName} ({item.firstCurrencySymbol})</label> */}
                                                        <th>{item.firstCurrencySymbol}/{item.secondCurrencySymbol}</th>

                                                    </td>
                                                    <td>{item.markPrice}</td>
                                                    <td className={clsx({
                                                        "text-green": item.change > 0,
                                                        "text-red": item.change <= 0
                                                    })}>{item.change}%</td>
                                                       <td>{item.secondVolume} {item.secondCurrencySymbol}</td>

                                                      
                                                       <td>
                                                       <button  className="buy_btn" onClick={() => { Navigate(item) }}>Trade</button>
                                                    {/* <Link to={routeMatch.path === "/spot/:tikerRoot?" ? routeMatch.url : "/spot"} color="transparent" className="nav-link">
                                                        <Button className="buy_btn">Trade</Button>
                                                        <Button className="sell_btn">Sell</Button>
                                                        </Link> */}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                                {/* <tr>
                                                    <td>ETH / BTC</td>
                                                    <td>0.033345 / <span>$380.10</span></td>
                                                    <td className="text-green">+0.52%</td>
                                                    <td>52.36598 BTC</td>
                                                    <td>
                                                    <Link to={routeMatch.path === "/spot/:tikerRoot?" ? routeMatch.url : "/spot"} color="transparent" className="nav-link">
                                                        <Button className="buy_btn">Buy</Button>
                                                        <Button className="sell_btn">Sell</Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>USDT / BTC</td>
                                                    <td>0.033345 / <span>$380.10</span></td>
                                                    <td className="text-green">+0.52%</td>
                                                    <td>52.36598 BTC</td>
                                                    <td>
                                                    <Link to={routeMatch.path === "/spot/:tikerRoot?" ? routeMatch.url : "/spot"} color="transparent" className="nav-link">
                                                        <Button className="buy_btn">Buy</Button>
                                                        <Button className="sell_btn">Sell</Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>XRP / BTC</td>
                                                    <td>0.033345 / <span>$380.10</span></td>
                                                    <td className="text-green">+0.52%</td>
                                                    <td>52.36598 BTC</td>
                                                    <td>
                                                    <Link to={routeMatch.path === "/spot/:tikerRoot?" ? routeMatch.url : "/spot"} color="transparent" className="nav-link">
                                                        <Button className="buy_btn">Buy</Button>
                                                        <Button className="sell_btn">Sell</Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>LTC / BTC</td>
                                                    <td>0.033345 / <span>$380.10</span></td>
                                                    <td className="text-green">+0.52%</td>
                                                    <td>52.36598 BTC</td>
                                                    <td>
                                                    <Link to={routeMatch.path === "/spot/:tikerRoot?" ? routeMatch.url : "/spot"} color="transparent" className="nav-link">
                                                        <Button className="buy_btn">Buy</Button>
                                                        <Button className="sell_btn">Sell</Button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>GXC / BTC</td>
                                                    <td>0.033345 / <span>$380.10</span></td>
                                                    <td className="text-green">+0.52%</td>
                                                    <td>52.36598 BTC</td>
                                                    <td>
                                                    <Link to={routeMatch.path === "/spot/:tikerRoot?" ? routeMatch.url : "/spot"} color="transparent" className="nav-link">
                                                        <Button className="buy_btn">Buy</Button>
                                                        <Button className="sell_btn">Sell</Button>
                                                        </Link>
                                                    </td>
                                                </tr> */}
                                            </tbody>
                                            {/* <tfoot>
                                                <tr>
                                                    <td colspan="6" className="text-center">
                                                        <Link to="" className="table_view">VIEW MORE MARKETS</Link>
                                                    </td>
                                                </tr>
                                            </tfoot> */}
                                        </table>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="trade_pair_02" role="tabpanel" aria-labelledby="trade_pair_02-tab">2</div>
                                <div class="tab-pane fade" id="trade_pair_03" role="tabpanel" aria-labelledby="trade_pair_03-tab">3</div>
                                <div class="tab-pane fade" id="trade_pair_04" role="tabpanel" aria-labelledby="trade_pair_04-tab">4</div>
                                <div class="tab-pane fade" id="trade_pair_05" role="tabpanel" aria-labelledby="trade_pair_05-tab">5</div>
                            </div>    
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MarketTrend;