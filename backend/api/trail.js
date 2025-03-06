// Import the Express framework for building the router
const express = require('express');
const router = express.Router();


// Define a POST route for user registration
router.post('/searchTrails', (req, res) => {
    // Handle user registration logic here
    res.json({ message: 'Searching for trails' });
});

router.post('/saveTrail', (req, res) => {
    // Handle user registration logic here
    res.json({ message: 'Saving trail' });
});

// Export the router to be used in server.js
module.exports = router;