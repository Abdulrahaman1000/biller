import React from "react";
import monnifyFund from "../images/fund-monnify.svg";
import atmFund from "../images/fund-atm.svg";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const WalletCardNSI = () => {
  return (
    <div className="bg-p p-24-8">
      <Row>
        <Col md="8" sm="12">
          <p className="text-white t-14-12">
            Create an account, fund your wallet and start buying at discounts
          </p>
        </Col>
        <Col>
          <div className="vl-usi"></div>
        </Col>
      </Row>
    </div>
  );
};

export default WalletCardNSI;
