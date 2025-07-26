// src/components/PopularProducts.jsx

import { products as allProducts} from "../data/realProducts";
import "../css/home/popularProducts.css";

export default function PopularProducts() {
    const popularItems = allProducts.popularProducts.slice(0); // Show only 4 items

    return (
        <div className="popular-section">
            <h3>Customer Favorites</h3>
            <h2>Popular Products</h2>
            <p>Our top selling products that you may like</p>

            <div className="popular-grid">
                {popularItems.map((item) => (
                    <div className="popular-card" key={item.id}>
                        <div className="popular-image-box">
                            <img src={item.image} alt={item.name} />
                            {item.discount && (
                                <div className="popular-discount-badge">Save {item.discount}%</div>
                            )}
                            {item.isNew && <div className="popular-new-badge">New</div>}
                        </div>
                        <div className="popular-content">
                            <h4>{item.name}</h4>
                            <div className="popular-price">
                                ${item.price} <del>${item.originalPrice}</del>
                                <span>-{item.discount}%</span>
                            </div>
                            <button className="popular-add-btn">+</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
