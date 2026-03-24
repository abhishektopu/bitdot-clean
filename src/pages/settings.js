import React, { useEffect } from "react";
// @material-ui/core components
import Header from "components/Header/Header.js";
import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import ChangePassword from '../components/ChangePassword';
import TwoFA from '../components/TwoFA';
import GeneralSetting from '../components/GeneralSetting';
import Announcement from '../components/Announcement';

const dashboardRoutes = [];

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

const SettingPage = (props) => {

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
            {...rest} />
          <div className="settingsContent userPages">
            <div className="container">
              <GridContainer>
                <GridItem xs={12} sm={12} md={5} lg={5}>
                  <h3 className="dash_title">Security Settings</h3>
                </GridItem>
                <Announcement />

                {/* <GridItem xs={12} sm={12} md={7} lg={7}>
                  <ul className="profile_dash">
                    <li>New trade pair XRP/BNB will add for trade on next 48 hrs - <span>Admin Announcement</span></li>
                    <li>13-05-2021  15:15, Chrome, 182.254.127  - <span>Last login</span></li>
                  </ul>
                </GridItem> */}
              </GridContainer>
              <div className="dashboard_box">
                <TwoFA />
                <ChangePassword />
              </div>
              <GeneralSetting />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingPage;