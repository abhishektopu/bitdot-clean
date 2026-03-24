// import config
import axios from '../config/axios'

// import constant
import {
    SET_USER_KYC,
    SET_ID_PROOF_KYC,
    SET_ADDRESS_PROOF_KYC,
    UPDATE_USER_ACCOUNT
} from '../constant';

export const getKycDetail = async (dispatch) => {
    try {
        let respData = await axios({
            'method': 'get',
            'url': `/api/kycdetail`,
        });
        dispatch(setUserKyc(respData.data.result))
    }
    catch (err) {
        return {
            status: 'failed',
            loading: false,
        }
    }
}

export const updateIdProof = async (data, dispatch) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `/api/kyc/idproof`,
            'data': data
        });
        dispatch(setIdProofKyc(respData.data.result))
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

export const updateAddressProof = async (data, dispatch) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `/api/kyc/addressproof`,
            'data': data
        });
        dispatch(setAddressProofKyc(respData.data.result))
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


export const setUserKyc = (data) => {
    return {
        type: SET_USER_KYC,
        data
    }
}

export const setIdProofKyc = (data) => {
    return {
        type: SET_ID_PROOF_KYC,
        data: {
            'idProof': data.idProof
        }
    }
}

export const setAddressProofKyc = (data) => {
    return {
        type: SET_ADDRESS_PROOF_KYC,
        data: {
            'addressProof': data.addressProof
        }
    }
}


export const updateKyc = async (data, dispatch) => {
    try {
        let respData = await axios({
            'method': 'put',
            'url': `/api/kyc`,
            'data': data
        });
        dispatch(setIdProofKyc(respData.data.result.updateKyc))
        dispatch(setAddressProofKyc(respData.data.result.updateKyc))
        dispatch({
            type: UPDATE_USER_ACCOUNT,
            data: respData.data.result.account
        })
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