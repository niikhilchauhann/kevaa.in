import { create } from 'zustand';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  collectionGroup,
  addDoc,
  getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';

const useReviewStore = create((set, get) => ({
  reviews: {}, // { productId: [reviews] }
  allReviews: [],
  getReviews: (productId) => get().reviews[productId] ?? [],

  getAllReviews: async () => {
  try {
    const q = collectionGroup(db, "reviews"); // 🔁 get all reviews from all products
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(doc => doc.data());
    set({ allReviews: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
},
  // Subscribe to realtime reviews of a product
  subscribeToProductReviews: (productId) => {
    const reviewsQuery = query(
      collection(db, 'products', productId.toString(), 'reviews'),
      orderBy('publishedAt', 'desc')
    );

    const unsubscribe = onSnapshot(reviewsQuery, (snapshot) => {
      const reviewsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      set(state => ({
        reviews: {
          ...state.reviews,
          [productId]: reviewsData,
        }
      }));
    });

    return unsubscribe; // to unsubscribe on unmount
  },

  addReview: async (productId, review) => {
    try {
      await addDoc(collection(db, 'products', productId.toString(), 'reviews'), review);
      // Firestore onSnapshot listener will update the store automatically
    } catch (e) {
      console.error('Error adding review:', e);
    }
  }
}));

export default useReviewStore;
