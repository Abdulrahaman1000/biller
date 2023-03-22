import React, { useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import billerFullWhite from "../images/billerFullWhite.svg";
import cancel from "../images/cancel.svg";
import dashboardP from "../images/dashboardP.svg";
import dashboardG from "../images/dashboardG.svg";
import dashboardW from "../images/dashboardW.svg";
import transactionsG from "../images/transactionsG.svg";
import transactionsW from "../images/transactionsW.svg";
import transactionsP from "../images/transactionsP.svg";
import settingsP from "../images/settingsP.svg";
import settingsW from "../images/settingsW.svg";
import settingsG from "../images/settingsG.svg";
import contactG from "../images/contactG.svg";
import contactW from "../images/contactW.svg";
import contactP from "../images/contactP.svg";
import faqP from "../images/faqP.svg";
import faqW from "../images/faqW.svg";
import faqG from "../images/faqG.svg";
import { UserContext } from "../Store/UserContext";

const NavBar = (props: any) => {
  useEffect(() => {
    let matchingMenuItem = null;
    const ul = document.getElementById("navigator");
    if (ul) {
      const items = ul.getElementsByTagName("a");
      for (let i = 0; i < items.length; ++i) {
        if (window.location.pathname === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        NavigatorActivator(matchingMenuItem);
      } else {
        NavigatorActivator(items[0]);
      }
    }
  }, [useLocation()]);

  const cancelOnClick = () => {
    props.setNavCollapse(true);
  };

  const NavigatorActivator = (item: HTMLAnchorElement) => {
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("navigator-active");
    }
    item.getElementsByTagName("span").length > 0 &&
      item.getElementsByTagName("span")[0].classList.add("navigator-active");
    item.getElementsByTagName("span").length > 0 &&
      item.getElementsByTagName("span")[0].classList.remove("navigator-item");

    const images = item.getElementsByTagName("img");
    for (let i = 0; i < images.length; ++i) {
      if (i === 2) images[i].classList.remove("d-none");
      else images[i].classList.add("d-none");
    }
  };

  const Nav = () => {
    const { user } = useContext(UserContext);

    return (
      <React.Fragment>
        <div className=" navigator-img-sm  ">
          <div className="  align-items-center d-flex ms-3 me-3 mb-5">
            <img className="nav-icon" src={billerFullWhite} />
            <label className="w-100">
              <img
                className="nav-cancel  "
                onClick={cancelOnClick}
                src={cancel}
              />
            </label>
          </div>
          <div className="navigator-item align-items-center rounded d-flex">
            {user.data ? (
              <React.Fragment>
                <img className="profile-img ms-2 me-2 " src={faqW} />
                <div>
                  <label className="t-14 text-white profile-name">
                    <b>{`${user.data.firstname} ${user.data.othername} ${user.data.lastname}`}</b>
                  </label>
                  <label className="t-12 text-white">Corporate User</label>
                </div>
              </React.Fragment>
            ) : (
              <label className="text-white t-14 me-4  ms-3 navigator-img-sm">
                <Link to="/signin">Login/Sign Up</Link>
              </label>
            )}
          </div>
        </div>
        <p className="ms-5 mt-4 t-10 text-s navigator-img-lg">General</p>
        <p className="ms-4 mt-4 t-10 text-gray navigator-img-sm">General</p>
        <div className="navigator-item align-items-center rounded ">
          <Link to="/dashboard">
            <img
              className="navigator-img ms-2 me-3 navigator-img-lg"
              src={dashboardG}
            />
            <img
              className="navigator-img ms-2 me-3 navigator-img-sm"
              src={dashboardW}
            />
            <img className="navigator-img ms-2 me-3 d-none" src={dashboardP} />
            <span className="navigator-item">Dashboard</span>
          </Link>
        </div>
        <div className="navigator-item  align-items-center rounded">
          <Link to="/transactions">
            <img
              className="navigator-img ms-2 me-3 navigator-img-lg"
              src={transactionsG}
            />
            <img
              className="navigator-img ms-2 me-3 navigator-img-sm"
              src={transactionsW}
            />
            <img
              className="navigator-img ms-2 me-3 d-none"
              src={transactionsP}
            />
            <span className="navigator-item">Transactions</span>
          </Link>
        </div>
        <hr className="m-4"></hr>
        <p className="ms-5 mt-4 t-10 text-s navigator-img-lg">Account</p>
        <p className="ms-4 mt-4 t-10 text-gray navigator-img-sm">Account</p>
        <div className="navigator-item align-items-center rounded ">
          <Link to="/settings">
            <img
              className="navigator-img ms-2 me-3 navigator-img-lg"
              src={settingsG}
            />
            <img
              className="navigator-img ms-2 me-3 navigator-img-sm"
              src={settingsW}
            />
            <img className="navigator-img ms-2 me-3 d-none" src={settingsP} />
            <span className="navigator-item">Settings</span>
          </Link>
        </div>
        <div className="navigator-item  align-items-center rounded">
          <Link to="/contact">
            <img
              className="navigator-img ms-2 me-3 navigator-img-lg"
              src={contactG}
            />
            <img
              className="navigator-img ms-2 me-3 navigator-img-sm"
              src={contactW}
            />
            <img className="navigator-img ms-2 me-3 d-none" src={contactP} />
            <span className="navigator-item">Contact</span>
          </Link>
        </div>
        <div className="navigator-item  align-items-center rounded">
          <Link to="/faq">
            <img
              className="navigator-img ms-2 me-3 navigator-img-lg"
              src={faqG}
            />
            <img
              className="navigator-img ms-2 me-3 navigator-img-sm"
              src={faqW}
            />
            <img className="navigator-img ms-2 me-3 d-none" src={faqP} />
            <span className="navigator-item">FAQ</span>
          </Link>
        </div>
      </React.Fragment>
    );
  };
  return (
    <div id="navigator" className="navigator">
      {<Nav />}
    </div>
  );
};

export default NavBar;
