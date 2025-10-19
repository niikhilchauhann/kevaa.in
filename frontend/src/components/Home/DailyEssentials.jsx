import { products as allProducts } from "../../data/realProducts";
import "./dailyEssentials.css";
import { useState, useRef, useEffect } from "react";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const itemsPerPage = 8;

export default function DailyEssentials() {
  const addToCart = useCartStore((state) => state.addToCart);
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(allProducts.dailyEssentials.length / itemsPerPage);
  const sectionRef = useRef(null);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const currentItems = allProducts.dailyEssentials.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage
  );

  const handleAddToCart = (proditem, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) addToCart(proditem);
    else navigate("/login");
  };

  const handlePrev = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (sectionRef.current) {
      const topOffset = sectionRef.current.offsetTop - 80;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  }, [page]);

  return (
    <div className="daily-section" ref={sectionRef}>
      <h2>Daily Essentials</h2>
      <p>Order it for you or for your beloved ones</p>

      <div className="carousel-container">
        <button className="nav-arrow left" onClick={handlePrev}>
          <FaChevronLeft />
        </button>

        <div className="grid">
          {currentItems.map((item) => (
            <Link
              to={`/products/product/${item.id}`}
              className="product-card-link"
              key={item.id}
            >
              <div className="card">
                <div className="image-box">
                  <img src={item.image} alt={item.name} />
                  {item.discount && (
                    <div className="discount-badge">Save {item.discount}%</div>
                  )}
                  {item.isNew && <div className="new-badge">New</div>}
                </div>
                <div className="content">
                  <h4>{item.name}</h4>
                  <div className="price">
                    ₹{item.price} <del>₹{item.originalPrice}</del>
                    {item.discount > 0 && <span>Limited Time</span>}
                  </div>
                  <button
                    className="add-btn"
                    onClick={(e) => handleAddToCart(item, e)}
                  >
                    +
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <button className="nav-arrow right" onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            className={`dot ${page === i ? "active" : ""}`}
            onClick={() => setPage(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
