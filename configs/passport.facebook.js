const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user.model');

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.CALLBACK_URL + '/auth/facebook/redirect',
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ facebookId: profile.id });

        if (user) {
          return done(null, user);
        }

        const newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
          facebookId: profile.id,
          googleId: null,
          password: null
        });

        await newUser.save();
        done(null, newUser);
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
