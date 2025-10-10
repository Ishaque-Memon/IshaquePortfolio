# Portfolio Backend API

Complete REST API for Ishaque's Portfolio Website built with Node.js, Express, and MongoDB.

## 🚀 Features

- **RESTful API** - Clean and organized API endpoints
- **Authentication** - JWT-based admin authentication
- **File Uploads** - Cloudinary integration for image uploads
- **Security** - Helmet, CORS, rate limiting
- **Error Handling** - Comprehensive error handling middleware
- **Validation** - MongoDB schema validation
- **Account Security** - Login attempt tracking and account locking

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js                  # MongoDB connection
│   │   └── cloudinary.js          # Cloudinary config
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT authentication
│   │   └── errorMiddleware.js     # Error handling
│   ├── models/
│   │   ├── Project.js             # Project schema
│   │   ├── Skill.js               # Skill schema
│   │   ├── Certificate.js         # Certificate schema
│   │   ├── About.js               # About info schema
│   │   ├── ContactMessage.js      # Contact message schema
│   │   └── Admin.js               # Admin user schema
│   ├── routes/
│   │   ├── projectRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── certificateRoutes.js
│   │   ├── aboutRoutes.js
│   │   ├── contactRoutes.js
│   │   └── adminRoutes.js
│   ├── controllers/
│   │   ├── projectController.js
│   │   ├── skillController.js
│   │   ├── certificateController.js
│   │   ├── aboutController.js
│   │   ├── contactController.js
│   │   └── adminController.js
│   ├── utils/
│   │   ├── generateToken.js       # JWT token generation
│   │   ├── responseHandler.js     # Response helpers
│   │   └── uploadHelper.js        # File upload helpers
│   ├── app.js                     # Express app setup
│   └── server.js                  # Server entry point
├── .env                           # Environment variables
├── .env.example                   # Environment template
├── package.json
└── README.md
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+ installed
- MongoDB installed and running
- Cloudinary account (optional, for image uploads)

### Steps

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # Copy .env.example to .env
   cp .env.example .env
   
   # Edit .env and add your configuration
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on localhost:27017
   mongod
   ```

5. **Run the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔐 Create Admin User

After starting the server, create an admin account:

```bash
npm run seed
```

Or manually using MongoDB:

```javascript
use portfolio

db.admins.insertOne({
  name: "Admin",
  email: "admin@portfolio.com",
  password: "$2a$10$hashed_password_here",
  role: "admin",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 📡 API Endpoints

### Public Endpoints

#### Projects
- `GET /api/projects` - Get all projects (with pagination)
- `GET /api/projects/:id` - Get single project

#### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/grouped` - Get skills grouped by category
- `GET /api/skills/:id` - Get single skill

#### Certificates
- `GET /api/certificates` - Get all certificates
- `GET /api/certificates/:id` - Get single certificate

#### About
- `GET /api/about` - Get about information

#### Contact
- `POST /api/contact` - Submit contact message

### Protected Endpoints (Require Authentication)

#### Admin Authentication
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile
- `PUT /api/admin/profile` - Update admin profile
- `PUT /api/admin/change-password` - Change password

#### Projects (Admin)
- `POST /api/projects` - Create project (with image upload)
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

#### Skills (Admin)
- `POST /api/skills` - Create skill
- `PUT /api/skills/:id` - Update skill
- `DELETE /api/skills/:id` - Delete skill

#### Certificates (Admin)
- `POST /api/certificates` - Create certificate (with image upload)
- `PUT /api/certificates/:id` - Update certificate
- `DELETE /api/certificates/:id` - Delete certificate

#### About (Admin)
- `POST /api/about` - Create/update about info (with image upload)
- `PATCH /api/about/statistics` - Update statistics
- `DELETE /api/about/:id` - Delete about info

#### Contact Messages (Admin)
- `GET /api/contact` - Get all messages
- `GET /api/contact/stats` - Get message statistics
- `GET /api/contact/:id` - Get single message
- `PATCH /api/contact/:id/status` - Update message status
- `DELETE /api/contact/:id` - Delete message

## 🔒 Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

To get a token, login using:

```bash
POST /api/admin/login
Content-Type: application/json

{
  "email": "admin@portfolio.com",
  "password": "your_password"
}
```

Response:
```json
{
  "success": true,
  "message": "Login successful",
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

## 📤 File Uploads

Image uploads are handled using Cloudinary. To upload images:

1. Setup Cloudinary credentials in `.env`
2. Use `multipart/form-data` for requests
3. Include `image` or `profileImage` field

Example (using Postman):
- Set request to POST
- Select Body → form-data
- Add field `image` with type File
- Add other fields as text

## 🛡️ Security Features

- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - Prevent brute force attacks
- **JWT** - Secure authentication
- **Password Hashing** - Bcrypt encryption
- **Account Locking** - After 5 failed login attempts
- **Input Validation** - Mongoose schema validation

## 📊 Error Handling

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors
}
```

## 🧪 Testing the API

### Using cURL

```bash
# Get all projects
curl http://localhost:5000/api/projects

# Login
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@portfolio.com","password":"admin123"}'

# Create project (with auth)
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=My Project" \
  -F "description=Project description" \
  -F "image=@/path/to/image.jpg"
```

### Using Postman

1. Import collection from `/docs/postman_collection.json` (if available)
2. Set environment variables:
   - `BASE_URL`: http://localhost:5000
   - `TOKEN`: (obtained from login)

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=your_very_secure_random_secret_key
FRONTEND_URL=https://your-portfolio.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Deployment Platforms

- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **Render**: Deploy from dashboard
- **DigitalOcean**: Use App Platform

## 📝 Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
npm run seed     # Create default admin user
```

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in `.env`
- Verify network connectivity

### Image Upload Not Working
- Check Cloudinary credentials
- Verify file size (max 5MB)
- Check allowed file types (jpg, png, gif, webp, pdf)

### Authentication Failed
- Check JWT_SECRET is set
- Verify token is included in headers
- Check token expiration

## 📄 License

MIT

## 👨‍💻 Author

**Ishaque Memon**

---

**Need Help?** Contact: admin@portfolio.com
