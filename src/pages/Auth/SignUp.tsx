import React, { useState, useContext } from 'react';
import billerFullPrimary from '../../images/billerFullPrimary.svg';
import loader from '../../images/loader.gif';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import API from '../../helpers/API';
import { UserContext } from '../../Store/UserContext';

const SignUp = () => {
    const { user, userDispatch } = useContext(UserContext);

    const [passwordVisible, setPasswordVisibility] = useState(false);
    const [error, setError] = useState('');
    const history = useNavigate();

    function togglePasswordVisibility() {
        setPasswordVisibility(!passwordVisible);
    }
    const [formSubmitted, setFormSubmitted] = useState('none');
    const {
        register,
         handleSubmit,
         setValue,
        formState: { errors ,isDirty,isValid},
    } = useForm({ mode: "onChange" });


    const onSubmit = (data: any) => {
        setError('');
        setFormSubmitted('inline');
        API('post', 'register', { ...data }, onSignUp, onFail, user.data && user.data);
    };

    function onSignUp(userData: any) {
        userDispatch({ type: 'STORE_USER_DATA', user: userData });
        history('/dashboard');
    }
    function onFail(error: string) {
        setError(error);
        setFormSubmitted('none');
    }

    return (
        <div className=" vertical-center text-center ">
            <div className="w-100 pt-5 pb-5">
                <p className="align-items-center ">
                    <Link to="/">
                        <img className="topbar-icon-left" src={billerFullPrimary} />
                    </Link>
                     <p>
                        <label>
                            <div className="bg-white m-3 p-4 ">
                                <form onSubmit={handleSubmit(onSubmit)} className=" auth-form mb-3 text-start">
                                    {errors.required && <span>This field is required</span>}

                                    <p className="text-p t-26-18">Sign Up</p>
                                    {error && <Alert className="bg-danger text-white">{error}</Alert>}
                                    <p className="t-16-14 pt-4 m-0 mb-1">Name</p>
                                    <input className="text-input form-control  mt-1 mb-2" {...register('name')} />

                                    <p className="t-16-14 pt-4 m-0 mb-1">Email Address</p>
                                    <input
                                        className="text-input form-control  mt-1 mb-2"
                                        {...register('email', { required: true,  })}
                                        type='email'
                                    />

                                    <p className="t-16-14 pt-4 m-0 mb-1">Phone Number</p>
                                    <input
                            className="form-input form-control  mt-1 mb-2"
                            {...register("phoneNumber", { required: true, maxLength: 11, minLength:11, 
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: "invalid phone number"
                                  },
                                  onChange: (e)=>{setValue('phoneNumber',e.target.value.replace(/\D/g, ''))}
                                 })}
                        />

                                    <p className="t-16-14 pt-4 m-0 mb-1">User Type</p>
                                    <select
                                        className="  form-control  mb-2"
                                        {...register('userType', { required: true })}
                                    >
                                        <option></option>
                                        <option value="individual">Individual</option>
                                        <option value="Sole_Proprietor">Merchant</option>
                                        <option value="Limited_Liability_Company">API for Registered Business</option>
                                    </select>

                                     <p className="t-16-14 pt-4 m-0 mb-1">Password</p>
                                    <div>
                                        <input
                                            {...register('password', { required: true })}
                                            className="form-input form-control  mb-2"
                                            type={passwordVisible ? 'text' : 'password'}
                                        />
                                        <div className="d-flex justify-content-end ">
                                            <i
                                                className={
                                                    passwordVisible
                                                        ? 'far  password-toggle fa-eye-slash'
                                                        : 'far  password-toggle fa-eye'
                                                }
                                                id="togglePassword"
                                                onClick={togglePasswordVisibility}
                                            ></i>
                                        </div>
                                    </div>

                                    <p className="t-16-14 pt-4 m-0 mb-1">Confirm Password</p>
                                    <div>
                                        <input
                                            {...register('confirmPassword', { required: true })}
                                            className="form-input form-control  mb-2"
                                            type={passwordVisible ? 'text' : 'password'}
                                        />
                                        <div className="d-flex justify-content-end ">
                                            <i
                                                className={
                                                    passwordVisible
                                                        ? 'far  password-toggle fa-eye-slash'
                                                        : 'far  password-toggle fa-eye'
                                                }
                                                id="togglePassword"
                                                onClick={togglePasswordVisibility}
                                            ></i>
                                        </div>
                                    </div>

                                    <button className="form-control mt-4 button" type="submit" value="Submit" disabled={!isDirty || !isValid}>
                                        Submit
                                        <img className="loader-icon" src={loader} style={{ display: formSubmitted }} />
                                    </button>
                                </form>

                                <hr />
                                <p>Already have an account?</p>
                                <p className="m-0 p-0">
                                    <Link to="/signin" className="text-p m-0 p-0">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        </label>
                    </p>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
