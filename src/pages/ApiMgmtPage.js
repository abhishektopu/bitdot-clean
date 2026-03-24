import React, { useEffect } from "react";

// import component
import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import ApiManagement from '../components/ApiManagement';
const dashboardRoutes = [];

function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    return null;
  }


const ApiMgmtPage = () => {
    return (
        <div className="dashboard_container page_wrap">
            <ScrollToTopOnMount />
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
            />

            {/* <Header className="header"
                color="transparent"
                // routes={dashboardRoutes}
                brand={<img src={require("../assets/images/logo.png")} alt="logo" className="img-fluid" />}
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 20,
                    color: "dark",
                }}
            /> */}
            <div className="profileContent userPages">
                <div className="static_container">
                    <ApiManagement />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ApiMgmtPage