// import package
import jwt from "jsonwebtoken";

// import constant
import {
    SET_AUTHENTICATION,
    REMOVE_AUTHENTICATION
} from '../constant';

// import config
import config from '../config';
import { createSocketUser } from '../config/socketConnectivity';
import { removeAuthorization } from '../config/axios'
import { removeAuthToken } from '../lib/localStorage'

// import lib
import isEmpty from "../lib/isEmpty";

export const decodeJwt = (token, dispatch) => {
    try {
        console.log("-----token", token)
        if (!isEmpty(token)) {
            token = token.replace('Bearer ', '')
            const decoded = jwt.verify(token, config.secretOrKey);
            console.log("-----decoded", decoded)
            if (decoded) {
                createSocketUser(decoded._id)
                dispatch({
                    type: SET_AUTHENTICATION,
                    authData: {
                        isAuth: true,
                        userId: decoded._id,
                    }
                })
            }
        }
    } catch (err) {
        console.log("-----err", err)
        removeAuthToken()
        removeAuthorization()
        // history.push('/login')
        dispatch({
            type: REMOVE_AUTHENTICATION,
            authData: {
                isAuth: false,
            }
        })
    }
}