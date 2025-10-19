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
  if (!isOpen) return null;

  return (
    <div className="order-modal-overlay">
      <div className="order-modal">
        <button className="order-modal-close" onClick={onClose}>×</button>
        <h2>Order Receipt</h2>
        <div className="order-modal-section">
          <strong>User:</strong> {user?.email || user?.name || "Guest"}
        </div>
        <div className="order-modal-section">
          <strong>Address:</strong>
          <div>
            {address?.houseNo}, {address?.streetName}
            {address?.streetName2 ? `, ${address?.streetName2}` : ""}
            , {address?.city}, {address?.state} - {address?.postalCode}
          </div>
        </div>
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
        <div className="order-modal-section">
          <strong>Total:</strong> ₹{total}
        </div>
        <button className="order-modal-place-btn" onClick={onPlaceOrder} disabled={loading}>
          {loading ? "Processing..." : "Place Order & Pay"}
        </button>
      </div>
    </div>
  );
};

export default OrderReceiptModal;
