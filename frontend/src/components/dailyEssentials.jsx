// src/components/DailyEssentials.jsx

import { products as allProducts } from "../data/realProducts";
import "../css/home/dailyEssentials.css";
import { useState } from "react";

const itemsPerPage = 8;

export default function DailyEssentials() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(allProducts.dailyEssentials.length / itemsPerPage);

  const currentItems = allProducts.dailyEssentials.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  return (
    <div className="daily-section">
      <h2>Daily Essentials</h2>
      <p>Order it for you or for your beloved ones</p>

      <div className="grid">
        {currentItems.map((item) => (
          <div className="card" key={item.id}>
            <div className="image-box">
              <img src={item.image} alt={item.name} />
              {item.discount && <div className="discount-badge">Save {item.discount}%</div>}
              {item.isNew && <div className="new-badge">New</div>}
            </div>
            <div className="content">
              <h4>{item.name}</h4>
              <div className="price">
                ${item.price} <del>${item.originalPrice}</del> 
                <span>-{item.discount}%</span>
              </div>
              <button className="add-btn">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            className={`dot ${page === i ? "active" : ""}`}
            onClick={() => setPage(i)}
          />
        ))}
      </div>
    </div>
  );
}
