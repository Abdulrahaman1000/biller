import React, { useContext } from "react";
import monnifyFund from "../images/fund-monnify.svg";
import atmFund from "../images/fund-atm.svg";
import { Col, Row } from "react-bootstrap";
import { UserContext } from "../Store/UserContext";
import { formatCurrency, getOS } from "../helpers/utils";
import { Link } from "react-router-dom";

const WalletCardSI = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-p p-24-8">
      <Row>
        <Col lg="3">
          <p className="text-white t-14-12">Wallet Balance</p>
          <p className="text-white t-36-34">
            ₦{formatCurrency(user.data.wallet_balance)}
          </p>
        </Col>

        <Col lg="9" sm="12">
          <Row>
            <Col sm="12" lg="1">
              <div className="vl "></div>
            </Col>
            <Col>
              <div>
                <p className="text-white t-14-12">Funding Options</p>
                <div className="space-24-8">
                  <Link to="/MonnifyFunding">
                    <label className="bg-white rounded pt-2 pb-2 ps-3 pe-3  ">
                      <img className="funding-monnify" src={monnifyFund} />
                      <label className="t-14-8  text-p ms-2">
                        Fund with Monnify
                      </label>
                    </label>
                  </Link>

                  <Link to="/ATMFunding">
                    <label className="bg-white rounded pt-2 pb-2 ps-3 pe-3 ">
                      <img className="funding-monnify" src={atmFund} />
                      <label className="t-14-8 text-p ms-2">
                        Fund with ATM
                      </label>
                    </label>
                  </Link>
                  <Link to="/ATMFunding">
                    <label className="bg-white rounded pt-2 pb-2 ps-3 pe-3 ">
                      <img className="funding-monnify" src={atmFund} />
                      <label className="t-14-8 text-p ms-2">
                        Fund with AutoAgent
                      </label>
                    </label>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default WalletCardSI;
