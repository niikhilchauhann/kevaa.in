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
import OrderReceiptModal from '../components/cart/OrderReceiptModal';
import { auth } from '../firebase';


const Cart = () => {
  const { items, loadCart, updateQuantity, removeFromCart, loading, placeOrder, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);

  const [showOrderModal, setShowOrderModal] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);
  useEffect(() => {
    loadCart(); // Firestore se current user ka cart load karo
  }, []);

  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsubscribe();
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
      stepComponent = <AddressArea userId={userId} onSelectAddress={setSelectedAddress} />;
      break;
    case 2:
      stepComponent = <Shipment />;
      break;
    case 3:
      stepComponent = (
        <>
          <PaymentMethod />
          <PaymentType />
          <button
            className="show-order-modal-btn"
            onClick={() => setShowOrderModal(true)}
            style={{ marginTop: 24 }}
          >
            Review & Place Order
          </button>
          <button
            className="show-order-modal-btn"
            onClick={async () => {
              if (!selectedAddress) {
                alert("Please select address first");
                return;
              }

              await placeOrder({
                address: selectedAddress,
                amount: subtotal - discount + shipping - couponApplied,
                paymentId: "test_bypass_" + Date.now(), // mock payment ID
              });

              await clearCart();
              alert("Test Order Placed Without Payment!");
            }}
            style={{ marginTop: 12, backgroundColor: "#ddd", color: "#000" }}
          >
            🚧 Bypass & Place Order (Test)
          </button>
        </>
      );
      break;
    default:
      stepComponent = <AddressArea />;
  }

  // Razorpay payment handler
  const handlePlaceOrder = () => {
    setPayLoading(true);

    const amount = subtotal - discount + shipping - couponApplied;

    const handleSuccess = async (paymentResponse) => {
      try {
        await placeOrder({
          address: selectedAddress,
          amount,
          paymentId: paymentResponse.razorpay_payment_id,
        });

        await clearCart();

        alert("Payment successful! Payment ID: " + paymentResponse.razorpay_payment_id);
      } catch (err) {
        console.error("Error placing order:", err.message);
        alert("Something went wrong while placing the order.");
      } finally {
        setPayLoading(false);
        setShowOrderModal(false);
      }
    };

    const handleFailure = () => {
      setPayLoading(false);
      alert("Payment cancelled.");
    };

    handleRazorpayPayment({
      amount,
      user,
      address: selectedAddress,
      items,
      onSuccess: handleSuccess,
      onFailure: handleFailure,
    });
  };


  // 1️⃣ Paste the function here:
  const handleRazorpayPayment = async ({ amount, user, address, items, onSuccess, onFailure }) => {
    const options = {
      key: "rzp_test_aNekzbf3DEXHpA", // Replace with your Razorpay key
      amount: amount * 100, // paise
      currency: "INR",
      name: "Your Shop Name",
      description: "Order Payment",
      handler: function (response) {
        onSuccess(response);
      },
      prefill: {
        name: user?.name || "",
        email: user?.email || "",
        contact: address?.contact || "",
      },
      notes: {
        address: `${address?.houseNo}, ${address?.streetName}, ${address?.city}`,
      },
      theme: { color: "#9a155a" },
      modal: { ondismiss: onFailure },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

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

            <div className="address-area-wrapper">
              {stepComponent}
              <div className="step-controls">
                {currentStep > 1 && (
                  <button onClick={handlePrevious} className="step-btn">
                    Previous
                  </button>
                )}
                {currentStep < 3 && (
                  <button onClick={handleNext} className="step-btn">
                    Next
                  </button>
                )}
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
      <OrderReceiptModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        user={user}
        address={selectedAddress}
        items={items}
        total={subtotal - discount + shipping - couponApplied}
        onPlaceOrder={handlePlaceOrder}
        loading={payLoading}
      />
    </div>
  );
};

export default Cart;
