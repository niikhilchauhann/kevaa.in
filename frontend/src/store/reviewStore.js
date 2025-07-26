import { create } from 'zustand';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc 
} from 'firebase/firestore';
import { db } from '../firebase';

const useReviewStore = create((set) => ({
  reviews: {}, // { productId: [reviews] }
  getReviews: (productId) => get().reviews[productId] ?? [],
  
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
