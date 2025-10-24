import React from "react";
import "./orderReceiptModal.css"; // Make a CSS file for modal styling

const OrderReceiptModal = ({
  isOpen,
  onClose,
  user,
  address,
  items,
  total,
  onPlaceOrder,
  loading,
}) => {

console.log("🧾 Modal received address (keys):", address);
console.log("🧾 Full address object:", JSON.stringify(address, null, 2));

if (address) {
  console.log("👉 Address keys:", Object.keys(address));
  for (const key in address) {
    console.log(`🔹 ${key}:`, address[key]);
  }
}


  if (!isOpen) return null;

  return (
    <div className="order-modal-overlay">
      <div className="order-modal">
        <button className="order-modal-close" onClick={onClose}>×</button>
        <h2>Order Receipt</h2>

        {/* === USER SECTION === */}
        <div className="order-modal-section">
          <strong>User:</strong> {user ? `${user.name || ""} (${user.email || ""})` : "Guest"}
        </div>

        {/* === ADDRESS SECTION (replace old one with this) === */}
        {/* === ADDRESS SECTION === */}
        {/* === ADDRESS SECTION (Simplified and working) === */}
        {address ? (
          <div className="order-modal-section">
            <h3>Delivery Address</h3>
            <p>
              {address.name && <><strong>{address.name}</strong><br /></>}
              {address.houseNo}, {address.streetName}
              {address.streetName2 ? `, ${address.streetName2}` : ""}
              , {address.city}, {address.state} - {address.postalCode}
            </p>
            <p>📞 {address.contact}</p>
          </div>
        ) : (
          <div className="order-modal-section">
            <span>No address selected</span>
          </div>
        )}



        {/* === ITEMS SECTION === */}
        <div className="order-modal-section">
          <strong>Items:</strong>
          <ul>
            {items.map(item => (
              <li key={item.id}>
                {item.name} × {item.quantity} = ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
        </div>

        {/* === TOTAL SECTION === */}
        <div className="order-modal-section">
          <strong>Total:</strong> ₹{total}
        </div>

        {/* === BUTTON === */}
        <button
          className="order-modal-place-btn"
          onClick={onPlaceOrder}
          disabled={loading}
        >
          {loading ? "Processing..." : "Place Order & Pay"}
        </button>
      </div>
    </div>
  );
};

export default OrderReceiptModal;
