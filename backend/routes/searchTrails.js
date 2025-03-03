const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Load environment variables

const searchTrailsRouter = express.Router();

searchTrailsRouter.get('/searchTrails', async (req, res) => {
  let { location, radius } = req.query;

  if (!location || !radius) {
    return res.status(400).json({ error: 'Location and radius are required' });
  }

  const apiKey = 'AIzaSyCv3TTKGJirVR5w8ZfM6D582oZwB1tQUVQ';

  try {
    // Convert location (city or address) to latitude & longitude
    const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`;
    const geoResponse = await axios.get(geoUrl);

    if (geoResponse.data.status !== 'OK' || geoResponse.data.results.length === 0) {
      return res.status(400).json({ error: 'Invalid location. Please enter a valid city or address.' });
    }

    const { lat, lng } = geoResponse.data.results[0].geometry.location;

    // Fetch nearby hiking trails
    const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=hiking%20trail&type=point_of_interest&key=${apiKey}`;
    const response = await axios.get(googlePlacesUrl);

    res.json(response.data);
  } catch (err) {
    console.error('Error fetching trails:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

module.exports = searchTrailsRouter;
