// import package
import React, { useEffect } from "react";
import DataTable from 'react-data-table-component';
import { Select, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FiatHistory from './FiatHistory';
import CryptoHistory from './CryptoHistory';
import SpotTradeHistory from './spotTradeHistory/SpotTradeHistory';
import SpotOrderHistory from './spotOrderHistory/SpotOrderHistory';
import Announcement from '../Announcement'


// import action
import { getCurrency } from '../../actions/commonAction';

// Crypto History Table
const cryptoHistory = [
  { date: "11-05-2021 15:15", type: <span className="textDepositGreen">Deposit</span>, crypto: "Bitcoin", amount: "0.00215487 BTC", address: <a href="#">12E7iTgXziTgXiTgX8KGp8KGp8KGpW8KGpMdqv</a>, status: <div className="textStatusGreen">Completed</div>, },
  { date: "11-05-2021 15:15", type: <span className="textWithdrawRed">Withdraw</span>, crypto: "Ethereum", amount: "0.00215487 ETH", address: <a href="#">12E7iTgXziTgXiTgX8KGp8KGp8KGpW8KGpMdqv</a>, status: <div className="textStatusOrange">Pending</div>, },
  { date: "11-05-2021 15:15", type: <span className="textWithdrawRed">Withdraw</span>, crypto: "Ripple", amount: "0.00215487 XRP", address: <a href="#">12E7iTgXziTgXiTgX8KGp8KGp8KGpW8KGpMdqv</a>, status: <div className="textStatusOrange">Pending</div>, },
  { date: "11-05-2021 15:15", type: <span className="textDepositGreen">Deposit</span>, crypto: "Litecoin", amount: "0.00215487 LTC", address: <a href="#">12E7iTgXziTgXiTgX8KGp8KGp8KGpW8KGpMdqv</a>, status: <div className="textStatusGreen">Completed</div>, },
  { date: "11-05-2021 15:15", type: <span className="textDepositGreen">Deposit</span>, crypto: "Tether", amount: "0.00215487 USDT", address: <a href="#">12E7iTgXziTgXiTgX8KGp8KGp8KGpW8KGpMdqv</a>, status: <div className="textStatusGreen">Completed</div>, },
];
const cryptoHistoryColumns = [
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
    name: 'Crypto',
    selector: 'crypto',
    sortable: false,
  },
  {
    name: 'Amount',
    selector: 'amount',
    sortable: false,
  },
  {
    name: 'Address',
    selector: 'address',
    sortable: false,
    width: "350px",
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: false,
  },
];

// const TransactionHistory = () => {
//   const dispatch = useDispatch();

//   // redux-state
//   const currencyOption = useSelector(state => state.currency)

//   useEffect(() => {
//     if (!(currencyOption && currencyOption.length > 0)) {
//       getCurrency(dispatch);
//     }
//   }, [])

//   return (
//     <div className="container">
//       <GridContainer>
//         <GridItem xs={12} sm={12} md={5} lg={5}>
//           <h3 className="dash_title">Fiat History</h3>
//         </GridItem>
//         <GridItem xs={12} sm={12} md={7} lg={7}>
//           <ul className="profile_dash">
//             <li>New trade pair XRP/BNB will add for trade on next 48 hrs - <span>Admin Announcement</span></li>
//             <li>13-05-2021  15:15, Chrome, 182.254.127  - <span>Last login</span></li>
//           </ul>
//         </GridItem>
//       </GridContainer>
//       <FiatHistory
//         currencyOption={currencyOption}
//       />

//       <div class="row align-items-center">
//         <div class="col-lg-12">
//           <h3 class="dash_title mb-3">Cryptocurrency History</h3>
//         </div>
//       </div>


//       <div className="dashboard_box stakingHistoryTable">
//         <div className="newUsersFilter contact_form settingsSelect mb-0 historyPageFilter">
//           <div className="newsSelectGroup">
//             <label>Filter by</label>
//             <Select value="0">
//               <MenuItem value={0}>Withdraw</MenuItem>
//               <MenuItem value={20}>Deposit</MenuItem>
//               <MenuItem value={30}>Transfer</MenuItem>
//             </Select>
//             <Select value="0" className="marginSpace">
//               <MenuItem value={0}>USD</MenuItem>
//               <MenuItem value={20}>INR</MenuItem>
//               <MenuItem value={30}>AUD</MenuItem>
//               <MenuItem value={40}>EURO</MenuItem>
//               <MenuItem value={50}>SR</MenuItem>
//             </Select>
//             <div className="tableSearchBox">
//               <div class="input-group">
//                 <input type="text" class="form-control" placeholder="Search by Date / Trans.Ref / Bank" />
//                 <div class="input-group-append">
//                   <span class="btnType1"><i class="fas fa-search"></i></span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="newsSelectGroup">
//             <button className="btn btn-outline text-uppercase py-1 m-0">Download PDF</button>
//           </div>
//         </div>
//         <DataTable className="historyCryptoTable" columns={cryptoHistoryColumns} data={cryptoHistory} noHeader />
//       </div>
//     </div>
//   )
// }
const TransactionHistory = () => {

  // redux-state
  const currencyOption = useSelector(state => state.currency)

  return (
    <div className="container">
      <GridContainer>
        <GridItem xs={12} sm={12} md={5} lg={5}>
          <h3 className="dash_title">Fiat History</h3>
        </GridItem>
        <GridItem xs={12} sm={12} md={7} lg={7}>
          <Announcement />
        </GridItem>
      </GridContainer>
      <FiatHistory
        currencyOption={currencyOption}
      />
      <div class="row align-items-center">
        <div class="col-lg-12">
          <h3 class="dash_title mb-3">Cryptocurrency History</h3>
        </div>
      </div>
      <CryptoHistory
        currencyOption={currencyOption}
      />
      <SpotTradeHistory
              // currencyOption={currencyOption}
      />
      <SpotOrderHistory
      // currencyOption={currencyOption}
      />
    </div>
  )
}
export default TransactionHistory;