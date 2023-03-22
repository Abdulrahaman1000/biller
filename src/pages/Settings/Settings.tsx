import React, { useState, useContext, useEffect } from 'react';
import airtime from '../../images/airtime.svg';
import electric from '../../images/electric.svg';
import cable from '../../images/cable.svg';
import WalletCardNSI from '../../components/WalletCardNSI';
import WalletCardSI from '../../components/WalletCardSI';
import { UserContext } from '../../Store/UserContext';
import API from '../../helpers/API';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Row, Col, Button, Alert, Dropdown, Modal, Table } from 'react-bootstrap';
import loader from '../../images/loader.gif';
import searchImg from '../../images/search.svg';
import profileDropdownImg from '../../images/profileDropdownImg.svg';

import glo from '../../images/glo.svg';
import airtel from '../../images/airtel.svg';
import etisalat from '../../images/etisalat.svg';
import arrowLeft from '../../images/arrowLeft.svg';
import arrowRight from '../../images/arrowRight.svg';
import atmFund from '../../images/fund-atm.svg';
import PaymentCard from '../../components/PaymentCard';
import { formatCurrency, formatDate } from '../../helpers/utils';
import cancel from '../../images/cancelBlack.svg';

const Dashboard = () => {
    const { user, userDispatch } = useContext(UserContext);

    function onFail(error: string) {
        alert('failed!');
    }

    const transactionTypes = [
        'ATM Card Funding',
        'Direct Bank Transfer',
        'Purchase Reversal',
        'Data Purchase',
        'Airtime Purchase',
        'Cable TV Subscription',
        'Electricity Bill Payment',
        'Commission Payment',
        'Admin Payment',
    ];

    const transactionStatus = ['Paying', 'Successful', 'Queued ', 'Processing', 'Reversed', 'Failed'];
    const transactionClassNames = ['paying', 'successful', 'paying ', 'processing', 'processing', 'failed'];
    const transactionDeviceNumberName = [
        '',
        '',
        '',
        'Phone Number',
        'Phone Number',
        'Smartcard Number',
        'Meter Number',
        '',
        '',
    ];

    const transactionCol2Name = ['', '', '', 'Network', 'Network', 'TV Provider', 'Disco', '', ''];
    const transactionCol2NameMetaValue = ['', '', '', 'network', 'network', 'tvProvider', 'discoName', '', ''];

    const transactionCol2Type = ['', '', '', 'Data Plan', 'Airtime Value', 'Tarrif', 'Plan', '', ''];
    const transactionCol2TypeMetaValue = ['', '', '', 'dataPlan', 'airtimeValue', 'tarrifPlan', 'packageType', '', ''];

    const paymentMethod = ['ATM Payment', 'Wallet Payment', 'Monnify Payment', 'Admin Payment'];

    const [showModal, setShowModal] = useState(false);
    const [transaction, setTransaction] = useState({} as any);

    function hideModal() {
        setShowModal(false);
    }

    function showDetails(tranc: any) {
        setShowModal(true);
        setTransaction(tranc);
    }

    useEffect(() => {
        getData(1);
    }, []);

    function getData(pageNo: number) {
        API(
            'get',
            'transactions',
            {
                page: pageNo,
                search: search,
                transactionType: searchTransactionType,
                dateFrom: dateFrom,
                dateTo: dateTo,
                pageSize: pageSize,
            },
            onLoad,
            onFail,
            user.data && user.token,
        );
    }

    const [dataLoaded, setDataLoaded] = useState(false);
    const [data, setData] = useState<any>([]);

    function onLoad(data: any) {
        setData(data.data);
        setDataLoaded(true);
    }

    const [showFilterModal, setShowFilterModal] = useState(false);
    const [search, setSearch] = useState('');
    const [searchTransactionType, setSearchTransactionType] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [pageSize, setPageSize] = useState('');

    return (
        <div className="p-48-16 w-100">
            <Modal centered show={showModal} onHide={hideModal} backdrop="static" keyboard={false}>
                {transaction && (
                    <div className="ms-4 me-4 mb-2 mt-4 ">
                        <div className="ms-4 me-4 mb-4 mt-4 ">
                            <img className="nav-cancel  " onClick={hideModal} src={cancel} />
                        </div>
                        <div className="pt-5">
                            <label className="text-p t-26-18 mb-3">
                                {transactionTypes[transaction.transactionType]}
                            </label>
                        </div>
                        <div>
                            <Row>
                                <Col xs="6">
                                    <p className="transaction-text-light">
                                        {transactionDeviceNumberName[transaction.transactionType]}
                                    </p>
                                    <p className="transaction-text-bold">{transaction.deviceNumber}</p>

                                    <p className="transaction-text-light">Payment Method</p>
                                    <p className="transaction-text-bold">{paymentMethod[transaction.paymentMethod]}</p>

                                    <p className="transaction-text-light">Amount</p>
                                    <p className="transaction-text-bold">₦{formatCurrency(transaction.amount)}</p>

                                    <p className="transaction-text-light">Status</p>

                                    <p className="transaction-text-bold">
                                        <label className={transactionClassNames[transaction.status]}>
                                            <label> {transactionStatus[transaction.status]}</label>
                                        </label>
                                    </p>
                                </Col>
                                <Col xs="6">
                                    <p className="transaction-text-light">
                                        {transactionCol2Name[transaction.transactionType]}
                                    </p>
                                    <p className="transaction-text-bold">
                                        {transaction.metaData &&
                                            JSON.parse(transaction.metaData)[
                                                transactionCol2NameMetaValue[transaction.transactionType]
                                            ]}
                                    </p>

                                    <p className="transaction-text-light">
                                        {transactionCol2Type[transaction.transactionType]}
                                    </p>
                                    <p className="transaction-text-bold">
                                        {transaction.metaData &&
                                            JSON.parse(transaction.metaData)[
                                                transactionCol2TypeMetaValue[transaction.transactionType]
                                            ]}
                                    </p>

                                    <p className="transaction-text-light">Balance B/A</p>
                                    <p className="transaction-text-bold">
                                        ₦{formatCurrency(transaction.balanceBefore)}/₦
                                        {formatCurrency(transaction.balanceAfter)}
                                    </p>

                                    <p className="transaction-text-light">Date & Time</p>
                                    <p className="transaction-text-bold">{formatDate(transaction.created_at)}</p>
                                </Col>
                            </Row>
                        </div>
                        <div className="text-center pb-4 pt-4 ">
                            <Button className="button-white ps-4 pe-4 t-16 me-2 ms-2" onClick={hideModal}>
                                Share
                            </Button>
                            <Button className="button ps-4 pe-4 t-16  me-2 ms-2">Download</Button>
                        </div>
                    </div>
                )}
            </Modal>

            <p className="text-p t-26">Settings</p>
            <p className="pt-3">Fill in forms to complete profile and settings</p>

            <div>
                <Row>
                    <Col md="2" sm="12" className="p-0">
                        <p className="small d-flex justify-content-between profile-selected p-2 rounded">
                            Personal Info <img width={10} src={arrowRight} />
                        </p>

                        <p className="small d-flex justify-content-between">
                            Account Details <img width={10} src={arrowRight} />
                        </p>
                        <p className="small d-flex justify-content-between">
                            Business Details <img width={10} src={arrowRight} />
                        </p>
                        <p className="small d-flex justify-content-between">
                            Documents <img width={10} src={arrowRight} />
                        </p>
                    </Col>
                    <Col md="10" sm="12">
                        <div className="bg-white p-4 m-2">
                            <p>Personal Info</p>
                            <hr />

                            <p className="profile-col">Lastname</p>
                            <p className="profile-value">{user.data.lastName}</p>

                            <p className="profile-col">Firstname</p>
                            <p className="profile-value">{user.data.firstName}</p>

                            <p className="profile-col">Othername</p>
                            <p className="profile-value">{user.data.otherName}</p>

                            <p className="profile-col">Date-of-birth</p>
                            <p className="profile-value">Yusuf</p>

                            <p className="profile-col">Residential State</p>
                            <p className="profile-value">Kwara State</p>
                        </div>

                        <div className="bg-white p-4 m-2">
                            <p>Account Details</p>
                            <hr />

                            <p className="profile-col">Email Address</p>
                            <p className="profile-value">{user.data.email}</p>

                            <p className="profile-col">Phone Number</p>
                            <p className="profile-value">{user.data.phoneNumber}</p>

                            <p className="profile-col">Identity Type</p>
                            <p className="profile-value">Yusuf</p>

                            <p className="profile-col">ID Number</p>
                            <p className="profile-value">3334455522</p>

                            <p className="profile-col">BVN Number</p>
                            <p className="profile-value">{user.data.bvn}</p>

                            <p className="profile-col">Password</p>
                            <p className="profile-value">3232323445</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Dashboard;
