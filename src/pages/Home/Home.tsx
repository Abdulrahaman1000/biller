import React, { useContext, useEffect } from "react";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import airtime from "../../images/airtime.svg";
import data from "../../images/data.svg";
import electric from "../../images/electric.svg";
import cable from "../../images/cable.svg";
import illustrator0 from "../../images/illustrator0.png";
import illustrator1 from "../../images/illustrator1.png";
import illustrator2 from "../../images/illustrator2.png";
import illustrator3 from "../../images/illustrator3.png";
import illustrator4 from "../../images/illustrator4.png";
import illustrator5 from "../../images/illustrator5.png";
import illustrator6 from "../../images/illustrator6.png";
import WalletCardNSI from "../../components/WalletCardNSI";
import WalletCardSI from "../../components/WalletCardSI";
import TopBar from "../../components/TopBar";
import FooterBar from "../../components/FooterBar";
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

  const slideImages = [
    {
      url: "images/slide_2.jpg",
      caption: "Slide 1",
    },
    {
      url: "images/slide_3.jpg",
      caption: "Slide 2",
    },
    {
      url: "images/slide_4.jpg",
      caption: "Slide 3",
    },
  ];
  return (
    <div>
      <TopBar setNavCollapse={false} />
      <div className="p-48-16 w-100 mt-2">
        <Row>
          <Col md="6">
            <p className="text-p t-26">
              Smart and Cheaper Bill Payment, Start Now!
            </p>
            <Row>
              <Col xs="6" className="m-0 p-0">
                <Link to="/airtime">
                  <div className="features">
                    <img className="features" src={airtime} />
                    <p className="features">Airtime</p>
                    <p className="features">Purchase</p>
                  </div>
                </Link>
              </Col>
              <Col xs="6" className="m-0 p-0">
                <Link to="/data">
                  <div className="features">
                    <img className="features" src={data} />
                    <p className="features">Data</p>
                    <p className="features">Purchase</p>
                  </div>
                </Link>
              </Col>
              <Col xs="6" className="m-0 p-0">
                <Link to="/electric">
                  <div className="features">
                    <img className="features" src={electric} />
                    <p className="features">Electricity</p>
                    <p className="features">Purchase</p>
                  </div>
                </Link>
              </Col>
              <Col xs="6" className="m-0 p-0">
                <Link to="/cable">
                  <div className="features">
                    <img className="features" src={cable} />
                    <p className="features">Cable TV</p>
                    <p className="features">Purchase</p>
                  </div>
                </Link>
              </Col>
            </Row>

            <p className="text-s t-16 mt-3">
              Merchant or developer?{" "}
              <label className="text-p">click here</label>
            </p>
          </Col>
          <Col md="6" className="d-flex justify-content-center">
            <Carousel fade controls={false} indicators={false}>
              <Carousel.Item interval={4000}>
                <div>
                  <img
                    src={illustrator0}
                    alt="First slide"
                    style={{ height: "60vh" }}
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <div>
                  <img
                    src={illustrator1}
                    alt="First slide"
                    style={{ height: "60vh" }}
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <div>
                  <img
                    src={illustrator2}
                    alt="First slide"
                    style={{ height: "60vh" }}
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <div>
                  <img
                    src={illustrator3}
                    alt="First slide"
                    style={{ height: "60vh" }}
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <div>
                  <img
                    src={illustrator4}
                    alt="First slide"
                    style={{ height: "60vh" }}
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <div>
                  <img
                    src={illustrator5}
                    alt="First slide"
                    style={{ height: "60vh" }}
                  />
                </div>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <div>
                  <img
                    src={illustrator6}
                    alt="First slide"
                    style={{ height: "60vh" }}
                  />
                </div>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </div>
      <FooterBar />
    </div>
  );
};

export default Dashboard;
