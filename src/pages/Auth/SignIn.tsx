import React, { useState, useContext } from "react";
import billerFullPrimary from "../../images/billerFullPrimary.svg";
import loader from "../../images/loader.gif";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import API from "../../helpers/API";
import { UserContext } from "../../Store/UserContext";

const SignIn = () => {
  const { user, userDispatch } = useContext(UserContext);

  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [error, setError] = useState("");
  const history = useNavigate();

  function togglePasswordVisibility() {
    setPasswordVisibility(!passwordVisible);
  }
  const [loaderClass, setLoaderClass] = useState("none");
  const [buttonClass, setButtonClass] = useState("inline");

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data: any) => {
    if (loaderClass === "inline") return;
    setError("");
    setLoaderClass("inline");
    setButtonClass("none");
    API("post", "signin", data, onLogin, onFail, user.data && user.data);
  };

  function onLogin(userData: any) {
    userDispatch({ type: "STORE_USER_DATA", user: userData });
    history("/dashboard");
  }
  function onFail(error: string) {
    setError(error);
    setLoaderClass("none");
    setButtonClass("inline");
  }

  return (
    <div className="vertical-center text-center ">
      <div className="w-100  pt-5 pb-5 ">
        <p className="align-items-center ">
          <Link to="/">
            <img className="topbar-icon-left" src={billerFullPrimary} />
          </Link>
          <div>
            <label>
              <div className="bg-white m-3 p-4 ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className=" auth-form mb-3 text-start"
                >
                  {errors.required && <span>This field is required</span>}

                  <p className="text-p t-26-18">Log in</p>
                  {error && (
                    <Alert className="bg-danger text-white">{error}</Alert>
                  )}
                  <p className="t-16-14 pt-4 m-0 mb-1">
                    Email address/Phone Number
                  </p>
                  <input
                    className="text-input form-control  mt-1 mb-2"
                    {...register("identifier", {
                      required: true,
                      minLength: 1,
                    })}
                  />

                  <p className="t-16-14 pt-4 m-0 mb-1">Password</p>

                  <div>
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 1,
                      })}
                      className="form-input form-control  mb-2"
                      type={passwordVisible ? "text" : "password"}
                    />
                    <div className="d-flex justify-content-end ">
                      <i
                        className={
                          passwordVisible
                            ? "far  password-toggle fa-eye-slash"
                            : "far  password-toggle fa-eye"
                        }
                        id="togglePassword"
                        onClick={togglePasswordVisibility}
                      ></i>
                    </div>
                  </div>
                  <button
                    className="form-control mt-4 button "
                    type="submit"
                    value="Submit"
                    disabled={!isValid || !isDirty}
                  >
                    <label style={{ display: buttonClass }}>Submit</label>
                    <img
                      className="loader-icon"
                      src={loader}
                      style={{ display: loaderClass }}
                    />
                  </button>
                </form>
                <p>
                  <Link to="/forgotpassword" className="text-p">
                    Forgot Password?
                  </Link>
                </p>
                <hr />
                <p>Don{"'"}t have Password?</p>
                <p className="m-0 p-0">
                  <Link to="/signup" className="text-p m-0 p-0">
                    Sign up
                  </Link>
                </p>
              </div>
            </label>
          </div>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
