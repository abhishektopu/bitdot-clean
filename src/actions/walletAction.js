// import config
import axios from '../config/axios'

// import constant
import {
    SET_USER_WALLET_LIST,
    SET_USER_FIRST_CURRENCY,
    SET_USER_SECOND_CURRENCY,
    UPDATE_USER_WALLET_STAKE
} from '../constant';

export const getAssetData = async (dispatch) => {
    console.log('getAssetData',getAssetData);
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/getAssetsDetails`,
        });
        dispatch(userWalletList(respData.data.result))
        return true
    }
    catch (err) {
        console.log('err',err)
        return false
    }
}

export const updateWallet = async (dispatch, data, callFrom) => {
    if (callFrom == 'stake') {
        dispatch({
            type: UPDATE_USER_WALLET_STAKE,
            data
        })
    }
    return false

}

export const userWalletList = (data) => {
    return {
        type: SET_USER_WALLET_LIST,
        data
    }
}

export const withdrawRequestFiat = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/api/fiatWithdraw`,
            'data': data
        });
        return {
            status: "success",
            loading: false,
            message: respData.data.message,
            result: respData.data.result
        }
    }
    catch (err) {
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const fiatRequestVerify = async (data) => {
    try {
        let respData = await axios({
            'method': 'patch',
            'url': `/api/fiatWithdraw`,
            'data': data
        });
        return {
            status: "success",
            loading: false,
            message: respData.data.message,
        }
    }
    catch (err) {
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
        }
    }
}

export const withdrawRequestCoin = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/api/coinWithdraw`,
            'data': data
        });
        return {
            status: "success",
            loading: false,
            message: respData.data.message,
            result: respData.data.result
        }
    }
    catch (err) {
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const coinRequestVerify = async (data) => {
    try {
        let respData = await axios({
            'method': 'patch',
            'url': `/api/coinWithdraw`,
            'data': data
        });
        return {
            status: "success",
            loading: false,
            message: respData.data.message,
        }
    }
    catch (err) {
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
        }
    }
}

export const fiatDepositRequest = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/api/fiatDeposit`,
            'data': data
        });
        return {
            status: "success",
            loading: false,
            message: respData.data.message,
            result: respData.data.result
        }
    }
    catch (err) {
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const walletTransfer = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/api/walletTransfer`,
            'data': data
        });
        return {
            status: "success",
            loading: false,
            message: respData.data.message,
        }
    }
    catch (err) {
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const getAssetByCurrency = async (currencyId) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/getAsset/` + currencyId
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    }
    catch (err) {
        return {
            status: "failed",
            loading: false,
        }
    }
}

export const setUserFirstCurrency = (assetData, dispatch) => {
    dispatch({
        type: SET_USER_FIRST_CURRENCY,
        data: assetData
    })
}

export const setUserSecondCurrency = (assetData, dispatch) => {
    dispatch({
        type: SET_USER_SECOND_CURRENCY,
        data: assetData
    })
}

export const getTrnxHistory = async (params,query) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/history/transaction/` + params,
            'params':query
        });
        return {
            status: "success",
            loading: false,
            result: respData.data.result
        }
    }
    catch (err) {
        return {
            status: "failed",
            loading: false,
        }
    }
}