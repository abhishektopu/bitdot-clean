// import package
import React from 'react';
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import clsx from 'classnames';

// import component
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import UpgradeButton from './UpgradeButton';

// import lib

const UpgradeProfile = () => {
    const { t, i18n } = useTranslation();

    // redux-state
    const accountData = useSelector(state => state.account);
    const { idProof, addressProof } = useSelector(state => state.userKyc);
    const { type } = accountData;


    return (
        <div className="kycUserType">
            <GridContainer>
                {/* <GridItem xs={12} sm={12} md={12} lg={4}>
                    <div className={clsx("userTypeCard", { "verifiedUser": ['basic_verified'].includes(type) })}>
                        <div className="utcTop">
                            <h4>{t("BASIC_USER")}</h4>
                            <UpgradeButton
                                accountData={accountData}
                                idProofData={idProof}
                                addressProofData={addressProof}
                                upgradeType={"basic"}
                            />
                        </div>
                        <ul>
                            <li><i class="fas fa-check"></i>{t("TYPE_BASIC_DESCRIPTION1")}</li>
                            <li><i class="fas fa-check"></i>{t("TYPE_BASIC_DESCRIPTION2")}</li>
                            <li><i class="fas fa-check"></i>{t("TYPE_BASIC_DESCRIPTION3")}</li>
                            <li><i class="fas fa-check"></i>{t("TYPE_BASIC_DESCRIPTION4")}</li>
                        </ul>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={4}>
                    <div className={clsx("userTypeCard", { "boxUser": ['advanced_verified'].includes(type) })}>
                        <div className="utcTop">
                            <h4>{t("ADVANCED_USER")}</h4>
                            <UpgradeButton
                                accountData={accountData}
                                idProofData={idProof}
                                addressProofData={addressProof}
                                upgradeType={"advanced"}
                            />
                        </div>
                        <ul>
                            <li><i class="fas fa-check"></i> Crypto & fiat deposits unlimited</li>
                            <li><i class="fas fa-check"></i> Crypto & fiat withdraws unlimited</li>
                            <li><i class="fas fa-check"></i> Trade crypto, fiat and derivatives markets</li>
                            <li><i class="fas fa-check"></i> Daily withdraw limits: unlimited</li>
                        </ul>
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={4}>
                    <div className={clsx("userTypeCard", { "unVerifiedUser": ['pro_verified'].includes(type) })}>
                        <div className="utcTop">
                            <h4>{t("BUSINESS_ACCOUNT")}</h4>
                            <UpgradeButton
                                accountData={accountData}
                                idProofData={idProof}
                                addressProofData={addressProof}
                                upgradeType={"pro"}
                            />
                        </div>
                        <ul>
                            <li><i class="fas fa-check"></i> Crypto & fiat deposits unlimited</li>
                            <li><i class="fas fa-check"></i> Crypto & fiat withdraws unlimited</li>
                            <li><i class="fas fa-check"></i> Trade crypto, fiat and derivatives markets</li>
                            <li><i class="fas fa-check"></i> Daily withdraw limits: unlimited</li>
                        </ul>
                    </div>
                </GridItem> */}
            </GridContainer>
        </div>
    )
}

export default UpgradeProfile;