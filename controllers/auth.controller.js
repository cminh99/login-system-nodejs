const passport = require('passport');

module.exports.getLogin = (req, res) => {
	res.render('login', {
		title: 'Log in'
	});
};

module.exports.getRegister = (req, res) => {
	res.render('register', {
		title: 'Sign up'
	});
};

module.exports.getLogout = (req, res) => {
	req.logout();
	req.flash('successMsg', 'You are logged out!');
	res.redirect('/');
};
