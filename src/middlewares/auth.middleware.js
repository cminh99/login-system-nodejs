// used in user.route.js
module.exports.requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('error', 'Please log in to view your profile!');
  res.redirect('/auth/login');
};
