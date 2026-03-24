// import package
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// import action
import { getBankDetail, getUserSetting, viewUserProfile } from '../../actions/users';
import { getPriceConversion, getCurrency, getANNC } from '../../actions/commonAction';
import { getAssetData } from '../../actions/walletAction';

const HelperRoute = () => {
    const dispatch = useDispatch();

    // redux-state
    const { isAuth } = useSelector(state => state.auth);
    const currencyOption = useSelector(state => state.currency)

    // function
    useEffect(() => {
        if (isAuth) {
            getUserSetting(dispatch)
            getBankDetail(dispatch)
            getAssetData(dispatch)
            viewUserProfile(dispatch)
            getPriceConversion(dispatch)
            getANNC(dispatch)
        }
    }, [isAuth])

    useEffect(() => {
        if (!(currencyOption && currencyOption.length > 0)) {
            getCurrency(dispatch);
        }
    }, [])

    return <div />
}

export default HelperRoute;