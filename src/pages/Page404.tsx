import React from 'react';
import billerFullPrimary from '../images/billerFullPrimary.svg';
import { Link } from 'react-router-dom';

const TopBar = () => {
    return (
        <div className=" vertical-center text-center ">
            <label className="w-100">
                <p>
                    <img className="topbar-icon-left" src={billerFullPrimary} />
                </p>
                <p className="text-p">Yepa! You got lost!</p>
                <p className="text-s">
                    <Link to="/">
                        <u>Take me home</u>
                    </Link>
                </p>
            </label>
        </div>
    );
};

export default TopBar;
