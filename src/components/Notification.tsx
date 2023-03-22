import React, { useContext, useState } from 'react';
import monnifyFund from '../images/fund-monnify.svg';
import atmFund from '../images/fund-atm.svg';
import { Col, Row } from 'react-bootstrap';
import { UserContext } from '../Store/UserContext';
import { formatCurrency, getOS } from '../helpers/utils';
import { Link, useNavigate } from 'react-router-dom';

const Notification = (props: any) => {
    const { user } = useContext(UserContext);
    const history = useNavigate();

    function onClick(data: any) {
        history('/');
    }
    return (
        <div className=" vertical-center text-center w-100  ">
            <label className=" w-100">
                <i className="fa fa-check text-p" style={{ fontSize: '20vw' }}></i>
                <p>{props.message}</p>
                <p onClick={onClick} className="text-decoration-underline  pointer">
                    <i className="fa fa-thumbs-up"></i> Got it!
                </p>
            </label>
        </div>
    );
};

export default Notification;
