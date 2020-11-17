const passport = require('passport');
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// local
router
  .route('/login')
  .get(authController.getLogin)
  .post(
    passport.authenticate('local', {
      failureRedirect: '/auth/login',
      failureFlash: true,
    }),
    authController.getRedirectHome
  );

router
  .route('/register')
  .get(authController.getRegister)
  .post(authController.postRegister);

// google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/auth/login',
    failureFlash: true,
  }),
  authController.getRedirectHome
);

// facebook
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/login',
    failureFlash: true,
  }),
  authController.getRedirectHome
);

// logout
router.get('/logout', authController.getLogout);

module.exports = router;
