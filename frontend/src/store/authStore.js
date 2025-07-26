// src/store/authStore.js
import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../firebase';

const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (user) => set({ user }),

  // Reload and update user data from Firebase Auth
  reloadUser: async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      set({ user: { ...auth.currentUser } });
    }
  },

  signup: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCred.user, loading: false });
      await get().reloadUser();
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      set({ user: userCred.user, loading: false });
      await get().reloadUser();
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  resetPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      await sendPasswordResetEmail(auth, email);
      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },

  googleLogin: async () => {
    set({ loading: true, error: null });
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      set({ user: result.user, loading: false });
      await get().reloadUser();
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const user = get().user;
      if (!user || !user.uid) throw new Error("No user logged in");

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, data);

      await get().reloadUser();

      set({ loading: false });
      return true;
    } catch (err) {
      set({ error: err.message, loading: false });
      return false;
    }
  },

  listenAuthState: () => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        await firebaseUser.reload();
        set({ user: { ...auth.currentUser } });
      } else {
        set({ user: null });
      }
    });
  },
}));


export default useAuthStore;
