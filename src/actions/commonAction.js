// import config
import axios from '../config/axios'

// import constant
import {
    SET_CURRENCY,
    SET_LANGUAGE_OPTION,
    SET_TIME_ZONE,
    SET_THEME,
    SET_TRADE_THEME,
    SET_PRICE_CONVERSION,
    SET_ANNOUNCEMENT
} from '../constant';

// import lib
import { getTimeZone } from '../lib/moment';
import {
    setTheme as setThemeLocal,
    changeTradeTheme as changeTradeThemeLocal
} from '../lib/localStorage'


export const getLanguage = async (dispatch) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/getLanguage`,
        });
        dispatch(setLanguageOption(respData.data.result))
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

export const getCurrency = async (dispatch) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/getCurrency`,
        });
        dispatch(setCurrencyOption(respData.data.result))
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

export const setLanguageOption = (data) => {
    return {
        type: SET_LANGUAGE_OPTION,
        data
    }
}

export const setCurrencyOption = (data) => {
    return {
        type: SET_CURRENCY,
        data
    }
}

export const setTimeZone = async (dispatch) => {
    let data = getTimeZone();
    dispatch({
        type: SET_TIME_ZONE,
        data
    })

}

export const setTheme = async (dispatch, theme) => {
    await setThemeLocal(theme);
    dispatch({
        type: SET_THEME,
        theme
    })
    return true
}

export const setTradeTheme = async (dispatch, theme) => {
    await changeTradeThemeLocal(theme)
    dispatch({
        type: SET_TRADE_THEME,
        theme
    })
    return true
}

export const getCMSPage = async (identifier) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/cms/${identifier}`,
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

export const getAllFaq = async () => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/faq/`,
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

export const pairDataBySymbol = async (data) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/getPairData`,
            'params': data
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
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const getPriceConversion = async (dispatch) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/priceConversion`,
        });
        dispatch({
            type: SET_PRICE_CONVERSION,
            data: respData.data.result
        })
        return true
    }
    catch (err) {
        return false
    }
}

/** 
 * Get Announcement
*/
export const getANNC = async (dispatch) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/announcement`,
        });
        dispatch({
            type: SET_ANNOUNCEMENT,
            data: respData.data.result
        })
        return true
    }
    catch (err) {
        return false
    }
}

export const addContactus = async (data) => {
    try {
      
        let respData = await axios({
            'method': 'post',
            'url': `/api/addContactus`,
            data
        });
        return {
            status: 'success',
            loading: false,
            result: respData.data.result,
            message:respData.data.message
        }
    }
    catch (err) {
        return {
            status: 'failed',
            loading: false,
        }
    }
}
