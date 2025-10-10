# 🔐 Admin Access Control Documentation

## 📋 Single Role System

This portfolio backend uses a **simplified single-role system** - all authenticated users are **ADMIN**.

```javascript
ROLES = {
  ADMIN: 'admin'  // Single admin role with full access
}
```

---

## 🎯 Why Single Role?

For a personal portfolio website:
- ✅ **Simplicity** - No complex role management needed
- ✅ **Security** - Only trusted admins have access
- ✅ **Efficiency** - Less code, easier maintenance
- ✅ **Clarity** - Clear permissions - you're either admin or not

---

## 🛡️ Access Control

### Authentication Check

All protected endpoints require:
1. **Valid JWT token** in Authorization header
2. **Role = 'admin'** in token payload

```javascript
Authorization: Bearer <jwt_token>
```

---

## 🔒 Middleware Usage

### Basic Protection (Admin Only)

```javascript
import { protect } from '../middleware/authMiddleware.js';

// Only authenticated admins can access
router.post('/projects', protect, createProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);
```

### Optional: Additional Admin Check

```javascript
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

// Double-check admin role (redundant but explicit)
router.delete('/admin/:id', protect, requireAdmin, deleteAdmin);
```

---

## � API Endpoints

### **Public Endpoints (No Authentication)**
```
POST /api/admin/login          - Login to get JWT token
GET  /api/projects             - Public portfolio view
GET  /api/skills               - Public skills view
GET  /api/certificates         - Public certificates view
GET  /api/about                - Public about info
POST /api/contact              - Public contact form
```

### **Protected Endpoints (Admin Only)**

**Admin Management:**
```
GET  /api/admin/profile        - Get admin profile
PUT  /api/admin/profile        - Update profile
PUT  /api/admin/change-password - Change password
POST /api/admin/create         - Create new admin
GET  /api/admin/all            - List all admins
DELETE /api/admin/:id          - Delete admin
```

**Content Management:**
```
POST /api/projects             - Create project
PUT  /api/projects/:id         - Update project
DELETE /api/projects/:id       - Delete project

POST /api/skills               - Create skill
PUT  /api/skills/:id           - Update skill
DELETE /api/skills/:id         - Delete skill

POST /api/certificates         - Create certificate
PUT  /api/certificates/:id     - Update certificate
DELETE /api/certificates/:id   - Delete certificate

POST /api/about                - Create/update about
PATCH /api/about/statistics    - Update statistics
DELETE /api/about/:id          - Delete about

GET  /api/contact              - View messages
PATCH /api/contact/:id/status  - Update message status
DELETE /api/contact/:id        - Delete message
```

---

## 🧪 Usage Example

### 1. Create Admin User

```bash
# Run seed script
npm run seed
```

**Default Admin:**
```
Email: admin@portfolio.com
Password: admin123
Role: admin
```

### 2. Login

```bash
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "admin": {
      "id": "...",
      "name": "Admin",
      "email": "admin@portfolio.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

### 3. Use Token for Protected Routes

```bash
POST /api/projects
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data

{
  "title": "My Project",
  "description": "...",
  "image": <file>
}
```

---

## 💻 Implementation

### Admin Model
```javascript
import ROLES from '../constant/roles.js';

role: {
  type: String,
  enum: [ROLES.ADMIN],
  default: ROLES.ADMIN
}
```

### Auth Middleware
```javascript
import ROLES from '../constant/roles.js';

export const protect = async (req, res, next) => {
  // Verify JWT token
  // Add user info to req.user including role
};

export const requireAdmin = (req, res, next) => {
  if (req.user.role !== ROLES.ADMIN) {
    return sendError(res, 'Admin access required', 403);
  }
  next();
};
```

### Routes
```javascript
import { protect } from '../middleware/authMiddleware.js';

// All protected routes use protect middleware
router.post('/create', protect, createSomething);
```

---

## 🔐 Security Features

1. **JWT Authentication** - 7-day token expiration
2. **Password Hashing** - Bcrypt with salt
3. **Account Locking** - After 5 failed login attempts (2 hours)
4. **Single Role** - No privilege escalation risks
5. **Self-Delete Prevention** - Admins can't delete themselves

---

## ✅ Benefits of Single Role

1. **Simple** - No role hierarchy to manage
2. **Secure** - All admins are trusted equally
3. **Fast** - No complex permission checks
4. **Maintainable** - Less code to maintain
5. **Scalable** - Easy to extend if needed later

---

## 🚀 Future: If You Need Multiple Roles

If your portfolio grows and you need multiple roles:

```javascript
// Expand roles.js
export const ROLES = {
  SUPER_ADMIN: 'super-admin',
  ADMIN: 'admin',
  EDITOR: 'editor'
};

// Add hierarchy
export const ROLE_HIERARCHY = {
  [ROLES.SUPER_ADMIN]: 3,
  [ROLES.ADMIN]: 2,
  [ROLES.EDITOR]: 1
};

export const hasPermission = (userRole, requiredRole) => {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};
```

But for a personal portfolio, **single admin role is perfect!** ✅

---

## 📊 Summary

- ✅ Single role: `ADMIN`
- ✅ All authenticated users have full access
- ✅ Simple and secure
- ✅ Easy to maintain
- ✅ Perfect for personal portfolio

**Status:** Role system simplified - Production ready! 🎉


---

## 🎯 Role Hierarchy & Permissions

### Role Levels (Higher = More Permissions)

| Role | Level | Permissions |
|------|-------|-------------|
| **SUPER_ADMIN** | 4 | Full system access, manage admins |
| **ADMIN** | 3 | Manage content, view all data |
| **EDITOR** | 2 | Edit content, limited access |
| **VIEWER** | 1 | Read-only access |

---

## 🛡️ Permission System

### How It Works:

```javascript
hasPermission(userRole, requiredRole)
```

**Example:**
```javascript
// Super Admin trying to access Admin route
hasPermission('super-admin', 'admin') // ✅ true (4 >= 3)

// Editor trying to access Admin route
hasPermission('editor', 'admin') // ❌ false (2 < 3)

// Admin trying to access Editor route
hasPermission('admin', 'editor') // ✅ true (3 >= 2)
```

**Rule:** User can access routes if their role level ≥ required role level

---

## 🔒 Middleware Usage

### 1. Basic Authentication (Any Logged-in User)

```javascript
import { protect } from '../middleware/authMiddleware.js';

router.get('/profile', protect, getProfile);
```

### 2. Role-Based Protection

```javascript
import { protect, requireRole, requireAdmin, requireSuperAdmin } from '../middleware/authMiddleware.js';
import ROLES from '../constant/roles.js';

// Require specific role
router.post('/create', protect, requireRole(ROLES.ADMIN), createItem);

// Require Admin or higher
router.put('/edit', protect, requireAdmin, editItem);

// Require Super Admin only
router.delete('/admin/:id', protect, requireSuperAdmin, deleteAdmin);
```

### 3. Custom Role Check

```javascript
// Require Editor or higher
router.put('/content', protect, requireRole(ROLES.EDITOR), updateContent);

// Require Viewer or higher (basically any authenticated user)
router.get('/data', protect, requireRole(ROLES.VIEWER), getData);
```

---

## 📡 Current API Endpoints with Roles

### **Public Endpoints (No Authentication)**
```
POST /api/admin/login          - Anyone can login
GET  /api/projects             - Public view
GET  /api/skills               - Public view
GET  /api/certificates         - Public view
GET  /api/about                - Public view
POST /api/contact              - Public contact form
```

### **Protected Endpoints (Any Admin)**
```
GET  /api/admin/profile        - ADMIN or higher
PUT  /api/admin/profile        - ADMIN or higher
PUT  /api/admin/change-password - ADMIN or higher

POST /api/projects             - ADMIN or higher
PUT  /api/projects/:id         - ADMIN or higher
DELETE /api/projects/:id       - ADMIN or higher

POST /api/skills               - ADMIN or higher
PUT  /api/skills/:id           - ADMIN or higher
DELETE /api/skills/:id         - ADMIN or higher

POST /api/certificates         - ADMIN or higher
PUT  /api/certificates/:id     - ADMIN or higher
DELETE /api/certificates/:id   - ADMIN or higher

POST /api/about                - ADMIN or higher
PATCH /api/about/statistics    - ADMIN or higher
DELETE /api/about/:id          - ADMIN or higher

GET  /api/contact              - ADMIN or higher (view messages)
PATCH /api/contact/:id/status  - ADMIN or higher
DELETE /api/contact/:id        - ADMIN or higher
```

### **Super Admin Only Endpoints**
```
POST /api/admin/create         - SUPER_ADMIN only
GET  /api/admin/all            - SUPER_ADMIN only
DELETE /api/admin/:id          - SUPER_ADMIN only
```

---

## 🧪 Testing Role-Based Access

### 1. Create Different Role Users

**Super Admin (Already created via seed):**
```javascript
Email: admin@portfolio.com
Password: admin123
Role: super-admin
```

**Create Regular Admin:**
```bash
POST /api/admin/create
Authorization: Bearer <super_admin_token>

{
  "name": "Regular Admin",
  "email": "admin2@portfolio.com",
  "password": "password123",
  "role": "admin"
}
```

**Create Editor:**
```bash
POST /api/admin/create
Authorization: Bearer <super_admin_token>

{
  "name": "Content Editor",
  "email": "editor@portfolio.com",
  "password": "password123",
  "role": "editor"
}
```

### 2. Test Access Levels

**Login as Super Admin:**
```bash
POST /api/admin/login
{
  "email": "admin@portfolio.com",
  "password": "admin123"
}
# ✅ Can access ALL endpoints
```

**Login as Regular Admin:**
```bash
POST /api/admin/login
{
  "email": "admin2@portfolio.com",
  "password": "password123"
}
# ✅ Can manage content
# ❌ Cannot create/delete other admins
```

**Login as Editor:**
```bash
POST /api/admin/login
{
  "email": "editor@portfolio.com",
  "password": "password123"
}
# ✅ Can edit content (if routes are configured)
# ❌ Cannot delete content
# ❌ Cannot manage admins
```

---

## 💻 Implementation Examples

### Example 1: Admin Controller with Role Check

```javascript
import ROLES from '../constant/roles.js';

export const deleteAdmin = async (req, res, next) => {
  try {
    // Only super-admin can delete admins (enforced by middleware)
    const admin = await Admin.findById(req.params.id);
    
    if (!admin) {
      return sendError(res, 'Admin not found', 404);
    }

    // Prevent deleting yourself
    if (admin._id.toString() === req.user.id) {
      return sendError(res, 'You cannot delete your own account', 400);
    }

    await admin.deleteOne();
    return sendSuccess(res, 'Admin deleted successfully');
  } catch (error) {
    next(error);
  }
};
```

### Example 2: Custom Route with Multiple Role Checks

```javascript
import { protect, requireRole } from '../middleware/authMiddleware.js';
import ROLES from '../constant/roles.js';

// Only Admins and Super Admins can publish
router.post('/publish', 
  protect, 
  requireRole(ROLES.ADMIN), 
  publishContent
);

// Editors and above can draft
router.post('/draft', 
  protect, 
  requireRole(ROLES.EDITOR), 
  saveDraft
);

// Everyone (authenticated) can view
router.get('/view', 
  protect, 
  requireRole(ROLES.VIEWER), 
  viewContent
);
```

### Example 3: Check Roles in Controller Logic

```javascript
import { hasPermission } from '../constant/roles.js';
import ROLES from '../constant/roles.js';

export const updateProject = async (req, res, next) => {
  try {
    // Additional logic based on role
    if (req.body.featured && !hasPermission(req.user.role, ROLES.ADMIN)) {
      return sendError(res, 'Only admins can mark projects as featured', 403);
    }

    // Continue with update logic...
  } catch (error) {
    next(error);
  }
};
```

---

## 🔧 Helper Functions

### 1. Check if Role Exists
```javascript
import { isValidRole } from '../constant/roles.js';

const role = req.body.role;
if (!isValidRole(role)) {
  return sendError(res, 'Invalid role specified', 400);
}
```

### 2. Get All Available Roles
```javascript
import { getAllRoles } from '../constant/roles.js';

const availableRoles = getAllRoles();
// ['super-admin', 'admin', 'editor', 'viewer']
```

### 3. Check Permission Level
```javascript
import { hasPermission } from '../constant/roles.js';
import ROLES from '../constant/roles.js';

if (hasPermission(req.user.role, ROLES.ADMIN)) {
  // User has admin-level permissions or higher
}
```

---

## 🚀 Future Enhancements

### Potential Role Additions:

1. **MODERATOR** - Can moderate content, user submissions
2. **CONTRIBUTOR** - Can submit content for approval
3. **GUEST** - Limited read access

### Permission-Based System:

Instead of roles, use granular permissions:
```javascript
PERMISSIONS = {
  CREATE_PROJECT: 'create:project',
  DELETE_PROJECT: 'delete:project',
  MANAGE_USERS: 'manage:users',
  VIEW_ANALYTICS: 'view:analytics'
}

ROLE_PERMISSIONS = {
  'super-admin': ['*'], // All permissions
  'admin': ['create:project', 'delete:project', 'view:analytics'],
  'editor': ['create:project']
}
```

---

## 📊 Role Distribution Recommendations

For a typical portfolio backend:

- **1 Super Admin** - Owner/Main developer
- **1-2 Regular Admins** - Trusted collaborators
- **0-2 Editors** - Content managers (if needed)
- **0 Viewers** - Usually not needed for portfolio

---

## ✅ Benefits of This Implementation

1. **Centralized Management** - All roles in one file
2. **Type Safety** - Use constants instead of strings
3. **Hierarchical** - Clear permission levels
4. **Flexible** - Easy to add new roles
5. **Maintainable** - Changes in one place
6. **Testable** - Helper functions for testing

---

## 🎯 Summary

- ✅ Roles defined in `src/constant/roles.js`
- ✅ Used in Admin model for validation
- ✅ Used in middleware for access control
- ✅ Used in controllers for business logic
- ✅ Used in routes for endpoint protection
- ✅ Hierarchical permission system
- ✅ Helper functions for role checks

**All role-based access is now centralized and consistent!** 🎉
