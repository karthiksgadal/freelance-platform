const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
console.log("📦 App.js started loading");


// Load env variables
dotenv.config();
console.log("🌱 MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  console.log('🌐 GET / route hit');
  res.send('API is running 🚀');
});

const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const loginRoutes = require("./routes/login"); // ✅
const jobRoutes = require('./routes/job');     // ✅ Correct path
const applicationRoutes = require('./routes/application');
// const reviewRoutes = require('./routes/review');
const adminRoutes = require('./routes/admin');

app.use("/api", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api", loginRoutes); // ✅
app.use('/api', jobRoutes);                    // ✅ Mounted properly
app.use("/api", applicationRoutes);
// app.use('/api', reviewRoutes);
app.use('/api', adminRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
