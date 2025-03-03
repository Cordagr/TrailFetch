// Import the Express framework for building the router
const express = require('express');
const router = express.Router();

// Define a GET route to handle API requests from the frontend
router.get('/', (req, res) => {
    // Send a JSON response containing information about the project
    res.json({
        studentName: "Smith, John",
        projectName: "Weather App",
        projectUrl: "http://10.0.0.1:3001/",
        projectDescription: "This application provides real-time weather updates for any location worldwide."
    });
});

// Export the router to be used in server.js
module.exports = router;