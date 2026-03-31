# TODO: Add Tailor Filters to Project

## Backend Updates

- [x] Update `server/controllers/tailorController.js`:
  - Change `isApproved: true` to `status: "approved"`
  - Add query parameter support: location, service, priceRange, experience

- [x] Update `server/routes/tailorRoutes.js`:
  - No changes needed (route already exists)

## Frontend Updates

- [x] Update `client/src/api/tailorApi.js`:
  - Modify `getAllTailors` to accept query parameters

- [x] Update `client/src/pages/TailorList.jsx`:
  - Add filter state variables
  - Integrate FilterBar component
  - Call API with query parameters
  - Keep loading and error handling working
