import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';

// import action
import { setTradeTheme } from '../../actions/commonAction';

// import lib
import isLogin from '../../lib/isLogin';
import {
    getTradeTheme as getTradeThemeLocal,
    changeTradeTheme as changeTradeThemeLocal
} from '../../lib/localStorage';

const ConditionRoute = ({ component: Component, layout: Layout, auth, type, ...rest }) => {
    const dispatch = useDispatch();

    return (
        <Route
            {...rest}
            render={props => {

                // if (['/spot/:tikerRoot?'].includes(props.match.path)) {
                //     setTradeTheme(dispatch, getTradeThemeLocal())
                // } else {
                //     setTradeTheme(dispatch, 'light')
                // }


                if (type == 'auth' && isLogin() == true) {
                    return <Redirect to="/profile" />
                } else if (type == 'private' && isLogin() != true) {
                    return <Redirect to="/login" />
                }
                // if (Layout) {
                //     return (
                //         <Layout>
                //             <Component {...props} />
                //         </Layout>
                //     )
                // }

                return <Component {...props} />
            }}
        />
    )

};

export default ConditionRoute;