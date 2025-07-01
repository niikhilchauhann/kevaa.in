import React, { useEffect, useState } from 'react';
import CartItem from '../components/cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import DiscountBanner from '../components/cart/DiscountBanner';
import AddressArea from '../components/cart/AddressArea';
import Shipment from '../components/cart/Shipment';
import PaymentMethod from '../components/cart/PaymentMethod';
import PaymentType from '../components/cart/PaymentType';
import Breadcrumb from '../components/cart/BreadCrumb';
import useCartStore from '../store/cartStore'; // <-- import store
import '../css/cart/carts.css';

const Cart = () => {
  const { items, loadCart, updateQuantity, removeFromCart, loading } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    loadCart(); // Firestore se current user ka cart load karo
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 31.9;
  const shipping = 0;
  const couponApplied = 0;

  let stepComponent;
  switch (currentStep) {
    case 1:
      stepComponent = <AddressArea />;
      break;
    case 2:
      stepComponent = <Shipment />;
      break;
    case 3:
      stepComponent = (
        <>
          <PaymentMethod />
          <PaymentType />
        </>
      );
      break;
    default:
      stepComponent = <AddressArea />;
  }

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
                    Cart <span className="cart-count">{items.length} ITEMS</span>
                  </h1>
                </div>
                <div className="cart-items">
                  {loading ? (
                    <div>Loading...</div>
                  ) : items.length === 0 ? (
                    <div>Your cart is empty.</div>
                  ) : (
                    items.map(item => (
                      <div key={item.id} className="cart-item-wrapper">
                        <CartItem
                          {...item}
                          onQuantityChange={handleQuantityChange}
                          onRemove={handleRemoveItem}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="discount-banner-wrapper">
              <DiscountBanner />
            </div>

            <div className="breadcrumb-wrapper">
              <Breadcrumb step={currentStep} />
            </div>

            <div className="adress-area-wrapper">
              {stepComponent}
              <div className="step-controls">
                {currentStep > 1 && (
                  <button onClick={handlePrevious} className="step-btn">
                    Previous
                  </button>
                )}
                <button onClick={handleNext} className="step-btn">
                  {currentStep === 3 ? 'Place Order' : 'Next'}
                </button>
              </div>
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
