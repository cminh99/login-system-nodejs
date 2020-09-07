const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');

class AuthController {
  // [GET] /
  getRedirectHome(req, res) {
    req.flash('success', 'You are logged in!');
    res.redirect('/');
  }

  // [GET] /auth/login
  getLogin(req, res) {
    res.render('login', {
      title: 'Log in'
    });
  }

  // [GET] /auth/logout
  getLogout(req, res) {
    req.logout();
    req.flash('success', 'You are logged out!');
    res.redirect('/');
  }

  // [GET] /auth/register
  getRegister(req, res) {
    res.render('register', {
      title: 'Sign up'
    });
  }

  // [POST] /auth/register
  async postRegister(req, res) {
    try {
      const randomNumAvt = Math.floor(Math.random() * 9) + 1;
      const email = await User.findOne({ email: req.body.email });

      if (email) {
        res.render('register', {
          title: 'Sign up',
          errorMsg: 'Email already exists.',
          values: req.body,
          existsEmail: true
        });
        return;
      }

      req.body.password = await bcrypt.hash(req.body.password, 10);
      req.body.avatar = '/images/avatars/' + randomNumAvt + '.jpg';
      req.body.googleId = null;
      req.body.facebookId = null;

      const newUser = new User(req.body);
      await newUser.save();

      req.flash('success', 'You have successfully registered. Log in now!');
      res.redirect('/auth/login');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new AuthController();
