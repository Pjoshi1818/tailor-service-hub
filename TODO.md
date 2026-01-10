# Admin Dashboard Implementation Plan

## 1. Update Tailor Model
- [ ] Add status field ['pending', 'approved', 'rejected'] to Tailor.js model

## 2. Server Updates
- [ ] Add rejectTailor function to adminController.js
- [ ] Add getAllTailors function to adminController.js
- [ ] Add getAllCustomers function to adminController.js
- [ ] Update approveTailor to set status to 'approved'
- [ ] Add corresponding routes in adminRoutes.js

## 3. Client Updates
- [ ] Add rejectTailor to adminApi.js
- [ ] Add getAllTailors to adminApi.js
- [ ] Add getAllCustomers to adminApi.js
- [ ] Redesign AdminDashboard.jsx with tabs for Pending Tailors, All Tailors, All Customers
- [ ] Implement approve/reject actions for Pending Tailors
- [ ] Add status badges for All Tailors and All Customers sections

## 4. UI Enhancements
- [ ] Ensure clean, scalable design with minimal destructive actions
- [ ] Use StatusBadge component for status indicators
- [ ] Implement role-safe access

## 5. Testing and Followup
- [ ] Test admin routes and dashboard functionality
- [ ] Ensure no disruption to existing auth logic
- [ ] Verify protected routes work correctly
