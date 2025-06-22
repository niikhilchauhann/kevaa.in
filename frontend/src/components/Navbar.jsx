import React from 'react'
import logo from "../assets/logo1.png";
import { useState } from 'react';
import { BsCart2 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaBars, FaTimes } from "react-icons/fa";
import { IoSearch } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import '../css/home/home.css'
import { NavLink } from 'react-router-dom';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (

        <div className='header-navbar-controller'>
            <header className="top-bar">
                <p>
                    Sign up and get 20% off your first order. <a href="#">Sign Up Now</a>
                </p>
            </header>
            <nav className="navbar">
                <div className="hamburger" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
                </div>
                <div className="logo"><img src={logo} alt="Kevaa Logo" /></div>
                <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                    <NavLink to='products'>
                        <li>Discovery <IoIosArrowDown /></li>
                    </NavLink>
                    <li>About</li>
                    <li>Contact us</li>
                </ul>
                <div className="icons">
                    <span><IoSearch /></span>
                    <span><BsCart2 /></span>
                    <span><CgProfile /></span>
                </div>
            </nav>

        </div>
    )
}

export default Navbar
