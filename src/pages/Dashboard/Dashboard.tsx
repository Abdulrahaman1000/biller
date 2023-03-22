import React, { useContext, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import airtime from "../../images/airtime.svg";
import data from "../../images/data.svg";
import electric from "../../images/electric.svg";
import cable from "../../images/cable.svg";
import WalletCardNSI from "../../components/WalletCardNSI";
import WalletCardSI from "../../components/WalletCardSI";
import { UserContext } from "../../Store/UserContext";
import { AppDataContext } from "../../Store/AppDataContext";
import { Link } from "react-router-dom";
import API from "../../helpers/API";

const Dashboard = () => {
  const { user, userDispatch } = useContext(UserContext);
  const { appData, dispatch } = useContext(AppDataContext);

  useEffect(() => {
    user.data &&
      API(
        "get",
        "profile",
        data,
        onProfileRetrieved,
        onFail,
        user.data && user.token
      );
    API(
      "get",
      "data",
      data,
      onAppDataRetrieved,
      onFail,
      user.data && user.token
    );
  }, []);

  function onAppDataRetrieved(data: any) {
    dispatch({
      type: "STORE_APP_DATA",
      appData: {
        is_mobile: appData.is_mobile,
        timestamp: new Date().getTime(),
        ...data.data,
      },
    });
  }

  function onProfileRetrieved(userData: any) {
    userDispatch({
      type: "STORE_USER_DATA",
      user: { ...user, data: userData },
    });
  }

  function onFail(error: string) {
    //do nothing
  }

  return (
    <div className="p-48-16 w-100">
      <p className="text-p t-26">Dashboard</p>
      <p className="t-14">
        {user.data
          ? `Welcome back, ${user.data.firstName} ${user.data.otherName} ${user.data.lastName}`
          : "Welcome to Biller"}
      </p>

      {user.data ? <WalletCardSI /> : <WalletCardNSI />}

      <p className="t-14 mt-4  mb-1">Available Services</p>
      <hr className="mt-0 pt-0"></hr>
      <Row>
        <Col xs="6" md="3" className="m-0 p-0">
          <Link to="/airtime">
            <div className="services">
              <img className="services" src={airtime} />
              <p className="services">Airtime</p>
              <p className="services">Purchase</p>
            </div>
          </Link>
        </Col>
        <Col xs="6" md="3" className="m-0 p-0">
          <Link to="/data">
            <div className="services">
              <img className="services" src={data} />
              <p className="services">Data</p>
              <p className="services">Purchase</p>
            </div>
          </Link>
        </Col>
        <Col xs="6" md="3" className="m-0 p-0">
          <Link to="/electric">
            <div className="services">
              <img className="services" src={electric} />
              <p className="services">Electricity</p>
              <p className="services">Purchase</p>
            </div>
          </Link>
        </Col>
        <Col xs="6" md="3" className="m-0 p-0">
          <Link to="/cable">
            <div className="services">
              <img className="services" src={cable} />
              <p className="services">Cable TV</p>
              <p className="services">Purchase</p>
            </div>
          </Link>
        </Col>

        <Col xs="6" md="3" className="m-0 p-0">
          <Link to="/cable">
            <div className="services">
              <img className="services" src={cable} />
              <p className="services">Balance</p>
              <p className="services">Codes</p>
            </div>
          </Link>
        </Col>
        <Col xs="6" md="3" className="m-0 p-0">
          <Link to="/cable">
            <div className="services">
              <img className="services" src={cable} />
              <p className="services">F.A.Qs</p>
              <p className="services"> </p>
            </div>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
