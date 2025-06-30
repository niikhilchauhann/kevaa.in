import React from 'react';
import { Minus, Plus } from 'lucide-react';
import '../../css/cart/cartItems.css'

const CartItem = ({
  id,
  title,
  color,
  price,
  quantity,
  image,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <div className="cart-item">
      {/* Product Image */}
      <div className="cart-item__image">
        <img 
          src={image} 
          alt={title}
          className="cart-item__img"
        />
      </div>
      
      {/* Product Details */}
      <div className="cart-item__details">
        <h3 className="cart-item__title">{title}</h3>
        <p className="cart-item__color">
          Color <span>{color}</span>
        </p>
        
        {/* Quantity Controls and Remove */}
        <div className="cart-item__actions">
          <div className="cart-item__quantity">
            <button
              onClick={() => onQuantityChange(id, Math.max(1, quantity - 1))}
              className="qty-btn"
            >
              <Minus size={16} />
            </button>
            <span className="qty-value">{quantity}</span>
            <button
              onClick={() => onQuantityChange(id, quantity + 1)}
              className="qty-btn"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={() => onRemove(id)}
            className="remove-btn"
          >
            Remove
          </button>
        </div>
      </div>
      
      {/* Price */}
      <div className="cart-item__price">
        ${price.toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
