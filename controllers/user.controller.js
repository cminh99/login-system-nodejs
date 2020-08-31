module.exports.getProfile = (req, res) => {
	res.render('profile', {
		title: req.user.name + "'s profile",
		user: req.user
	});
};
