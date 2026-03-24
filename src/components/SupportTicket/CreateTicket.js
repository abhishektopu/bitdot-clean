// import package
import React, { useEffect, useState } from 'react'
import { Select, MenuItem } from '@material-ui/core';

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import actions
import { getSptCat, createNewTicket } from '../../actions/supportAction';

// import lib
import isEmpty from '../../lib/isEmpty'
import validation from './validation';
import { toastAlert } from '../../lib/toastAlert';

const initialFormValue = {
    'categoryId': ' ',
    'message': '',
    'file':{}
}

const CreateTicket = () => {
    // state
    const [categoryList, setCategoryList] = useState([])
    const [formValue, setFormValue] = useState(initialFormValue);
    const [loader, setLoader] = useState()
    const [validateError, setValidateError] = useState({});

    const { categoryId, message, file } = formValue;

    // function

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let formData = { ...formValue, ...{ [name]: value } }
        setFormValue(formData)
        if (!isEmpty(validateError)) {
            setValidateError({})
        }
    }
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        let formData = { ...formValue, ...{ [name]: files[0] } }

        setFormValue(formData)
    }
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        let reqData = {
            categoryId,
            message,
        }
        let bodyformData = new FormData();
        bodyformData.append('categoryId',categoryId)
        bodyformData.append('message',message)
        bodyformData.append('file',file)
        let validationError = validation(reqData, 'createTicket')
        if (!isEmpty(validationError)) {
            setValidateError(validationError)
            return
        }
        setLoader(true)
        try {
            const { status, loading, message, error,errors } = await createNewTicket(bodyformData);
            console.log('error1',errors)

            setLoader(loading)
            if (status == 'success') {
                setFormValue(initialFormValue)
                toastAlert('success', message, 'createTicket')
                window.location.reload();

                // handleTicketList({
                //     'callFrom': 'createTicket'
                // })
            } else if(error){
                console.log('error',error)
                setValidateError(error)
                toastAlert('error', message, 'createTicket')
            }
            else if(errors){
                console.log('error11',errors)

                toastAlert('error', "Please Choose with the known file types jpg, jpeg, png, pdf", 'createTicket')

            }
        } catch (err) { }
    }

    const fetchCategory = async () => {
        try {
            const { status, loading, error, result } = await getSptCat();
            if (status == 'success') {
                setCategoryList(result)
            }
        } catch (err) { }
    }

    useEffect(() => {
        fetchCategory();
    }, [])

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={7} lg={8}>
                <div className="contact_form settingsSelect mb-0">
                    <div className="form-group">
                    <label>Ticket For</label>
                        {/* <input type="text"
                         className="form-control"

                            value={categoryId}
                            name={'categoryId'}
                            onChange={handleChange}
                       /> */}
                        <Select
                            value={categoryId}
                            name={'categoryId'}
                            onChange={handleChange}
                        >
                            <MenuItem value={' '}>{"Select Issue"}</MenuItem>

                            {
                                categoryList && categoryList.length > 0 && categoryList.map((item, key) => {
                                    return (
                                        <MenuItem key={key} value={item._id}>{item.categoryName}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        {
                            validateError.categoryId && <p className="error-message">{validateError.categoryId}</p>
                        }
                    </div>
                    <div className="form-group">
                        <label>Message to Support Team</label>
                        <textarea
                            rows="4"
                            className="form-control"
                            name={"message"}
                            onChange={handleChange}
                            value={message}
                        />
                        {
                            validateError.message && <p className="error-message">{validateError.message}</p>
                        }
                    </div>
                    <div className="">
                        <label>
                         Upload the document (Allowed Only types jpg, jpeg, png, pdf. )
                        </label>
                        <input 
                            type="file"
                            className="form-control"
                            name={"file"}
                            onChange={handleFileChange} 
                        />
                        {
                            validateError.file && <p className="error-message">{validateError.file}</p>
                        }
                    </div>
                    <div class="form-group">
                        {loader && <i class="fas fa-spinner fa-spin"></i>}
                        <input
                            type="submit"
                            className="btn btn-primary text-uppercase py-2"
                            value="Create Ticket"
                            onClick={handleFormSubmit}
                            disabled={loader}
                        />
                    </div>
                </div>
            </GridItem>
            <GridItem xs={12} sm={12} md={5} lg={4}>
                <div className="supportTicketList">
                    <h5 class="dash_subtitle">More About Support</h5>
                    <ul>
                        <li><a href="#">1. Login Issue</a></li>
                        <li><a href="#">2. Deposit Issue</a></li>
                        <li><a href="#">3. Withdraw Issue</a></li>
                        <li><a href="#">4. Spot Trade</a></li>
                        <li><a href="#">5. Derivative Trade</a></li>
                        <li><a href="#">6. Two Factor & Password Update</a></li>
                        <li><a href="#">7. General</a></li>
                    </ul>
                </div>
            </GridItem>
        </GridContainer>
    )
}

export default CreateTicket;