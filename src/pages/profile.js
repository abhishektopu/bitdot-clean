import React, { useEffect } from "react";


// @material-ui/core components
import Header from "components/Header/Header.js";
import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import ProfileDetail from '../components/ProfileDetail';
import BankAccount from '../components/BankAccount';
import Announcement from '../components/Announcement';
import EmailChange from '../components/EmailChange';
import PhoneNoChange from '../components/PhoneNoChange';
import PhoneNoModal from '../components/PhoneNoChange/PhoneNoModal'

const dashboardRoutes = [];

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}
export default function Profile(props) {

  const { ...rest } = props;


  return (
    <div className="dashboard_container page_wrap">
      <ScrollToTopOnMount />
      <EmailChange />
      <PhoneNoModal />

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
          <div className="profileContent userPages">
            <div className="container">
              <GridContainer>
                <GridItem xs={12} sm={12} md={5} lg={5}>
                  <h3 className="dash_title">Profile Details</h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={7} lg={7}>
                  <Announcement />
                </GridItem>
              </GridContainer>

              <ProfileDetail />

              <div className="row align-items-center">
                <div className="col-lg-12">
                  <h3 className="dash_title mb-3">Mobile Phone Verification</h3>
                </div>
              </div>
              <PhoneNoChange
                callFrom={'profile'}
              />
              <div className="row align-items-center">
                <div className="col-lg-12">
                  <h3 className="dash_title mb-3">Bank Account Details</h3>
                </div>
              </div>
              <BankAccount />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
