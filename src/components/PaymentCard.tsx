/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import airtime from '../images/airtime.svg';
import data from '../images/data.svg';
import electric from '../images/electric.svg';
import cable from '../images/cable.svg';
import API from '../helpers/API';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Row, Col, Button, Alert, Dropdown, Modal } from 'react-bootstrap';
import loader from '../images/loader.gif';
import mtn from '../images/mtn.svg';
import glo from '../images/glo.svg';
import airtel from '../images/airtel.svg';
import etisalat from '../images/etisalat.svg';
import profileDropdownImg from '../images/profileDropdownImg.svg';
import monnifyFund from '../images/fund-monnify.svg';
import atmFund from '../images/fund-atm.svg';
import cancel from '../images/cancelBlack.svg';

import { UserContext } from '../Store/UserContext';
import { formatCurrency } from '../helpers/utils';

const PaymentCard = (props: any) => {
    const { user, userDispatch } = useContext(UserContext);

    const [paymentMethod, setPaymentMethod] = useState(user.data ? 'WALLET' : 'ATM');

    const [passwordCardVisibility, setPasswordCardVisibility] = useState(false);

    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const [password, setPassword] = useState('');

    const [email, setEmail] = useState(user.data && user.data.email);

    const [emailCardVisibility, setEmailCardVisibility] = useState(false);

    function togglePasswordVisibility() {
        setPasswordVisibility(!passwordVisibility);
    }

    function cancelPayment() {
        props.setPaymentSelectorVisibility(false);
        setEmailCardVisibility(false);
        setPasswordCardVisibility(false);
        setPasswordCardVisibility(false);
    }

    function onSubmit() {
        cancelPayment();
        props.onSubmit({ paymentMethod: paymentMethod, password: password, email: email });
    }

    function paymentSelected() {
        if (paymentMethod == 'WALLET') {
            props.setPaymentSelectorVisibility(false);
            setPasswordCardVisibility(true);
            setEmailCardVisibility(false);
        } else {
            props.setPaymentSelectorVisibility(false);
            setEmailCardVisibility(true);
            setPasswordCardVisibility(false);
            user.data && onSubmit();
        }
    }

    return (
        <React.Fragment>
            <Modal
                centered
                show={props.paymentSelectorVisibility}
                onHide={cancelPayment}
                backdrop="static"
                keyboard={false}
            >
                <div>
                    <div className="ms-4 me-4 mb-2 mt-4 ">
                        <label className="text-p t-18">Select Payment Method</label>
                        <img className="nav-cancel  " onClick={cancelPayment} src={cancel} />
                    </div>
                    <p className="text-s t-16 ms-4 me-4">Select a payment method to proceed with the transaction</p>
                    {user.data && (
                        <p
                            className={
                                paymentMethod == 'WALLET'
                                    ? 'background-s pt-3 pb-3 ps-4 pe-4 '
                                    : '  pt-3 pb-3 ps-4 pe-4 '
                            }
                            onClick={() => {
                                setPaymentMethod('WALLET');
                            }}
                        >
                            <img className="funding-monnify" src={monnifyFund} />
                            <label className="t-18-12  text-p ms-2">
                                Pay with Wallet (₦{formatCurrency(props.amount)})
                            </label>
                        </p>
                    )}
                    <p
                        className={
                            paymentMethod == 'ATM' ? 'background-s pt-3 pb-3 ps-4 pe-4 ' : 'pt-3 pb-3 ps-4 pe-4 '
                        }
                        onClick={() => {
                            setPaymentMethod('ATM');
                        }}
                    >
                        <img className="funding-monnify" src={atmFund} />
                        <label className="t-18-12 text-p ms-2">
                            Pay with ATM (₦{formatCurrency(+props.amount + props.amount * 0.014)})
                        </label>
                    </p>

                    <div className="text-center pb-4 pt-4 ">
                        <Button className="button-white ps-4 pe-4 t-16 me-2 ms-2" onClick={cancelPayment}>
                            Cancel
                        </Button>
                        <Button className="button ps-4 pe-4 t-16  me-2 ms-2" onClick={paymentSelected}>
                            Proceed
                        </Button>
                    </div>
                </div>
            </Modal>

            <Modal centered show={passwordCardVisibility} onHide={cancelPayment} backdrop="static" keyboard={false}>
                <div>
                    <div className="ms-4 me-4 mb-2 mt-4 ">
                        <img className="nav-cancel  " onClick={cancelPayment} src={cancel} />
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        <div className="ms-4 me-4 mb-2 mt-4 pt-5 pb-5" onSubmit={props.onSubmit}>
                            <div>
                                <label className="p-16">Password</label>
                                <div>
                                    <input
                                        className="form-input form-control mb-2"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={passwordVisibility ? 'text' : 'password'}
                                    />
                                    <div className="d-flex justify-content-end ">
                                        <i
                                            className=" far fa-eye password-toggle"
                                            id="togglePassword"
                                            onClick={togglePasswordVisibility}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="form-control mt-4 button"
                                type="submit"
                                value="Submit"
                                onClick={onSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <Modal centered show={emailCardVisibility} onHide={cancelPayment} backdrop="static" keyboard={false}>
                <div>
                    <div className="ms-4 me-4 mb-2 mt-4 ">
                        <img className="nav-cancel  " onClick={cancelPayment} src={cancel} />
                    </div>
                    <div className="ms-4 me-4 mb-2 mt-4 pt-5 pb-5" onSubmit={props.onSubmit}>
                        <div>
                            <label className="p-16">Email</label>
                            <input
                                className="text-input form-control  mb-2"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="text"
                            />
                        </div>
                        <button className="form-control mt-4 button" type="submit" value="Submit" onClick={onSubmit}>
                            Submit
                            {/* <img className="loader-icon" src={loader} style={{ display: formSubmitted }} /> */}
                        </button>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
};

export default PaymentCard;
