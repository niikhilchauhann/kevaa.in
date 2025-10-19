# TODO: Fix Profile Update Functionality

## Issue:
User cannot update profile details. The updateProfile function updates Firestore but doesn't refresh the user data in the store.

## Steps:
- [x] Modify updateProfile function in authStore.js to fetch updated Firestore data after update
- [x] Update the store with the new Firestore data
- [x] Add useEffect hooks in Profile component to sync local state with updated user data
- [x] Update signup and googleLogin functions to create user documents with blank fields except email
- [ ] Test the profile update functionality
