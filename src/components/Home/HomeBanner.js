// import package
import React from 'react';
import { Button } from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom'
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeBanner = () => {
    const { t, i18n } = useTranslation();
    const history = useHistory();

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        margin: 10,
        responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },            
          ]
      };

    return (
        <div className="banner_container pt-5 pb-lg-0 p-md-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-lg-6" data-aos="fade-up" data-aos-duration="2000">
                        <h1 className="mb-0"><span>Exchange </span>Top Cryptocurrencies with the <span>Best Rates!</span></h1>                        
                        {/* <Button
                            className="primary_btn mt-md-5 pt-3 mb-md-0 mt-3 mb-4"
                            onClick={() => { history.push('/register') }}
                        >
                            {t("GET_STARTED")}
                        </Button> */}
                         <Slider {...settings} className="banner_slider">
                            <div>
                                <img alt="banner" src={require("../../assets/images/banner_img_01.png")} className="img-fluid" />
                            </div>
                            <div>
                                <img alt="banner" src={require("../../assets/images/banner_img_02.png")} className="img-fluid" />
                            </div>    
                            <div>
                                <img alt="banner" src={require("../../assets/images/banner_img_01.png")} className="img-fluid" />
                            </div>
                            <div>
                                <img alt="banner" src={require("../../assets/images/banner_img_02.png")} className="img-fluid" />
                            </div>                         
                        </Slider>
                    </div>
                    <div className="col-md-6 col-lg-6" data-aos="fade-up" data-aos-duration="2000">
                        <div className="w-100 text-center">
                            <img alt="banner" src={require("../../assets/images/banner_shape.png")} className="img-fluid banner_desktop" />
                            <img alt="banner" src={require("../../assets/images/banner_left.png")} className="img-fluid banner_mobile" />
                            <div className="banner_mobile_panel"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeBanner;