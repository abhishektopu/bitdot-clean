import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import { ExpandMore } from "@material-ui/icons";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import styles from "assets/jss/material-kit-react/views/loginPage.js";

// import component
import LoginForm from '../components/LoginForm';

const useStyles = makeStyles(styles);
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}
const dashboardRoutes = [];
export default function Login(props) {
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const { ...rest } = props;

  return (
    <div className="page_wrap">
      <ScrollToTopOnMount />
      <Header className="header"
        color="transparent"
        routes={dashboardRoutes}
        brand={<img src={require("../assets/images/logo.png")} alt="logo" className="img-fluid" />}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 20,
          color: "dark",
        }}
        {...rest} />
      <div className="login_container">
        <h2 className="text-center mb-md-4 pb-3" data-aos="fade-up">Sign in to BitDot</h2>
        <div className="row w-100">
          <div className="col-lg-4 col-md-6 m-auto">
            <LoginForm />
            <p className="text-center"><Link to="/privacy-policy">Privacy Policy</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}
