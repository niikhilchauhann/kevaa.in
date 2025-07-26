// src/components/CategoryGrid.jsx
import React, { useState } from 'react';
import '../css/home/categoryGrid.css';
import { BsCart3 } from 'react-icons/bs';
import lemonImg from '../assets/lemon.png';
import nutpackImg from '../assets/nutpack.png';
import watermelonImg from '../assets/watermelon.png';
import vegetablesImg from '../assets/vegetables.png';
import gingeraleImg from '../assets/gingerale.png';
import almondsImg from '../assets/almonds.png';
import { IoStar } from 'react-icons/io5';
import { FaArrowRight } from 'react-icons/fa6';
import useCartStore from '../store/cartStore';
import { NavLink } from 'react-router-dom';
import { products as allProducts } from '../data/realProducts'

export default function CategoryGrid() {
    const addToCart = useCartStore(state => state.addToCart);
    const { items, removeFromCart, updateQuantity, loadCart } = useCartStore();
    React.useEffect(() => {
        loadCart(); // Load cart on mount or when user changes
    }, []);
    const [selectedCategory, setSelectedCategory] = useState('Featured');
    const categories = ['Featured', 'Popular', 'New Added'];

    const [visibleCount, setVisibleCount] = useState(8);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 6); // load 6 more at a time
    };
    const getLabelClass = (label) => {
        if (label.toLowerCase().includes("hot")) return "hot";
        if (label.toLowerCase().includes("sale")) return "sale";
        if (label.toLowerCase().includes("new")) return "new";
        if (label.includes("%")) return "discount";
        return "";
    };
    return (
        <>
            <div className='initial-category'>
                <div>
                    {categories.map((category) => (
                        <span
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={selectedCategory === category ? 'active' : ''}
                        >
                            {category}
                        </span>
                    ))}
                </div>
            </div>
            <div className="category-section">
                <div className='sidebar'>
                    <div className="side-banner">
                        <div className="overlay-grid">
                            <h3>Chappan <span>BHOJ</span></h3>
                            <p>100% Pure 🍎</p>
                           <NavLink style={{color: 'white'}} to='/products' ><button>Shop Now</button></NavLink>
                        </div>
                    </div>

                    <div className="category-main">
                        <div className="filters">
                            <ul>
                                <li className="active">All <FaArrowRight /></li>
                                <li>Poshaks <FaArrowRight /></li>
                                <li>Deepaks <FaArrowRight /></li>
                                <li>Attars <FaArrowRight /></li>
                                <li>Fruits <FaArrowRight /></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="products">
                    {allProducts.categoryProducts.slice(0, visibleCount).map((product) => (
                        <div className="product-card" key={product.id}>
                            {product.label && (
                                <div className={`product-label ${getLabelClass(product.label)}`}>
                                    {(product.label.toLowerCase() == 'save' ) ? `Save ${product.discount}%` : product.label}
                                </div>
                            )}
                            <img src={product.image} alt={product.title} className="product-image" />
                            <p className="product-category">{product.category}</p>
                            <h4 className="product-title">{product.name}</h4>
                            <p className='rates'> <span className='rating'><IoStar /> </span> <span>( {product.rating} ) </span></p>
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
            {visibleCount < allProducts.categoryProducts.length && (
                <div className="load-more-container">
                    <button className="load-more-btn" onClick={handleLoadMore}>
                        Load More <FaArrowRight />
                    </button>
                </div>
            )}
        </>
    );
}
