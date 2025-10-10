# 📡 API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 🔐 Admin Authentication

### Login
```http
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
  "message": "Login successful",
  "data": {
    "admin": {
      "id": "64f5a1b2c3d4e5f6g7h8i9j0",
      "name": "Admin",
      "email": "admin@portfolio.com",
      "role": "admin"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "7d"
  }
}
```

### Get Profile
```http
GET /api/admin/profile
Authorization: Bearer <token>
```

### Update Profile
```http
PUT /api/admin/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New Name",
  "email": "newemail@portfolio.com"
}
```

### Change Password
```http
PUT /api/admin/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "admin123",
  "newPassword": "newSecurePassword"
}
```

---

## 🎨 Projects

### Get All Projects
```http
GET /api/projects?page=1&limit=10&category=Web Development&featured=true
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10)
- `category` (string): Filter by category
- `featured` (boolean): Filter by featured status
- `status` (string): completed | in-progress | planned

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

### Get Single Project
```http
GET /api/projects/:id
```

### Create Project (Admin)
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: multipart/form-data

title: My Awesome Project
description: A detailed description of the project
technologies: ["React", "Node.js", "MongoDB"]
category: Web Development
demoUrl: https://demo.com
githubUrl: https://github.com/user/repo
featured: true
order: 1
status: completed
image: <file>
```

### Update Project (Admin)
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

title: Updated Project Name
description: Updated description
image: <file> (optional)
```

### Delete Project (Admin)
```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

---

## 💡 Skills

### Get All Skills
```http
GET /api/skills?category=Frontend&page=1&limit=50
```

### Get Skills Grouped by Category
```http
GET /api/skills/grouped
```

**Response:**
```json
{
  "success": true,
  "data": {
    "Frontend": [...],
    "Backend": [...],
    "Database": [...]
  }
}
```

### Get Single Skill
```http
GET /api/skills/:id
```

### Create Skill (Admin)
```http
POST /api/skills
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "React.js",
  "category": "Frontend",
  "proficiency": 90,
  "icon": "react-icon-url",
  "order": 1,
  "yearsOfExperience": 3
}
```

### Update Skill (Admin)
```http
PUT /api/skills/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "proficiency": 95,
  "yearsOfExperience": 4
}
```

### Delete Skill (Admin)
```http
DELETE /api/skills/:id
Authorization: Bearer <token>
```

---

## 📜 Certificates

### Get All Certificates
```http
GET /api/certificates?page=1&limit=10
```

### Get Single Certificate
```http
GET /api/certificates/:id
```

### Create Certificate (Admin)
```http
POST /api/certificates
Authorization: Bearer <token>
Content-Type: multipart/form-data

title: AWS Certified Developer
issuer: Amazon Web Services
issueDate: 2024-01-15
expiryDate: 2027-01-15
credentialId: ABC123XYZ
credentialUrl: https://aws.amazon.com/verify
skills: ["AWS", "Cloud Computing", "DevOps"]
description: Professional certification for AWS development
order: 1
image: <file>
```

### Update Certificate (Admin)
```http
PUT /api/certificates/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data

title: Updated Title
image: <file> (optional)
```

### Delete Certificate (Admin)
```http
DELETE /api/certificates/:id
Authorization: Bearer <token>
```

---

## 👤 About

### Get About Info
```http
GET /api/about
```

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Full Stack Developer",
    "name": "Ishaque Memon",
    "bio": "Passionate developer...",
    "profileImage": {
      "url": "https://cloudinary.com/...",
      "publicId": "portfolio/profile/..."
    },
    "email": "ishaque@example.com",
    "phone": "+92 300 1234567",
    "location": {
      "city": "Karachi",
      "country": "Pakistan"
    },
    "socialLinks": {
      "github": "https://github.com/ishaque",
      "linkedin": "https://linkedin.com/in/ishaque"
    },
    "statistics": {
      "yearsOfExperience": 5,
      "projectsCompleted": 50,
      "happyClients": 30,
      "certificatesEarned": 10
    }
  }
}
```

### Create/Update About (Admin)
```http
POST /api/about
Authorization: Bearer <token>
Content-Type: multipart/form-data

title: Full Stack Developer
name: Ishaque Memon
bio: Passionate developer...
email: ishaque@example.com
phone: +92 300 1234567
resumeUrl: https://drive.google.com/resume.pdf
location: {"city": "Karachi", "country": "Pakistan"}
socialLinks: {"github": "https://github.com/ishaque"}
statistics: {"yearsOfExperience": 5, "projectsCompleted": 50}
profileImage: <file>
```

### Update Statistics Only (Admin)
```http
PATCH /api/about/statistics
Authorization: Bearer <token>
Content-Type: application/json

{
  "yearsOfExperience": 6,
  "projectsCompleted": 55,
  "happyClients": 35
}
```

---

## 📬 Contact

### Submit Contact Message
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a project...",
  "phone": "+92 300 1234567"
}
```

### Get All Messages (Admin)
```http
GET /api/contact?page=1&limit=20&status=new&isRead=false
Authorization: Bearer <token>
```

**Query Parameters:**
- `status`: new | read | replied | archived
- `isRead`: true | false

### Get Message Stats (Admin)
```http
GET /api/contact/stats
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 100,
    "unread": 15,
    "new": 10,
    "replied": 60,
    "archived": 30
  }
}
```

### Get Single Message (Admin)
```http
GET /api/contact/:id
Authorization: Bearer <token>
```

### Update Message Status (Admin)
```http
PATCH /api/contact/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "replied",
  "notes": "Responded via email on 2024-10-10"
}
```

### Delete Message (Admin)
```http
DELETE /api/contact/:id
Authorization: Bearer <token>
```

---

## 🚫 Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation Error",
  "errors": [
    "Project title is required",
    "Email is invalid"
  ]
}
```

### Unauthorized (401)
```json
{
  "success": false,
  "message": "Not authorized, no token provided"
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Project not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## 📋 Data Models

### Project Model
```javascript
{
  title: String (required),
  description: String (required),
  technologies: [String],
  category: String (enum),
  image: { url: String, publicId: String },
  demoUrl: String,
  githubUrl: String,
  featured: Boolean,
  order: Number,
  status: String (enum),
  createdAt: Date,
  updatedAt: Date
}
```

### Skill Model
```javascript
{
  name: String (required, unique),
  category: String (enum),
  proficiency: Number (0-100),
  icon: String,
  order: Number,
  yearsOfExperience: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Certificate Model
```javascript
{
  title: String (required),
  issuer: String (required),
  issueDate: Date (required),
  expiryDate: Date,
  credentialId: String,
  credentialUrl: String,
  image: { url: String, publicId: String },
  skills: [String],
  description: String,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 Rate Limiting

- **General API**: 100 requests per 15 minutes per IP
- **Admin Login**: 5 requests per 15 minutes per IP

---

## 📦 File Upload Requirements

- **Allowed formats**: JPEG, JPG, PNG, GIF, WebP, PDF
- **Max size**: 5MB
- **Field names**:
  - Projects: `image`
  - Certificates: `image`
  - About: `profileImage`
