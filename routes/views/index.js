var keystone = require('keystone');
var Post = keystone.list('Post');

exports = module.exports = function(req, res) {
	const view = new keystone.View(req, res);
	const locals = res.locals;

	locals.section = 'home';
	locals.meetup = {};
	locals.page.title = 'Welcome to VegsocHK';

	locals.rsvpStatus = {};

	locals.user = req.user;

	locals.data = {
		posts: [],
	};

	view.on('init', function(next) {
		var q = Post.model.find().where('state', 'published').sort('-publishedDate').populate('author categories');

		q.exec(function(err, results) {
			locals.data.posts = results;
			next(err);
		});
	});

	view.render('site/index');
};
