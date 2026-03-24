// import package
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Hidden, Button, Menu, MenuItem } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from "react-router-dom";

// import action
import { logout } from '../../actions/users';
import { setTradeTheme } from '../../actions/commonAction'


export default function HeaderLinks(props) {

  const history = useHistory();
  const dispatch = useDispatch();
  const routeMatch = useRouteMatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // redux state 
  const tradeThemeData = useSelector(state => state.tradeTheme)
  const { isAuth } = useSelector(state => state.auth);

  return (
    <div className="inner_page_menu">
      <div className="dashboard_login">
        <Hidden smDown>
          <ul className="list-iline">

            {/* {
              ['/spot/:tikerRoot?', '/derivative/:tikerRoot?'].includes(routeMatch.path) && <li>
                <div className="toggleMode" title="toggle dark mode">
                  <label>
                    <input type="checkbox" checked={tradeThemeData == 'light' ? true : false} name="" onClick={() => setTradeTheme(dispatch, tradeThemeData == 'light' ? 'dark' : 'light')} />
                    <span></span>
                  </label>
                </div>
              </li>
            } */}

            {
              !isAuth && <li className="">
                <Link to="/login" color="transparent" className="nav-link">Login</Link>
              </li>
            }

            {
              !isAuth && <li className="">
                <Link to="/register" color="transparent" className="nav-link home_menu_btn">Register</Link>
              </li>
            }

            {
              isAuth && <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            }

            {
              isAuth && <li>
                <Link to="/wallet">Wallet</Link>
              </li>
            }

            {/* {
              isAuth && <li>
                <Link to="/staking-list">Staking</Link>
              </li>
            } */}

            {/* {
              isAuth && <li>
                <span className="notify_count">4</span>
                <Button class="btn btnNotification" type="button" data-toggle="collapse" data-target="#notificationDropdown" aria-expanded="false" aria-controls="notificationDropdown">
                  <i className="fas fa-bell"></i>
                </Button>
                <div class="collapse" id="notificationDropdown">
                  <div className="notificationDropdown">
                    <ul>
                      <li>
                        <p>5 min ago</p>
                        <h5>Your last login 12-15-2021 15:15</h5>
                      </li>
                      <li>
                        <p>8 hrs ago</p>
                        <h5>You made a spot trade ETH/XRP, Limit Order 10.23569878 XRP</h5>
                      </li>
                      <li>
                        <p>14 hrs ago</p>
                        <h5>You made a Fiat Deposit, 150.00 USD, see status </h5>
                      </li>
                      <li>
                        <p>1 day ago</p>
                        <h5>You create a support ticket, ID #0003</h5>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            } */}

            {
              isAuth && <li>
                <Button aria-controls="profile_menu" aria-haspopup="true" onClick={handleClick}>
                  <i className="fas fa-user"></i>
                </Button>
                <Menu
                  id="profile_menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <Link to="/profile"><MenuItem>Profile</MenuItem></Link>
                  <Link to="/kyc"><MenuItem>KYC</MenuItem></Link>
                  <Link to="/settings"><MenuItem>Settings</MenuItem></Link>
                  <Link to="/history"><MenuItem>History</MenuItem></Link>
                  <Link to="/support"><MenuItem>Support</MenuItem></Link>

                  {/* <MenuItem><Link to="/kyc">KYC</Link></MenuItem>
                  <MenuItem><Link to="/settings">Settings</Link></MenuItem>
                  <MenuItem><Link to="/history">History</Link></MenuItem> */}
                  {/* <MenuItem><Link to="/support">Support</Link></MenuItem> */}
                  {/* <MenuItem><Link to="/api-management">API Management</Link></MenuItem> */}
                  <Link to="#" onClick={() => logout(history, dispatch)}> <MenuItem>Logout</MenuItem></Link>
                </Menu>
              </li>
            }

          </ul>
        </Hidden>
        <Hidden only={['md', 'lg', 'xl']}>
          <ul className="list-iline">
            <li>
              <Link to="/spot">Spot</Link>
            </li>
            {/* <li>
              <Link to="/derivative">Derivative</Link>
            </li> */}

            {
              !isAuth && <li className="">
                <Link to="/login" color="transparent" className="nav-link">Login</Link>
              </li>
            }

            {
              !isAuth && <li className="">
                <Link to="/register" color="transparent" className="nav-link home_menu_btn">Register</Link>
              </li>
            }

            {
              isAuth && <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            }

            {
              isAuth && <li>
                <Link to="/wallet">Wallet</Link>
              </li>
            }

            {
              isAuth && <li>
                <Link to="/settings">Staking</Link>
              </li>
            }

            {/* {
              isAuth && <li>
                <Link to="#">Notifications</Link>
              </li>
            } */}

            {
              isAuth && <li>
                <Link to="/profile">Profile</Link>
              </li>
            }

            {
              isAuth && <li>
                <Link to="/kyc">KYC</Link>
              </li>
            }

            {
              isAuth && <li>
                <Link to="/settings">Settings</Link>
              </li>
            }

            {
              isAuth && <li>
                <Link to="/history">History</Link>
              </li>
            }

            {
              isAuth && <li>
                <Link to="/support">Support</Link>
              </li>
            }


            {
              isAuth && <li>
                <Link to="/api-management">API Management</Link>
              </li>
            }

            {
              isAuth && <li>
                <Link to="#" onClick={() => logout(history, dispatch)}>Logout</Link>
              </li>
            }

          </ul>
        </Hidden>
      </div>
    </div>
  );
}
