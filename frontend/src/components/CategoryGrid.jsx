// src/components/CategoryGrid.jsx
import React, { useEffect, useState } from 'react';
import '../css/home/categoryGrid.css';
import { BsCart3 } from 'react-icons/bs';
import { IoStar } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa6';
import useCartStore from '../store/cartStore';
import { NavLink } from 'react-router-dom';
import { products as allProducts } from '../data/realProducts'

export default function CategoryGrid() {
    const addToCart = useCartStore(state => state.addToCart);
    const { loadCart } = useCartStore();

    useEffect(() => {
        loadCart(); // Load cart on mount or when user changes
    }, []);

    const [selectedLabel, setSelectedLabel] = useState('All');
    const [selectedFilterCategory, setSelectedFilterCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(8);

    const labelTabs = ['All', 'Hot', 'Sale', 'New', 'Save'];
    const sidebarCategories = ['All', 'Poshaks', 'Deepaks', 'Attars', 'Maala', 'Foods', 'Samagri'];

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 6); // load 6 more at a time
    };

    const getLabelClass = (label) => {
        if (!label) return '';
        const lower = label.toLowerCase();
        if (lower.includes('hot')) return 'hot';
        if (lower.includes('sale')) return 'sale';
        if (lower.includes('new')) return 'new';
        if (lower === 'save' || lower.includes('%')) return 'discount';
        return '';
    };
const filteredProducts = allProducts.categoryProducts.filter(product => {
  const label = product.label?.toLowerCase() || '';
  const category = product.category?.toLowerCase() || '';
  const selectedLabelLower = selectedLabel.toLowerCase();
  const selectedCategoryLower = selectedFilterCategory.toLowerCase();

  const matchesLabel =
    selectedLabelLower === 'all' || label.includes(selectedLabelLower);

  const matchesCategory =
    selectedCategoryLower === 'all' || category.includes(selectedCategoryLower);

  return matchesLabel && matchesCategory;
});

    return (
        <>
           <div className='initial-category'>
                <div>
                    {labelTabs.map(label => (
                        <span
                            key={label}
                            onClick={() => setSelectedLabel(label)}
                            className={selectedLabel === label ? 'active' : ''}
                        >
                            {label}
                        </span>
                    ))}
                </div>
            </div>
            <div className="category-section">
               {/* Sidebar Filters */}
                <div className='sidebar'>
                    <div className="side-banner">
                        <div className="overlay-grid">
                            <h3>Chappan <span>BHOJ</span></h3>
                            <p>100% Pure 🍎</p>
                            <NavLink style={{ color: 'white' }} to='/products'>
                                <button>Shop Now</button>
                            </NavLink>
                        </div>
                    </div>

                    <div className="category-main">
                        <div className="filters">
                            <ul>
                                {sidebarCategories.map(category => (
                                    <li
                                        key={category}
                                        onClick={() => setSelectedFilterCategory(category)}
                                        className={selectedFilterCategory === category ? 'active' : ''}
                                    >
                                        {category} <FaArrowRight />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="products">
                 {filteredProducts.slice(0, visibleCount).map(product => (
                        <div className="product-card" key={product.id}>
                            {product.label && (
                                <div className={`product-label ${getLabelClass(product.label)}`}>
                                    {(product.label.toLowerCase() === 'save') ?
                                        `Save ${product.discount}%` :
                                        product.label}
                                </div>
                            )}
                            <img src={product.image} alt={product.name} className="product-image" />
                            <p className="product-category">{product.category}</p>
                            <h4 className="product-title">{product.name}</h4>
                            <p className='rates'>
                                <span className='rating'><IoStar /></span>
                                <span>({product.rating})</span>
                            </p>
                            <p className="product-brand">By <span>{product.brand}</span></p>
                            <div className='cart'>
                                <div className="price">
                                    <span className="current">${product.price}</span>
                                    <span className="original">${product.originalPrice}</span>
                                </div>
                                <button
                                    className="add-btn"
                                    onClick={() => addToCart(product)}
                                >
                                    <BsCart3 /> Add
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            {visibleCount < filteredProducts.length && (
                <div className="load-more-container">
                    <button className="load-more-btn" onClick={handleLoadMore}>
                        Load More <FaArrowRight />
                    </button>
                </div>
            )}
        </>
    );
}
