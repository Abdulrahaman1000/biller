import React, { useState, useContext, useEffect } from "react";
import WalletCardNSI from "../../components/WalletCardNSI";
import WalletCardSI from "../../components/WalletCardSI";
import { UserContext } from "../../Store/UserContext";
import { AppDataContext } from "../../Store/AppDataContext";
import API from "../../helpers/API";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Col, Dropdown, Row } from "react-bootstrap";
import loader from "../../images/loader.gif";
import mtn from "../../images/mtn.svg";
import glo from "../../images/glo.svg";
import airtel from "../../images/airtel.svg";
import etisalat from "../../images/etisalat.svg";
import profileDropdownImg from "../../images/profileDropdownImg.svg";
import PaymentCard from "../../components/PaymentCard";
import { formatCurrency } from "../../helpers/utils";
import Notification from "../../components/Notification";

const Data = () => {
  const { user, userDispatch } = useContext(UserContext);
  const [paymentSelectorVisibility, setPaymentSelectorVisibility] =
    useState(false);
  const { appData, dispatch } = useContext(AppDataContext);

  const [error, setError] = useState("");
  const [notification, setNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const [loaderClass, setLoaderClass] = useState("none");
  const [buttonClass, setButtonClass] = useState("inline");

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (paymentMethod: any) => {
    if (loaderClass === "inline") return;
    setError("");
    setLoaderClass("inline");
    setButtonClass("none");

    API(
      "post",
      "dataPurchase",
      { planId: plan.id, ...paymentMethod, ...getValues() },
      onSuccess,
      onFail,
      user.data && user.token
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
    setLoaderClass("none");
    setButtonClass("inline");
  }

  const [network, setSelectedNetwork] = useState({} as any);
  const [plan, setSelectedPlan] = useState({} as any);
  const networks = {
    MTN: { img: mtn, name: "MTN" },
    GLO: { img: glo, name: "GLO" },
    AIRTEL: { img: airtel, name: "AIRTEL" },
    ETISALAT: { img: etisalat, name: "9Mobile" },
  };

  function selectNetwork(network: any) {
    setSelectedPlan({});
    const objectValues = Object.values(networks);
    objectValues.map((net) => {
      if (net.name == network) {
        setSelectedNetwork(net);
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
          amount={plan.wallet_price}
        />
        <p className="text-p t-26">Data Purchase</p>

        <p className="t-14">Purchase your data</p>

        {user.data ? <WalletCardSI /> : <WalletCardNSI />}

        <hr className="mt-0 mb-3 pt-0"></hr>
        <div className="bg-white p-4">
          <form className=" mb-3 text-start">
            {errors.required && <span>This field is required</span>}
            {error && <Alert className="bg-danger text-white">{error}</Alert>}
            <p className="t-16-14 pt-4 m-0 mb-1">Select Network</p>

            <Dropdown>
              <Dropdown.Toggle
                className="w-100 bg-white text-black form-input  align-items-center"
                bsPrefix="p-0"
                id="dropdown-basic"
              >
                <div className="text-start  w-100 m-1  align-items-center ">
                  <img src={network.img} width={40} />
                  <label className="mt-2 float-end  me-3 t-16 text-s ">
                    {network.name}
                    <img className="  ms-3 me-2 " src={profileDropdownImg} />
                  </label>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100 ">
                {Object.values(networks).map((network, index) => {
                  return (
                    <Dropdown.Item
                      className="  align-items-center"
                      onClick={() => selectNetwork(network.name)}
                      key={"selector" + index}
                    >
                      <div className="  align-items-center w-100 m-2 ">
                        <img src={network.img} width={40} />
                        <label className=" float-end mt-2 me-3 t-16 text-s">
                          {network.name}
                        </label>
                      </div>
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>

            <p className="t-16-14 pt-4 m-0 mb-1">Select Data Plan</p>

            <Dropdown>
              <Dropdown.Toggle
                className="w-100 bg-white text-black form-input  align-items-center"
                bsPrefix="p-0"
                id="dropdown-basic"
              >
                <Row className="    m-2 ">
                  <Col xs="8" className="text-start">
                    {plan.name}
                  </Col>
                  <Col xs="4" className="text-end">
                    {plan.wallet_price && (
                      <label>₦{formatCurrency(plan.wallet_price)}</label>
                    )}
                  </Col>
                </Row>
              </Dropdown.Toggle>
              <Dropdown.Menu className="w-100 ">
                <Dropdown.Item className="  align-items-end">
                  <Row className="    m-2 ">
                    <Col xs="8">Plan</Col>
                    <Col xs="4" className=" text-end">
                      Price
                    </Col>
                  </Row>
                </Dropdown.Item>
                {network.name &&
                  Object.values(appData.data_plans[network.name]).map(
                    (plan: any, index) => {
                      return (
                        <Dropdown.Item
                          className="  align-items-center"
                          onClick={() => setSelectedPlan(plan)}
                          key={"selector" + index}
                        >
                          <Row className="    m-2 ">
                            <Col xs="8">{plan.name}</Col>
                            <Col xs="4" className=" text-end">
                              ₦{formatCurrency(plan.wallet_price)}
                            </Col>
                          </Row>
                        </Dropdown.Item>
                      );
                    }
                  )}
              </Dropdown.Menu>
            </Dropdown>

            <p className="t-16-14 pt-4 m-0 mb-1">Phone Number</p>
            <input
              className="form-input form-control  mt-1 mb-2"
              {...register("phoneNumber", {
                required: true,
                maxLength: 11,
                minLength: 11,
                pattern: {
                  value: /^[0-9]*$/,
                  message: "invalid phone number",
                },
                onChange: (e) => {
                  setValue("phoneNumber", e.target.value.replace(/\D/g, ""));
                },
              })}
            />

            <button
              className="form-control mt-4 button"
              onClick={(e) => {
                e.preventDefault();
                setPaymentSelectorVisibility(true);
              }}
              disabled={!isDirty || !isValid || !plan.id} // here
            >
              <label style={{ display: buttonClass }}>Proceed to Pay</label>
              <img
                className="loader-icon"
                src={loader}
                style={{ display: loaderClass }}
              />
            </button>
          </form>
        </div>
      </div>
    );
};

export default Data;
