// src/components/HeavenlyHaste.jsx
import '../css/home/heavenlyHaste.css';
import chandanImage from '../assets/chandan.jpg';
import aradhanaBanner from '../assets/aradhana.jpg';
import { BsCart3 } from 'react-icons/bs';
import { IoStar } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
// import product2 from '../assets/product2.png';
// import product3 from '../assets/product3.png';

const products = [
  {
    id: 1,
    label: "Sale",
    brand: "Kevaa Original",
    title: "Natural Chandan (100% pure) No additives",
    price: 238.85,
    originalPrice: 245.8,
    sold: 90,
    total: 120,
    image: chandanImage,
  },
  {
    id: 2,
    label: "Best sale",
    brand: "Mangaldeep",
    title: "Natural Chandan (100% pure) No additives",
    price: 238.85,
    originalPrice: 245.8,
    sold: 90,
    total: 120,
    image: chandanImage,
  },
  {
    id: 3,
    label: "Save 15%",
    brand: "Hari Om",
    title: "Natural Chandan (100% pure) No additives",
    price: 238.85,
    originalPrice: 245.8,
    sold: 90,
    total: 120,
    image: chandanImage,
  },
];


export default function HeavenlyHaste() {
  function getLabelClass(label) {
  if (label.toLowerCase().includes('sale') && label.toLowerCase().includes('best')) {
    return 'best-sale';
  } else if (label.toLowerCase().includes('save')) {
    return 'save';
  } else if (label.toLowerCase().includes('sale')) {
    return 'sale';
  }
  return '';
}
  return (
    <div className="heavenly-container">
      <h2 className="section-title">Heavenly Haste</h2>

      <div className="heavenly-grid">
        <div className="heavenly-banner">
          <img src={aradhanaBanner} alt="Aradhana Banner" />
          <div className="banner-overlay">
            <h3>Bring nature into your home</h3>
            <button>Shop Now <FaArrowRightLong /></button>
          </div>
        </div>

        {products.map((item) => (
          <div className="heavenly-card" key={item.id}>
           <div className={`label ${getLabelClass(item.label)}`}>{item.label}</div>
            <img src={item.image} alt={item.title} />
            <h4>{item.brand}</h4>
            <p className="title">{item.title}</p>
            <p className='rating'><IoStar/></p>
            <div className="price">
              <span>${item.price}</span>
              <del>${item.originalPrice}</del>
            </div>
            <div className="sold-bar">
              <div className="bar" style={{ width: `${(item.sold / item.total) * 100}%` }}></div>
            </div>
            <p className="sold">Sold: {item.sold}/{item.total}</p>
            <button className="cart-btn"><BsCart3 /> Add To Cart</button>
          </div>
        ))}
      </div>

      <div className="heavenly-boxes">
        <div className="box prod1">
          <p>Everyday Fresh & Clean with Our Products</p>
          <button>Shop Now</button>
        </div>
        <div className="box prod2">
          <p>Make your Day Divine and Spiritual</p>
          <button>Shop Now</button>
        </div>
        <div className="box prod3">
          <p>The best Pooja Products Online</p>
          <button>Shop Now</button>
        </div>
      </div>
    </div>
  );
}
