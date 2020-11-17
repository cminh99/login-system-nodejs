const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

// [GET] /users/profile
router.get('/profile', authMiddleware.requireAuth, (req, res) => {
  res.render('profile', {
    title: `${req.user.name}'s profile`,
    user: req.user,
  });
});

module.exports = router;
