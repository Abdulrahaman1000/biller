import React, { useState } from 'react';
import billerFullPrimary from '../../images/billerFullPrimary.svg';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const SignIn = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const onSubmit = (data: any) => console.log(data);

    console.log(watch('example')); // watch input value by passing the name of it

    return (
        <div className=" vertical-center text-center ">
            <div className="w-100  pt-5 pb-5 ">
                <p className="align-items-center ">
                    <Link to="/">
                        <img className="topbar-icon-left" src={billerFullPrimary} />
                    </Link>
                    {/* <Alert color="success">Alert1</Alert> */}
                    <p>
                        <label>
                            <div className="bg-white m-3 p-4 ">
                                <form onSubmit={handleSubmit(onSubmit)} className=" auth-form mb-3 text-start">
                                    <p className="text-p t-26-18">Reset Password</p>
                                    {/* register your input into the hook by invoking the "register" function */}
                                    <p className="t-16-14 pt-4 m-0 mb-1">Email address/Phone Number</p>
                                    <input className="text-input form-control  mt-1 mb-2" {...register('example')} />
                                    <input className="form-control mt-4 button" type="submit" value="Submit" />
                                </form>
                                <hr />
                                <p>Remember Account Details?</p>
                                <p className="m-0 p-0">
                                    <Link to="/signin" className="text-p m-0 p-0">
                                        Sign in
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

export default SignIn;
