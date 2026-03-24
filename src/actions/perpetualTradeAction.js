// import config
import axios from '../config/axios';

// import constant
import {
    SET_SPOT_TRADE_PAIR_LIST,
    SET_PERPETUAL_PAIR_TRADE,
    SET_PERPETUAL_MARKET_PRICE,
    SET_PERPETUAL_ORDER_BOOK
} from '../constant';

export const getPairList = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/perpetual/tradePair`,
        });
        return {
            status: 'success',
            loading: false,
            result: respData.data.result,
        }
    }
    catch (err) {
        return {
            status: 'failed',
            loading: false,
        }
    }
}

export const setPairList = (data, dispatch) => {
    dispatch({
        type: SET_SPOT_TRADE_PAIR_LIST,
        data
    })
}

export const setTradePair = ({
    firstCurrencySymbol,
    firstCurrencyId,
    firstFloatDigit,
    secondCurrencySymbol,
    secondCurrencyId,
    secondFloatDigit,
    botstatus,
    maker_rebate,
    taker_fees,
    _id,
}, dispatch) => {
    dispatch({
        type: SET_PERPETUAL_PAIR_TRADE,
        data: {
            firstCurrencySymbol,
            firstCurrencyId,
            firstFloatDigit,
            secondCurrencySymbol,
            secondCurrencyId,
            secondFloatDigit,
            botstatus,
            maker_rebate,
            taker_fees,
            pairId: _id
        }
    })
}

export const orderPlace = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/api/perpetual/orderPlace`,
            data
        });
        return {
            status: 'success',
            loading: false,
            message: respData.data.message,
            result: respData.data.result,
        }
    }
    catch (err) {
        return {
            status: 'failed',
            loading: false,
            message: err.response.data.message,
        }
    }
}

export const getOrderBook = async (pairId) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/perpetual/ordeBook/${pairId}`,
        });
        return {
            status: 'success',
            loading: false,
            result: respData.data.result,
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false,
        }
    }
}

export const getOpenOrder = async (data, pairId) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/perpetual/openOrder/${pairId}`,
            'params': data
        });
        return {
            status: 'success',
            loading: false,
            result: respData.data.result,
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false,
        }
    }
}

export const getFilledOrder = async (data, pairId) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/perpetual/filledOrder/${pairId}`,
            'params': data
        });
        return {
            status: 'success',
            loading: false,
            result: respData.data.result,
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false,
        }
    }
}

export const getTradeHistory = async (data, pairId) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/perpetual/tradeHistory/${pairId}`,
            'params': data
        });
        return {
            status: 'success',
            loading: false,
            result: respData.data.result,
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false,
        }
    }
}

export const getPositionOrder = async (pairId) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/perpetual/positionOrder/${pairId}`,
        });
        return {
            status: 'success',
            loading: false,
            result: respData.data.result,
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false,
        }
    }
}

export const getMarketPrice = async (pairId, dispatch) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/spot/marketPrice/${pairId}`,
        });
        setMarketPrice(respData.data.result, dispatch)
        return true
    } catch (err) {
        return false
    }
}

export const setMarketPrice = ({
    last,
    markPrice,
    low,
    high,
    firstVolume,
    secondVolume,
    changePrice,
    change,
    botstatus,
    _id,
}, dispatch) => {
    dispatch({
        type: SET_PERPETUAL_MARKET_PRICE,
        data: {
            last,
            markPrice,
            low,
            high,
            firstVolume,
            secondVolume,
            changePrice,
            change,
            botstatus,
            _id,
        }
    })
}

export const getRecentTrade = async (pairId) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/spot/recentTrade/${pairId}`,
        });
        return {
            status: 'success',
            loading: false,
            result: respData.data.result,
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false,
        }
    }
}

export const cancelOrder = async (orderId) => {
    try {
        let respData = await axios({
            'method': 'delete',
            'url': `/api/perpetual/cancelOrder/${orderId}`,
        });
        return {
            status: 'success',
            loading: false,
            message: respData.data.message,
        }
    } catch (err) {
        return {
            status: 'failed',
            loading: false,
            message: err.response.data.message,
        }
    }
}

export const orderBookDetail = (dispatch, data) => {
    dispatch({
        type: SET_PERPETUAL_ORDER_BOOK,
        data
    })
    return true
}