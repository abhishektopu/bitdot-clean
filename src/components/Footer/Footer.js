/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { addNewsLetter } from '../../actions/users'
import { toastAlert } from '../../lib/toastAlert';

import styles from "assets/jss/material-kit-react/components/footerStyle.js";

// import action
import { getLanguage } from '../../actions/commonAction';

// import lib
import { capitalize } from '../../lib/stringCase';
import { setLang, getLang } from '../../lib/localStorage';
import isEmpty from "../../lib/isEmpty";

const useStyles = makeStyles(styles);
const initialFormValue = {
  'email':''
}
export default function Footer(props) {
  const classes = useStyles();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });

  // state
  const [langOption, setLangOption] = useState([])
  const [language, setLanguage] = useState('')

  // redux-state
  const { isAuth } = useSelector(state => state.auth);
  const [ formValue, setFormvalue ] = useState(initialFormValue);
  const [ validationErr, setValidationErr ] = useState({});
  const { email } = formValue;
  
  
  const handleChange = (e) => {
     const { id, value } = e.target
     const formData = {...formValue,...{ [id] : value } }
     setFormvalue(formData)
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { status, message, error } = await addNewsLetter({email})

    if(status){
      toastAlert('success',message,'addNewsLetter')
      setFormvalue(initialFormValue)
      setValidationErr({})
    }else{
      setValidationErr(error)
    }
    
  }
  // function
  const handleLanguage = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLanguage(value)
    setLang(value)
    i18n.changeLanguage(value);
  }

  const fetchLanguage = async () => {
    try {
      const { status, loading, result } = await getLanguage(dispatch);
      if (status == 'success') {
        setLangOption(result);
        let lang = getLang();
        if (isEmpty(lang)) {
          let primaryData = result && result.length > 0 && result.find((el => el.isPrimary == true))
          if (primaryData) {
            setLanguage(primaryData.code)
            setLang(primaryData.code)
            i18n.changeLanguage(primaryData.code);
          }
        } else {
          setLanguage(lang)
        }
      }
    } catch (err) { }
  }

  useEffect(() => {
    fetchLanguage();
  }, [])

  return (
    <footer className="pt-4">
      <div className="container">
        <div className="row pb-lg-3">
          <div className="col-sm-4 col-md-3">
            <img src={require("../../assets/images/logo_footer.png")} alt="Icon" className="img-fluid" />
          </div>
          <div className="col-sm-4 col-md-2">
            <h5>About</h5>
            <ul className="list-inline">
              <li><Link to="/spot">Spot  Trade</Link></li>              
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/fees">Fees</Link></li>  
              <li><Link to="/contactus">Contactus</Link></li>              
           
            </ul>
          </div>
          <div className="col-sm-4 col-md-2">
            <h5>Support</h5>
            <ul className="list-inline">
              {/* <li><Link onClick={() => {
                  if (isAuth) {
                    history.push('/support')
                  } else {
                    history.push('/login')
                  }
                }}>Support</Link>
              </li> */}
              {/* <li><Link to="/support">Support</Link></li> */}
              <li><Link to="/faq">FAQ</Link></li>              
            </ul>
          </div>
          {/* <div className="col-sm-12 col-md-5">
            <label className="subscribe_label">Get the latest news and updates</label>
            <div className="subscribe_form">
              <input type="email" placeholder="Enter your email address" className="subscribe_inp" />
              <Button className="subscribe_btn">Submit</Button>
            </div>            
          </div> */}
          <div className="col-sm-12 col-md-5">
              <label className="subscribe_label">Get the latest news and updates</label>
              <div className="subscribe_form">
                <input type="text"
                  id="email"
                  onChange={handleChange} 
                  value={email}
                  placeholder="Enter your email address" 
                  className="subscribe_inp" 
                />
                <span className="text-danger">{ validationErr && validationErr.email }</span>
                <Button className="subscribe_btn" onClick={handleFormSubmit} >Submit</Button>
              </div>
              {/* <div className="footer_social_links">
                <ul>
                  <li><a href={key.SOCIAL_MEDIA.TELEGRAM_URL} target="_blank"><i class="fab fa-telegram-plane"></i></a></li>
                  <li><a href={key.SOCIAL_MEDIA.TWITTER_URL} target="_blank"><i className="fab fa-twitter"></i></a></li>
                  <li><a href={key.SOCIAL_MEDIA.FACEBOOK_URL} target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href={key.SOCIAL_MEDIA.WHATSAPP_URL} target="_blank"><i class="fab fa-whatsapp"></i></a></li>                  
                </ul>
              </div> */}
              </div>
        </div>
        <div className="footer_mid">
          <div className="footer_mid_left">
            <h5>Contact</h5>
            <p className="mb-0"><a href="mailto:info@bitdot.com">info@bitdot.com</a></p>
            <p className="mb-0"><a href="mailto:support@bitdot.com">support@bitdot.com</a></p>
          </div>
          <div className="footer_mid_right">
            <h5>Connect with us</h5>
            <ul className="list-inline d-flex social_media">
              <li><a href="https://twitter.com/" target="_blank"><i className="fab fa-twitter"></i></a></li>
              <li><a href="https://medium.com/" target="_blank"><i class="fab fa-medium-m"></i></a></li>
              <li><a href="https://telegram.org/" target="_blank"><i className="fab fa-telegram-plane"></i></a></li>
              <li><a href="https://facebook.com/" target="_blank"><i class="fab fa-facebook"></i></a></li>
              <li><a href="https://www.linkedin.com/" target="_blank"><i className="fab fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
        <div className="footer_bottom text-center">
          <p>© Copyright 2022 by BitDot. All rights reserved.</p>
          <ul>
            <li><Link to="/terms">Terms and Conditions</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
