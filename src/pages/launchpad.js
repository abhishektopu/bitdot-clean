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

// Countdown Timer
import Countdown, { zeroPad } from "react-countdown";

const useStyles = makeStyles(styles);
const dashboardRoutes = [];


// Scroll to Top
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

// Token Countdown Timer
const currentDate = new Date();
const year = (currentDate.getMonth() === 11 && currentDate.getDate() > 23) ? currentDate.getFullYear() + 1 : currentDate.getFullYear();

const renderer = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="timer_panel">
      <span><span className="timer_time">{zeroPad(days)}</span><span className="timer_label">Days</span></span>
      <span className="timer_dots">:</span>
      <span><span className="timer_time">{zeroPad(hours)}</span><span className="timer_label">Hours</span></span>
      <span className="timer_dots">:</span>
      <span><span className="timer_time">{zeroPad(minutes)}</span><span className="timer_label">Mins</span></span>
      <span className="timer_dots">:</span>
      <span><span className="timer_time">{zeroPad(seconds)}</span><span className="timer_label">Secs</span></span>
    </div>
  );
};

export default function Launchpad(props) {

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
       
            <div className="container">
              <GridContainer>
                <GridItem xs={12} sm={12} md={5} lg={5}>
                  <h3 className="dash_title">Launchpad</h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={7} lg={7}>
                  <ul className="profile_dash">
                    <li>New trade pair XRP/BNB will add for trade on next 48 hrs - <span>Admin Announcement</span></li>
                    <li>13-05-2021  15:15, Chrome, 182.254.127  - <span>Last login</span></li>
                  </ul>
                </GridItem>
              </GridContainer>
            </div>
         
          
          <div className="inner_content_wrapper">
            <div className="container">
              <div class="dashboard_box">
              <GridContainer>
                <GridItem lg={12}>
                  <div className="copy_trading_top_panel">
                    <ul class="nav nav-pills" id="pills-tab" role="tablist">
                      <li class="nav-item" role="presentation">
                        <a class="nav-link active" id="active_tokens-tab" data-toggle="pill" href="#active_tokens" role="tab" aria-controls="pills-active_tokens" aria-selected="true">Active Tokens  - <span>6</span></a>
                      </li>
                      <li class="nav-item" role="presentation">
                        <a class="nav-link" id="pills-completed_tokens" data-toggle="pill" href="#completed_tokens" role="tab" aria-controls="pills-completed_tokens" aria-selected="false">Completed Tokens -  <span>12</span></a>
                      </li>                      
                    </ul>
                    <div className="contact_form">
                    <div class="input-group">                  
                      <input type="text" class="form-control" placeholder="Search" aria-label="search" aria-describedby="basic-addon1"/>
                      <div class="input-group-append">
                        <span class="btn btnType1 py-0 my-0 px-2" id="basic-addon1"><i class="bi bi-search"></i></span>
                      </div>
                    </div>   
                    </div>           
                  </div>


                  <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="active_tokens" role="tabpanel" aria-labelledby="active_tokens-tab">
                      <div className="launchpad_token_panel">
                        <GridContainer>
                          <GridItem md={4} sm={6}>
                            <div className="launchpad_token_single wow fadeInUp">
                              <img src={require("../assets/images/launchpad_token_01.png")} alt="Banner" className="img-fluid"/>
                              <h4 className="text-center">KS Coin</h4>
                              <h6 className="text-center">Gaming | Stage 1</h6>
                              <Countdown date={`${year}-12-31T12:00:00`} renderer={renderer} />
                              <hr/>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>Available Currency</p>
                                <p>BTC, ETH, USDT</p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>Session Supply</p>
                                <p>300,000,000</p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>Start</p>
                                <p>04-03-2021  15:15</p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>End</p>
                                <p>31-04-2021  15:15</p>
                              </div>
                              <div className="text-center mb-4 mt-4">
                                <Button className="btn btn-primary">View</Button>
                              </div>
                            </div>
                          </GridItem>

                          <GridItem md={4} sm={6}>
                            <div className="launchpad_token_single wow fadeInUp">
                              <img src={require("../assets/images/launchpad_token_02.png")} alt="Banner" className="img-fluid"/>
                              <h4 className="text-center">Seven Chain</h4>
                              <h6 className="text-center">Gaming | Stage 1</h6>
                              <Countdown date={`${year}-12-31T12:00:00`} renderer={renderer} />
                              <hr/>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>Available Currency</p>
                                <p>BTC, ETH, USDT</p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>Session Supply</p>
                                <p>300,000,000</p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>Start</p>
                                <p>04-03-2021  15:15</p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>End</p>
                                <p>31-04-2021  15:15</p>
                              </div>
                              <div className="text-center mb-4 mt-4">
                                <Button className="btn btn-primary">View</Button>
                              </div>
                            </div>
                          </GridItem>

                          <GridItem md={4} sm={6}>
                            <div className="launchpad_token_single wow fadeInUp">
                              <img src={require("../assets/images/launchpad_token_01.png")} alt="Banner" className="img-fluid"/>
                              <h4 className="text-center">KS Coin</h4>
                              <h6 className="text-center">Gaming | Stage 1</h6>
                              <Countdown date={`${year}-12-31T12:00:00`} renderer={renderer} />
                              <hr/>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>Available Currency</p>
                                <p>BTC, ETH, USDT</p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>Session Supply</p>
                                <p>300,000,000</p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>Start</p>
                                <p>04-03-2021  15:15</p>
                              </div>
                              <div className="d-flex justify-content-between align-items-center">
                                <p>End</p>
                                <p>31-04-2021  15:15</p>
                              </div>
                              <div className="text-center mb-4 mt-4">
                                <Button className="btn btn-primary">View</Button>
                              </div>
                            </div>
                          </GridItem>
                        </GridContainer>
                      </div>

                      <div className="text-center mt-3">
                        <Button className="btn btn-primary px-4">View more</Button>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="completed_tokens" role="tabpanel" aria-labelledby="completed_tokens-tab">Completed Tokens</div>                    
                  </div>
                </GridItem>
              </GridContainer>

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
