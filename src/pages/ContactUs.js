// import package
import React,{ useEffect, useState } from 'react';
import HeaderLinks from "components/Header/HeaderLinks.js";

import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import { useSelector } from 'react-redux'
// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import {addContactus} from "../actions/commonAction";
import { dateTimeFormat } from '../lib/dateTimeHelper';
import isEmpty from '../lib/isEmpty';
import validation from './validationContact';
import { toastAlert } from '../lib/toastAlert';
const initialFormValue = {
    'email': '',
    'firstname':'',
    'lastname': '',
    'message': '',
    
}
const Contactus = () => {

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);
    const [formValue, setFormValue] = useState(initialFormValue);
    const [validateError, setValidateError] = useState({});
    const { email, firstname, lastname, message} = formValue;
    
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
        
    }
    
    const handleSubmit = async (e) => {
       
        e.preventDefault();
        setLoader(true)
        let reqData = {
            firstname,
            lastname,
            email,
            message,
            
        }
console.log("reqData---",reqData)
        let validationError = validation(reqData)
        if (!isEmpty(validationError)) {
            setValidateError(validationError)
            setLoader(false)
            return
        }
        try {
            const { status, loading, message, error } = await addContactus(reqData)
           // setLoader(loading)
           console.log("status----",status)
            if (status == 'success') {
              //  setEditForm(true)
                setFormValue(initialFormValue)
                toastAlert('success', message, 'editProfile');
            } else {
                if (error) {
                    setValidateError(error)
                }
                toastAlert('error', message, 'editProfile');
            }
        } catch (err) { }
    }
    // console.log(validateError,'valiiiiiiiiiiiiiii')
    return (
        <div className="dashboardContent userPages">
              <Header className="header"
                color="transparent"
                // routes={dashboardRoutes}
                brand={<img src={require("../assets/images/logo.png")} alt="logo" className="img-fluid" />}
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 20,
                    color: "dark",
                }}
            />
            <div className="container">
            <section className="bg_body">
                    <div className="container padig_top">
                <div className="">
                <h1 className="heading-title text-center mb-4">CONTACT US</h1>
                <GridContainer className="justify-content-center mt-5">
                <GridItem xs={12} sm={12} md={5} lg={10}>
                <div className="dashboard_box ">
                                <div className="contact_form ">
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12} lg={4}>
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                name="firstname"
                                                value={firstname}
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                            {validateError.firstname && <p className="error-message">{validateError.firstname}</p>}
                                        
                                        </div>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} lg={4}>
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                name="lastname"
                                                value={lastname}
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                            {validateError.lastname && <p className="error-message">{validateError.lastname}</p>}
                                        
                                        </div>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} lg={4}>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="text"
                                                name="email"
                                                value={email}
                                                className="form-control"
                                                onChange={handleChange}
                                            />
                                        {validateError.email && <p className="error-message">{validateError.email}</p>}
                                        </div>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} lg={12}>
                                        <div className="form-group">
                                            <label>Message</label>
                                            <textarea  onChange={handleChange} className="form-control" name="message" value={message}></textarea>
                                            
                                        {validateError.message && <p className="error-message">{validateError.message}</p>}
                                        
                                        </div>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={12} lg={12}>
                                        <div className="form-group d-flex justify-content-center">
                                           <button className="btn btn-primary text-uppercase" onClick={handleSubmit}>Submit</button>
                                            
                                        
                                        </div>
                                        </GridItem>
  </GridContainer>
                                </div>
                         </div> 
                </GridItem>
                </GridContainer>
                       
                </div>
            </div>
           
                    </section>

            </div>
            <Footer />
        </div>
    )
}

export default Contactus;