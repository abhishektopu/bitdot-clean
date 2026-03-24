import React, { useEffect } from "react";
// @material-ui/core components
import { Link } from "react-router-dom";
import Header from "components/Header/Header.js";

import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import component
import Staking from '../components/Staking';
import Announcement from '../components/Announcement';

const dashboardRoutes = [];

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

// Account Approval Table


export default function StakingPage(props) {


  const { ...rest } = props;

  return (
    <div className="dashboard_container page_wrap">

      <ScrollToTopOnMount />
      <div className="dashboardMain">
        <div className="dashboardRight afterLoginHeader">
          <Header className="header"
            color="transparent"
            routes={dashboardRoutes}
            brand={<img src={require("../assets/images/logo.png")} alt="logo" className="img-fluid" />}
            rightLinks={<HeaderLinksAfterlogin />}
            fixed
            changeColorOnScroll={{
              height: 20,
              color: "dark",
            }}
            {...rest}
          />
          <div className="dashboardContent userPages">
            <div className="container">
              <GridContainer>
                <GridItem xs={12} sm={12} md={5} lg={5}>
                  <h3 className="dash_title">Staking</h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={7} lg={7}>
                  <Announcement />
                </GridItem>
              </GridContainer>
              <Staking />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
