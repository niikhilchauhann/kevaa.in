import { products as allProducts } from "../../data/realProducts";
import "./popularProducts.css"; // keep if you have section-specific layout styles
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";
import { Link, useNavigate } from "react-router-dom";

export default function PopularProducts() {
  const addToCart = useCartStore((state) => state.addToCart);
  const popularItems = allProducts.popularProducts.slice(0);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleAddToCart = (proditem, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) addToCart(proditem);
    else navigate("/login");
  };

  return (
    <section className="popular-section">
      <h3>Customer Favorites</h3>
      <h2>Popular Products</h2>
      <p>
        Our top selling products that you may like
      </p>

      <div className="grid">
        {popularItems.map((item) => (
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
    </section>
  );
}
