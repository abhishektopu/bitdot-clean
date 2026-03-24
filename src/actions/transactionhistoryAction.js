// import config
import axios from '../config/axios';

// import constant
import {
    SET_P2P_SPOT_PAIR_TRADE,
} from '../constant';


export const getMyP2PHistory = async (data) => {
    try {
        let respData = await axios({
            'method': 'post',
            'url': `/api/getMyP2PHistory`,
            data
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


export const getMySpotHistory = async (data) => {
    try {
       // alert();
        let respData = await axios({
            'method': 'post',
            'url': `/api/getMySpotHistory`,
            data
        });
        console.log("Respon Data-----",respData);
        return {
            status: "success",
            loading: false,
            message: respData.data.message,
            result: respData.data.result
        }
    }
    catch (err) {
        console.log("erororrrrrr",err);
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const getTransactionHistory = async (data) => {
    try {
        console.log("dataaaaaaaaaaaa-----------",data);
        let respData = await axios({
            'method': 'post',
            'url': `/api/getTransactionhistory`,
            data
        });
        return {
            status: respData.data.status,
            loading: false,
            message: respData.data.message,
            result: respData.data.result
        }
    }
    catch (err) {
        console.log(err);
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}

export const getFilledOrder = async (data) => {
    try {
      //  console.log("dataaaaaaaaaaaa-----------",data);
        let respData = await axios({
            'method': 'post',
            'url': `/api/getFilledOrderHistory`,
            data
        });
        console.log("RespData---",respData)
        return {
            status: respData.data.status,
            loading: false,
            message: respData.data.message,
            result: respData.data.result
        }
    }
    catch (err) {
        console.log(err);
        return {
            status: "failed",
            loading: false,
            message: err.response.data.message,
            error: err.response.data.errors
        }
    }
}



