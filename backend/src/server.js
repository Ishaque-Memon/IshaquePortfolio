import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import { connectCloudinary } from './config/cloudinary.js';
import { Server } from "socket.io";
import http from "http";

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  // ...removed console.error('❌ Error: Missing required environment variables:');
  missingEnvVars.forEach(varName => {/* removed console.error */});
  process.exit(1);
}

// Set port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Connect to Cloudinary (optional)
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  connectCloudinary();
} else {
  // ...removed console.warn('⚠️  Cloudinary credentials not found. File uploads will not work.');
}

// Create HTTP server
const server = http.createServer(app);

// FIXED: Socket.IO CORS with multiple origins
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['http://localhost:3000'];

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Store globally (optional: for access in routes/controllers)
app.set("io", io);

io.on("connection", (socket) => {
  // ...removed console.log("🟢 New client connected:", socket.id);

  socket.on("disconnect", () => {
  // ...removed console.log("🔴 Client disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  // ...removed console.log('');
  // ...removed console.log('='.repeat(50));
  // ...removed console.log('🚀 Portfolio Backend Server');
  // ...removed console.log('='.repeat(50));
  // ...removed console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode`);
  // ...removed console.log(`🌐 URL: http://localhost:${PORT}`);
  // ...removed console.log(`📡 API: http://localhost:${PORT}/api`);
  // ...removed console.log(`💚 Health: http://localhost:${PORT}/health`);
  // ...removed console.log(`🔓 CORS Allowed Origins:`);
  allowedOrigins.forEach(origin => {/* removed console.log */});
  // ...removed console.log('='.repeat(50));
  // ...removed console.log('');
});