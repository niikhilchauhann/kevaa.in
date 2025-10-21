import React, { useState } from 'react';
import Filters from '../components/explore/Filters.jsx';
import ProductList from '../components/explore/ProductList.jsx';
import { products as allProducts } from '../data/realProducts.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight, MdFilterList } from "react-icons/md";
import './explore.css';
import ServiceHighlights from '../components/Home/ServiceHighlights.jsx';
import Testimonials from '../components/Home/Testimonials.jsx';
import useAuthStore from '../store/authStore.js';
import ScrollToTop from '../components/Global/ScrollTop.jsx';



const Products = () => {
    const user = useAuthStore(state => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const paths = location.pathname.split('/').filter(p => p);
    const fullPaths = paths.map((_, i) => '/' + paths.slice(0, i + 1).join('/'));

    const [filters, setFilters] = useState({
        category: [],
        colors: [],
        sizes: [],
        dressStyles: [],
        priceRange: 500
    });

    const handleFilterApply = (newFilters) => {
        setFilters(newFilters);
    };

    return (
        <div className='main-products-container' style={{ marginTop: `${user ? '120px' : '120px'}` }}>
            <ScrollToTop/>
            {/* Breadcrumbs */}
            <div className="navigations-routes">
                <span onClick={() => navigate('/')} className="breadcrumb-link">Home</span>
                {paths.map((segment, index) => (
                    <React.Fragment key={index}>
                        <span className="breadcrumb-separator">
                            <MdOutlineKeyboardArrowRight />
                        </span>
                        <span
                            className="breadcrumb-link"
                            onClick={() => navigate(fullPaths[index])}
                        >
                            {decodeURIComponent(segment.charAt(0).toUpperCase() + segment.slice(1))}
                        </span>
                    </React.Fragment>
                ))}

                <button
                    className="mobile-filter-btn"
                    onClick={() => setShowSidebar(true)}
                    aria-label="Open Filters"
                    type="button"
                >
                    <MdFilterList size={22} />
                    <span style={{ marginLeft: 4 }}>Filters</span>
                </button>
            </div>

            {/* Filters & Product List */}
            <div className="app">
                <div className={`sidebar${showSidebar ? ' open' : ''}`} style={{ zIndex: `${showSidebar ? '1302' : '0'}`}}>
                    {/* Mobile close btn */}
                    <button
                        className="close-filter-btn"
                        onClick={() => setShowSidebar(false)}
                        aria-label="Close filters"
                        type="button"
                    >✖</button>
                    <Filters onApply={handleFilterApply} />
                </div>
                {/* Backdrop */}
                <div
                    className={`sidebar-backdrop${showSidebar ? ' show' : ''}`}
                    onClick={() => setShowSidebar(false)}
                />
                <div className="main">
                    <ProductList products={allProducts} filters={filters} />
                </div>
            </div>
            <div className='other-components'>
                <ServiceHighlights />
                <Testimonials />
            </div>
        </div>
    );
};

export default Products;
