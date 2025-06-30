import React, { useState } from 'react';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import DiscountBanner from '../components/cart/DiscountBanner';
import AddressArea from '../components/cart/AddressArea';
import Shipment from '../components/cart/Shipment';
import PaymentMethod from '../components/cart/PaymentMethod';
import PaymentType from '../components/cart/PaymentType';
import Breadcrumb from '../components/cart/BreadCrumb';
import Apple from '../assets/apple.jpg';
import '../css/cart/carts.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Osmond Armchairs',
      color: 'Gunnared beige',
      price: 149.99,
      quantity: 1,
      image: Apple,
    },
    {
      id: 2,
      title: 'Meryl Lounge Chair',
      color: 'Lysed bright green',
      price: 169.99,
      quantity: 1,
      image: Apple,
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 31.9;
  const shipping = 0;
  const couponApplied = 0;

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-grid">
          {/* === LEFT SECTION === */}
          <div className="cart-left-section">
            <div className="cart-items-section">
              <div className="cart-box">
                <div className="cart-header">
                  <h1 className="cart-title">
                    Cart <span className="cart-count">{cartItems.length} ITEMS</span>
                  </h1>
                </div>
                <div className="cart-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item-wrapper">
                      <CartItem
                        {...item}
                        onQuantityChange={handleQuantityChange}
                        onRemove={handleRemoveItem}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="discount-banner-wrapper">
              <DiscountBanner />
            </div>

            <div className="breadcrumb-wrapper">
              <Breadcrumb />
            </div>

            <div className="adress-area-wrapper">
              <AddressArea />
              <Shipment />
            </div>

            <div className="payment-area-wrapper">
              <PaymentMethod />
              <PaymentType />
            </div>
          </div>

          {/* === RIGHT STICKY ORDER SUMMARY === */}
          <div className="cart-summary-section">
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              couponApplied={couponApplied}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
