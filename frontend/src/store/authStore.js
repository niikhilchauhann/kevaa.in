// src/store/authStore.js
import { create } from 'zustand';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider, 
  signInWithPopup
} from 'firebase/auth';
import { auth } from '../firebase';

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  signup: async ({ email, password }) => {
    set({ loading: true, error: null });
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      set({ user: userCred.user, loading: false });
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
    return true;
  } catch (err) {
    set({ error: err.message, loading: false });
    return false;
  }
},
}));

export default useAuthStore;
