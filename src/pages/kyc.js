import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import IDProof from '../components/IDProof';
import AddressProof from '../components/AddressProof';
import UserKycDetail from '../components/UserKycDetail';
import UpgradeProfile from '../components/UpgradeProfile';
import Header from "components/Header/Header.js";
import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import component
// import IDProof from '../components/IDProof';
// import AddressProof from '../components/AddressProof';
// import UserKycDetail from '../components/UserKycDetail';
// import UpgradeProfile from '../components/UpgradeProfile';
// import Header from "components/Header/Header.js";
// import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
import Announcement from '../components/Announcement';
import EditProfile from '../components/EditProfile';
import PhoneNoChange from '../components/PhoneNoChange'
import KycSubmitBtn from '../components/KycSubmitBtn'

// import action
import { getKycDetail } from '../actions/userKyc'

const dashboardRoutes = [];

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

export default function Kyc(props) {
  const { ...rest } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    getKycDetail(dispatch)
  }, [])

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
                  <h3 className="dash_title">Identity Verification</h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={7} lg={7}>
                  <Announcement />
                </GridItem>
              </GridContainer>
              <UserKycDetail />
              <UpgradeProfile />




              <div className="row align-items-center">
                <div className="col-lg-12">
                  <h3 className="dash_title mb-3">1. Personal Detail </h3>
                </div>
              </div>
              <div className="dashboard_box">
                <div className="profileDetailView">
                  <div class="alert alert-info" role="alert">
                    Your personal details should be introduced strictly as indicated in your official Identification Document and your Proof of Address.
                  </div>
                </div>
                <EditProfile
                  callFrom={'kyc'}
                  formDisable={false}
                  formName={"kyc"}
                />
              </div>


              {/* <div className="row align-items-center">
                <div className="col-lg-12">
                  <h3 className="dash_title mb-3">2. Mobile Phone Verification</h3>
                </div>
              </div> */}
              {/* <PhoneNoChange
                callFrom={'kyc'}
              /> */}

              <IDProof />
              <AddressProof />
              <KycSubmitBtn />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
