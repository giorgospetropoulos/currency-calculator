import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { NavDropdown, Button } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import './Navbar.css'

function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userInfo = localStorage.getItem("userInfo");
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        if (userInfo) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    })

    return <div className='navbar fixed-top'>
        <div className="navbar-links">
            <div className="navbar-links-logo">
                <Link to="/">
                    Currency Calculator
                </Link>
            </div>
        </div>
        <div className='navbar-links-menu'>
            <div className='navbar-links-menu-container'>
                <Link to="/">
                    Home
                </Link>
                {/* Render different components, depending on if the user is logged in */}
                {!isLoggedIn && <Link to="/login">
                    <Button id='log-in-btn'>Log in</Button>
                </Link>}
                {!isLoggedIn && <Link to="/register">
                    <Button id='sign-up-btn'>Register</Button>
                </Link>}
                {isLoggedIn && <NavDropdown title="Profile" id="basic-nav-dropdown">
                    <NavDropdown.Item>
                        {isLoggedIn && <span>Signed in as: {JSON.parse(userInfo).username}</span>}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => {
                        localStorage.removeItem("userInfo");
                        setIsLoggedIn(false);
                        navigate(`/`, { replace: true });
                    }}>
                        Log Out
                    </NavDropdown.Item>
                </NavDropdown>}
            </div>
        </div>
    </div>;
}

export default Navbar;
