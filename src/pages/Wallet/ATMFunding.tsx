import React, { useState, useContext } from 'react';
import WalletCardNSI from '../../components/WalletCardNSI';
import WalletCardSI from '../../components/WalletCardSI';
import { UserContext } from '../../Store/UserContext';
import API from '../../helpers/API';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Alert, Dropdown } from 'react-bootstrap';
import loader from '../../images/loader.gif';
import mtn from '../../images/mtn.svg';
import glo from '../../images/glo.svg';
import airtel from '../../images/airtel.svg';
import etisalat from '../../images/etisalat.svg';
import profileDropdownImg from '../../images/profileDropdownImg.svg';
import PaymentCard from '../../components/PaymentCard';

const Dashboard = () => {
    const { user, userDispatch } = useContext(UserContext);

    const [error, setError] = useState('');

    const [formSubmitted, setFormSubmitted] = useState('none');

    const onSubmit = (e: any) => {
        e.preventDefault();
        setError('');
        setFormSubmitted('inline');
        API('post', 'atmFunding', { amount: amount }, onSuccess, onFail, user.data && user.token);
    };

    function onSuccess(data: any) {
        console.log(data);
        window.location = data.data.payment_url.data.link;
    }

    function onFail(error: string) {
        setError(error);
        setFormSubmitted('none');
    }

    const [amount, setAmount] = useState('');

    return (
        <div className="p-48-16 w-100">
            <p className="text-p t-26">ATM Wallet Funding</p>

            <p className="t-14">Fund your wallet with ATM</p>

            {user.data ? <WalletCardSI /> : <WalletCardNSI />}

            <hr className="mt-0 mb-3 pt-0"></hr>
            <div className="bg-white p-4">
                <form className=" mb-3 text-start" onSubmit={onSubmit}>
                    {error && <Alert className="bg-danger text-white">{error}</Alert>}

                    <p className="t-16-14 pt-4 m-0 mb-1">Amount</p>
                    {/* <input className="text-input form-control  mt-1 mb-2" {...register('email')} /> */}
                    <input
                        className="form-input form-control  mt-1 mb-2"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value);
                        }}
                    />

                    <button className="form-control mt-4 button" onClick={onSubmit}>
                        Proceed to Pay
                        <img className="loader-icon" src={loader} style={{ display: formSubmitted }} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
