import React, { useContext, useEffect } from 'react';
import { Accordion, Button, Carousel, Col, Row } from 'react-bootstrap';
import billerFullPrimary from '../../images/billerFullPrimary.svg';
import TopBar from '../../components/TopBar';
import FooterBar from '../../components/FooterBar';

import { Link } from 'react-router-dom';
import API from '../../helpers/API';

const FAQs = () => {
    document.title = 'FAQs - Biller';

    const faqs = [
        {
            question: 'What is Biller?',
            answer: 'Biller is an electricity recharge solution that allows the consumers of electricity to pay for electricity bills quickly and with ease from anywhere in the world.',
        },
        {
            question: 'Why Should I use Biller?',
            answer: "Using Biller is simply the safest and easiest way to pay for power and electricity in Nigeria. It is faster than any other payment platform.You can also use USSD to recharge, it's that easy. Biller strives to give you access to constant power supply and also keep your data safe through our military grade safety and security system.",
        },
        {
            question: 'How can I buy electricity on biller?',
            answer: '<ul><l>Log on to www.biller.ng</l><l>You will see a form on the homepage</l>  <l>Fill in the appropriate information</l><l>Click on Recharge button to pay.</l><l>Choose your payment method and make the payment.</l><l>Your token is sent as an SMS to the mobile number and also to the email you provided.</l></ul>',
        },
        {
            question: '',
            answer: '',
        },
        {
            question: '',
            answer: '',
        },
        {
            question: '',
            answer: '',
        },
        {
            question: '',
            answer: '',
        },
        {
            question: '',
            answer: '',
        },
        {
            question: '',
            answer: '',
        },
        {
            question: '',
            answer: '',
        },
    ];
    return (
        <React.Fragment>
            <TopBar setNavCollapse={false} />

            <h1 className="m-3 text-center text-dark">Frequently Asked Questions</h1>

            <Accordion flush className="m-4">
                {faqs.map((data: any, index) => {
                    return (
                        <Accordion.Item eventKey={'' + index} key={index}>
                            <Accordion.Header>{data.question}</Accordion.Header>
                            <Accordion.Body>{data.answer}</Accordion.Body>
                        </Accordion.Item>
                    );
                })}
            </Accordion>
            <div>
                <FooterBar />
            </div>
        </React.Fragment>
    );
};

export default FAQs;
