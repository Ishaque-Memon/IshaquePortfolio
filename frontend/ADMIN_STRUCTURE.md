# Admin Panel Structure

## 📁 File Organization

```
src/
├── components/
│   └── layout/
│       └── Sidebar.jsx           # Reusable sidebar component with navigation
│
└── pages/
    └── admin/
        ├── index.jsx              # AdminLayout - Main layout wrapper with Sidebar
        ├── Dashboard.jsx          # Dashboard overview page
        ├── Skills.jsx             # Skills CRUD page (coming soon)
        ├── Projects.jsx           # Projects CRUD page (coming soon)
        ├── Certificates.jsx       # Certificates CRUD page (coming soon)
        ├── PersonalInfo.jsx       # Personal info edit page (coming soon)
        ├── Messages.jsx           # Messages view page (coming soon)
        ├── Education.jsx          # Education CRUD page (coming soon)
        └── Analytics.jsx          # Analytics dashboard (coming soon)
```

## 🎯 Component Responsibilities

### `Sidebar.jsx` (Component)
- **Location**: `components/layout/`
- **Purpose**: Reusable navigation sidebar
- **Features**:
  - Collapsible sidebar (280px ↔ 80px)
  - Mobile responsive with slide-in menu
  - 8 navigation items with icons and badges
  - Theme toggle integration
  - Logout functionality
  - Active route highlighting

### `index.jsx` (AdminLayout)
- **Location**: `pages/admin/`
- **Purpose**: Main admin layout wrapper
- **Features**:
  - Uses `<Sidebar />` component
  - Top header with page title
  - User profile display
  - "View Portfolio" button
  - `<Outlet />` for nested routes
  - Protected route (requires authentication)

### `Dashboard.jsx`
- **Location**: `pages/admin/`
- **Purpose**: Admin dashboard overview
- **Features**:
  - Welcome banner
  - Stats cards (Projects, Skills, Certificates, Messages)
  - Quick action buttons
  - Recent activity feed
  - Portfolio analytics overview

## 🛣️ Routing Structure

```javascript
/admin                          → AdminLayout (with Sidebar)
  ├── /admin/dashboard          → Dashboard page
  ├── /admin/personal-info      → Personal info (coming soon)
  ├── /admin/skills             → Skills management (coming soon)
  ├── /admin/projects           → Projects management (coming soon)
  ├── /admin/certificates       → Certificates management (coming soon)
  ├── /admin/education          → Education management (coming soon)
  ├── /admin/messages           → Messages (coming soon)
  └── /admin/analytics          → Analytics (coming soon)
```

## 🎨 Design Principles

1. **Separation of Concerns**
   - Layout components in `components/layout/`
   - Page components in `pages/admin/`
   - Sidebar is a reusable component

2. **Clean Structure**
   - No duplicate files (Admin.jsx, AdminPanel.jsx removed)
   - Clear naming convention
   - Single source of truth for each component

3. **Scalability**
   - Easy to add new admin pages
   - Reusable sidebar component
   - Nested routing for clean URLs

## 🚀 Next Steps

1. **CRUD Pages**: Create individual management pages
   - Skills.jsx with add/edit/delete forms
   - Projects.jsx with image upload
   - Certificates.jsx with credential links
   - etc.

2. **API Integration**: Connect each page to backend
   - Use existing `portfolioApi.js`
   - Use custom hooks from `usePortfolio.js`

3. **File Upload**: Implement Cloudinary integration
   - Image upload for projects
   - Certificate image upload
   - Resume upload

## 📝 Usage Example

```jsx
// Adding a new admin page
// 1. Create file: src/pages/admin/NewPage.jsx
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const NewPage = () => {
  const { isDarkMode } = useTheme();
  return <div>New Admin Page</div>;
};

export default NewPage;

// 2. Add route in router.jsx
{
  path: 'new-page',
  element: <NewPage />,
}

// 3. Add menu item in Sidebar.jsx
{
  name: "New Page",
  icon: FiIcon,
  path: "/admin/new-page",
  color: "text-color-500"
}
```
