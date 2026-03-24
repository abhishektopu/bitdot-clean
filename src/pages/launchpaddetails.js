import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import { Button } from "@material-ui/core";
import Header from "components/Header/Header.js";

import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles(styles);
const dashboardRoutes = [];


// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function LaunchpadDetails(props) {

  const { ...rest } = props;
  const classes = useStyles();
  return (
    <div className="dashboard_container page_wrap">
      <ScrollToTopOnMount />
      <div className="dashboardMain">
        <div className="dashboardRight afterLoginHeader">
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand={<img src={require("../assets/images/logo.png")} alt="logo" />}
        rightLinks={<HeaderLinksAfterlogin />}
        fixed
        changeColorOnScroll={{
          height: 50,
          color: "dark",
        }}
        {...rest}
      />
      <div className="settingsContent userPages">
      <div className="inner_wrapper">
        <div className="inner_pageheader container-fluid px-0">          
          <div className="inner_content_wrapper">
           
             
                 
                    <div className="container">
                      <GridContainer>
                        <GridItem xs={12} sm={12} md={5} lg={5}>
                          <div className="launchpadCoinName">
                          <img src={require("../assets/images/launchpadIcon.png")} className="img-fluid" />
                          <h3>KS Coin <small>Blockchain Platform</small></h3>
                        </div>
                        </GridItem>
                        <GridItem xs={12} sm={12} md={7} lg={7}>
                          <ul className="profile_dash">
                            <li>New trade pair XRP/BNB will add for trade on next 48 hrs - <span>Admin Announcement</span></li>
                            <li>13-05-2021  15:15, Chrome, 182.254.127  - <span>Last login</span></li>
                          </ul>
                        </GridItem>
                      </GridContainer>
                    
                
                  <div className="whiteBoxLaunchpad dashboard_box">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="projectIntroduction">
                          <h3>Project Introduction</h3>
                          <ul>
                            <li><span>Name</span> KS Coin</li>
                            <li><span>Industry</span> Development Company</li>
                            <li><span>Website</span> www.ico-token-site-name.com</li>
                          </ul>
                          <p><strong className="text-dark">KS Coin</strong> - an IEO (Initial Exchange Offering) to be launched in the month of January 2021. It is being developed to be used for entrepreneurs, small businesses, and start-ups for utility purposes. Developed for three main objectives:</p>
                          <p>1) To provide the utmost security for investments made with MTR.</p>
                          <p>2) To drive & generate profit from our unique projects that have the capability of establishing a name in the market.</p>
                          <p>3) To ensure zero market manipulation or third party intervention in any manner and achieve optimal customer satisfaction.TRC20 the most stable & secure source of blockchain technology.</p>
                          <h3>Token Details</h3>
                          <ul>
                            <li><span>Name</span> KS Coin</li>
                            <li><span>Symbol</span> KSC</li>
                            <li><span>Token Sale Start Date</span> 31-12-2020 15:15</li>
                            <li><span>Token Launch Price</span> 1 YEN(0.02548 USD)</li>
                            <li><span>Minimim Purchase Amount</span> 500 KSC</li>
                            <li><span>Accepted Currencies</span> BTC,ETH,USDT</li>
                            <li><span>Discount</span> 0%</li>
                            <li><span>Token Available to Sale</span> 30%</li>
                            <li><span>Token Max Supply</span> KSC</li>
                          </ul>
                          <h3>Documents</h3>
                          <p className="project_docs"><a href="#" className="active">Whitepaper</a><a href="#">Presentation</a><a href="#">Executive Summary</a></p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="whiteShadowBox contact_form">
                          <ul className="choose_coin_list">
                            <li><a href="#" className="active">BTC</a></li>
                            <li><a href="#">ETH</a></li>
                            <li><a href="#">USDT</a></li>
                          </ul>
                          <div className="form-group">
                            <label>Price</label>
                            <div className="input-group mb-3">
                              <input type="text" className="form-control" placeholder="0.00" />
                              <div className="input-group-append"> <span className="input-group-text">BTC</span></div>
                            </div>
                            <div className="btnGroupPercent">
                              <Button className="btn btn-primary mb-2">25%</Button>
                              <Button className="btn btn-primary mb-2">50%</Button>
                              <Button className="btn btn-primary mb-2">75%</Button>
                              <Button className="btn btn-primary mb-2">100%</Button>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Amount</label>
                            <div className="input-group mb-3">
                              <input type="text" className="form-control" placeholder="0.00"/>
                              <div className="input-group-append"> <span className="input-group-text">KSC</span></div>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Total</label>
                            <div className="input-group">
                              <input type="text" className="form-control" placeholder="0.00" />
                              <div className="input-group-append"> <span className="input-group-text">BTC</span></div>
                            </div>
                          </div>
                          <div className="form-group">
                              <div className="custom-control custom-checkbox pl-0">
                                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                <label className="custom-control-label" for="customCheck1"><span className="ml-4">I am not a citizen and/or resident of FATF blacklist countries and/or countries not recognized by the Estonia/EU.</span></label>
                              </div>
                          </div>
                        <div className="text-center">
                          <Button className="btn btn-primary mr-3 mb-3 px-4">Buy KSC</Button>
                          <Button className="btn btn-primary mb-3 px-4">Complete KYC</Button>
                        </div>
                        </div>
                        <div className="whiteShadowBox">
                          <h3>My Trades</h3>
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th>Date</th>
                                  <th>Price</th>
                                  <th>Quantity</th>
                                  <th>Total Amount</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td colspan="4" className="text-center">No Trades Found!</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                        <div className="socialMediaCoinDetails">
                          <h3>Social Media</h3>
                          <ul>
                            <li><a href=""><i className="fab fa-telegram-plane"></i></a></li>
                            <li><a href=""><i className="fab fa-twitter"></i></a></li>
                            <li><a href=""><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href=""><i className="fab fa-youtube"></i></a></li>
                            <li><a href=""><i className="fab fa-linkedin-in"></i></a></li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="cdTeamDetail">
                          <h3>Team</h3>
                          <ul>
                            <li>
                              <div className="cdTeamProfilePic">
                                <img src={require("../assets/images/teamMemberPic.jpg")} className="img-fluid" />
                              </div>
                              <div className="cdTeamProfileDetail">
                                <h6>Brijesh Gadiali</h6>
                                <p>CEO</p>
                                <p><a href="#"><i className="fab fa-linkedin-in"></i></a></p>
                              </div>
                            </li>
                            <li>
                              <div className="cdTeamProfilePic">
                                <img src={require("../assets/images/teamMemberPic.jpg")} className="img-fluid" />
                              </div>
                              <div className="cdTeamProfileDetail">
                                <h6>Brijesh Gadiali</h6>
                                <p>CEO</p>
                                <p><a href="#"><i className="fab fa-linkedin-in"></i></a></p>
                              </div>
                            </li>
                            <li>
                              <div className="cdTeamProfilePic">
                                <img src={require("../assets/images/teamMemberPic.jpg")} className="img-fluid" />
                              </div>
                              <div className="cdTeamProfileDetail">
                                <h6>Brijesh Gadiali</h6>
                                <p>CEO</p>
                                <p><a href="#"><i className="fab fa-linkedin-in"></i></a></p>
                              </div>
                            </li>
                            <li>
                              <div className="cdTeamProfilePic">
                                <img src={require("../assets/images/teamMemberPic.jpg")} className="img-fluid" />
                              </div>
                              <div className="cdTeamProfileDetail">
                                <h6>Brijesh Gadiali</h6>
                                <p>CEO</p>
                                <p><a href="#"><i className="fab fa-linkedin-in"></i></a></p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>                  
               

           </div>
          </div>
        </div>
      </div>
    </div>
      </div>      
 </div>  
    </div>
  );
}
