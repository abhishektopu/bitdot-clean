/*eslint-disable*/
import React from "react";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(styles);

export default function DashHeader(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const [anchorE2, setAnchorE2] = React.useState(null);
  const handleClick1 = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorE2(null);
  };

  const [anchorE3, setAnchorE3] = React.useState(null);
  const handleClick2 = (event) => {
    setAnchorE3(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorE3(null);
  };
  return (
    <div className="dashRightLinks dashbaord_cont px-4"  data-aos="fade-Up">
      <div>
      <Link to=""><img alt="" src={require("../../assets/images/logo.jpeg")}/></Link>
      <button className="btn btn-outline mr-3 ml-4 d-none d-md-inline">Spot</button>
      {/* <button className="btn btn-outline d-none d-md-inline">Derivative</button> */}
      </div>
      <div className="dashheader_right">
        <div class="d-block d-md-none">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick2} className="">
              <MenuIcon />
            </Button>
            <Menu
              id="simple-menu" className="menu"
              anchorEl={anchorE3}
              keepMounted
              open={Boolean(anchorE3)}
              onClose={handleClose2}
            >
              <MenuItem onClick={handleClose2}><li><Link to="">Spot</Link></li></MenuItem>
              <MenuItem onClick={handleClose2}><li><Link to="">Deriative</Link></li></MenuItem>
              <MenuItem onClick={handleClose2}><li><Link to="">Dashboard</Link></li></MenuItem>
              <MenuItem onClick={handleClose2}><li><Link to="">Wallet</Link></li></MenuItem>
              <MenuItem onClick={handleClose2}><li><Link to="">Staking</Link></li></MenuItem>
            </Menu>
        </div>
        <div className="dashboard_login">
          <ul className="list-iline mb-0 d-md-flex d-none">
            <li>
              <Link to="">Dashboard</Link>
            </li>
            <li>
              <Link to="">Wallet</Link>
            </li>
            <li>
              <Link to="">Staking</Link>
            </li>
            <li>
              <span className="notify_count">4</span>
              <Button aria-controls="notification_dropdown" aria-haspopup="true" onClick={handleClick1}>
                <i className="fas fa-bell"></i>
              </Button>
              <Menu
                id="notification_dropdown"
                anchorEl={anchorE2}
                keepMounted
                open={Boolean(anchorE2)}
                onClose={handleClose1}>
                <MenuItem onClick={handleClose1}>BTC/USD</MenuItem>
                <MenuItem onClick={handleClose1}>BTC/USD</MenuItem>
                <MenuItem onClick={handleClose1}>BTC/USD</MenuItem>
              </Menu>
            </li>
            <li>
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
