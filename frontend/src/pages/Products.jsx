import React, { useState } from 'react';
import Filters from '../components/products/Filters';
import ProductList from '../components/products/ProductList';
import { products as allProducts } from '../data/realProducts.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import '../css/products/products.css';
import ServiceHighlights from '../components/ServiceHighlights.jsx';
import Testimonials from '../components/Testimonials.jsx';

const Products = () => {
    const location = useLocation();
    const navigate = useNavigate();

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
        <div className='main-products-container'>
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
            </div>

            {/* Filters & Product List */}
            <div className="app">
                <div className="sidebar">
                    <Filters onApply={handleFilterApply} />
                </div>
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
