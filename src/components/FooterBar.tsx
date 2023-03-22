import React, { useContext } from 'react';
import billerFullPrimary from '../images/billerFullPrimary.svg';
import notification from '../images/notification.svg';
import dropdownImg from '../images/dropdownImg.svg';
import faqP from '../images/faqP.svg';
import playStoreImg from '../images/playstore.png';
import applestoreImg from '../images/applestore.png';
import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../Store/UserContext';

const TopBar = () => {
    return (
        <Row className="mt-2  float-bottom background-p footer">
            <Col className="ms-3  pb-1 pt-1 text-center " lg="4" md="12" sm="12">
                <img className="m-2" height="45" src={playStoreImg} />
                <img className="m-2" height="45" src={applestoreImg} />
            </Col>
            <Col className=" text-white d-flex justify-content-end  me-2">
                <Link className="m-2" to="/faqs">
                    FAQs
                </Link>
                <Link className="m-2" to="">
                    Contact Us
                </Link>
                <Link className="m-2" to="">
                    About Us
                </Link>
                <Link className="m-2" to="/privacy-policy">
                    Privacy Policy
                </Link>
                <Link className="m-2" to="/terms">
                    Terms and Conditions
                </Link>
                <Link className="m-2" to="">
                    Copyright
                </Link>
            </Col>
        </Row>
        // <div className="mt-3 pb-3  float-bottom bg-primary d-flex justify-content-between">
        //     <div className="ms-5 bg-success pb-2 pt-2 ">
        //         <img className="m-2" height="45" src={playStoreImg} />
        //         <img className="m-2" height="45" src={applestoreImg} />
        //     </div>
        //     <div className="pb-2 pt-4 bg-danger text-right  text-white">
        //         <Link className="m-2" to="">
        //             FAQs
        //         </Link>
        //         <Link className="m-2" to="">
        //             Contact Us
        //         </Link>
        //         <Link className="m-2" to="">
        //             About Us
        //         </Link>
        //         <Link className="m-2" to="">
        //             Privacy Policy
        //         </Link>
        //         <Link className="m-2" to="">
        //             Terms and Conditions
        //         </Link>
        //         <Link className="m-2" to="">
        //             Copyright
        //         </Link>
        //     </div>
        // </div>
    );
};

export default TopBar;
