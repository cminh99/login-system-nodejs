const express = require('express');
const router = express.Router();

// [GET] /
router.get('/', (req, res) => {
  res.render('home', {
    title: 'Home page',
    user: req.user,
  });
});

module.exports = router;
