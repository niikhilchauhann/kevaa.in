import { create } from 'zustand';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, getDocs } from 'firebase/firestore';
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
        ? { ...existing, quantity: existing.quantity + 1 }
        : { ...product, quantity: 1 };
      await setDoc(itemRef, newItem);
      // Update local state
      if (existing) {
        set({
          items: get().items.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          loading: false
        });
      } else {
        set({ items: [...get().items, newItem], loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    const user = auth.currentUser;
    if (!user) return set({ error: "Not logged in" });
    set({ loading: true });
    try {
      const itemRef = doc(db, 'carts', user.uid, 'items', String(productId));
      await deleteDoc(itemRef);
      set({
        items: get().items.filter(item => item.id !== productId),
        loading: false
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
    set({ loading: true });
    try {
      const itemRef = doc(db, 'carts', user.uid, 'items', String(productId));
      await updateDoc(itemRef, { quantity });
      set({
        items: get().items.map(item =>
          item.id === productId ? { ...item, quantity } : item
        ),
        loading: false
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
  }
}));

export default useCartStore;
