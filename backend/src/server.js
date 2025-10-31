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
  console.error('❌ Error: Missing required environment variables:');
  missingEnvVars.forEach(varName => console.error(`   - ${varName}`));
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
  console.warn('⚠️  Cloudinary credentials not found. File uploads will not work.');
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
  console.log("🟢 New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log('');
  console.log('='.repeat(50));
  console.log('🚀 Portfolio Backend Server');
  console.log('='.repeat(50));
  console.log(`✅ Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api`);
  console.log(`💚 Health: http://localhost:${PORT}/health`);
  console.log(`🔓 CORS Allowed Origins:`);
  allowedOrigins.forEach(origin => console.log(`   - ${origin}`));
  console.log('='.repeat(50));
  console.log('');
});