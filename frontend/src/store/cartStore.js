import { create } from 'zustand';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, addDoc, serverTimestamp, query, where, orderBy, writeBatch, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../firebase'; // make sure you have db exported from your firebase.js
import { products as allProducts } from '../data/realProducts.js';
import { ORDER_STATUS } from '../utils/constants.js';

// Helper function to find product by ID from local data
const findProductById = (productId) => {
  // Flatten all product categories into a single array
  const allProductCategories = Object.values(allProducts).flat();
  return allProductCategories.find(product => product.id === parseInt(productId));
};

const useCartStore = create((set, get) => ({
  items: [],
  loading: false,
  error: null,

  // Load cart from Firestore for current user
  loadCart: async () => {
    const user = auth.currentUser;
    if (!user) return set({ items: [] });
    set({ loading: true });
    try {
      const itemsCol = collection(db, 'users', user.uid, 'cart');
      const snapshot = await getDocs(itemsCol);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set({ items, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Add or update item in cart
  addToCart: async (product) => {
    const user = auth.currentUser;
    if (!user) return set({ error: "Not logged in" });
    set({ loading: true });
    try {
      const itemRef = doc(db, 'users', user.uid, 'cart', String(product.id));
      // Check if item already exists in local state
      const existing = get().items.find(item => item.id === product.id);
      const newItem = existing
        ? { ...existing, quantity: (existing.quantity || 1) + (product.quantity || 1) }
        : { ...product, quantity: product.quantity || 1 };
      await setDoc(itemRef, newItem);
      set({
        items: existing
          ? get().items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item
          )
          : [...get().items, newItem],
        loading: false
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const user = auth.currentUser;
    if (!user) return set({ error: "Not logged in" });
    // set({ loading: true });
    try {
      const itemRef = doc(db, 'users', user.uid, 'cart', String(productId));
      await deleteDoc(itemRef);
      set({
        items: get().items.filter(item => item.id !== productId),
        // loading: false
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Change quantity
  updateQuantity: async (productId, quantity) => {
    const user = auth.currentUser;
    if (!user) return set({ error: "Not logged in" });
    if (quantity < 1) return;
    // set({ loading: true });
    try {
      const itemRef = doc(db, 'users', user.uid, 'cart', String(productId));
      await updateDoc(itemRef, { quantity });
      set({
        items: get().items.map(item =>
          item.id === productId ? { ...item, quantity } : item
        ),
        // loading: false
      });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Clear cart (optional)
  clearCart: async () => {
    const user = auth.currentUser;
    if (!user) return set({ error: "Not logged in" });

    set({ loading: true });

    try {
      const itemsCol = collection(db, "users", user.uid, "cart");
      const snapshot = await getDocs(itemsCol);

      const batch = writeBatch(db); // ✅ use writeBatch here

      snapshot.docs.forEach((docSnap) => {
        batch.delete(docSnap.ref);
      });

      await batch.commit();

      set({ items: [], loading: false });
    } catch (err) {
      console.error("Error clearing cart:", err.message);
      set({ error: err.message, loading: false });
    }
  },

  // Saves order to Firestore after successful payment
  placeOrder: async ({ addressId, amount, paymentId }) => {
    const user = auth.currentUser;
    const { items } = get();
    if (!user) return set({ error: "Not logged in" });
    if (!items || items.length === 0) return set({ error: "Cart is empty" });

    try {
      // Add order document with minimal item info (productId, quantity)
      const orderRef = await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        addressId,
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        status: {
          currentStep: ORDER_STATUS.ORDERED
        },
        amount,
        paymentId,
        createdAt: serverTimestamp(),
        statusLogs: [
          {
            step: ORDER_STATUS.ORDERED,
            time: new Date().toISOString()
          }
        ]
      });

      // Update user's orders array with new order ID
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        orders: arrayUnion(orderRef.id)
      });

      // Clear cart after placing order
      const itemsCol = collection(db, 'users', user.uid, 'cart');
      const snapshot = await getDocs(itemsCol);
      const batch = writeBatch(db);
      snapshot.docs.forEach(docSnap => batch.delete(docSnap.ref));
      await batch.commit();

      set({ items: [] });

    } catch (err) {
      set({ error: "Failed to place order: " + err.message });
    }
  },

  // fetch users orders
  fetchOrders: async () => {
    const user = auth.currentUser;
    if (!user) return [];

    try {
      const ordersRef = collection(db, 'orders');

      // Create a query to filter by userId and order by createdAt descending
      console.log("Current user ID:", user.uid);

      const q = query(
        ordersRef,
        where('userId', '==', user.uid),
        orderBy('createdAt') // This line sorts the results by newest first
      );

      const snapshot = await getDocs(q);
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch product details and address details for each order
      const ordersWithDetails = await Promise.all(ordersData.map(async (order) => {
        const itemsWithDetails = order.items.map((item) => {
          const productData = findProductById(item.productId);
          return {
            ...item,
            ...productData
          };
        });

        // Fetch address details from global addresses collection
        let addressDetails = null;
        if (order.addressId) {
          try {
            const addressDoc = await getDoc(doc(db, 'addresses', order.addressId));
            if (addressDoc.exists()) {
              addressDetails = { id: addressDoc.id, ...addressDoc.data() };
            }
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        }

        return {
          ...order,
          items: itemsWithDetails,
          address: addressDetails
        };
      }));

      return ordersWithDetails;
    } catch (err) {
      console.error("Failed to fetch orders:", err.message);
      return [];
    }
  },

  // ADMIN/STAFF: Update order status & add status log

  fetchAllOrders: async () => {
  try {
    const snapshot = await getDocs(query(collection(db, 'orders'), orderBy('createdAt','desc')));
    const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch product details and address details for each order
    const ordersWithDetails = await Promise.all(ordersData.map(async (order) => {
      const itemsWithDetails = order.items.map((item) => {
        const productData = findProductById(item.productId);
        return {
          ...item,
          ...productData
        };
      });

      // Fetch address details from global addresses collection
      let addressDetails = null;
      if (order.addressId) {
        try {
          const addressDoc = await getDoc(doc(db, 'addresses', order.addressId));
          if (addressDoc.exists()) {
            addressDetails = { id: addressDoc.id, ...addressDoc.data() };
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      }

      return {
        ...order,
        items: itemsWithDetails,
        address: addressDetails
      };
    }));

    return ordersWithDetails;
  } catch (err) {
    console.error("Failed to fetch all orders (admin):", err.message);
    return [];
  }
},

  updateOrderStatus: async (orderId, { step, time = new Date().toISOString() }) => {
    /**
     * step: one of ['Ordered','Shipped','Arrived','Delivered','Received']
     * time: ISO string, default now
     */
    try {
      const orderRef = doc(db, "orders", orderId);

      // Update order status
      const setObj = {
        status: { currentStep: step },
        statusLogs: arrayUnion({ step, time })
      };

      await updateDoc(orderRef, setObj);
      // Optionally: fetch/refresh orders if maintaining UI state
      // await get().fetchOrders();

      return { success: true };
    } catch (err) {
      // Optional: you can use set({ error: ... }) if managing admin UI
      console.error("Failed to update order status:", err);
      return { success: false, error: err.message };
    }
  },

}));

export default useCartStore;
