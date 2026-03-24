// import constant
import {
    SET_USER_WALLET_LIST,
    UPDATE_USER_WALLET_STAKE
} from '../constant';

const initialValue = []

const wallet = (state = initialValue, action) => {
    switch (action.type) {
        case SET_USER_WALLET_LIST:
            return action.data;

        case UPDATE_USER_WALLET_STAKE:
            if (state && state.length > 0) {
                let newRecord = [];
                state.map((item, key) => {
                    if (item._id == action.data.userAssetId) {
                        newRecord.push({
                            ...item,
                            ...{
                                "spotwallet": action.data.spotwallet
                            }
                        })
                    } else {
                        newRecord.push(item)
                    }
                })

                return newRecord;
            }
            return state
        default:
            return state;
    }
}

export default wallet;