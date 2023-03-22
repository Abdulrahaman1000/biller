import React, { useState, useContext } from "react";
import WalletCardNSI from "../../components/WalletCardNSI";
import WalletCardSI from "../../components/WalletCardSI";
import { UserContext } from "../../Store/UserContext";
import API from "../../helpers/API";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Col, Dropdown, Row, Toast } from "react-bootstrap";
import loader from "../../images/loader.gif";
import mtn from "../../images/mtn.svg";
import glo from "../../images/glo.svg";
import airtel from "../../images/airtel.svg";
import etisalat from "../../images/etisalat.svg";
import profileDropdownImg from "../../images/profileDropdownImg.svg";
import PaymentCard from "../../components/PaymentCard";

const Dashboard = () => {
  const { user, userDispatch } = useContext(UserContext);

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    alert("copied!");
  }
  return (
    <div className="p-48-16 w-100">
      <p className="text-p t-26">Monnify Wallet Funding</p>

      <p className="t-14">Fund your wallet with Monnify</p>

      {user.data ? <WalletCardSI /> : <WalletCardNSI />}

      <hr className="mt-0 mb-3 pt-0"></hr>
      <div className="bg-white p-4">
        <p>
          To fund your wallet, make payment into any of the accounts below. Your
          Wallet will be credited automatically. The Accounts below are only for
          your wallet.
        </p>
        <p className="text-danger">Delivery Time: 1-30mins</p>
        <Row>
          <Col sm="6" xs="12">
            <div className="rounded background-s m-2 p-2">
              <p>Bank Name: Wema Bank</p>
              <p>
                Account Number: {user.data.monnifyWemaAccountNumber}{" "}
                <label
                  className="text-p pointer"
                  onClick={() =>
                    copyToClipboard(user.data.monnifyWemaAccountNumber)
                  }
                >
                  copy <i className="fas fa-copy"></i>
                </label>
              </p>
              <p>Account Name: Monnify-Biller {user.data.firstName}</p>
            </div>
          </Col>

          <Col sm="6" xs="12">
            <div className="rounded background-s m-2 p-2">
              <p>Bank Name: Monniepoint MFB</p>
              <p>
                Account Number: {user.data.monnifyRolexAccountNumber}{" "}
                <label
                  className="text-p pointer"
                  onClick={() =>
                    copyToClipboard(user.data.monnifyRolexAccountNumber)
                  }
                >
                  copy <i className="fas fa-copy"></i>
                </label>
              </p>
              <p>Account Name: Monnify-Biller {user.data.firstName}</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
