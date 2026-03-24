import React, { useEffect } from "react";

// import component
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import ResetPassword from '../components/ResetPassword';

function ScrollToTopOnMount() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
}
const dashboardRoutes = [];

const ResetPasswordPage = (props) => {
    const { ...rest } = props;

    return (
        <div className="page_wrap">
            <ScrollToTopOnMount />
            <ResetPassword />
        </div>
    );
}

export default ResetPasswordPage;