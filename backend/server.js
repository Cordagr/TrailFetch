const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
MONGO_URL = 'mongodb+srv://cordxop:i9TJrAPGzocxut3O@cluster0.v2my0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'


mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Increase timeout to 5 seconds
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});



// Import and use the API routes from the separate file
const projectRoutes = require('./api/project');
app.use('/api/project', projectRoutes);


// Import and use the authentication routes from the separate file
const registerRouter = require('./routes/register');
app.use('/api/auth', registerRouter);

// Import and use the authentication routes from the separate file
const loginRouter = require('./routes/login');
app.use('/api/auth', loginRouter);

const searchTrailsRouter = require('./routes/searchTrails');
app.use('/api/trail', searchTrailsRouter);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app