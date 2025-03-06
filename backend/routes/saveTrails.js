const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/login');
const trail = require('../models/trail');
const auth = require('../middleware/auth');
const saveTrailRouter = express.Router();

saveTrailRouter.post('/saveTrail', auth, (req, res) => {
  const today = new Date();
  const trailData = {
    trailId: req.body.trailId,
    savedAt: today
  };

  const userId = req.user.userId;
  console.log(userId)

  User.findById(userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const existingTrail = user.savedTrails.find(trail => trail.trailId === req.body.trailId);
      if (existingTrail) {
        return res.json({ error: 'Trail already saved' });
      }

      user.savedTrails.push(trailData);
      user.save()
        .then(() => res.json({ status: trailData.trailName + ' saved!' }))
        .catch(err => res.send('error: ' + err));
    })
    .catch(err => res.send('error: ' + err));
});

module.exports = saveTrailRouter;