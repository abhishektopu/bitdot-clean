import React, { useEffect } from "react";
// @material-ui/core components
import { Link } from "react-router-dom";
import Header from "components/Header/Header.js";
import Checkbox from 'rc-checkbox';
import HeaderLinksAfterlogin from "components/Header/HeaderLinksAfterlogin.js";


// import component
import TransactionHistory from '../components/TransactionHistory';

const dashboardRoutes = [];

function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}




const HistoryPage = (props) => {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
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
          <div className="dashboardContent userPages">
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;