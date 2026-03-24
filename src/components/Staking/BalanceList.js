// import package
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux'

// import lib
import { currencySymbol } from '../../lib/pairHelper';
import isEmpty from '../../lib/isEmpty';
import { toFixed } from '../../lib/roundOf';

const reqData = {
    'firstCurrencySymbol': "BTC",
    'secondCurrencySymmol': "USD"
}

const BalanceList = () => {
    const { t, i18n } = useTranslation();

    // state
    const [loader, setLoader] = useState(true)
    const [balData, setBalData] = useState({})

    // redux
    const walletData = useSelector(state => state.wallet)
    const priceConversion = useSelector(state => state.priceConversion)
    const userSetting = useSelector(state => state.userSetting)

    // function
    useEffect(() => {
        if (userSetting && priceConversion && priceConversion.length > 0 && walletData && walletData.length > 0) {
            let estSpotBal = 0, estDerivativeBal = 0;

            walletData.map(item => {
                if (item && item.currency && item.currency.type == 'fiat') {
                    if (item.currency.currencySymbol == userSetting.currencySymbol) {
                        estSpotBal = estSpotBal + item.spotwallet
                        estDerivativeBal = estDerivativeBal + item.derivativeWallet

                    } else {
                        let CNVPriceData = priceConversion.find(el => el.baseSymbol == reqData.firstCurrencySymbol && el.convertSymbol == item.currency.currencySymbol)
                        if (CNVPriceData) {
                            let CNVPrice = priceConversion.find(el => el.baseSymbol == reqData.firstCurrencySymbol && el.convertSymbol == userSetting.currencySymbol)
                            if (CNVPrice) {
                                estSpotBal = estSpotBal + ((item.spotwallet / CNVPriceData.convertPrice) * CNVPrice.convertPrice)
                                estDerivativeBal = estDerivativeBal + ((item.derivativeWallet / CNVPriceData.convertPrice) * CNVPrice.convertPrice)
                            }
                        }
                    }
                } else {
                    let CNVPriceData = priceConversion.find(el => el.baseSymbol == item.currency.currencySymbol && el.convertSymbol == userSetting.currencySymbol)
                    if (CNVPriceData) {
                        estSpotBal = estSpotBal + (item.spotwallet * CNVPriceData.convertPrice)
                        estDerivativeBal = estDerivativeBal + (item.derivativeWallet * CNVPriceData.convertPrice)
                    }
                }
            })

            let firPriceCNV = priceConversion.find(el => el.baseSymbol == reqData.firstCurrencySymbol && el.convertSymbol == userSetting.currencySymbol)
            if (firPriceCNV) {
                setBalData({
                    estSpotBal,
                    estDerivativeBal,
                    spotBal: (estSpotBal / firPriceCNV.convertPrice),
                    derivativeBal: (estDerivativeBal / firPriceCNV.convertPrice)
                })
                setLoader(false)
            }
        }
    }, [userSetting, priceConversion, walletData])

    return (
        <table className="table tabelDashBalance">
            {
                loader && <tbody>
                    <tr>
                        Loading...
                    </tr>
                </tbody>
            }

            {
                !loader && !isEmpty(balData) && <tbody>
                    <tr>
                        <td>Spot Balance</td>
                        <td>{toFixed(balData.spotBal, 8)} {reqData.firstCurrencySymbol}</td>
                        <td>{currencySymbol(userSetting.currencySymbol)}{toFixed(balData.estSpotBal, 2)}</td>
                        <td><span>[ <Link to={'/wallet'}>Transfer</Link> ]</span> <span>[ <Link to={'/wallet'}>Deposit</Link> ]</span> <span>[  <Link to={'/wallet'}>Withdraw</Link> ]</span></td>
                    </tr>
                    <tr>
                        <td>Derivative Balance  </td>
                        <td>{toFixed(balData.derivativeBal, 8)} {reqData.firstCurrencySymbol}</td>
                        <td>{currencySymbol(userSetting.currencySymbol)}{toFixed(balData.estDerivativeBal, 2)}</td>
                        <td><span>[ <Link to={'/wallet'}>Transfer</Link> ]</span></td>
                    </tr>
                </tbody>
            }

        </table>
    )
}

export default BalanceList;