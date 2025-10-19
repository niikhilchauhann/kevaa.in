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
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
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

      // Create user document in Firestore with blank fields except email
      const userRef = doc(db, "users", userCred.user.uid);
      await setDoc(userRef, {
        firstName: "",
        lastName: "",
        phone: "",
        gender: "",
        email: email,
        addressIds: [],
        createdAt: new Date(),
      });

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

      // After successful login/signup, check if user document exists in Firestore
      const userRef = doc(db, "users", result.user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        // Create user document with blank fields except email
        await setDoc(userRef, {
          firstName: "",
          lastName: "",
          phone: "",
          gender: "",
          email: result.user.email || "",
          addressIds: [],
          createdAt: new Date(),
        });
      }

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

      // Fetch updated user data from Firestore
      const updatedUserDoc = await getDoc(userRef);
      if (updatedUserDoc.exists()) {
        const updatedUserData = { uid: user.uid, ...updatedUserDoc.data() };
        set({ user: updatedUserData });
      }

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
