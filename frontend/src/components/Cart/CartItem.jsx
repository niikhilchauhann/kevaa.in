import React from 'react';
import { Minus, Plus } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import './cartItems.css';
import { FaRegTrashCan } from 'react-icons/fa6';

const CartItem = ({
  id,
  title,
  color,
  price,
  quantity,
  image,
}) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  return (
    <div className="cart-item">
      <div className="cart-item__image">
        <img src={image} alt={title} className="cart-item__img" />
      </div>
      <div className="cart-item__details">
        <h3 className="cart-item__title">{title}</h3>
        <p className="cart-item__color">
          Color <span>{color}</span>
        </p>
        <div className="cart-item__actions">
          <div className="cart-item__quantity">
            <button
              onClick={() => updateQuantity(id, Math.max(1, quantity - 1))}
              className="qty-btn"
            >
              <Minus size={16} />
            </button>
            <span className="qty-value">{quantity}</span>
            <button
              onClick={() => updateQuantity(id, quantity + 1)}
              className="qty-btn"
            >
              <Plus size={16} />
            </button>
          </div>
          <button
            onClick={() => removeFromCart(id)}
            className="remove-btn"
          >
            <FaRegTrashCan />
          </button>
        </div>
      </div>
      <div className="cart-item__price">
        ₹{price.toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
