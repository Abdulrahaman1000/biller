import React, { useState, useContext, useEffect } from 'react';
import WalletCardNSI from '../../components/WalletCardNSI';
import WalletCardSI from '../../components/WalletCardSI';
import { UserContext } from '../../Store/UserContext';
import { AppDataContext } from '../../Store/AppDataContext';
import API from '../../helpers/API';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Alert, Col, Dropdown, Row } from 'react-bootstrap';
import loader from '../../images/loader.gif';
import aedc from '../../images/aedc.svg';
import ikedc from '../../images/ikedc.jpg';
import ekedc from '../../images/ekedc.jpg';
import phed from '../../images/phed.png';
import ibedc from '../../images/ibedc.svg';
import jed from '../../images/jed.svg';
import kaedco from '../../images/kaedco.svg';
import kedco from '../../images/kedco.svg';
import profileDropdownImg from '../../images/profileDropdownImg.svg';
import PaymentCard from '../../components/PaymentCard';
import Notification from '../../components/Notification';

const Electric = () => {
    const { user, userDispatch } = useContext(UserContext);
    const [paymentSelectorVisibility, setPaymentSelectorVisibility] = useState(false);
    const { appData, dispatch } = useContext(AppDataContext);

    const [error, setError] = useState('');
    const [notification, setNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
 
    const [loaderClass, setLoaderClass] = useState('none');
    const [buttonClass, setButtonClass] = useState('inline');
    const [confirmationLoading, setConfirmationLoading] = useState('none');

    const {
        register,
        setValue,
         getValues,
        formState: { errors ,isDirty,isValid},
    } = useForm({ mode: "onChange" });


    const onSubmit = (paymentMethod: any) => {
        if (loaderClass === 'inline') return;

        setError('');
        setLoaderClass('inline');
        setButtonClass('none');

        API(
            'post',
            'electricPurchase',
            { planId: plan.id, ...paymentMethod,  ...getValues() },
            onSuccess,
            onFail,
            user.data && user.token,
        );
    };

    function onSuccess(data: any) {
        console.log(data);
        if (data.data.payment_url) {
            window.location = data.data.payment_url.data.link;
        } else {
            //if it wasn't an ATM transfer, display modal
            setNotification(true);
            setNotificationMessage(data.message);
        }
    }

    function onFail(error: string) {
        setError(error);
        setLoaderClass('none');
        setButtonClass('inline');
    }


    function onVerificationFail(error:string){
        setConfirmationLoading('none')
        setMeterDetails('');
    }


    function verifyMeterNumber(value:string) {
        API(
            'post',
            'verifyMeter',
            { planId: plan.id, meterNumber:value },
            onRetrieveMeterDetails,
            onVerificationFail,
            user.data && user.token,
        );
    }

    function onRetrieveMeterDetails(data: any) {
        setMeterDetails(data.data.Customer_Name);
    }

    const [meterDetails, setMeterDetails] = useState('');
     const [disco, setSelectedDisco] = useState({} as any);
    const [plan, setSelectedPlan] = useState({} as any);
    const discos = {
        IKEDC: { img: ikedc, discosName: 'IKEDC' },
        EKEDC: { img: ekedc, discosName: 'EKEDC' },
        KEDCO: { img: kedco, discosName: 'KEDCO' },
        PHED: { img: phed, discosName: 'PHED' },
        AEDC: { img: aedc, discosName: 'AEDC' },
        JED: { img: jed, discosName: 'JED' },
        IBEDC: { img: ibedc, discosName: 'IBEDC' },
        KAEDCO: { img: kaedco, discosName: 'KAEDCO' },
    };

    function selectDisco(disco: any) {
        setSelectedPlan({});
        const objectValues = Object.values(discos);
        objectValues.map((net) => {
            if (net.discosName == disco) {
                setSelectedDisco(net);
            }
        });
    }

    


    if (notification) return <Notification message={notificationMessage} />;
    else
        return (
            <div className="p-48-16 w-100">
                <PaymentCard
                    onSubmit={onSubmit}
                    paymentSelectorVisibility={paymentSelectorVisibility}
                    setPaymentSelectorVisibility={setPaymentSelectorVisibility}
                    amount={getValues('amount')}
                />
                <p className="text-p t-26">Electric Purchase</p>

                <p className="t-14">Purchase your electric</p>

                {user.electric ? <WalletCardSI /> : <WalletCardNSI />}

                <hr className="mt-0 mb-3 pt-0"></hr>
                <div className="bg-white p-4">
                    <form className=" mb-3 text-start">
                        {errors.required && <span>This field is required</span>}
                        {error && <Alert className="bg-danger text-white">{error}</Alert>}
                        <p className="t-16-14 pt-4 m-0 mb-1">Select Disco</p>

                        <Dropdown>
                            <Dropdown.Toggle
                                className="w-100 bg-white text-black form-input  align-items-center"
                                bsPrefix="p-0"
                                id="dropdown-basic"
                            >
                                <div className="text-start  w-100 m-1  align-items-center ">
                                    <img src={disco.img} width={40} />
                                    <label className="mt-2 float-end  me-3 t-16 text-s ">
                                        {disco.discosName}
                                        <img className="  ms-3 me-2 " src={profileDropdownImg} />
                                    </label>
                                </div>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="w-100 ">
                                {Object.values(discos).map((disco, index) => {
                                    return (
                                        <Dropdown.Item
                                            className="  align-items-center"
                                            onClick={() => selectDisco(disco.discosName)}
                                            key={'selector' + index}
                                        >
                                            <div className="  align-items-center w-100 m-2 ">
                                                <img src={disco.img} width={40} />
                                                <label className=" float-end mt-2 me-3 t-16 text-s">
                                                    {disco.discosName}
                                                </label>
                                            </div>
                                        </Dropdown.Item>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown>

                        <p className="t-16-14 pt-4 m-0 mb-1">Select Electric Plan</p>

                        <Dropdown>
                            <Dropdown.Toggle
                                className="w-100 bg-white text-black form-input  align-items-center"
                                bsPrefix="p-0"
                                id="dropdown-basic"
                            >
                                <Row className="    m-2 ">
                                    <Col xs="12" className="text-start">
                                        {plan.packageType}
                                    </Col>
                                </Row>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="w-100 ">
                                <Dropdown.Item className="  align-items-end">
                                    <Row className="    m-2 ">
                                        <Col xs="8">Plan</Col>
                                        {/* <Col xs="4" className=" text-end">
                                        Price
                                    </Col> */}
                                    </Row>
                                </Dropdown.Item>
                                {disco.discosName &&
                                    Object.values(appData.electricPlans[disco.discosName]).map((plan: any, index) => {
                                        return (
                                            <Dropdown.Item
                                                className="  align-items-center"
                                                onClick={() => setSelectedPlan(plan)}
                                                key={'selector' + index}
                                            >
                                                <Row className="    m-2 ">
                                                    <Col xs="8">{plan.packageType}</Col>
                                                    {/* <Col xs="4" className=" text-end">
                                                    {plan.userPrice}
                                                </Col> */}
                                                </Row>
                                            </Dropdown.Item>
                                        );
                                    })}
                            </Dropdown.Menu>
                        </Dropdown>

                        <p className="t-16-14 pt-4 m-0 mb-1">Meter Number</p>
                        {/* <input className="text-input form-control  mt-1 mb-2" {...register('email')} /> */}
                             <input
                            className="form-input form-control  mt-1 mb-2"
                            {...register("meterNumber", { required: true,minLength:8, 
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "invalid Meter Number"
                                  },
                                  onChange: (e)=>{
                                      var value=e.target.value.replace(/\D/g, '')
                                      setValue('smartcardNumber', value)
                                      if(value.length>10){
                                        verifyMeterNumber(value);
                                        setConfirmationLoading('inline')
                                    }
                                    }
                                 })}
                        />
                            
                        <label className="text-p text-underline" >
                        <img className="loader-icon" src={loader} style={{ display: confirmationLoading }}/>
                              {meterDetails &&  meterDetails}
                        </label>

                        <p className="t-16-14 pt-4 m-0 mb-1">Phone Number</p>
                         <input
                            className="form-input form-control  mt-1 mb-2"
                            {...register("phoneNumber", { required: true, maxLength: 11, minLength:11, 
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "invalid phone number"
                                  },
                                  onChange: (e)=>{setValue('phoneNumber',e.target.value.replace(/\D/g, ''))}
                                 })}
                        />

                        <p className="t-16-14 pt-4 m-0 mb-1">Amount</p>
                         <input
                            className="form-input form-control  mt-1 mb-2"
                            {...register("amount", { required: true,minLength:1, 
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "invalid amount"
                                  },
                                  onChange: (e)=>{setValue('amount',e.target.value.replace(/\D/g, ''))}
                                 })}
                        />

                        <button
                            className="form-control mt-4 button"
                            onClick={(e) => {
                                e.preventDefault();
                                setPaymentSelectorVisibility(true);
                            }}
                            disabled ={!isDirty || !isValid ||!meterDetails}

                        >
                            <label style={{ display: buttonClass }}>Proceed to Pay</label>
                            <img className="loader-icon" src={loader} style={{ display: loaderClass }} />
                        </button>
                    </form>
                </div>
            </div>
        );
};

export default Electric;
