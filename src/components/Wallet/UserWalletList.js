// import package
import React, { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';
import { Switch } from '@material-ui/core';

// import component
import FiatWithdraw from './FiatWithdraw';
import FiatDeposit from './FiatDeposit';
import CoinDeposit from './CoinDeposit';
import CoinWithdraw from './CoinWithdraw';

// import action
import { getAssetData, getFetchAssets } from '../../actions/walletAction'

// import lib
import { currencySymbol } from '../../lib/pairHelper';
import { toFixed } from '../../lib/roundOf';
import { supportsGoWithoutReloadUsingHash } from 'history/DOMUtils';

const UserWalletList = () => {
    const { t, i18n } = useTranslation();
    const [record, setRecord] = useState({
        // 'data': [],
        // 'count': 0
    })
    // redux-state
    const walletData = useSelector(state => state.wallet);
    const currencyData = useSelector(state => state.currency)
    const priceConversion = useSelector(state => state.priceConversion)
    const userSetting = useSelector(state => state.userSetting)

    // state
    const [depositKey, setDepositKey] = useState(-1)
    const [withdrawKey, setWithdrawKey] = useState(-1)
    const [assetData, setAsstData] = useState({})
    // const [filter,setFilter] = useState({})
    const [searchInterval, setSearchInterval] = useState()

    const handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        let filterData = {
            ...filter,
            [name]: value
        }


        console.log('name', name)
        console.log('value', value)
        setFilter(filterData)
        setSearchInterval(value)
        console.log('filterData2', filterData, walletData)
    }
    const handleCheck = (e) => {
        e.preventDefault();

        const { name, checked } = e.target;
        let checkedData = {
            ...checked,
            [name]: checked
        }


        console.log('name', name)
        console.log('checked', checked)
        SetChecked(checkedData)
        console.log('checkData', checkedData);
        // setSearchInterval(value)
        // console.log('filterData2', filterData,walletData)
    }
    const [filter, setFilter] = useState({
        'coin': '',
        // 'paymentType': 'all',
        'search': '',
        'page': 1,
        'limit': 10
    })
    const [checked, SetChecked] = useState({
        'zeroValue': false,
    })
    const [typingTimeout, setTypingTimeout] = useState(0)

    const { search, coin } = filter

    const { zeroValue } = checked
    return (
        <>

            <div className="tableSearchBox">
                <div class="input-group">
                    <input
                        type="text"
                        name="search"
                        value={search}
                        onChange={handleChange}
                        class="form-control"
                        placeholder="Search by Currency"
                    />
                    <div class="input-group-append">
                        <span class="btnType1"><i class="fas fa-search"></i></span>
                    </div>
                </div>
                <div className="hide">
                    <ul>
                        <li>
                            <label>Hide Zero Amount</label>
                            <Switch
                                checked={zeroValue}
                                onChange={handleCheck}
                                color="primary"
                                name="zeroValue"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </li>
                    </ul>
                </div>
            </div>




            {

                currencyData && currencyData.length > 0 && walletData && walletData.length > 0 && walletData.map((item, key) => {



                    let priceCNV;

                    if (userSetting && priceConversion && priceConversion.length > 0) {
                        priceCNV = priceConversion.find(el => el.baseSymbol == item.coin.split('.',1) && el.convertSymbol == userSetting.currencySymbol)
                    }

                    let currency = currencyData.find(el => el._id == item._id)
                    console.log('currency ', item, searchInterval)
                    if (currency && item.coin == 'INR') {



                        if (searchInterval == undefined || searchInterval == '' || searchInterval == item.coin || searchInterval == item.coin.toLowerCase()) {

                            console.log('currency11',
                            )

                            if (checked.zeroValue == true && item.spotBal != 0 || checked.zeroValue == false) {

                                return (
                                    <>


                                        <div className="dashboard_box mb-2">
                                            <div className="walletCard">

                                                <div className="currencyName">
                                                    <img src={currency.image} alt="" className="img-fluid" />
                                                    {currency.name}
                                                </div>
                                                <div className="currencyPrice">

                                                    <div className="spot_balance_section">
                                                        {/* <span>Spot Balance</span> */}
                                                        <div> {parseFloat(item.spotBal).toFixed(8)}{" "}<small>{item.coin}</small></div>
                                                    </div>
                                                </div>
                                                <div className="currencyPrice">
                                                    {
                                                        priceCNV && <>
                                                            <small>{currencySymbol(userSetting.currencySymbol)}</small>{toFixed((item.spotBal * priceCNV.convertPrice), 2)}
                                                        </>
                                                    }
                                                </div>

                                                <div className="walletCardRight">

                                                    <div className="textLinkGroup">
                                                        [
                                                        <Link href="#"
                                                            onClick={() => {
                                                                setDepositKey(key == depositKey ? -1 : key)
                                                                setAsstData({ ...item, currency })
                                                            }}
                                                        >
                                                            Deposit
                                                        </Link>
                                                        ]
                                                        [
                                                        <Link href="#"
                                                            onClick={() => {

                                                                setWithdrawKey(key == withdrawKey ? -1 : key)
                                                                setAsstData({ ...item, currency })
                                                            }}
                                                        >
                                                            Withdraw
                                                        </Link>
                                                        ]
                                                        {

                                                            ['crypto', 'token'].includes(currency.type) && <>
                                                                {' '}[ <Link to={'/spot/'+currency.coin+'_INR'} >Trade</Link> ]
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <Collapse in={key == depositKey}>
                                                <div className="collapseWallet">
                                                    <div className="contact_form settingsSelect mb-0">

                                                        {
                                                            assetData && assetData.currency && ['crypto', 'token'].includes(assetData.currency.type) && <CoinDeposit
                                                                assetData={item}
                                                                currency={currency}
                                                            />
                                                        }

                                                        {
                                                            ['fiat'].includes(currency.type) && <FiatDeposit
                                                                assetData={item}
                                                                currency={currency}
                                                            />
                                                        }

                                                    </div>
                                                </div>
                                            </Collapse>

                                            <Collapse in={key == withdrawKey}>
                                                <div className="collapseWallet">
                                                    <div className="contact_form settingsSelect mb-0">

                                                        {
                                                            assetData && assetData.currency && ['crypto', 'token'].includes(assetData.currency.type) && <CoinWithdraw
                                                                assetData={item}
                                                                currency={currency}
                                                            />
                                                        }

                                                        {
                                                            ['fiat'].includes(currency.type) && <FiatWithdraw
                                                                assetData={item}
                                                                currency={currency}
                                                            />
                                                        }
                                                    </div>

                                                </div>
                                            </Collapse>
                                        </div>
                                    </>
                                )
                            }
                        }
                    }
                })
            }


            {

                currencyData && currencyData.length > 0 && walletData && walletData.length > 0 && walletData.map((item, key) => {


                    //    item.coin == 'INR'

                    let priceCNV;

                    if (userSetting && priceConversion && priceConversion.length > 0) {
                        priceCNV = priceConversion.find(el => el.baseSymbol == item.coin.split('.',1) && el.convertSymbol == userSetting.currencySymbol)
                    }

                    let currency = currencyData.find(el => el._id == item._id)
                    console.log('currency ', item, searchInterval)
                    if (currency && item.coin != 'INR') {
                        if (searchInterval == undefined || searchInterval == '' || searchInterval == item.coin || searchInterval == item.coin.toLowerCase()) {
                         
                            console.log('currency11',
                            )

                            if (checked.zeroValue == true && item.spotBal != 0 || checked.zeroValue == false) {

                                return (
                                    <>


                                        <div className="dashboard_box mb-2">
                                            <div className="walletCard">

                                                <div className="currencyName">
                                                    <img src={currency.image} alt="" className="img-fluid" />
                                                    {currency.name}
                                                </div>
                                                <div className="currencyPrice">

                                                    <div className="spot_balance_section">
                                                        {/* <span>Spot Balance</span> */}
                                                        <div> {parseFloat(item.spotBal).toFixed(8)}{" "}<small>{item.coin}</small></div>
                                                    </div>
                                                </div>
                                                <div className="currencyPrice">
                                                    {
                                                        priceCNV && <>
                                                            <small>{currencySymbol(userSetting.currencySymbol)}</small>{toFixed((item.spotBal * priceCNV.convertPrice), 2)}
                                                        </>
                                                    }
                                                </div>

                                                <div className="walletCardRight">

                                                    <div className="textLinkGroup">
                                                        [
                                                        <Link href="#"
                                                            onClick={() => {
                                                                setDepositKey(key == depositKey ? -1 : key)
                                                                setAsstData({ ...item, currency })
                                                            }}
                                                        >
                                                            Deposit
                                                        </Link>
                                                        ]
                                                        [
                                                        <Link href="#"
                                                            onClick={() => {
                                                                setWithdrawKey(key == withdrawKey ? -1 : key)
                                                                setAsstData({ ...item, currency })
                                                                

                                                            }}
                                                        >   
                                                                 
                                                            Withdraw
                                                        </Link>
                                                        ]

                                                        {
                                                            ['crypto', 'token'].includes(currency.type) && <>
                                                                {/* {' '}[ <Link to={'/spot'} >Trade</Link> ] */}
                                                                {' '}[ <Link to={'/spot/'+currency.coin+'_INR'} >Trade</Link> ]

                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <Collapse in={key == depositKey}>
                                                <div className="collapseWallet">
                                                    <div className="contact_form settingsSelect mb-0">

                                                        {
                                                            assetData && assetData.currency && ['crypto', 'token'].includes(assetData.currency.type) && <CoinDeposit
                                                                assetData={item}
                                                                currency={currency}
                                                            />
                                                        }

                                                        {
                                                            ['fiat'].includes(currency.type) && <FiatDeposit
                                                                assetData={item}
                                                                currency={currency}
                                                            />
                                                        }

                                                    </div>
                                                </div>
                                            </Collapse>

                                            <Collapse in={key == withdrawKey}>
                                                <div className="collapseWallet">
                                                    <div className="contact_form settingsSelect mb-0">

                                                        {
                                                            assetData && assetData.currency && ['crypto', 'token'].includes(assetData.currency.type) && <CoinWithdraw
                                                                assetData={item}
                                                                currency={currency}
                                                            />
                                                        }

                                                        {
                                                            ['fiat'].includes(currency.type) && <FiatWithdraw
                                                                assetData={item}
                                                                currency={currency}
                                                            />
                                                        }
                                                    </div>

                                                </div>
                                            </Collapse>
                                        </div>
                                    </>
                                )
                            }
                        }
                    }
                })
            }
        </>
    )
}

export default UserWalletList;