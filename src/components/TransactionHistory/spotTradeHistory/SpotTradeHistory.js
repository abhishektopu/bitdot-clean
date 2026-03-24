import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
// @material-ui/core components
// import { Link } from "react-router-dom";
// import Header from "components/Header/Header.js";
// import Checkbox from 'rc-checkbox';
// import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Switch from '@material-ui/core/Switch';
// import { Scrollbars } from 'react-custom-scrollbars';
import DataTable from 'react-data-table-component';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import { SimpleInput } from 'react-bootstrap-input';
import {Select } from '@material-ui/core';
// import { getChatDetails, getMyTransactions } from '../../actions/p2pAction';
import { getCurrency } from '../../../actions/commonAction';
import {getMySpotHistory} from '../../../actions/transactionhistoryAction';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import ReactDatatable from '@ashvin27/react-datatable';
import CancelOrder from 'components/SportTrade/CancelOrder';
import moment from 'moment';
//var dateFormat      = require('dateformat');
// Default export is a4 paper, portrait, using millimeters for units


const dashboardRoutes = [];

var arr=[];

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 
  return null;
}
export default function SpotTradeHistory(props) {

    const dispatch=useDispatch();
    const[userId,setuserId]=useState();
    const[transtype,setTranstype]=useState();
    const[currency,setCurrency]=useState("all");
    const[transData,setTransData]=useState([]);
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });
    const doc = new jsPDF();

    
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    const authDetails = useSelector(state => state.auth);
    const currencyData = useSelector(state => state.currency);
    const { ...rest } = props;
    const getcurrencyDetails = async () => {
        try {
            const { result, status, loading } = await getCurrency(dispatch)
          } catch (err) { }
          
      }
      useEffect(() => {
        getcurrencyDetails();
       }, [])


      useEffect(() => {
        if(authDetails.userId){
            setuserId(authDetails.userId);
            getSpotHistory(authDetails.userId);
       // getTransactionDetails(authDetails.userId)
        }
        if(currencyData && currencyData){
            console.log("currencyDatacurrencyDatacurrencyData",currencyData);
        }
       }, [authDetails,currencyData])
   
       
       const getSelected = async (e) => {
      
          setTranstype(e);
          let reqData = {
            curUser:authDetails.userId,
            transactiontype:e,
            currencytype:currency
          }
        const { result, status, loading } = await getMySpotHistory(reqData);
        if(result){
            setTransData(result)
        }
       }
       const handleposttocurrency = async (e) => {
        let reqData = {
            curUser:authDetails.userId,
            transactiontype:transtype,
            currencytype:e
          }
          setCurrency(e);
        const { result, status, loading } = await getMySpotHistory(reqData);
        if(result){
            setTransData(result)
           
        }
     }
     const configdata = {
      page_size: 10,
      length_menu: [ 10, 20, 50 ],
      filename: "Users",
      no_data_text: 'No user found!',
      language: {
          length_menu: "Show _MENU_ result per page",
          filter: "Filter in records...",
          info: "Showing _START_ to _END_ of _TOTAL_ records",
          pagination: {
              first: "First",
              previous: "Previous",
              next: "Next",
              last: "Last"
          }
      },
      show_length_menu: false,
      show_filter: true,
      show_pagination: true,
      show_info: true,
      defaultSortAsc: true,
};
     const savePDF = async () => {
     //  alert("Welcome");
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "portrait"; // portrait or landscape
  
      const marginLeft = 40;
      const doc = new jsPDF(orientation, unit, size);
  
  
      doc.setFontSize(15);
     
      const title = "Spot Transaction History";
      const headers = [["Date","Transaction Id", "Trade Type","Price","Quantity", "Order Value","Order Type", "Status"]];
      
      const data = transData.map(elt=> [moment(elt.orderDate).format('DD-MM-YYYY hh:mm'),elt._id,elt.buyorsell?"buy" && "Buy":"Sell",elt.price.toFixed(4),elt.quantity.toFixed(4),elt.orderValue.toFixed(4),elt.orderType?"limit" && "Limit Order":"Market Order",elt.status.charAt(0).toUpperCase() + elt.status.slice(1)]);
      let content = {
        startY: 50,
        head: headers,
        body: data
      };
   
      doc.text(title, marginLeft, 40);
      doc.autoTable(content);
    doc.save("spottrade-history.pdf")
    //  alert("Document Saved")
    }
  
         
       const getSpotHistory = async (e) => {
        try {
            let reqData = {
                curUser:e,
              }
              var pairname=[];
            const { result, status, loading } = await getMySpotHistory(reqData);
            if (result) {
              setTransData(result);
              result.map((item,key)=>{
                pairname.push(item.pairName)
              })
              
            }
         
           arr=pairname.filter((value,index)=>pairname.indexOf(value)===index)
         
          } catch (err) { 
              console.log("Transactions- err--------",err)
          }
          
      }

      // Crypto History Table

    const cryptoHistoryColumns = [
        {
          text: 'Date',
          key: 'orderDate',
          className:'Date',
          sortable: false,
          width:'150px',
          cell:record=>{
              return(
                <div data-tag="allowRowEvents">{moment(record.orderDate).format('DD-MM-YYYY hh:mm')}</div>
                 
              );
          }
        },
        {
          text: 'Transaction Id',
          key: '_id',
          className:'Transaction',
          sortable: false,
        },
        {
          text: 'Trade Type',
          className: 'Trade Type',
          key: 'buyorsell',
          sortable: false,
          
          cell:record=>{
            if(record.buyorsell=='buy'){
              var type="Buy";
              return(
                <div className="textStatusGreen" data-tag="allowRowEvents">{type}</div>
                 
              );
          } else{
            var type="Sell";
            return(
              <div className="textWithdrawRed" data-tag="allowRowEvents">{type}</div>
               
            );
        }
           }
        },
        {
          text: 'Pair',
          key: 'pairName',
          className:'Pair',
          sortable: false,
          
        },
        {
          text: 'Price',
          className: 'Price',
          key: 'price',
          sortable: false,
                 },
        {
          text: 'Quantity',
          className: 'Quantity',
          key: 'quantity',
          sortable: false,
          cell:record=>{
            return(
              <div>{(record.quantity).toFixed(4)}</div>
            )
          }
        },
     
        {
          text: 'Order Value',
          className: 'Order Value',
          key: 'orderValue',
          sortable: false,
          cell:record=>{
            return(
              <div>{(record.orderValue).toFixed(4)}</div>
            )
          }
        },
        {
          text: 'Order Type',
          className: 'Order Type',
          key: 'orderType',
          sortable: false,
          cell:record=>{
              if(record.orderType=='limit'){
                  var type="Limit Order";
              } else{
                var type="Market Order";
            }
                return(
                    <div data-tag="allowRowEvents">{type}</div>
                     
                  );
           }
        },
        {
          text: 'Status',
          className: 'Status',
          key: 'status',
          sortable: false,
          cell:record=>{
            if(record.status=='cancel'){
                var type="Cancelled";
                return(
                <span className="textStatusOrange" >
               {/* // {loader && <i class="fas fa-spinner fa-spin"></i>} */}
                {/* {t("CANCEL")} */}
                Cancelled
            </span>);
            }
             if(record.status=='completed'){
                var type="Cancelled";
                return(
                <span className="textStatusGreen" >
               {/* // {loader && <i class="fas fa-spinner fa-spin"></i>} */}
                {/* {t("CANCEL")} */}
                Completed
            </span>);
            } else{
             return(<CancelOrder orderId={record._id}/>);
          }
              
         }
        },
      ];
    
  return (
    <>
        <div class="row align-items-center">
            <div class="col-lg-12">
                <h3 class="dash_title mb-3">Spot Order History</h3>
            </div>
        </div>
        <div className="dashboard_box stakingHistoryTable boxSpace">
            <div className="newUsersFilter contact_form settingsSelect mb-0 historyPageFilter">
                <div className="newsSelectGroup">
                    <label>Filter by</label>
                    <Select name="currency" value={currency}
                        onChange={(e)=>
                        handleposttocurrency(e.target.value)}
                        >
                          <MenuItem value="all">All Pairs</MenuItem>
                        {
                            arr && arr.length > 0 && arr.map((item, key) => {
                               // if (item.type == 'fiat') {
                                    return (
                                        <MenuItem value={item}>{item}</MenuItem>
                                    )
                              //  }
                            })
                        }
                    </Select>
                    {/* <Select name="currency" value={currency}
                        onChange={(e)=>
                        handleposttocurrency(e.target.value)}
                        >
                        {
                            currencyData && currencyData.length > 0 && currencyData.map((item, key) => {
                                if (item.type == 'fiat') {
                                    return (
                                        <MenuItem value={item.currencySymbol}>{item.currencySymbol}</MenuItem>
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
                <div className="newsSelectGroup">
                    <button className="btn btn-outline text-uppercase py-1 m-0" onClick={savePDF}>Download PDF</button>
                </div>
            </div>
            <ReactDatatable
                className="historyCryptoTable w-100"
                records={transData}
                columns={cryptoHistoryColumns}
                config={configdata}
               // onPageChange={pageChange()}
              />
           {/* <DataTable className="historyCryptoTable" columns={cryptoHistoryColumns}data={transData} noHeader /> */}
        </div>
    </>
  );
}
