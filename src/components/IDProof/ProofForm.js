// import package
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MenuItem, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// import action
import { updateIdProof } from '../../actions/userKyc';

// import lib
import isEmpty from '../../lib/isEmpty';
import { toastAlert } from '../../lib/toastAlert';
import validation from './validation';

const initialFormValue = {
    'type': "driving_license",
    'proofNumber': '',
    'frontImage': '',
    'backImage': '',
    'selfiImage': '',
}

const ProofForm = () => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    // state
    const [formValue, setFormValue] = useState(initialFormValue);
    const [validateError, setValidateError] = useState({});
    const [loader, setLoader] = useState();
    const[front,setFront]=useState();
    const[back,setBack]=useState();
    const accountData = useSelector(state => state.account);
    const { phoneStatus } = accountData;    
    const[selfie,setSelfie]=useState();

    const { type, proofNumber, frontImage, backImage, selfiImage } = formValue;

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

    const handleFile = async (e) => {
        const { name, files } = e.target;
        let formData = { ...formValue, ...{ [name]: files[0] } }
        setFormValue(formData)
        if(name=="frontImage"){
            setFront(files[0].name)
        }
        if(name=="backImage"){
            setBack(files[0].name)
        }
        if(name=="selfiImage"){
            setSelfie(files[0].name)
        }
        if (!isEmpty(validateError)) {
            setValidateError({})
        }
    }

    const handleSubmit = async (e) => {
       
        e.preventDefault();
        setLoader(true)
        console.log('phoneStatus',phoneStatus)
        if(phoneStatus != 'verified'){
            toastAlert('error', 'Kindly verify the mobile phone number', 'kycBtn')
            setLoader(false)
            return
        }
        let reqData = {
            type,
            proofNumber,
            frontImage,
            backImage,
            selfiImage
        }

        let validationError = validation(reqData)
        if (!isEmpty(validationError)) {
            setValidateError(validationError)
            setLoader(false)
            return
        }
        try {
            const formData = new FormData();
            formData.append('type', type);
            formData.append('proofNumber', proofNumber);
            formData.append('frontImage', frontImage);
            formData.append('backImage', backImage);
            formData.append('selfiImage', selfiImage);

            const { status, loading, message, error } = await updateIdProof(formData, dispatch);
            setLoader(loading)
            if (status == 'success') {
                toastAlert('success', t(message), 'idproof')
            } else {
                if (error) {
                    setValidateError(error)
                }
                toastAlert('error', t(message), 'idproof')
            }
        } catch (err) { }
    }

    return (
        <form className="contact_form mb-0 settingsSelect">
            <GridContainer>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                    <div className="form-group">
                        <label>{t("IDENTIFICATION_DOCUMENT")}</label>
                        <Select
                            name="type"
                            value={type}
                            onChange={handleChange}
                        >
                            <MenuItem value={'driving_license'}>{t("DRIVING_LICENSE")}</MenuItem>
                            <MenuItem value={'passport'}>{t("PASSPORT")}</MenuItem>
                            <MenuItem value={'government_issued_ID'}>{t("GOVERNMENT_ISSUED_ID")}</MenuItem>
                        </Select>
                        {
                            validateError.type && <p className="error-message">{t(validateError.type)}</p>
                        }
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                    <div className="form-group">
                        <label>{t("SELECTED_ID_NUMBER")}</label>
                        <input type="text" className="form-control"
                            name="proofNumber"
                            value={proofNumber}
                            onChange={handleChange}
                        />
                        {
                            validateError.proofNumber && <p className="error-message">{t(validateError.proofNumber)}</p>
                        }
                    </div>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                    <div className="form-group">

                        <label>
                            {
                                type == 'passport' ? t("PICTURE_SCAN") : t("FRONT_SIDE")
                            }
                        </label>

                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                aria-describedby="inputGroupFileAddon01"
                                name="frontImage"
                                onChange={handleFile}
                             //   value={frontImage}
                            />
                            <label className="custom-file-label">
                                {t("MAX_1MB_IMG")}
                            </label>
                            
                        </div>
                        <span>{front}</span>
                        {
                            validateError.frontImage && <p className="error-message">{t(validateError.frontImage)}</p>
                        }
                    </div>
                </GridItem>
                {
                    type != 'passport' && <GridItem xs={12} sm={12} md={6} lg={6}>

                        <div className="form-group">
                            <label>{t("BACK_SIDE")}</label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    className="custom-file-input"
                                    aria-describedby="inputGroupFileAddon01"
                                    name="backImage"
                                    onChange={handleFile}
                                />
                                <label className="custom-file-label">
                                    {t("MAX_1MB_IMG")}
                                </label>
                            </div>
                            <span>{back}</span>
                            {
                                validateError.backImage && <p className="error-message">{t(validateError.backImage)}</p>
                            }
                        </div>
                    </GridItem>
                }

                <GridItem xs={12} sm={12} md={6} lg={6}>
                    <div className="form-group">
                        <label>{t("SELFIE_SELECTED_ID")}</label>
                        <div className="custom-file">
                            <input
                                type="file"
                                className="custom-file-input"
                                aria-describedby="inputGroupFileAddon01"
                                name="selfiImage"
                                onChange={handleFile}
                            />
                            <label className="custom-file-label">
                                {t("MAX_1MB_IMG")}
                            </label>
                        </div>
                        <span>{selfie}</span>
                        {
                            validateError.selfiImage && <p className="error-message">{t(validateError.selfiImage)}</p>
                        }
                    </div>
                </GridItem>
            </GridContainer>
            <div className="form-group mb-0">
                <button
                    className="btn btn-primary text-uppercase py-2 m-0"
                    onClick={handleSubmit}
                >
                    {loader && <i class="fas fa-spinner fa-spin"></i>}
                    {t("SUBMIT")}
                </button>
            </div>
        </form>
    )
}

export default ProofForm;