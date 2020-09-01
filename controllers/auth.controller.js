const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

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

module.exports.postRegister = async (req, res) => {
	try {
		const randomNumber = Math.floor(Math.random() * 9) + 1;
		const user = await User.findOne({ email: req.body.email });

		if (user) {
			res.render('register', {
				title: 'Sign up',
				errorMsg: 'Email already exists.',
				values: req.body,
				existsEmail: user.email
			});
			return;
		}

		req.body.googleId = null;
		req.body.facebookId = null;
		req.body.password = await bcrypt.hash(req.body.password, 10);
		req.body.avatar = '/images/avatars/' + randomNumber + '.jpg';

		const newUser = new User(req.body);
		await newUser.save();

		req.flash('successMsg', 'You have successfully registered. Log in now!');
		res.redirect('/auth/login');
	} catch (error) {
		console.log(error);
	}
};
