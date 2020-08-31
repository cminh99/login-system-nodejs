const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model');

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: '/auth/google/redirect'
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const user = await User.findOne({ googleId: profile.id });

				if (user) {
					done(null, user);
					return;
				}

				const newUser = new User({
					name: profile.displayName,
					email: profile.emails[0].value,
					avatar: profile.photos[0].value,
					googleId: profile.id,
					facebookId: null,
					password: null
				});

				await newUser.save();
				done(null, newUser);
			} catch (error) {
				console.log('Error:' + error);
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