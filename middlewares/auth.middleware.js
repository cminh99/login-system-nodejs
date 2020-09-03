module.exports.requireAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  req.flash('errorMsg', 'Please log in to view your profile!');
  res.redirect('/auth/login');
};
