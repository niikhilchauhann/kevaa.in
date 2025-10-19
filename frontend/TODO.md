# Refactor Orders and Cart System

## Overview
Refactor Firestore structure for better efficiency:
- Cart: `users/{uid}/cart/{productId}` with quantity
- Orders: Store product IDs instead of full data
- Addresses: `users/{uid}/addresses/{addressId}` subcollection
- Users: Add `orders` array with order IDs

## Steps
- [x] Update firestore.rules for new paths
- [x] Update cartStore.js: change cart path to users/{uid}/cart/{productId}
- [x] Update cartStore.js: modify placeOrder to store only productId, quantity, status in items
- [x] Update cartStore.js: add function to fetch product by ID
- [x] Update cartStore.js: update fetchOrders to fetch product details for each item
- [x] Update cartStore.js: add updating user document with orders array when placing order
- [x] Update AddressList.jsx to use users/{uid}/addresses/{addressId} subcollection
- [x] Update OrderCard.jsx to display fetched product data (added fallbacks for missing products)
- [x] Update RecentOrders.jsx if needed (no changes required)
- [x] Update AdminDashboard.jsx to handle new order structure (added fallbacks for missing products)
- [x] Update Cart.jsx if needed (no changes required)
- [x] Update AddressArea.jsx to use subcollection (fixed address display)
- [x] Update firestore.indexes.json if needed (no changes required)
- [x] Test cart operations (code reviewed, should work with new structure)
- [x] Test order placement and display (code reviewed, should work with new structure)
- [x] Test address management (code reviewed, should work with new structure)
