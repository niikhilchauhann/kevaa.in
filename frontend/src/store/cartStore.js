import { create } from 'zustand';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs, addDoc, serverTimestamp, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase'; // make sure you have db exported from your firebase.js
import { auth } from '../firebase';

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
      // Delete all items from Firestore
      const itemsCol = collection(db, 'carts', user.uid, 'items');
      const snapshot = await getDocs(itemsCol);
      const batch = db.batch();
      snapshot.docs.forEach(docSnap => batch.delete(docSnap.ref));
      await batch.commit();
      set({ items: [], loading: false });
    } catch (err) {
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
        items,
        amount,
        paymentId,
        createdAt: serverTimestamp(),
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
      // NOTE: To fetch orders in descending order of creation time, 
      // This requires creating a composite Firestore index manually.
      // For now, i'm using where to fetch the orders 
      //use this to get orders in to get orders in desc
      // const q = query(ordersRef, where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
      const q = query(ordersRef, where('userId', '==', user.uid));
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
  }


}));

export default useCartStore;
