const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: 'Email does not exists!' });
        }

        const comparedPassword = await bcrypt.compare(password, user.password);
        if (!comparedPassword) {
          return done(null, false, { message: 'Incorrect password!' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
