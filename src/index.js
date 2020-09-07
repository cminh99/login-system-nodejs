require('dotenv').config();
require('./configs/db');
require('./configs/passport.local');
require('./configs/passport.google');
require('./configs/passport.facebook');

const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const express = require('express');

const indexRoutes = require('./routes/index.route');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');

const app = express();

// Set up template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// App's middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET_STRING,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 * 3
    }
  })
);
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('success');
  res.locals.errorMsg = req.flash('error');
  next();
});

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
