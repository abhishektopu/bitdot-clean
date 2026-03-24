// import package
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'

// import lib
import { currencySymbol } from '../../lib/pairHelper';
import { toFixed } from '../../lib/roundOf';

const reqData = {
    'firstCurrencySymbol': "BTC",
    'secondCurrencySymmol': "USD"
}

const UserBalance = () => {
    const { t, i18n } = useTranslation();

    // state
    const [totalBals, setTotalBals] = useState(0);  // Balance Loader
    const [estBal, setEstBal] = useState(0);  // Estimated Balance
    const [balLoader, setBalLoader] = useState(true);  // Balance Loader
    const [estLoader, setEstLoader] = useState(true);  // Estimated Loader

    // redux
    const walletData = useSelector(state => state.wallet)
    const priceConversion = useSelector(state => state.priceConversion)
    const userSetting = useSelector(state => state.userSetting)
    const currencyData = useSelector(state => state.currency)

    // function
    useEffect(() => {
        if (userSetting && priceConversion && priceConversion.length > 0 && walletData && walletData.length > 0 && currencyData && currencyData.length > 0) {

            let estBal = 0;
            walletData.map(item => {
                let currency = currencyData.find(el => el.coin == item.coin && el.type == 'fiat')
                if (currency) {
                    if (item.coin == userSetting.currencySymbol) {
                        estBal = estBal + (item.derivativeBal + item.spotBal)
                    } else {
                        let CNVPriceData = priceConversion.find(el => el.baseSymbol == reqData.firstCurrencySymbol && el.convertSymbol == item.coin)
                        if (CNVPriceData) {
                            let bal = ((item.derivativeBal + item.spotBal) / CNVPriceData.convertPrice)

                            let CNVPrice = priceConversion.find(el => el.baseSymbol == reqData.firstCurrencySymbol && el.convertSymbol == userSetting.currencySymbol)
                            if (CNVPrice) {
                                estBal = estBal + (bal * CNVPrice.convertPrice)
                            }
                        }
                    }
                } else {
                    let CNVPriceData = priceConversion.find(el => el.baseSymbol == item.coin.split('.',1) && el.convertSymbol == userSetting.currencySymbol)
                    if (CNVPriceData) {
                        estBal = estBal + ((item.derivativeBal + item.spotBal) * CNVPriceData.convertPrice)
                    }
                }
            })
            setEstBal(estBal)

            let firPriceCNV = priceConversion.find(el => el.baseSymbol == reqData.firstCurrencySymbol && el.convertSymbol == userSetting.currencySymbol)

            if (firPriceCNV) {
                setTotalBals((estBal / firPriceCNV.convertPrice))
                setEstLoader(false)
                setBalLoader(false)
            }
        }
    }, [userSetting, priceConversion, walletData, currencyData])

    return (
        <div className="balance_details_left">
            <div className="mb-3">
                <h3>{t("TOTAL_BALANCE")}</h3>
                <h2>
                    {balLoader && <i class="fas fa-spinner fa-spin"></i>}
                    {!balLoader && <span>{toFixed(totalBals, 8)}{" "}{reqData.firstCurrencySymbol}</span>}
                </h2>
            </div>
            <div>
                <h3>{t("ESTIMATED_VALUE")}</h3>
                <h4>{currencySymbol(userSetting.currencySymbol)}
                    {estLoader && <i class="fas fa-spinner fa-spin"></i>}
                    {!estLoader && !balLoader && <span> {" "}{toFixed(estBal, 2)}</span>}
                </h4>
            </div>
        </div>
    )
}

export default UserBalance;