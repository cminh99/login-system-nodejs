const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/auth.controller');

// local
router
  .route('/login')
  .get(controller.getLogin)
  .post(
    passport.authenticate('local', {
      failureRedirect: '/auth/login',
      failureFlash: true
    }),
    (req, res) => {
      req.flash('successMsg', 'You are logged in!');
      res.redirect('/');
    }
  );

router
  .route('/register')
  .get(controller.getRegister)
  .post(controller.postRegister);

// google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  })
);

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/auth/login'
  }),
  (req, res) => {
    req.flash('successMsg', 'You are logged in!');
    res.redirect('/');
  }
);

// facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/login'
  }),
  (req, res) => {
    req.flash('successMsg', 'You are logged in!');
    res.redirect('/');
  }
);

// logout
router.get('/logout', controller.getLogout);

module.exports = router;
