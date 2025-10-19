import React, { useEffect, useState } from 'react';
import CartItem from '../components/Cart/CartItem';
import OrderSummary from '../components/cart/OrderSummary';
import DiscountBanner from '../components/Cart/DiscountBanner';
import AddressArea from '../components/Cart/AddressArea';
import Shipment from '../components/Cart/Shipment';
// import PaymentMethod from '../components/Cart/PaymentMethod';
import ThankYouModal from '../components/Cart/ThankYouModal';
import PaymentType from '../components/Cart/PaymentType';
import Breadcrumb from '../components/Cart/BreadCrumb';
import useCartStore from '../store/cartStore'; // <-- import store
import './cart.css';
import OrderReceiptModal from '../components/Cart/OrderReceiptModal';
import { auth } from '../firebase';
import ScrollToTop from '../components/global/ScrollTop';
import { NavLink } from 'react-router-dom';
import useAuthStore from '../store/authStore';


const Cart = () => {

  const { items, loadCart, updateQuantity, removeFromCart, loading, placeOrder, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [showThankYou, setShowThankYou] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState('online'); // added payment type state

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



  const handleProceedToCheckout = () => {
    if (currentStep === 1) setCurrentStep(2); // Move to address selection
    // If not on cart step, do nothing
  };
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
  let shipping = 49; // base shipping price changed from 0 to 49
  const couponApplied = 0;

  // Add extra 49 if payment type is COD
  if (selectedPaymentType === 'cod') {
    shipping += 49;
  }


  const handleCODOrder = async () => {
    setPayLoading(true);
    try {
      const amount = subtotal - discount + shipping - couponApplied;
      const orderDetails = {
        addressId: selectedAddress,
        amount,
        paymentId: 'COD',
        items,
      };
      await placeOrder(orderDetails);
      await clearCart();
      // alert('Order placed successfully with Cash on Delivery.');
      setShowThankYou(true);
    } catch (err) {
      alert('Something went wrong while placing the order.');
    } finally {
      setPayLoading(false);
    }
  };
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
          <PaymentType selectedPaymentType={selectedPaymentType} setSelectedPaymentType={setSelectedPaymentType} />
          {selectedPaymentType === 'cod' ? (
            <button
              className="show-order-modal-btn"
              onClick={async () => {
                setPayLoading(true);
                try {
                  const amount = subtotal - discount + shipping - couponApplied;
                  const orderDetails = {
                    addressId: selectedAddress,
                    amount,
                    paymentId: 'COD',
                    items,
                  };
                  await placeOrder(orderDetails);
                  await clearCart();
                  alert('Order placed successfully with Cash on Delivery.');
                } catch (err) {
                  console.error('Error placing order:', err.message);
                  alert('Something went wrong while placing the order.');
                } finally {
                  setPayLoading(false);
                }
              }}
              style={{ marginTop: 24 }}
            >
              Place Order (Cash on Delivery)
            </button>
          ) : (
            <button
              className="show-order-modal-btn"
              onClick={() => setShowOrderModal(true)}
              style={{ marginTop: 24 }}
            >
              Review & Place Order
            </button>
          )}
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
        const orderDetails = {
          addressId: selectedAddress,
          amount,
          paymentId: paymentResponse.razorpay_payment_id,
          items,
        };

        await placeOrder(orderDetails);

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
      name: "Kevaa",
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


  

  if (!loading && items.length === 0) {
    return (
      <div className="cart-page">
        <ScrollToTop />
        <div className="empty-cart-message">
          <h2>Your cart is empty 🛒</h2>
          <div className="cart-buttons">
            <NavLink to="/products" className="go-back-link">← Continue Shopping</NavLink>
            { user && <NavLink to="/userdashboard">
              <button className="go-dashboard-btn">Go to Dashboard</button>
            </NavLink> }

          </div>
        </div>{
          showThankYou && <ThankYouModal onClose={() => setShowThankYou(false)}/>
        }
      </div>
    );
  }

  return (
    <div className="cart-page">
      <ScrollToTop />
      <div className="cart-container">
        <div className="cart-grid">
          <div className="cart-left-section">

            {/* STEP 1: Cart Items + Proceed to Checkout */}
            {currentStep === 1 && (
              <>
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
                {/* <button
                  className="checkout-btn"
                  onClick={() => setCurrentStep(2)}
                >
                  Proceed to Checkout
                </button> */}
              </>
            )}

            {/* STEP 2: AddressArea + Next Button */}
            {currentStep === 2 && (
              <>
                <Breadcrumb step={1} />
                <AddressArea userId={userId} onSelectAddress={setSelectedAddress} />
                <button
                  className="step-btn"
                  onClick={() => setCurrentStep(3)}
                  style={{ marginTop: 16 }}
                  disabled={!selectedAddress}
                >
                  Next
                </button>
              </>
            )}

            {/* STEP 3: PaymentMethod + PaymentType + Place Order Button */}
            {currentStep === 3 && (
              <>
                <Breadcrumb step={2} />
                {/* <PaymentMethod /> */}
                <PaymentType
                  selectedPaymentType={selectedPaymentType}
                  setSelectedPaymentType={setSelectedPaymentType}
                />
                {selectedPaymentType === 'cod' ? (
                  <button
                    className="show-order-modal-btn"
                    onClick={handleCODOrder}
                    disabled={payLoading}
                    style={{ marginTop: 24 }}
                  >
                    {payLoading ? "Placing Order..." : "Place Order (Cash on Delivery)"}
                  </button>
                ) : (
                  <button
                    className="show-order-modal-btn"
                    onClick={() => setShowOrderModal(true)}
                    disabled={payLoading}
                    style={{ marginTop: 24 }}
                  >
                    Review & Place Order
                  </button>
                )}
              </>
            )}
          </div>

          {/* === RIGHT STICKY ORDER SUMMARY === */}
          <div className="cart-summary-section">
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              couponApplied={couponApplied}
            />
              {currentStep === 1 && (
               <button
               className="checkout-btn summary-action"
               onClick={() => setCurrentStep(2)}
              >
                Proceed to Checkout
              </button>
           )}
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
