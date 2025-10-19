# Database Refactor TODO

## Tasks
- [x] Update firestore.rules for global addresses collection
- [x] Modify AddressList.jsx to use global addresses collection
- [ ] Update user document structure to include addressIds array
- [ ] Update placeOrder in cartStore.js to store addressId instead of full address
- [ ] Update OrderCard.jsx to fetch address from global collection
- [ ] Update fetchOrders in cartStore.js to fetch address details
- [ ] Create script to clear redundant data from Firestore
- [ ] Test the changes and ensure no data loss

## Progress
- Started: [Date]
- Completed: [Date]
