/*eslint-disable*/
import React from "react";
import { Link, useHistory  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Hidden } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { logout } from '../../actions/users';

const useStyles = makeStyles(styles);

const HeaderLinks = () => {
  const classes = useStyles();
  const routeMatch = useRouteMatch();
  // redux-state
  const { isAuth } = useSelector(state => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="home_page_menu">
      <List className={classes.list + " menu_main_navbar"}>
        <ListItem className={classes.listItem}>
          <Link to="/faq" color="transparent" className="nav-link">FAQ</Link>
        </ListItem>
        <Hidden mdUp>
          <ListItem className={classes.listItem}>
            <Link to="#" color="transparent" className="nav-link">Market</Link>
          </ListItem>         
          <ListItem className={classes.listItem}>
            <Link to={routeMatch.path === "/spot/:tikerRoot?" ? routeMatch.url : "/spot"} color="transparent" className="nav-link">Spot</Link>
          </ListItem>
        </Hidden>

        {
          isAuth && <ListItem className={classes.listItem}>
            <Link to="/wallet" color="transparent" className="nav-link">Wallet</Link>
          </ListItem>
        }

        {
          !isAuth && <ListItem className={classes.listItem}>
            <Link to="/login" color="transparent" className="nav-link login_btn">Login</Link>
          </ListItem>
        }

        {
          !isAuth && <ListItem className={classes.listItem}>
            <Link to="/register" color="transparent" className="nav-link home_menu_btn">Create an Account</Link>
          </ListItem>
        }
        {
          isAuth && <li>
            <Link to="#" onClick={() => logout(history, dispatch)}>Logout</Link>
          </li>
        }  

      </List>
    </div>
  );
}

export default HeaderLinks;