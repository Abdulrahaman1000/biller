import React, { useContext } from "react";
import billerFullPrimary from "../images/billerFullPrimary.svg";
import notification from "../images/notification.svg";
import dropdownImg from "../images/dropdownImg.svg";
import faqP from "../images/faqP.svg";
import profileDropdownImg from "../images/profileDropdownImg.svg";
import { Dropdown, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../Store/UserContext";
import API from "../helpers/API";

const TopBar = (props: any) => {
  const dropdownOnClick = () => {
    props.setNavCollapse(false);
  };

  const { user, userDispatch } = useContext(UserContext);
  const history = useNavigate();

  function logout() {
    // API("post", "logout", {}, onSuccess, onFail, user.data && user.token);
    API("post", "logout", {}, onSuccess, onSuccess, user.data && user.token);
  }

  function onSuccess(data: any) {
    console.log(data);
    userDispatch({ type: "SIGNOUT" });
    history("/");
  }

  function onFail(error: string) {
    console.log(error);
  }

  return (
    <div className="mt-3 bg-white pb-3 w-100">
      <div className="d-flex justify-content-between  align-items-center">
        <a>
          <img
            className="topbar-dropdowm-img navigator-img-sm ms-3 "
            onClick={dropdownOnClick}
            src={dropdownImg}
          />
          <Link to="/">
            <img
              className="topbar-icon-left navigator-img-lg ms-4"
              src={billerFullPrimary}
            />
          </Link>
        </a>
        <div>
          <Link to="/">
            <img
              className="topbar-icon-left  navigator-img-sm"
              src={billerFullPrimary}
            />
          </Link>
        </div>
        <label className="float-end">
          <img className="topbar-notification   me-5" src={notification} />
          {user.data ? (
            <React.Fragment>
              <img
                className="profile-img me-2 pt-2  navigator-img-lg"
                src={faqP}
              />
              <label className=" navigator-img-lg p-0 m-0">
                <Row>
                  <label className="t-14 text-p profile-name">
                    <b>{`${user.data.firstname && user.data.firstname} ${
                      user.data.othername && user.data.othername
                    } ${user.data.lastname && user.data.lastname}`}</b>
                  </label>
                  <label className="t-12 text-s">{user.data.userType}</label>
                </Row>
              </label>
              <label>
                <Dropdown className=" me-3  navigator-img-lg  ">
                  <Dropdown.Toggle
                    className=" bg-white text-black border-white "
                    bsPrefix="p-0"
                    id="dropdown-basic"
                  >
                    <img
                      className="profile-dropdown-img "
                      src={profileDropdownImg}
                    />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="  align-items-center">
                      <Link to="/dashboard">Dashboard</Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="  align-items-center">
                      <Link to="/transactions">Transactions</Link>
                    </Dropdown.Item>
                    <Dropdown.Item className="  align-items-center">
                      <Link to="/settings">Settings</Link>
                    </Dropdown.Item>
                    <Dropdown.Item
                      className="  align-items-center"
                      onClick={logout}
                    >
                      <label>Sign Out</label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </label>
            </React.Fragment>
          ) : (
            <label className="text-p text-small me-4  navigator-img-lg">
              <Link to="/signin" className="button p-2 m-1">
                Login
              </Link>
              <Link to="/signup" className="button p-2 m-1">
                Sign Up
              </Link>
            </label>
          )}
        </label>
      </div>
    </div>
  );
};

export default TopBar;
