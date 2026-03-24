import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import DataTable from 'react-data-table-component';
import { Select, MenuItem } from '@material-ui/core';

// import action
import { transactionStatus } from '../../lib/displayStatus';

import { getTrnxHistory } from '../../actions/walletAction'
import isEmpty from '../../lib/isEmpty';

const columns = [
    {
        name: 'Date',
        selector: 'date',
        sortable: false,
    },
    {
        name: 'Type',
        selector: 'type',
        sortable: false,
    },
    {
        name: 'Currency',
        selector: 'currency',
        sortable: false,
    },
    {
        name: 'Amount',
        selector: 'amount',
        sortable: false,
    },
    {
        name: 'Transaction Ref.',
        selector: 'transRef',
        sortable: false,
    },
    {
        name: 'Bank & Account',
        selector: 'bankAccount',
        sortable: false,
    },
    {
        name: 'Status',
        selector: 'status',
        sortable: false,
    },
];

const FiatHistory = (props) => {
    // props
    const { currencyOption } = props;

    // state
    const [loader, setLoader] = useState(true)
    const [record, setRecord] = useState({
        'data': [],
        'count': 0
    })
    const [option, setOption] = useState([])
    const [filter, setFilter] = useState({
        'coin':'INR',
        'currencyId': '',
        'paymentType': 'all',
        'search': '',
        'page': 1,
        'limit': 5
    })
    const [typingTimeout, setTypingTimeout] = useState(0)

    const { coin, currencyId, paymentType } = filter

    // function
    const fetchHistory = async (reqQuery) => {
        try {
            const { status, loading, result } = await getTrnxHistory('fiat', reqQuery)
            setLoader(loading)
            if (status == 'success') {
                if (result && result.data && result.data.length > 0) {
                    let resultArr = []
                    result.data.map((item) => {
                        resultArr.push({
                            'date': item.createdAt,
                            'type': transactionStatus(item.paymentType),
                            'currency': item.coin,
                            'amount': item.amount,
                            'transRef': item._id,
                            'bankAccount': isEmpty(item.bankDetail) ? '-' : `${item.bankDetail.bankName}-${item.bankDetail.accountNo}`,
                            'status': <div className="textStatusGreen">{item.status}</div>
                        })

                        //textStatusOrange,textStatusGreen
                    })
                    setRecord({
                        'data': resultArr,
                        count: result.count
                    })
                }
                else {
                    setRecord({
                        'data': result.data,
                        'count': result.count
                    })
                }
            }
        } catch (err) { }
    }
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let filterData = {
            ...filter,
            [name]: value
        }
        setFilter(filterData)
        if (name == 'search') {
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }
            setTypingTimeout(setTimeout(function () {
                fetchHistory(filterData)
            }, 1000))
        } else {
            fetchHistory(filterData)
        }
    }

    const handlePageChange = page => {
        let filterData = { ...filter, ...{ 'page': page } }
        setFilter(filterData)
        fetchHistory(filterData)
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        let filterData = { ...filter, ...{ 'page': page, 'limit': newPerPage } }
        setFilter(filterData)
        fetchHistory(filterData)
    };


    useEffect(() => {
        if (currencyOption && currencyOption.length > 0) {
            let optionData = currencyOption.filter((el => el.type == 'fiat'))
            if (optionData && optionData.length > 0) {
                setOption(optionData)
                let filterData = { ...filter, ...{ 'currencyId': optionData[0]._id } }
                console.log('filterData',filterData)
                setFilter(filterData)
                fetchHistory(filterData)
            }
        }
    }, [currencyOption])

    return (
        <div className="dashboard_box stakingHistoryTable">
            <div className="newUsersFilter contact_form settingsSelect mb-0 historyPageFilter">
                <div className="newsSelectGroup">
                    <label>Filter by</label>
                    <Select
                        value={paymentType}
                        name="paymentType"
                        onChange={handleChange}
                    >
                                                <MenuItem value={'all'}>All</MenuItem>

                    <MenuItem value={'fiat_withdraw'}>Withdraw</MenuItem>
                        <MenuItem value={'fiat_deposit'}>Deposit</MenuItem>
                        <MenuItem value={'fiat_transfer'}>Transfer</MenuItem>
                    </Select>
                    {/* <Select value={currencyId}  className="marginSpace"> */}
                    {/* <Select
                        className="marginSpace"
                        value={coin}
                        name="coin"
                        onChange={handleChange}
                    >
                    <MenuItem value={'INR'}>INR</MenuItem>

                        {
                            currencyOption && currencyOption.length > 0 && currencyOption.map((item) => {
                                // console.log('itemff',item)
                                if (item.coin == 'INR') {
                                    return (
                                        <MenuItem value={item._id}>
                                            {item.currencySymbol}
                                        </MenuItem>
                                    )
                                }
                            })
                        }
                    </Select> */}
                    {/* <div className="tableSearchBox">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search by Date / Trans.Ref / Bank" />
                            <div class="input-group-append">
                                <span class="btnType1"><i class="fas fa-search"></i></span>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* <div className="newsSelectGroup">
                    <button className="btn btn-outline text-uppercase py-1 m-0">Download PDF</button>
                </div> */}
            </div>
            <DataTable
                columns={columns}
                data={record.data}
                paginationTotalRows={record.count}

                // paginationTotalRows={50}
                noHeader
                progressPending={loader}
                pagination
                paginationServer
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </div>
    )
}

FiatHistory.propTypes = {
    currencyOption: PropTypes.array.isRequired
};

FiatHistory.defaultProps = {
    currencyOption: [],
};

export default FiatHistory;