import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import CartItem from '../components/Cart/CartItem';
import OrderSummary from '../components/Cart/OrderSummary';
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
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) setUserId(user.uid);
      else setUserId(null);
    });
    return () => unsubscribe();
  }, []);

useEffect(() => {
  const handlePopState = () => {
    setCurrentStep((prev) => {
      if (prev > 1) {
        // Go one step back
        return prev - 1;
      } else {
        // If on step 1, go to home
        navigate("/");
        return prev;
      }
    });
  };

  // Push a fake state so browser detects popstate
  window.history.pushState(null, "", window.location.href);
  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [navigate]);



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
          const totalAmount = subtotal - discount + shipping - couponApplied;

          // ✅ Create order data here
          const orderData = {
            userId,
            address: selectedAddress, // store full address object, not just ID
            items,
            totalAmount,
          };

          const orderDetails = {
            addressId: selectedAddress.id || selectedAddress, // keep this if placeOrder expects ID
            amount: totalAmount,
            paymentId: 'COD',
            items,
          };

          await placeOrder(orderDetails);
          await clearCart();
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
    stepComponent = (
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
                <CartItem
                  key={item.id}
                  id={item.id}
                  title={item.title || item.name}  // ✅ add this
                  color={item.color}
                  price={item.price}
                  quantity={item.quantity}
                  image={item.image}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))

              )}
            </div>
          </div>
        </div>
        <DiscountBanner />
      </>
    );
    break;

  case 2:
    stepComponent = (
      <>
        <Breadcrumb step={1} />
        <AddressArea userId={userId} onSelectAddress={(addressObj) => setSelectedAddress(addressObj)} />

      </>
    );
    break;

  case 3:
    stepComponent = (
      <>
        <Breadcrumb step={2} />
        <Shipment />
      </>
    );
    break;

  case 4:
    stepComponent = (
      <>
        <Breadcrumb step={3} />
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
    );
    break;

  default:
    stepComponent = <AddressArea />;
}


  // Razorpay payment handler
  // Razorpay + COD handler
  // const handlePlaceOrder = async (paymentType) => {
  //   setPayLoading(true);

  //   const amount = subtotal - discount + shipping - couponApplied;

  //   if (paymentType === "cod") {
  //     // 🟢 COD flow — no Razorpay
  //     try {
  //       const orderDetails = {
  //         addressId: selectedAddress?.id || selectedAddress,
  //         amount,
  //         paymentId: "COD",
  //         items,
  //       };

  //       await placeOrder(orderDetails);
  //       await clearCart();

  //       setShowOrderModal(false); // Close order receipt modal
  //       setTimeout(() => setShowThankYou(true), 400); // Show Thank You modal after a short delay
  //     } catch (err) {
  //       console.error("COD order failed:", err.message);
  //       alert("Something went wrong while placing the COD order.");
  //     } finally {
  //       setPayLoading(false);
  //     }
  //   } else {
  //     // 💳 Online payment flow — Razorpay
  //     const handleSuccess = async (paymentResponse) => {
  //       try {
  //         const orderDetails = {
  //           addressId: selectedAddress,
  //           amount,
  //           paymentId: paymentResponse.razorpay_payment_id,
  //           items,
  //         };

  //         await placeOrder(orderDetails);
  //         await clearCart();

  //         alert("Payment successful! Payment ID: " + paymentResponse.razorpay_payment_id);
  //       } catch (err) {
  //         console.error("Error placing order:", err.message);
  //         alert("Something went wrong while placing the order.");
  //       } finally {
  //         setPayLoading(false);
  //         setShowOrderModal(false);
  //       }
  //     };

  //     const handleFailure = () => {
  //       setPayLoading(false);
  //       alert("Payment cancelled.");
  //     };

  //     handleRazorpayPayment({
  //       amount,
  //       user,
  //       address: selectedAddress,
  //       items,
  //       onSuccess: handleSuccess,
  //       onFailure: handleFailure,
  //     });
  //   }
  // };
  // ✅ Unified payment handler (COD + Razorpay)
const handlePlaceOrder = async (paymentType) => {
  setPayLoading(true);

  const amount = subtotal - discount + shipping - couponApplied;

  if (paymentType === "cod") {
    // 🟢 COD flow
    try {
      const orderDetails = {
        addressId: selectedAddress?.id || selectedAddress,
        amount,
        paymentId: "COD",
        items,
      };

      await placeOrder(orderDetails);
      await clearCart();

      setShowOrderModal(false); 
      setTimeout(() => setShowThankYou(true), 400);
    } catch (err) {
      console.error("COD order failed:", err.message);
      alert("Something went wrong while placing the COD order.");
    } finally {
      setPayLoading(false);
    }
  } else {
    // 💳 Razorpay flow
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

        setShowOrderModal(false);
        setTimeout(() => setShowThankYou(true), 400);
      } catch (err) {
        console.error("Error placing order:", err.message);
        alert("Something went wrong while placing the order.");
      } finally {
        setPayLoading(false);
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
  }
};




  // 1️⃣ Paste the function here:
  const handleRazorpayPayment = async ({ amount, user, address, items, onSuccess, onFailure }) => {
    const options = {
      key: "rzp_test_aNekzbf3DEXHpA", // Replace with your Razorpay key
      amount: amount * 100,
      currency: "INR",
      name: "Kevaa.in",
      description: "Payment for your Kevaa order",
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
      theme: { color: "#DC0057" },
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
                              id={item.id}
                              title={item.title || item.name}   // ✅ add title prop
                              color={item.color}
                              price={item.price}
                              quantity={item.quantity}
                              image={item.image}
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
              <div className="address-step-container">
                <Breadcrumb step={1} />
                <AddressArea userId={userId} onSelectAddress={(addressObj) => setSelectedAddress(addressObj)} />

                {/* Next button removed */}
              </div>
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
                {/* {selectedPaymentType === 'cod' ? (
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
                )} */}
              </>
            )}
          </div>

          {/* === RIGHT STICKY ORDER SUMMARY === */}
          <div className="cart-summary-section">
            {/* Show OrderSummary always */}
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              shipping={shipping}
              couponApplied={couponApplied}
              currentStep={currentStep}
              onProceedToCheckout={() => {
                if (currentStep < 4) setCurrentStep(currentStep + 1);
              }}
              onReviewOrder={() => setShowOrderModal(true)}     
              onCODOrder={handleCODOrder}                      
              payLoading={payLoading}  
            />



            {/* Show Proceed button only on Step 1 */}
            {/* {currentStep === 1 && (
              <button
                className="checkout-btn summary-action"
                onClick={() => setCurrentStep(2)}
              >
                Proceed to Checkout
              </button>
            )} */}
          </div>
        </div>
      </div>
{/* console.log("🧩 Selected address before modal:", selectedAddress); */}

      <OrderReceiptModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        user={user}
        address={selectedAddress}
        items={items}
        total={subtotal - discount + shipping - couponApplied}
        onPlaceOrder={() => handlePlaceOrder(selectedPaymentType)} 
        onCODOrder={() => handlePlaceOrder("cod")} // ✅ Add this line
        loading={payLoading}
        selectedPaymentType={selectedPaymentType}
      />


{showThankYou && <ThankYouModal onClose={() => setShowThankYou(false)} />}

    </div>
  );

};

export default Cart;
