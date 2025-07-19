import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import logo from "../assets/logo1.png";
import { BsCart2 } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaBars, FaTimes } from "react-icons/fa";
import { IoSearch } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import '../css/home/home.css';
import '../css/home/navbar.css';
import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { auth } from '../firebase';
import useSearchStore from '../store/searchStore';
import useCartStore from '../store/cartStore';

function Navbar() {
    const navigate = useNavigate();
    const authInstance = getAuth();

    const [user, setUser] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);

    const searchRef = useRef(null);
    const cartItems = useCartStore(state => state.items);
    const cartCount = cartItems.length;
    // const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const searchQuery = useSearchStore((state) => state.searchQuery);
    const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
    const searchBoxRef = useRef(null);


    // Hide search box on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setShowSearchBox(false);
            }
        }
        if (showSearchBox) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showSearchBox]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchIconClick = () => {
        setShowSearchBox((prev) => !prev);
        // Optionally focus input after showing
        setTimeout(() => {
            if (searchBoxRef.current) {
                const input = searchBoxRef.current.querySelector('input');
                if (input) input.focus();
            }
        }, 100);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setShowSearchBox(false);
        navigate('/products'); // Optional: always go to products page on search
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user || null);
        });
        return () => unsubscribe();
    }, []);
    
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
    }, [menuOpen]);
    // ...rest of your code (user, menu, etc.)

    return (
        <div className='header-navbar-controller'>
            <header className="top-bar">
                <p>
                    Sign up and get 20% off your first order. <a href="/signup">Sign Up Now</a>
                </p>
            </header>
            <nav className="navbar">
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
                </div>
                <NavLink to='/'><div className="logo"><img src={logo} alt="Kevaa Logo" /></div></NavLink>
                <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
                    <NavLink to='products'>
                        <li>Discovery <IoIosArrowDown /></li>
                    </NavLink>
                    <NavLink to='/about'><li>About</li></NavLink>
                    <NavLink to='/contact-us'><li>Contact Us</li></NavLink>
                </ul>
                <div className="icons">
                    {/* Search Icon */}
                    <span className="search-icon-wrapper">
                        <IoSearch className="icons-navigations" onClick={handleSearchIconClick} />
                        {showSearchBox && (
                            <div className="search-dropdown" ref={searchBoxRef}>
                                <form onSubmit={handleSearchSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="search-input"
                                    />
                                    <button type="submit" className="search-submit-btn">
                                        <IoSearch />
                                    </button>
                                </form>
                            </div>
                        )}
                    </span>
                    <span className="cart-icon-wrapper" style={{ position: "relative" }}>
                        <NavLink to='/cart'>
                            <BsCart2 className='icons-navigations' />
                            {/* Cart Badge */}
                            {cartCount > 0 && (
                                <span className="cart-badge">{cartCount}</span>
                            )}
                        </NavLink>
                    </span>
                    <span style={{ position: "relative", cursor: "pointer" }}>
                        <div onClick={() => setDropdownOpen(!dropdownOpen)}>
                            {user ? (
                                user?.photoURL ? (
                                    <img
                                        src={user?.photoURL}
                                        alt="User"
                                        style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            width: 28,
                                            height: 28,
                                            borderRadius: '50%',
                                            background: '#e91e63',
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            textTransform: 'uppercase'
                                        }}
                                    >
                                        {user.displayName ? user.displayName[0] : "U"}
                                    </div>
                                )
                            ) : (
                                <CgProfile className='icons-navigations' />
                            )}
                        </div>
                        {dropdownOpen && (
                            <div className="profile-dropdown">
                                {user ? (
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
                                            onClick={async () => {
                                                await signOut(auth);
                                                setDropdownOpen(false);
                                                navigate('/login');
                                            }}
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
