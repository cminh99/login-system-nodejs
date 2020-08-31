const router = require('express').Router();
const passport = require('passport');

const controller = require('../controllers/auth.controller');

router.get('/login', controller.getLogin);

router.get('/logout', controller.getLogout);

router.get('/register', controller.getRegister);

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

module.exports = router;
