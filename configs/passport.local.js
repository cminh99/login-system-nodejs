const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email'
		},
		async (email, password, done) => {
			try {
				const user = await User.findOne({ email: email });
				const comparedPassword = await bcrypt.compare(password, user.password);

				if (!user) {
					return done(null, false, { message: 'Email does not exists!' });
				}

				if (!comparedPassword) {
					return done(null, false, { message: 'Incorrect password!' });
				}

				done(null, user);
			} catch (error) {
				console.log(error);
				return done(error);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});
