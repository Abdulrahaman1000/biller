import React, { useEffect, useState, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import PrivacyPolicy from "./pages/Home/PrivacyPolicy";
import TermsAndConditions from "./pages/Home/TermsAndConditions";
import FAQs from "./pages/Home/FAQs";
import Airtime from "./pages/Airtime/Airtime";
import Data from "./pages/Data/Data";
import Cable from "./pages/Cable/Cable";
import Electric from "./pages/Electric/Electric";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Transactions from "./pages/Transactions/Transactions";
import Settings from "./pages/Settings/Settings";
import ATMFunding from "./pages/Wallet/ATMFunding";
import MonnifyFunding from "./pages/Wallet/MonnifyFunding";
import Page404 from "./pages/Page404";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import { UserContext } from "./Store/UserContext";

const App = () => {
  const { user } = useContext(UserContext);
  // const navigate = useNavigate();

  function authPage(element: any) {
    return user.data ? <Navigate to="/" /> : element;
  }

  function isPrivate(element: any) {
    return user.data ? element : <Navigate to="/signin" />;
  }

  const routes = [
    // public Routes
    { path: "/", element: <Dashboard />, WithLayout: true },
    { path: "/privacy-policy", element: <PrivacyPolicy />, WithLayout: false },
    { path: "/terms", element: <TermsAndConditions />, WithLayout: false },
    { path: "/faqs", element: <FAQs />, WithLayout: false },
    { path: "/signin", element: <SignIn />, authPage: true },
    { path: "/signup", element: <SignUp />, authPage: true },
    { path: "/forgotPassword", element: <ForgotPassword />, authPage: true },
    // { path: '/resetPassword', element: <ResetPassword/>, ispublic: true },

    // Private Routes
    { path: "/dashboard", element: <Dashboard />, WithLayout: true },
    { path: "/airtime", element: <Airtime />, WithLayout: true },
    { path: "/data", element: <Data />, WithLayout: true },
    { path: "/cable", element: <Cable />, WithLayout: true },
    { path: "/electric", element: <Electric />, WithLayout: true },

    {
      path: "/settings",
      element: <Settings />,
      WithLayout: true,
      isPrivate: true,
    },
    {
      path: "/transactions",
      element: <Transactions />,
      WithLayout: true,
      isPrivate: true,
    },
    {
      path: "/ATMFunding",
      element: <ATMFunding />,
      WithLayout: true,
      isPrivate: true,
    },
    {
      path: "/MonnifyFunding",
      element: <MonnifyFunding />,
      WithLayout: true,
      isPrivate: true,
    },
    { path: "/*", element: <Page404 />, WithLayout: false },
  ];

  const WithLayout = (WrappedComponent: JSX.Element) => {
    const [navCollapse, setNavCollapse] = useState(false);
    useEffect(() => {
      const width = window.innerWidth;
      width < 768 && setNavCollapse(true);
    }, []);
    return (
      <React.Fragment>
        <TopBar setNavCollapse={setNavCollapse} />
        <div style={{ display: "flex" }}>
          {!navCollapse && <NavBar setNavCollapse={setNavCollapse} />}
          {WrappedComponent}
        </div>
      </React.Fragment>
    );
  };

  return (
    <Routes>
      {routes.map((route, idx) => {
        if (route.WithLayout) {
          return route.isPrivate ? (
            <Route
              path={route.path}
              element={WithLayout(isPrivate(route.element))}
              key={idx}
            />
          ) : (
            <Route
              path={route.path}
              element={WithLayout(route.element)}
              key={idx}
            />
          );
        } else {
          return (
            <Route
              path={route.path}
              element={route.authPage ? authPage(route.element) : route.element}
              key={idx}
            />
          );
        }
      })}
    </Routes>
  );
};

export default App;
