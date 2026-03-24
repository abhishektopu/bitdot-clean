import React, { useEffect, useState } from "react";
import { Accordion, Card, Button } from 'react-bootstrap';

// import component
import HeaderLinks from "components/Header/HeaderLinks.js";
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";

// import action
import { getAllFaq } from '../actions/commonAction'

const FaqPage = (props) => {

  // state
  const [data, setData] = useState([])

  // function
  const fetchFaq = async () => {
    try {
      const { status, loading, result } = await getAllFaq()
      if (status == 'success') {
        setData(result)
      }
    } catch (err) { }
  }

  useEffect(() => {
    fetchFaq()
  }, [])

  return (
    <div>
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

      <div className="static_container py-4 mt-5">
        <div className="container">
          <h1 className="mb-4 heading-title text-center mb-4" data-aos="fade-up">FAQ</h1>
          <section className="secFAQ cmsPages">
            <div className="container">
              <div className="cmsBoxWhiteBox pb-0">
                <div className="row">
                  <div className="col-xl-12 col-lg-12 col-sm-12 ml-auto mr-auto">
                    <div className="faqCont">
                      <div className="homeAccordian wow fadeIn">

                        {
                          data && data.length > 0 && data.map((item, key) => {
                            return (
                              <div className="faqGridCard">
                                <h3>{item.categoryName}</h3>
                                <Accordion>

                                  {
                                    item && item.categoryDetails && item.categoryDetails.length > 0 && item.categoryDetails.map((el, index) => {
                                      return (
                                        <Card>
                                          <Card.Header>
                                            <h5 className="mb-0">
                                              <Accordion.Toggle as={Button} variant="link" eventKey={`${key}${index}`}>
                                                <span className="question">{index + 1}{'. '}{el.question}</span> <i className="fas fa-chevron-down"></i>
                                              </Accordion.Toggle>
                                            </h5>

                                          </Card.Header>
                                          <Accordion.Collapse eventKey={`${key}${index}`}>
                                            <Card.Body>
                                              <p>{el.answer}</p>
                                            </Card.Body>
                                          </Accordion.Collapse>
                                        </Card>
                                      )
                                    })
                                  }
                                </Accordion>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FaqPage;