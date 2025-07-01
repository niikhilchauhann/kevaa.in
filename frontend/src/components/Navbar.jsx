import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo1.png";
import { BsCart2 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaBars, FaTimes } from "react-icons/fa";
import { IoSearch } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import '../css/home/home.css';
import '../css/home/navbar.css';
import { NavLink } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [userPhoto, setUserPhoto] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setDropdownOpen(false);
            navigate('/login'); // Logout ke baad login page pe redirect
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserPhoto(user.photoURL);
                console.log('current user', user.displayName, ' is having ', user.photoURL);
            } else {
                setUserPhoto(null);
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className='header-navbar-controller'>
            <header className="top-bar">
                <p>
                    Sign up and get 20% off your first order. <a href="/signup">Sign Up Now</a>
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
                    <span><IoSearch className='icons-navigations' /></span>
                    <span><NavLink to='/cart'><BsCart2 className='icons-navigations' /></NavLink></span>
                    <span style={{ position: "relative", cursor: "pointer" }}>
                        <div onClick={toggleDropdown}>
                            {userPhoto ? (
                                <img
                                    src={userPhoto}
                                    alt="User"
                                    style={{ width: 28, height: 28, borderRadius: '50%' }}
                                />
                            ) : (
                                <CgProfile className='icons-navigations' />
                            )}
                        </div>
                        {dropdownOpen && (
                            <div className="profile-dropdown">
                                {userPhoto ? (
                                    <>
                                        <button
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                navigate('/userdashboard');
                                            }}
                                            className="dropdown-button"
                                        >
                                            Dashboard
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="dropdown-button"
                                            style={{ color: "#f44336" }}
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                navigate('/signup');
                                            }}
                                            className="dropdown-button"
                                        >
                                            Sign Up
                                        </button>
                                        <button
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                navigate('/login');
                                            }}
                                            className="dropdown-button"
                                        >
                                            Login
                                        </button>
                                    </>
                                )}
                            </div>
                        )}
                    </span>

                </div>
            </nav>
        </div>
    );
}

export default Navbar;
