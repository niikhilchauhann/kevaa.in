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


const products =
    [
        {
            "id": 1,
            "label": "Hot",
            "title": "Fresh organic villa farm lemon 500gm pack",
            "category": "Snack",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 28.85,
            "originalPrice": 32.8,
            "image": lemonImg
        },
        {
            "id": 2,
            "label": "Sale",
            "title": "Best snakes with hazel nut pack 200gm",
            "category": "Hodo Foods",
            "rating": 3.5,
            "brand": "Stouffer",
            "price": 52.85,
            "originalPrice": 55.8,
            "image": nutpackImg
        },
        {
            "id": 3,
            "label": "New",
            "title": "Organic fresh venila farm watermelon 5kg",
            "category": "Snack",
            "rating": 4.0,
            "brand": "StarKist",
            "price": 48.85,
            "originalPrice": 55.8,
            "image": watermelonImg
        },
        {
            "id": 4,
            "label": "",
            "title": "Fresh organic apple 1kg simla marning",
            "category": "Vegetables",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 17.85,
            "originalPrice": 19.8,
            "image": vegetablesImg
        },
        {
            "id": 5,
            "label": "",
            "title": "Canada Dry Ginger Ale - 2 L Bottle - 200ml - 400g",
            "category": "Meats",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 32.85,
            "originalPrice": 35.8,
            "image": gingeraleImg
        },
        {
            "id": 6,
            "label": "-15%",
            "title": "Blue Diamond Almonds Lightly Salted Vegetables",
            "category": "Pet Foods",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 23.85,
            "originalPrice": 25.8,
            "image": almondsImg
        },
        {
            "id": 7,
            "label": "Hot",
            "title": "Fresh organic villa farm lemon 500gm pack",
            "category": "Snack",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 28.85,
            "originalPrice": 32.8,
            "image": lemonImg
        },
        {
            "id": 8,
            "label": "Sale",
            "title": "Best snakes with hazel nut pack 200gm",
            "category": "Hodo Foods",
            "rating": 3.5,
            "brand": "Stouffer",
            "price": 52.85,
            "originalPrice": 55.8,
            "image": nutpackImg
        },
        {
            "id": 9,
            "label": "New",
            "title": "Organic fresh venila farm watermelon 5kg",
            "category": "Snack",
            "rating": 4.0,
            "brand": "StarKist",
            "price": 48.85,
            "originalPrice": 55.8,
            "image": watermelonImg
        },
        {
            "id": 10,
            "label": "",
            "title": "Fresh organic apple 1kg simla marning",
            "category": "Vegetables",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 17.85,
            "originalPrice": 19.8,
            "image": vegetablesImg
        },
        {
            "id": 11,
            "label": "",
            "title": "Canada Dry Ginger Ale - 2 L Bottle - 200ml - 400g",
            "category": "Meats",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 32.85,
            "originalPrice": 35.8,
            "image": gingeraleImg
        },
        {
            "id": 12,
            "label": "-15%",
            "title": "Blue Diamond Almonds Lightly Salted Vegetables",
            "category": "Pet Foods",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 23.85,
            "originalPrice": 25.8,
            "image": almondsImg
        },
        {
            "id": 13,
            "label": "Hot",
            "title": "Fresh organic villa farm lemon 500gm pack",
            "category": "Snack",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 28.85,
            "originalPrice": 32.8,
            "image": lemonImg
        },
        {
            "id": 14,
            "label": "Sale",
            "title": "Best snakes with hazel nut pack 200gm",
            "category": "Hodo Foods",
            "rating": 3.5,
            "brand": "Stouffer",
            "price": 52.85,
            "originalPrice": 55.8,
            "image": nutpackImg
        },
        {
            "id": 15,
            "label": "New",
            "title": "Organic fresh venila farm watermelon 5kg",
            "category": "Snack",
            "rating": 4.0,
            "brand": "StarKist",
            "price": 48.85,
            "originalPrice": 55.8,
            "image": watermelonImg
        },
        {
            "id": 16,
            "label": "",
            "title": "Fresh organic apple 1kg simla marning",
            "category": "Vegetables",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 17.85,
            "originalPrice": 19.8,
            "image": vegetablesImg
        },
        {
            "id": 17,
            "label": "",
            "title": "Canada Dry Ginger Ale - 2 L Bottle - 200ml - 400g",
            "category": "Meats",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 32.85,
            "originalPrice": 35.8,
            "image": gingeraleImg
        },
        {
            "id": 18,
            "label": "-15%",
            "title": "Blue Diamond Almonds Lightly Salted Vegetables",
            "category": "Pet Foods",
            "rating": 4.0,
            "brand": "NestFood",
            "price": 23.85,
            "originalPrice": 25.8,
            "image": almondsImg
        }
    ]

export default function CategoryGrid() {
    const [selectedCategory, setSelectedCategory] = useState('Featured');
    const categories = ['Featured', 'Popular', 'New Added'];

    const [visibleCount, setVisibleCount] = useState(12);

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
                            <button>Shop Now</button>
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
                    {products.slice(0, visibleCount).map((product) => (
                        <div className="product-card" key={product.id}>
                            {product.label && (
                                <div className={`product-label ${getLabelClass(product.label)}`}>
                                    {product.label}
                                </div>
                            )}
                            <img src={product.image} alt={product.title} className="product-image" />
                            <p className="product-category">{product.category}</p>
                            <h4 className="product-title">{product.title}</h4>
                            <p className='rates'> <span className='rating'><IoStar /> </span> <span>( {product.rating} ) </span></p>
                            <p className="product-brand">By <span>{product.brand}</span></p>
                            <div className='cart'>
                                <div className="price">
                                    <span className="current">${product.price}</span>
                                    <span className="original">${product.originalPrice}</span>
                                </div>
                                <button className="add-btn">
                                    <BsCart3 /> Add
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            {visibleCount < products.length && (
                <div className="load-more-container">
                    <button className="load-more-btn" onClick={handleLoadMore}>
                        Load More <FaArrowRight />
                    </button>
                </div>
            )}
        </>
    );
}
