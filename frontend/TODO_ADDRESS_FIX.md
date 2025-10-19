# TODO: Fix Firebase Permissions Error in AddressList.jsx

## Tasks
- [x] Fix import in AddressList.jsx to include setDoc
- [x] Update firestore.rules to correct addresses collection rules for create operations
- [x] Deploy updated Firestore rules
- [ ] Test address saving functionality

## Notes
- Error: Missing or insufficient permissions when saving address
- Root cause: Incorrect rules for addresses collection (using resource.data instead of request.resource.data for create)
- Missing setDoc import in AddressList.jsx
