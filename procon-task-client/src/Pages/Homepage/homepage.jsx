import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


import './homepage.css';
import Currencies from '../../Components/Currencies/Currencies';
import { Navbar } from '../../Components';

function Homepage() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userInfo = localStorage.getItem("userInfo");

    // Check if user is logged in
    useEffect(() => {
        if (userInfo) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    })

    return <div className='homepage-container'>
        <Navbar />
        <h1>Procon Task</h1>
        <h2>Currency Calculator</h2>
        <div className='currency-selector'>
            <p>Choose your currency</p>
            <Currencies />
            {isLoggedIn && <Link to="/add">
                <div className='currencies-container-currency'>Add New</div>
            </Link>}

        </div>
    </div>;
}

export default Homepage;
