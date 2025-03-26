const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();
 const app = express();

// Middleware
app.use(express.json());
 
// app.use(cors());
app.use(cors({
  origin: "https://dummyserver-pi.vercel.app",  // ✅ Allow specific frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],    // ✅ Allow required HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"],  // ✅ Allow headers
  credentials: true,  // ✅ Allow credentials if needed
}));
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sunilsahani484:JjEXH8avdYNzmxBK@cluster0.sojau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit if MongoDB connection fails
  }
};
 connectDB();
// Routes
app.use('/api/auth', authRoutes);
 
app.use('/api/messages', messageRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
