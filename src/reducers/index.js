import { combineReducers } from "redux";
import authReducer from "./authReducer";
import tradeReducers from './tradeReducers'
import tradeAsset from './tradeAsset'
// import errorReducer from "./errorReducers";

// common




import account from './account';
import bankDetail from './bankDetail';
import userSetting from './userSetting';
import language from './language';
import currency from './currency';
import timezone from './timezone';
import userKyc from './userKyc';
import wallet from './wallet';
import pairList from './pairListReducer';
import tradePair from './tradePairReducers'
import marketPrice from './marketPriceReducers';
import themeReducers from './themeReducers';
import tradeTheme from './tradeTheme';
import orderBookDetail from './orderBookDetail'
import stakeOrder from './stakeOrderReducer';
import priceConversion from './priceConversion';
import announcement from './announcement';
import form from './form';
import modal from './modal';

export default combineReducers({
    auth: authReducer,
    account,
    bankDetail,
    userSetting,
    language,
    currency,
    timezone,
    userKyc,
    wallet,
    pairList,
    tradeAsset,
    tradePair,
    marketPrice,
    theme: themeReducers,
    tradeTheme,
    orderBookDetail,
    stakeOrder,
    priceConversion,
    announcement,
    form,
    modal
    // trade: tradeReducers,
    // errors: errorReducer
});