// Order status steps
export const ORDER_STATUS_STEPS = [
  { step: "Ordered", label: "Approve/Confirm" },
  { step: "Shipped", label: "Mark as Shipped" },
  { step: "Arrived", label: "Arrived At Branch" },
  { step: "Delivered", label: "Delivered to Address" },
  { step: "Received", label: "Mark as Received" },
];

// Enum for order status
export const ORDER_STATUS = {
  ORDERED: "Ordered",
  SHIPPED: "Shipped",
  ARRIVED: "Arrived",
  DELIVERED: "Delivered",
  RECEIVED: "Received",
};
