import React, { useEffect } from "react";
// @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

// import styles from "assets/jss/material-kit-react/views/loginPage.js";

// const useStyles = makeStyles(styles);
// function ScrollToTopOnMount() {
// useEffect(() => {
// window.scrollTo(0, 0);
// }, []);
// return null;
// }
export default function Terms(props) {
  // const classes = useStyles();
  // const { ...rest } = props;
  return (
    <div>
      <Header />
      <div className="static_container py-4"><div className="container">
        <h1 className="mb-4 heading-title text-center mb-4" data-aos="fade-up">Terms & Conditions</h1>
        <div className="row align-items-center mb-5">
          <div className="col-lg-12" data-aos="fade-right"> 
              <h5 className="mb-3">I. Our Terms</h5>
              <p className="mb-5">These BitDot Terms of Use is entered into between you (hereinafter referred to as “you” or “your”) and BitDot operators (as defined below). By accessing, downloading, using or clicking on “I agree” to accept any BitDot Services (as defined below) provided by BitDot (as defined below), you agree that you have read, understood and accepted all of the terms and conditions stipulated in these Terms of Use (hereinafter referred to as “these Terms”) as well as our Privacy Policy at   https://www.BitDot.com/en/privacy. In addition, when using some features of the Services, you may be subject to specific additional terms and conditions applicable to those features.</p>
              <p className="mb-5">By accessing, using or attempting to use BitDot Services in any capacity, you acknowledge that you accept and agree to be bound by these Terms. If you do not agree, do not access BitDot or utilize BitDot services.</p>
              <h5 className="mb-3">2. Definitions</h5>
              <p className="mb-5">1. BitDot refers to an ecosystem comprising BitDot websites (whose domain names include but are not limited to  https://www.BitDot.com), mobile applications, clients, applets and other applications that are developed to offer BitDot Services, and includes independently-operated platforms, websites and clients. </p>
              <p className="mb-5">2. BitDot Operators refer to all parties that run BitDot, including but not limited to legal persons, unincorporated organizations and teams that provide BitDot Services and are responsible for such services. For convenience, unless otherwise stated, references to “BitDot” and “we” in these Terms specifically mean BitDot .</p>
              <p>3. BitDot Services refer to various services provided to you by BitDot that are based on Internet and/or blockchain technologies and offered via BitDot websites, mobile applications, clients and other forms (including new ones enabled by future technological development). BitDot Services include but are not limited to such BitDot ecosystem components as Digital Asset Trading Platforms, the financing sector, BitDot Labs, BitDot Academy, BitDot Charity, BitDot Info, BitDot Launchpad, BitDot Research, BitDot Chain, BitDot X, BitDot Fiat Gateway, existing services offered by Trust Wallet and novel services to be provided by BitDot.</p>
          </div>
        </div>
      </div></div>
      <Footer />
    </div>
  );
}
