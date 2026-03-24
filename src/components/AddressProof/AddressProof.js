// import package
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import ProofForm from './ProofForm';


const AddressProof = () => {
    const { t, i18n } = useTranslation();

    // redux-state
    const { addressProof } = useSelector(state => state.userKyc);

    return (
        <>
            <div className="row align-items-center">
                <div className="col-lg-12">
                    <h3 className="dash_title mb-3">{t("ADDRESS_DOCUMENT_TITLE1")}</h3>
                </div>
            </div>
            <div className="dashboard_box">
                <div className="kycIdentityDocument">
                    <GridContainer>
                        {
                            addressProof && ['new', 'rejected'].includes(addressProof.status) && <>
                                <GridItem xs={12} sm={12} md={7} lg={6}>
                                    <div className="twoFAForm">
                                        <ProofForm />
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={5} lg={6}>
                                    <div className="settingsNote">
                                        <h6>{t("NOTES")}</h6>
                                         {/* <p>{t("KYC_TITLE")}</p>  */}
                                        <ul>
                                            <li>{t("ADDRESS_DOCUMENT_DESCRIPTION1")}</li>
                                            <li>{t("ADDRESS_DOCUMENT_DESCRIPTION2")}</li>
                                            <li>{t("ADDRESS_DOCUMENT_DESCRIPTION3")}</li>
                                            {/* <li>{t("ADDRESS_DOCUMENT_DESCRIPTION4")}</li> */}
                                        </ul>
                                    </div>
                                </GridItem>
                            </>
                        }

                        {
                            addressProof && !['new', 'rejected'].includes(addressProof.status) && <GridItem xs={12} sm={12} md={12} lg={12}>
                                <div className="verifiedDocument">
                                    <h3>{t("ADDRESS DOCUMENT SUBMITTED")}</h3>
                                    <p>{t("ADDRESS_DOCUMENT_DESCRIPTION5")} <a href="/support">{t("SUPPORT_TEAM")}</a></p>
                                </div>
                            </GridItem>
                        }
                                             
    {
                            addressProof && ['approved'].includes(addressProof.status) && <GridItem xs={12} sm={12} md={12} lg={12}>
                                <div className="verifiedDocument">
                                    <h3>{t("IDENTITY DOCUMENT VERIFIED")}</h3>
                                    <p>{t("IDENTITY_DOCUMENT_DESCRIPTION4")} <a href="/support">{t("SUPPORT_TEAM")}</a></p>
                                </div>
                            </GridItem>
                        }
                    </GridContainer>
                </div>
            </div>
        </>
    )
}

export default AddressProof;