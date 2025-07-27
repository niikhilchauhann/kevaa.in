import { create } from 'zustand';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, addDoc, serverTimestamp, query, where, orderBy, writeBatch, arrayUnion } from 'firebase/firestore';
import { db, auth } from '../firebase'; // make sure you have db exported from your firebase.js

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
      const itemsCol = collection(db, 'carts', user.uid, 'items');
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
      const itemRef = doc(db, 'carts', user.uid, 'items', String(product.id));
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
      const itemRef = doc(db, 'carts', user.uid, 'items', String(productId));
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
      const itemRef = doc(db, 'carts', user.uid, 'items', String(productId));
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
      const itemsCol = collection(db, "carts", user.uid, "items");
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
  placeOrder: async ({ address, amount, paymentId }) => {
    const user = auth.currentUser;
    const { items } = get();
    if (!user) return set({ error: "Not logged in" });
    if (!items || items.length === 0) return set({ error: "Cart is empty" });

    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        address,
        items: items.map(item => ({
          ...item,
          status: {
            isShipping: false,
            isDelivered: false,
            isArrival: false,
            isReceived: false,
            currentStep: "Ordered"
          }
        })),
        amount,
        paymentId,
        createdAt: serverTimestamp(),
        statusLogs: [
          {
            step: "Ordered",
            time: new Date().toISOString()
          }
        ]
      });
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
        orderBy('createdAt', ) // This line sorts the results by newest first
      );

      const snapshot = await getDocs(q);
      const orders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return orders;
    } catch (err) {
      console.error("Failed to fetch orders:", err.message);
      return [];
    }
  },

  // ADMIN/STAFF: Update order status & add status log

  fetchAllOrders: async () => {
  try {
    const snapshot = await getDocs(query(collection(db, 'orders'), orderBy('createdAt','desc')));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    console.error("Failed to fetch all orders (admin):", err.message);
    return [];
  }
},

  updateOrderStatus: async (orderId, { step, time = new Date().toISOString() }, itemIndex = null) => {
    /**
     * step: one of ['Ordered','Shipped','Arrived','Delivered','Received']
     * time: ISO string, default now
     * itemIndex: if not null, only update single item status; else all items
     */
    try {
      const orderRef = doc(db, "orders", orderId);

      // Compose new status object based on step
      let status;
      switch (step) {
        case "Ordered":
          status = { isShipping: false, isDelivered: false, isArrival: false, isReceived: false, currentStep: step };
          break;
        case "Shipped":
          status = { isShipping: true, isDelivered: false, isArrival: false, isReceived: false, currentStep: step };
          break;
        case "Arrived":
          status = { isShipping: true, isDelivered: false, isArrival: true, isReceived: false, currentStep: step };
          break;
        case "Delivered":
          status = { isShipping: true, isDelivered: true, isArrival: true, isReceived: false, currentStep: step };
          break;
        case "Received":
          status = { isShipping: true, isDelivered: true, isArrival: true, isReceived: true, currentStep: step };
          break;
        default:
          status = { isShipping: false, isDelivered: false, isArrival: false, isReceived: false, currentStep: "Ordered" };
      }

      const setObj = {};
      if (itemIndex !== null && Number.isInteger(itemIndex)) {
        // Update ONE item status
        setObj[`items.${itemIndex}.status`] = status;
      } else {
        // Update ALL items status (admin action)
        const snap = await getDoc(orderRef);
        if (!snap.exists()) throw new Error("Order not found");
        const items = (snap.data().items || []).map(i => ({ ...i, status }));
        setObj["items"] = items;
      }
      // Always push status log
      setObj["statusLogs"] = arrayUnion({ step, time });

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
