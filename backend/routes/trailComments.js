const express = require('express');
const trail = require('../models/trail');

const trailCommentsRouter = express.Router();

// Get comments for a specific trail
trailCommentsRouter.get('/:trailId/getComments', async (req, res) => {
  try {
    const trail = await trail.findById(req.params.trailId);
    if (!trail) {
      return res.status(404).json({ error: 'Trail not found' });
    }
    res.json(trail.comments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new comment to a specific trail
trailCommentsRouter.post('/:trailId/postCommet', async (req, res) => {
  const { username, text } = req.body;
  try {
    const trail = await trail.findById(req.params.trailId);
    if (!trail) {
      return res.status(404).json({ error: 'Trail not found' });
    }
    const newComment = { username, text };
    trail.comments.push(newComment);
    await trail.save();
    res.json(newComment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = trailCommentsRouter;