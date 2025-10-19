import { useEffect, useRef, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import logo from "../../assets/keva2.png";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoSearch } from 'react-icons/io5';
import { FiSearch, FiUser, FiShoppingBag } from 'react-icons/fi';

import { onAuthStateChanged, signOut, getAuth } from 'firebase/auth';
import { auth } from '../../firebase';
import useSearchStore from '../../store/searchStore';
import useCartStore from '../../store/cartStore';
import useAuthStore from '../../store/authStore';
import './../../pages/home.css';
import './../../components/global/navbar.css';


function Navbar() {
    const [cartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();
    const authInstance = getAuth();

    const user = useAuthStore(state => state.user);
    const setUser = useAuthStore(state => state.setUser);
    const [loggedIn, SetLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);

    const searchRef = useRef(null);
    const cartItems = useCartStore(state => state.items);
    const cartCount = cartItems.length;
    const searchQuery = useSearchStore((state) => state.searchQuery);
    const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
    const searchBoxRef = useRef(null);
    const dropdownRef = useRef(null);
    const photoRef = useRef(null);

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
        navigate('/products');
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser || null);
            SetLoggedIn(!!firebaseUser);
        });
        return () => unsubscribe();
    }, [setUser]);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "auto";
    }, [menuOpen]);

    // Hide dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
                photoRef.current && !photoRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        }
        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen]);

    return (
        <div className={`header-navbar-controller ${!loggedIn ? 'has-topbar' : ''}`}>
            <nav className="navbar">
                <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </div>
                <NavLink to='/' className='navbar-logo-link'>
                <div className="logo">
                    <img src={logo} alt="Kevaa Logo" />
                </div>
                </NavLink>

                <ul className={`nav-links ${menuOpen ? "active" : ""}`} style={{ top: `${menuOpen && !loggedIn ? '120px' : ' '}` }}>
                    <NavLink to='products'><li>Explore</li></NavLink>
                    <NavLink to='/about'><li>About</li></NavLink>
                    <NavLink to='/blogs'><li>Blogs</li></NavLink>
                    <NavLink to='/contact-us'><li>Contact Us</li></NavLink>
                </ul>

                <div className="icons">
                    <span className="search-icon-wrapper">
                        {/* <IoSearch className="icons-navigations" onClick={handleSearchIconClick} /> */}
                        <FiSearch className="icons-navigations" title="Search" onClick={handleSearchIconClick}/>
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
                    <span className="cart-icon-wrapper" onClick={() => setCartOpen(true)}>
                    <FiShoppingBag className="icons-navigations" title="Cart" />
                    {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </span>

                    <span style={{ position: "relative", cursor: "pointer" }}>
                        <div onClick={() => setDropdownOpen(!dropdownOpen)} ref={photoRef}>
                            {user ? (
                                user?.photoURL ? (
                                    <img
                                        src={user?.photoURL}
                                        alt={user?.displayName[0] || 'U'}
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
                                <FiUser className="icons-navigations" title="Account" />
                            )}
                        </div>
                        {dropdownOpen && (
                            <div className="profile-dropdown" ref={dropdownRef}>
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
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                navigate('/userdashboard?tab=orders');
                                            }}
                                            className="dropdown-button"
                                        >
                                            Orders
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
        {cartOpen && (
            <>
                <div className="cart-overlay" onClick={() => setCartOpen(false)}></div>
                <div className="cart-sidebar">
                <div className="cart-side-header">
                    <h3>Your Cart</h3>
                    <button className="close-cart-btn" onClick={() => setCartOpen(false)}>×</button>
                </div>
                <div className="cart-body">
                    {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                    ) : (
                    cartItems.map((item, idx) => (
                        <div key={idx} className="cart-item">
                        <img src={item.image} alt={item.name} />
                        <div>
                            <h4>{item.name}</h4>
                            <p>₹{item.price}</p>
                        </div>
                        </div>
                    ))
                    )}
                </div>
                <button className="checkout-btn" onClick={() => { setCartOpen(false); navigate('/cart'); }}>
                    Go to Checkout
                </button>
                </div>
            </>
            )}
        </div>
    );
}

export default Navbar;
