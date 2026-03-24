// import package
import React, { useEffect } from "react";
import { Switch, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { I18nextProvider } from 'react-i18next';

// import component
import ConditionRoute from './components/Route/ConditionRoute';
import i18n from './components/i18next/i18n';
import HelperRoute from './components/Route/HelperRoute';

// import Context
import SocketContext from './components/Context/SocketContext'

// pages for this product
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Register from "pages/register.js";
import ForgotPassword from "pages/forgot-password.js";
import EmailVerification from './pages/EmailVerification';
import ProfilePage from './pages/profile';
import SettingPage from './pages/settings';
import Kyc from './pages/kyc';
import DashboardPage from './pages/DashboardPage';
import WalletPage from './pages/WalletPage';
import Staking from './pages/staking';
import Spot from './pages/spot';
import Derivative from './pages/derivative';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AboutUsPage from './pages/AboutUsPage';
import FaqPage from './pages/FaqPage';
import PressPage from './pages/PressPage';
import InvestorsPage from './pages/InvestorsPage';
import TermsPage from './pages/TermsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ApiMgmtPage from './pages/ApiMgmtPage'
import ContactUs from './pages/ContactUs';
 // import CMS Page
import BusinessPage from './pages/cms/BusinessPage';
import TokenListPage from './pages/cms/TokenListPage';
import ApiPage from './pages/cms/ApiPage';
import FeesPage from './pages/cms/FeesPage';
import SecurityPage from './pages/cms/SecurityPage';
import StakingPage from './pages/cms/StakingPage';



import ChartPage from './pages/chart'


import HistoryPage from './pages/HistoryPage';
import SupportPage from './pages/SupportPage';
import Launchpad from "./pages/launchpad.js";
import LaunchpadDetails from "./pages/launchpaddetails.js";

// import action
import { decodeJwt } from './actions/jsonWebToken';
import { getBankDetail } from './actions/users';

// import config
import { socket } from './config/socketConnectivity';

// import lib
import store from './store';
import isLogin from './lib/isLogin';
import { getAuthToken } from './lib/localStorage';


const App = () => {
    const { isAuth } = store.getState().auth;

    useEffect(() => {
        if (isAuth != true && isLogin()) {
            decodeJwt(getAuthToken(), store.dispatch)
        }
    }, [])

    return (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>
                <BrowserRouter basename="/">
                    <SocketContext.Provider value={{ socket }}>
                        <ToastContainer />
                        <HelperRoute />
                        <Switch>
                            <ConditionRoute exact path='/' component={HomePage} type={"public"} />
                            <ConditionRoute exact path='/home' component={HomePage} type={"public"} />
                            <ConditionRoute exact path='/staking-list' component={Staking} type={"public"} />
                            <ConditionRoute exact path="/launchpaddetails" component={LaunchpadDetails} type={"public"} />
                            <ConditionRoute exact path="/launchpad" component={Launchpad} type={"public"} />
                            <ConditionRoute exact path='/history' component={HistoryPage} type={"public"} />
                            <ConditionRoute exact path='/support' component={SupportPage} type={"public"} />
                            <ConditionRoute exact path='/login' component={LoginPage} type={"auth"} />
                            <ConditionRoute exact path='/register' component={Register} type={"auth"} />
                            <ConditionRoute exact path='/recover-password' component={ForgotPassword} type={"auth"} />
                            <ConditionRoute exact path='/reset-password/:authToken' component={ResetPasswordPage} type={"auth"} />


                            {/* PRIVATE */}

                            <ConditionRoute exact path='/profile' component={ProfilePage} type={"private"} />
                            <ConditionRoute exact path='/settings' component={SettingPage} type={"private"} />
                            <ConditionRoute exact path='/dashboard' component={DashboardPage} type={"private"} />
                            <ConditionRoute exact path='/wallet' component={WalletPage} type={"private"} />
                            <ConditionRoute exact path='/kyc' component={Kyc} type={"private"} />
                            <ConditionRoute exact path='/api-management' component={ApiMgmtPage} type={"private"} />
                            

                            {/* PRIVATE */}


                            {/* PUBLIC */}
                            <ConditionRoute exact path='/spot/:tikerRoot?' component={Spot} type={"public"} />
                            <ConditionRoute exact path='/derivative/:tikerRoot?' component={Derivative} type={"public"} />
                            <ConditionRoute exact path='/chart' component={ChartPage} type={"public"} />

                            {/* CMS Page */}
                            <ConditionRoute exact path='/contactus' component={ContactUs} type={"public"} />
                            <ConditionRoute exact path='/about' component={AboutUsPage} type={"public"} />
                            <ConditionRoute exact path='/faq' component={FaqPage} type={"public"} />
                            <ConditionRoute exact path='/press' component={PressPage} type={"public"} />
                            <ConditionRoute exact path='/investors' component={InvestorsPage} type={"public"} />
                            <ConditionRoute exact path='/terms' component={TermsPage} type={"public"} />
                            <ConditionRoute exact path='/privacy-policy' component={PrivacyPolicyPage} type={"public"} />
                            <ConditionRoute exact path='/business' component={BusinessPage} type={"public"} />
                            <ConditionRoute exact path='/listing' component={TokenListPage} type={"public"} />
                            <ConditionRoute exact path='/api' component={ApiPage} type={"public"} />
                            <ConditionRoute exact path='/fees' component={FeesPage} type={"public"} />
                            <ConditionRoute exact path='/security' component={SecurityPage} type={"public"} />
                            <ConditionRoute exact path='/staking' component={StakingPage} type={"public"} />
                            {/* CMS Page */}


                            <ConditionRoute exact path='/email-verification/:authToken' component={EmailVerification} type={"public"} />
                            <ConditionRoute exact path='/verify-old-email/:authToken' component={EmailVerification} type={"public"} />
                            <ConditionRoute exact path='/verify-new-email/:authToken' component={EmailVerification} type={"public"} />
                            <ConditionRoute exact path='/withdraw-fiat-verification/:authToken' component={EmailVerification} type={"public"} />
                            <ConditionRoute exact path='/withdraw-coin-verification/:authToken' component={EmailVerification} type={"public"} />
                            {/* PUBLIC */}

                            {/* <Route exact path="/*" component={Home}>
                    <Redirect to="/home" />
                </Route> */}
                        </Switch>
                    </SocketContext.Provider>
                </BrowserRouter>
<a 
  href="https://wa.me/917899358934" 
  target="_blank" 
  rel="noopener noreferrer"
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#25D366",
    color: "white",
    padding: "12px 16px",
    borderRadius: "50px",
    fontSize: "16px",
    textDecoration: "none",
    boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
    zIndex: 999
  }}
>
  💬 WhatsApp
</a>
                         
          </I18nextProvider>

                         
                         </Provider>
    )
}

export default App;
