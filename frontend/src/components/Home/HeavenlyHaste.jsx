import "./heavenlyHaste.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { products as allProducts } from "../../data/realProducts";
import useCartStore from "../../store/cartStore";
import useAuthStore from "../../store/authStore";

export default function HeavenlyHaste() {
  const addToCart = useCartStore((state) => state.addToCart);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleAddToCart = (proditem, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) addToCart(proditem);
    else navigate("/login");
  };

  const getLabelClass = (label) => {
    const lower = label.toLowerCase();
    if (lower.includes("sale") && lower.includes("best")) return "best-sale";
    if (lower.includes("save")) return "save";
    if (lower.includes("sale")) return "sale";
    return "";
  };

  return (
    <div className="heavenly-container">
      <h2 className="section-title">Heavenly Haste</h2>

      <div className="heavenly-grid">
        <div className="heavenly-banner">
          <img
            src="https://res.cloudinary.com/dh3qwxhmm/image/upload/v1754670855/aradhana_qydi2v.jpg"
            alt="Aradhana Banner"
          />
          <div className="banner-overlay">
            <h3>Bring nature into your home</h3>
            <NavLink to="/products" style={{ color: "white" }}>
              <button>Shop Now</button>
            </NavLink>
          </div>
        </div>

        {allProducts.havenlyHaste.map((item) => (
          <Link
            key={item.id}
            to={`/products/product/${item.id}`}
            className="product-card-link"
          >
            <div className="heavenly-card">
              <div className={`label ${getLabelClass(item.label)}`}>
                {item.label.toLowerCase() === "save"
                  ? `Save ${item.discount}%`
                  : item.label}
              </div>

              <img src={item.image} alt={item.title} />

              <div className="heavenly-haste-product">
                <h4>{item.brand}</h4>
                <p className="title">{item.name}</p>

                <div className="price">
                  <span>₹{item.price}</span>
                  <del>₹{item.originalPrice}</del>
                </div>

                <div className="sold-bar">
                  <div
                    className="bar"
                    style={{
                      width: `${(item.sold / item.total) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="sold">Remaining: {item.total - item.sold}</p>

                <button
                  className="cart-btn"
                  onClick={(e) => handleAddToCart(item, e)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="heavenly-boxes">
        <div className="box">
          <p>Everyday Fresh & Clean Products</p>
          <NavLink to="/products" style={{ color: "white" }}>
            <button>Shop Now</button>
          </NavLink>
        </div>

        <div className="box pink">
          <p>Make your Day Divine and Spiritual</p>
          <NavLink to="/products" style={{ color: "white" }}>
            <button>Shop Now</button>
          </NavLink>
        </div>

        <div className="box blue">
          <p>The best Pooja Products Online</p>
          <NavLink to="/products" style={{ color: "white" }}>
            <button>Shop Now</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
